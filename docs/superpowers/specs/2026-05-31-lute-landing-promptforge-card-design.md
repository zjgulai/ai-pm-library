---
title: 宿主页 PromptForge 卡片链接展示设计
doc_type: architecture
module: landing
topic: promptforge-card-link
status: stable
created: 2026-05-31
updated: 2026-05-31
owner: self
source: human+ai
---

# 宿主页 PromptForge 卡片链接展示设计

## 目标

在宿主域名 `https://lute-tlz-dddd.top/` 的 landing page 中，以卡片链接形式展示已部署的 PromptForge 站点 `https://person.lute-tlz-dddd.top/`，让它和现有 `video`、`voc`、`mkt` 三个入口处于同一信息架构层级。

## 现状

宿主页不是当前仓库的前端应用源码，而是远程 `ai_video_nginx` 挂载的静态 HTML。

- 页面 URL：`https://lute-tlz-dddd.top/`
- 远程文件：`/opt/ai-video/deploy/lighthouse/landing/index.html`
- nginx 配置：`/opt/ai-video/deploy/lighthouse/nginx.conf`
- 页面挂载：`/opt/ai-video/deploy/lighthouse/landing` -> `/var/www/landing`
- 当前卡片：`video.lute`、`voc.lute`、`mkt.lute`

当前页面使用浅暖色背景、居中品牌区、`auto-fit` card grid、卡片 hover 上浮、每卡包含 icon、subtitle、title、中文描述、英文描述、chips 和 CTA。

## 已确认决策

- 新增 PromptForge 卡片。
- 保留当前三列自然布局，不改成强制 `2 x 2`。
- 不触碰 nginx 配置。
- 不重启其他应用。
- 修改前必须备份远程 `index.html`。
- 修改后必须验证宿主页和四个子站点均可访问。

## 卡片内容

新增卡片链接：

```text
https://person.lute-tlz-dddd.top/
```

展示文案：

- Subtitle：`AI PM Knowledge Library`
- Title：`灵词 PromptForge`
- 中文描述：`提示词 · 技能 · Hooks · MCP · Agents · GitHub 工作流，一站式 AI 产品经理知识库`
- 英文描述：`Prompt, skill and agent library for AI product management workflows`
- Chips：`803 Resources`、`6 Categories`、`Static-first`
- CTA：`打开灵词库`
- Footer 短链：`person.lute`

## 视觉方案

新增卡片沿用现有 `.card` 结构，避免重写页面布局。新增 `.promptforge` accent class，用蓝灰或墨蓝强调 PromptForge 的知识库属性，并与现有红、绿、金三张卡区分。

建议变量：

```css
--ink-accent: #536D89;
--ink-panel: rgba(83, 109, 137, 0.12);
```

新增样式范围只包含：

- `.card-icon.promptforge`
- `.card-subtitle.promptforge`
- `.card-cta.promptforge`

不修改 `.grid` 的 `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));`。桌面宽度足够时保持三列，第四张自然换到下一行；移动端保持单列。

## 执行计划

1. 在远程服务器创建备份：

```bash
cp /opt/ai-video/deploy/lighthouse/landing/index.html \
  /opt/ai-video/deploy/lighthouse/landing/index.html.bak.<timestamp>
```

2. 拉取远程 HTML 到本地 `tmp/`，使用 `apply_patch` 修改本地副本。

3. 修改本地副本：

- 增加 PromptForge accent CSS。
- 在 `.grid` 中追加第四张 PromptForge card。
- 在 footer 中追加 `person.lute` 链接。
- 更新 meta description，加入 PromptForge。

4. 上传本地副本覆盖远程 `index.html`。

5. 验证命令：

```bash
curl -fsSI https://lute-tlz-dddd.top/
curl -fsSL https://lute-tlz-dddd.top/ | rg 'person.lute|PromptForge|AI PM Knowledge Library'
curl -fsSI https://video.lute-tlz-dddd.top/
curl -fsSI https://voc.lute-tlz-dddd.top/
curl -fsSI https://mkt.lute-tlz-dddd.top/
curl -fsSI https://person.lute-tlz-dddd.top/
```

6. 视觉验证：

- 桌面端卡片样式与现有三张一致，第四张自然换行。
- 移动端无横向滚动。
- 新卡片点击跳转到 `https://person.lute-tlz-dddd.top/`。

7. 回滚策略：

如宿主页异常，立即用最近的 `index.html.bak.<timestamp>` 覆盖回远程 `index.html`。因为 nginx 挂载的是静态目录，回滚不需要重启容器。

## 风险控制

- 不编辑 nginx 配置，避免影响证书、反代和其他子域名。
- 不重启 `ai_video_nginx`，因为静态文件 bind mount 会被直接读取。
- 不碰 `promptforge_app`、`promptforge_mysql`、`voc_superset`、`mkt53` 等容器。
- 只改一个远程静态 HTML 文件，并保留同目录备份。

## 验收标准

- `https://lute-tlz-dddd.top/` 返回 `200`。
- 页面 HTML 包含 `https://person.lute-tlz-dddd.top/`。
- 新增卡片文案可见。
- `video`、`voc`、`mkt`、`person` 四个站点均保持可访问。
- 桌面和移动端没有横向滚动或明显布局破坏。
