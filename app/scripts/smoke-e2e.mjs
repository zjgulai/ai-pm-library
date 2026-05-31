import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(scriptDir, '../..')

const runId = process.env.PROMPTFORGE_SMOKE_RUN_ID ??
  new Date().toISOString().replace(/\D/g, '').slice(0, 14)
const baseUrl = normalizeBaseUrl(process.env.PROMPTFORGE_SMOKE_BASE_URL ?? 'http://127.0.0.1:3000/')
const baseHost = new URL(baseUrl).hostname
const checkCohosts = readBool(
  process.env.PROMPTFORGE_SMOKE_CHECK_COHOSTS,
  baseHost === 'person.lute-tlz-dddd.top',
)
const writeScreenshots = readBool(process.env.PROMPTFORGE_SMOKE_SCREENSHOTS, true)
const outputPath = resolve(
  process.env.PROMPTFORGE_SMOKE_OUTPUT_PATH ?? `${projectRoot}/tmp/outputs/smoke-e2e-report-${runId}.json`,
)
const screenshotDir = resolve(
  process.env.PROMPTFORGE_SMOKE_SCREENSHOT_DIR ?? `${projectRoot}/tmp/screenshots`,
)

const categoryRoutes = [
  { hash: '/', label: '灵词', count: 803, cards: 0 },
  { hash: '/prompts', label: '提示词', count: 193, cards: 48 },
  { hash: '/skills', label: '技能', count: 306, cards: 48 },
  { hash: '/hooks', label: '钩子', count: 72, cards: 48 },
  { hash: '/mcp', label: 'MCP', count: 72, cards: 48 },
  { hash: '/agents', label: '智能体', count: 73, cards: 48 },
  { hash: '/github', label: '开源', count: 87, cards: 48 },
]

const catalogCounts = {
  prompt: 193,
  skill: 306,
  hook: 72,
  mcp: 72,
  agent: 73,
  github: 87,
}

const report = {
  baseUrl,
  runId,
  startedAt: new Date().toISOString(),
  checks: [],
  screenshots: [],
}

function normalizeBaseUrl(value) {
  return value.endsWith('/') ? value : `${value}/`
}

function readBool(value, fallback) {
  if (value === undefined) return fallback
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase())
}

function urlForHash(hash) {
  return `${baseUrl}?smoke=${runId}-${Date.now()}#${hash}`
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function record(status, name, details = {}) {
  report.checks.push({ status, name, ...details })
  const prefix = status === 'pass' ? 'PASS' : status === 'skip' ? 'SKIP' : 'FAIL'
  console.log(`[${prefix}] ${name}${details.message ? ` - ${details.message}` : ''}`)
}

async function step(name, fn) {
  try {
    const details = await fn()
    record('pass', name, details)
  } catch (error) {
    record('fail', name, { message: error instanceof Error ? error.message : String(error) })
  }
}

async function fetchText(path, options) {
  const response = await fetch(new URL(path, baseUrl), options)
  return { response, text: await response.text() }
}

async function fetchJson(path, options) {
  const response = await fetch(new URL(path, baseUrl), options)
  const text = await response.text()
  return { response, json: JSON.parse(text), text }
}

async function launchBrowser() {
  const attempts = [
    { label: 'bundled chromium', options: { headless: true, args: ['--disable-gpu'] } },
    { label: 'system chrome', options: { channel: 'chrome', headless: true, args: ['--disable-gpu'] } },
  ]
  const failures = []

  for (const attempt of attempts) {
    for (let index = 1; index <= 2; index += 1) {
      try {
        return await chromium.launch(attempt.options)
      } catch (error) {
        failures.push(`${attempt.label} attempt ${index}: ${error instanceof Error ? error.message : String(error)}`)
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
  }

  throw new Error(`Unable to launch browser:\n${failures.join('\n')}`)
}

async function closeBrowser(browser) {
  try {
    await Promise.race([
      browser.close(),
      new Promise(resolve => setTimeout(resolve, 3000)),
    ])
  } catch {
    // Browser teardown should not mask completed smoke assertions.
  }
}

async function attachFailureCollectors(page, bucket) {
  page.on('pageerror', error => bucket.push(`pageerror: ${error.message}`))
  page.on('console', message => {
    if (message.type() === 'error') {
      bucket.push(`console: ${message.text()}`)
    }
  })
  page.on('response', response => {
    if (response.status() >= 400) {
      bucket.push(`response: ${response.status()} ${response.url()}`)
    }
  })
}

async function gotoHash(page, hash) {
  await page.goto(urlForHash(hash), { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => undefined)
}

async function waitForCards(page, count) {
  await page.waitForFunction(
    expected => document.querySelectorAll('.card-zh').length === expected,
    count,
    { timeout: 10000 },
  )
}

async function getViewportOverflow(page) {
  return await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }))
}

async function assertNoHorizontalOverflow(page) {
  const overflow = await getViewportOverflow(page)
  assert(
    overflow.scrollWidth <= overflow.innerWidth + 1 && overflow.bodyScrollWidth <= overflow.innerWidth + 1,
    `horizontal overflow: viewport=${overflow.innerWidth}, document=${overflow.scrollWidth}, body=${overflow.bodyScrollWidth}`,
  )
  return overflow
}

async function takeScreenshot(page, name) {
  if (!writeScreenshots) return null
  const path = resolve(screenshotDir, `smoke-e2e-${name}-${runId}.png`)
  await page.screenshot({ path, fullPage: true })
  report.screenshots.push(path)
  return path
}

async function runStaticAndApiChecks() {
  await step('HTML and built assets respond', async () => {
    const { response, text } = await fetchText('/')
    assert(response.status === 200, `HTML status ${response.status}`)
    assert(text.includes('灵词 PromptForge'), 'HTML does not include app title')

    const assets = [...text.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)].map(match => match[1])
    assert(assets.length >= 2, `expected JS/CSS assets, found ${assets.length}`)
    const statuses = []
    for (const asset of assets) {
      const assetResponse = await fetch(new URL(asset, baseUrl))
      statuses.push(`${asset}:${assetResponse.status}`)
      assert(assetResponse.status === 200, `${asset} status ${assetResponse.status}`)
    }
    return { assets: statuses }
  })

  await step('favicon responds', async () => {
    const response = await fetch(new URL('/favicon.svg', baseUrl))
    assert(response.status === 200, `favicon status ${response.status}`)
    return { status: response.status }
  })

  await step('catalog JSON counts match baseline', async () => {
    const counts = {}
    for (const [category, expected] of Object.entries(catalogCounts)) {
      const { response, json } = await fetchJson(`/catalog/${category}.json`)
      assert(response.status === 200, `${category}.json status ${response.status}`)
      assert(Array.isArray(json), `${category}.json is not an array`)
      assert(json.length === expected, `${category}.json expected ${expected}, got ${json.length}`)
      counts[category] = json.length
    }
    return { counts }
  })

  await step('public tRPC surface remains read-only static-first', async () => {
    const ping = await fetchJson('/api/trpc/ping?batch=1&input=%7B%7D')
    assert(ping.response.status === 200, `ping status ${ping.response.status}`)
    assert(ping.text.includes('"ok":true'), 'ping response does not contain ok true')

    const legacy = await fetchText('/api/trpc/prompts.list?batch=1&input=%7B%7D')
    assert(legacy.response.status === 404, `legacy prompts.list expected 404, got ${legacy.response.status}`)
    assert(legacy.text.includes('NOT_FOUND'), 'legacy prompts.list did not return NOT_FOUND')
    return { pingStatus: ping.response.status, legacyStatus: legacy.response.status }
  })

  if (!checkCohosts) {
    record('skip', 'co-hosted domains survive nginx promptforge mapping', {
      message: `not production host: ${baseHost}`,
    })
    return
  }

  await step('co-hosted domains survive nginx promptforge mapping', async () => {
    const targets = [
      { url: 'https://video.lute-tlz-dddd.top/', allowed: [200] },
      { url: 'https://mkt.lute-tlz-dddd.top/', allowed: [200] },
      { url: 'https://lute-tlz-dddd.top/', allowed: [200] },
      { url: 'https://voc.lute-tlz-dddd.top/', allowed: [200, 302] },
    ]
    const statuses = []
    for (const target of targets) {
      const response = await fetch(target.url, { redirect: 'manual' })
      statuses.push(`${target.url}:${response.status}`)
      assert(target.allowed.includes(response.status), `${target.url} status ${response.status}`)
    }
    return { statuses }
  })
}

async function runDesktopChecks(browser) {
  const context = await browser.newContext({
    viewport: { width: 1365, height: 900 },
    permissions: ['clipboard-read', 'clipboard-write'],
  })
  const page = await context.newPage()
  const browserErrors = []
  await attachFailureCollectors(page, browserErrors)

  await step('desktop route matrix renders all pages without overflow', async () => {
    const routeResults = []
    for (const route of categoryRoutes) {
      await gotoHash(page, route.hash)
      await page.getByRole('heading', { name: route.label }).first().waitFor({ timeout: 10000 })
      const overflow = await assertNoHorizontalOverflow(page)

      if (route.cards > 0) {
        await waitForCards(page, route.cards)
      } else {
        await page.waitForFunction(() => document.body.textContent?.includes('803'), null, { timeout: 10000 })
      }
      routeResults.push({ route: route.hash, label: route.label, overflow })
    }
    await takeScreenshot(page, 'desktop-home')
    return { routes: routeResults.map(item => item.route) }
  })

  await step('skills load-more expands visible card window', async () => {
    await gotoHash(page, '/skills')
    await waitForCards(page, 48)
    const button = page.getByRole('button', { name: /加载更多/ })
    await button.click()
    await waitForCards(page, 96)
    await page.getByText('96/306').waitFor({ timeout: 5000 })
    await takeScreenshot(page, 'desktop-skills-load-more')
    return { visibleCards: 96 }
  })

  await step('skills card actions are functional and safe-rendered', async () => {
    await gotoHash(page, '/skills')
    await waitForCards(page, 48)

    await page.getByRole('button', { name: '展开详情' }).first().click()
    await page.getByRole('button', { name: '收起详情' }).first().waitFor({ timeout: 5000 })
    const unsafeCounts = await page.evaluate(() => ({
      scripts: document.querySelectorAll('.max-h-96 script').length,
      rawInjectionNodes: document.querySelectorAll('[dangerouslySetInnerHTML]').length,
      expandedTextLength: document.querySelector('.max-h-96')?.textContent?.length ?? 0,
    }))
    assert(unsafeCounts.scripts === 0, `script nodes present: ${unsafeCounts.scripts}`)
    assert(unsafeCounts.rawInjectionNodes === 0, `raw injection nodes present: ${unsafeCounts.rawInjectionNodes}`)
    assert(unsafeCounts.expandedTextLength > 20, 'expanded content is unexpectedly short')

    const favorite = page.getByRole('button', { name: '收藏' }).first()
    await favorite.click()
    const pressed = await page.getByRole('button', { name: '取消收藏' }).first().getAttribute('aria-pressed')
    assert(pressed === 'true', `favorite aria-pressed expected true, got ${pressed}`)

    await page.getByRole('button', { name: '复制内容' }).first().click()
    await page.getByRole('button', { name: '已复制' }).first().waitFor({ timeout: 5000 })
    await takeScreenshot(page, 'desktop-skills-expanded')
    return unsafeCounts
  })

  await step('skills search, suggestions, role filter, empty state, and clear reset', async () => {
    await gotoHash(page, '/skills')
    await waitForCards(page, 48)

    const input = page.getByRole('combobox', { name: '搜索内容' })
    await input.focus()
    await page.locator('#search-suggestions').waitFor({ timeout: 5000 })

    await input.fill('amazon')
    await page.waitForFunction(() => document.body.textContent?.includes('102 个结果'), null, { timeout: 8000 })
    await page.locator('#search-suggestions').waitFor({ timeout: 5000 })
    await waitForCards(page, 48)

    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K')
    assert(await input.evaluate(node => node === document.activeElement), 'Meta/Ctrl+K did not focus search input')

    await page.getByRole('button', { name: '清除搜索' }).first().click()
    await page.waitForFunction(() => !document.body.textContent?.includes('102 个结果'), null, { timeout: 5000 })

    await page.getByRole('button', { name: /跨境电商 \(\d+\)/ }).click()
    await page.waitForFunction(() => document.body.textContent?.includes('180 个结果'), null, { timeout: 5000 })
    await waitForCards(page, 48)

    await input.fill('zzzz-no-match-e2e')
    await page.waitForFunction(() => document.body.textContent?.includes('0 个结果'), null, { timeout: 8000 })
    await page.getByText(/未找到匹配/).waitFor({ timeout: 5000 })

    await page.getByRole('button', { name: '清除筛选' }).click()
    await waitForCards(page, 48)
    const resetValue = await input.inputValue()
    assert(resetValue === '', `clear filter should reset search input, got "${resetValue}"`)
    await takeScreenshot(page, 'desktop-skills-filter-reset')
    return { search: 'amazon=102', roleFilter: 'ecommerce=180', resetValue }
  })

  await step('desktop browser console has no runtime errors', async () => {
    assert(browserErrors.length === 0, browserErrors.join('\n'))
    return { errors: browserErrors.length }
  })

  await context.close()
}

async function runMobileChecks(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  })
  const page = await context.newPage()
  const browserErrors = []
  await attachFailureCollectors(page, browserErrors)

  await step('mobile menu opens, navigates to skills, and avoids overflow', async () => {
    await gotoHash(page, '/')
    await page.getByRole('heading', { name: '灵词' }).first().waitFor({ timeout: 10000 })
    await assertNoHorizontalOverflow(page)

    const menu = page.locator('button[aria-controls="mobile-navigation"]')
    await menu.click()
    await page.waitForFunction(
      () => document.querySelector('button[aria-controls="mobile-navigation"]')?.getAttribute('aria-expanded') === 'true',
      null,
      { timeout: 5000 },
    )
    await page.locator('#mobile-navigation').waitFor({ timeout: 5000 })
    await takeScreenshot(page, 'mobile-menu-open')

    await page.locator('#mobile-navigation').getByRole('link', { name: /技能/ }).click()
    await page.waitForURL('**#/skills', { timeout: 5000 })
    await page.getByRole('heading', { name: '技能' }).first().waitFor({ timeout: 10000 })
    await waitForCards(page, 48)
    const overflow = await assertNoHorizontalOverflow(page)
    await takeScreenshot(page, 'mobile-skills')
    return { overflow }
  })

  await step('mobile browser console has no runtime errors', async () => {
    assert(browserErrors.length === 0, browserErrors.join('\n'))
    return { errors: browserErrors.length }
  })

  await context.close()
}

async function main() {
  await mkdir(dirname(outputPath), { recursive: true })
  await mkdir(screenshotDir, { recursive: true })

  await runStaticAndApiChecks()
  const browser = await launchBrowser()
  try {
    await runDesktopChecks(browser)
    await runMobileChecks(browser)
  } finally {
    await closeBrowser(browser)
  }

  report.finishedAt = new Date().toISOString()
  report.summary = {
    passed: report.checks.filter(check => check.status === 'pass').length,
    skipped: report.checks.filter(check => check.status === 'skip').length,
    failed: report.checks.filter(check => check.status === 'fail').length,
  }
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log(`\nReport: ${outputPath}`)
  for (const screenshot of report.screenshots) {
    console.log(`Screenshot: ${screenshot}`)
  }

  if (report.summary.failed > 0) {
    process.exitCode = 1
  }
}

await main()
