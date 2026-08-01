---
title: X 全量书签深度分类、溯源与六模块增量报告
doc_type: analysis
module: content
topic: x-bookmarks-full-audit
status: draft
created: 2026-08-01
updated: 2026-08-01
owner: self
source: human+ai
---

# X 全量书签深度分类、溯源与六模块增量报告

## Executive Summary

本轮在用户已登录的本地 X 书签页完成全量滚动采集，共得到 **166 条唯一书签**。列表底部通过 10 次连续 Page Down 无新增、3 次 End 无新增，以及页尾 footer 可见三重证据确认。以 2026-07-02 至 2026-08-01 为“最近 1 个月”窗口：窗口内 124 条，窗口外 42 条。

逐条分流结果为 **采纳候选 64、待核 52、拒绝 50**。这里的“采纳候选”只代表值得继续核验；正式入库仍要求回到官方仓库或主来源、检查维护信号、license、与现有 912 条目录去重，并转写成可执行且有安全边界的资产。最终选择 12 条，每个模块 2 条，增量后总量为 **924**。

| 分类 | 全量书签数 | 采纳候选 | 待核 | 拒绝 | 本轮入库 |
| --- | ---: | ---: | ---: | ---: | ---: |
| prompt | 12 | 8 | 1 | 3 | 2 |
| skill | 36 | 15 | 11 | 10 | 2 |
| hook | 16 | 9 | 6 | 1 | 2 |
| mcp | 10 | 4 | 6 | 0 | 2 |
| agent | 31 | 10 | 13 | 8 | 2 |
| github | 61 | 18 | 15 | 28 | 2 |
| **合计** | **166** | **64** | **52** | **50** | **12** |

## Introduction

目标不是把书签机械搬进知识库，而是把 X 当作发现层：先完整盘点，再用官方来源纠偏，最后把高价值线索转成 PromptForge 可直接使用的 prompt、skill、hook、MCP 评估卡、agent 试点或 GitHub 项目评估卡。

本报告同时保留所有 166 条的分类结果。未入库不等于没有价值：`defer` 表示证据、授权、隐私、ToS、凭据或成熟度仍不充分；`reject` 表示重复、无正文、广告、盗版、绕过安全控制、医疗误导或明显不适合作为正式资产。

## Methodology

1. **全量采集**：在本地已认证 Chrome 中按时间线滚动，按状态 URL 去重；不修改、不删除书签。
2. **时间窗**：最近 1 个月定义为 2026-07-02—2026-08-01；更早内容保留在全量审计，但默认不占本轮名额。
3. **六类归属**：按最终可复用形态，而不是原帖自称分类。一个仓库可被转写为 hook 或 skill，但只落一个主类。
4. **风险门禁**：盗版、付费墙绕过、提示词泄露、反检测、安全绕过、未验证医疗建议直接拒绝；浏览器、OSINT、金融、声音克隆、抓取、桌面命令与社交 API 默认待核。
5. **官方溯源**：X 只用于发现。入库 12 条均回到官方 GitHub/研究页面，核对 stars、license、近期 push/release，并做标题、URL 与语义用途去重。
6. **评分**：综合时效 15、来源 25、可执行性 25、相关性 15、安全治理 10、非重复性 10；低于 75 或命中硬拒绝项不入库。

## Main Analysis

### 信息质量结构

- 166 条中，GitHub/工具线索占 61 条，是最大类别，但拒绝也最多（28 条）：高互动并不能替代 license、主来源和合规边界。
- 13 个语义重复簇说明 X thread 回复、复述和多作者转发会放大“看起来很多”的错觉；例如 video-shotcraft、SkillOpt、Toonflow、OCR 和 GEO 资料均需簇内择一。
- 6 条只有互动数字没有正文，无法恢复原始主张，全部拒绝。
- 明确拒绝风险包括盗版/规避访问控制 7 条、攻击或安全控制绕过 7 条、广告或低证据宣传 6 条，以及高风险医疗建议 1 条。
- `defer` 的主要原因不是质量差，而是需要额外授权或运行验证：抓取/平台 ToS、登录态/凭据、个人信息、版权内容、金融数据和高权限桌面工具。

### 重复簇

`#7/#81`、`#9/#38/#72`、`#26/#36`、`#30/#31`、`#39/#59`、`#19/#74`、`#29/#149`、`#62/#154/#164`、`#65/#66`、`#121/#137`、`#122/#123`、`#145/#146`、`#147/#148`。此外 #119 OpenWiki 与当前 catalog 精确重复，未再次入库。

### 正式入库的 12 条

| 模块 | 新条目 | 官方证据 | Stars 快照 | License | 质量分 |
| --- | --- | --- | ---: | --- | ---: |
| prompt | 产品系统拆解提示词 | product-teardown-skill [1] | 67 | 未声明；仅抽象方法 | 89 |
| prompt | 女性人像提示词导演 | female-portrait-director [2] | 1,242 | MIT | 90 |
| skill | SkillOpt 验证门控优化 | microsoft/SkillOpt [3][4] | 15,448 | MIT | 98 |
| skill | book-to-skill 渐进披露蒸馏 | book-to-skill [5] | 14,490 | MIT | 94 |
| hook | OpenSpec Plus 规格/TDD 门禁 | openspec-plus [6] | 139 | MIT | 88 |
| hook | BrowserAct 敏感动作确认 | browser-act/skills [7] | 5,053 | MIT | 91 |
| mcp | Desktop Commander 权限评估 | DesktopCommanderMCP [8] | 9,028 | MIT | 92 |
| mcp | Langflow Flow→MCP 发布验收 | langflow [9] | 152,698 | MIT | 96 |
| agent | DeepTutor 个性化学习试点 | DeepTutor [10] | 31,706 | Apache-2.0 | 96 |
| agent | Fractal 递归 Agent 安全试点 | fractal [11] | 652 | Apache-2.0 | 84 |
| github | MarkItDown 安全评估卡 | microsoft/markitdown [12] | 170,592 | MIT | 98 |
| github | CLI-Anything Harness 评估 | CLI-Anything [13] | 46,448 | Apache-2.0 | 95 |

Stars 为 2026-08-01 GitHub API 快照，只代表当时热度，不代表安全性或适用性。高 stars 候选中，mattpocock/skills 198,265 [14]、Firecrawl 158,844 [15]、agency-agents 137,941 [16] 也通过初筛，但本轮因六类平衡、用途重叠或抓取治理成本未占用名额。

## Claims-Evidence Table

| 关键结论 | 直接证据 | 证据等级 | 未证明事项 |
| --- | --- | --- | --- |
| 共采集 166 条唯一书签 | 页面 status URL 去重清单与页尾三重证据 | 本地直接观察 | 被删除或不可访问的历史书签不在当前页面证据中 |
| 12 条适合正式增量 | 逐条官方仓库、license、push/release、语义去重 [1]–[13] | 官方源 + 本地 catalog | 未执行每个项目的完整功能或安全测试 |
| 高 stars 不等于可直接采用 | 高星抓取、供应链和高权限项目仍需额外门禁 [14]–[16] | 官方仓库 + 风险推断 | Stars 与真实质量、安全之间不存在本报告可证明的因果关系 |
| 六模块均可增量 +2 | canonical catalog 与生成 manifest | 本地代码证据 | 生产环境仍是 912 条，未在本轮发布 |

## Counterevidence Register

| 乐观主张 | 反证或限制 | 本轮处理 |
| --- | --- | --- |
| “高星项目更可靠” | 热度不能证明 license、供应链、数据权限或运行安全 | Stars 只占质量评分的一部分 |
| “开源代码可自由处理任何输入” | 代码 license 不覆盖书籍、视频、肖像或平台内容权利 | 对输入内容单独记录授权与再分发边界 |
| “本地优先等于数据不外传” | 模型、OAuth broker、connector 与遥测仍可能出网 | 要求 egress、scope、撤权与审计验证 |
| “worktree 是沙箱” | worktree 隔离 Git 分支，不隔离文件系统、网络和凭据 | Fractal 条目强制 disposable sandbox |
| “文档转 Markdown 后即可可信使用” | 解析错误、资源耗尽和提示注入仍会进入下游 | MarkItDown 条目加入隔离、金标和 injection 测试 |

## Synthesis & Insights

1. **书签系统应该是候选队列，不是知识库**：X 保留发现价值，官方仓库承担事实与版本真相，catalog 承担可执行的稳定表达。
2. **高 stars 更适合作为成熟度信号，而非自动采纳规则**：本轮高星项目仍被补上最小权限、提示注入、内容授权、人工复核、回滚和 unknown 状态。
3. **最值得复用的不是“工具名称”，而是治理模式**：held-out validation、phase gate、sensitive-action approval、tool contract、tenant isolation 和 disposable sandbox 可跨项目迁移。
4. **内容去重需按用途而非标题**：同一仓库可能在 X 被转述多次；不同仓库也可能解决同一问题。正式入库以“新增能力”作为判断单位。
5. **全量分析和增量入库必须分离**：64 条采纳候选中只入库 12 条，避免一次更新把未经实测的高权限或版权敏感工具带入正式资产。

## Limitations & Caveats

- X 的可访问正文来自当前页面可见结构；被删除、折叠或只有媒体而无可访问文本的内容无法恢复。
- 只对最终 12 条及高星 shortlist 做了官方源深核；其余 `accept` 是候选级判断，不是已验证采用建议。
- Stars、push 和 release 会持续变化；报告使用 2026-08-01 快照。
- 未执行候选项目代码，不证明可安装、性能声明或安全宣传属实。
- 对未声明 license 的 Product Teardown 只抽象通用分析结构，不复制代码、HTML、品牌资产或原文模板。
- 书签中的版权、医疗、金融、OSINT、安全与身份类内容采取保守门禁，实际合法性仍取决于司法辖区、授权和使用场景。

## Recommendations

- 将 `defer` 中的 Browser/OSINT、抓取、金融、声音克隆和多平台发布候选拆成独立安全评测，不直接批量安装。
- 下一轮优先验证三类缺口：高星通用 skills 供应链、文档摄取提示注入、浏览器 session 的可撤销授权。
- 若继续自动处理书签，建议保存 `first_seen`、`source_url`、`official_url`、`decision`、`risk_tags`、`catalog_id`，用 status ID 做幂等去重。
- catalog 条目每月复核 stars/release 只更新证据字段，不因热度变化改写历史判断。

## Bibliography

[1] Yan Liu Design (2026). "Product Teardown Skill". GitHub. https://github.com/yanliudesign/product-teardown-skill

[2] Li Yue AIGC (2026). "Female Portrait Director". GitHub. https://github.com/liyue-aigc/female-portrait-director

[3] Microsoft (2026). "SkillOpt". GitHub. https://github.com/microsoft/SkillOpt

[4] Microsoft Research (2026). "SkillOpt: Agent Skills as Trainable Parameters". Microsoft Research. https://www.microsoft.com/en-us/research/blog/skillopt-agent-skills-as-trainable-parameters/

[5] Virgilio Junior (2026). "book-to-skill". GitHub. https://github.com/virgiliojr94/book-to-skill

[6] Sudokar (2026). "OpenSpec Plus". GitHub. https://github.com/sudokar/openspec-plus

[7] BrowserAct (2026). "BrowserAct Skills". GitHub. https://github.com/browser-act/skills

[8] Desktop Commander (2026). "Desktop Commander MCP". GitHub. https://github.com/wonderwhy-er/DesktopCommanderMCP

[9] Langflow (2026). "Langflow". GitHub. https://github.com/langflow-ai/langflow

[10] HKUDS (2026). "DeepTutor". GitHub. https://github.com/HKUDS/DeepTutor

[11] Plasma AI (2026). "Fractal". GitHub. https://github.com/plasma-ai/fractal

[12] Microsoft (2026). "MarkItDown". GitHub. https://github.com/microsoft/markitdown

[13] HKUDS (2026). "CLI-Anything". GitHub. https://github.com/HKUDS/CLI-Anything

[14] Matt Pocock (2026). "Skills". GitHub. https://github.com/mattpocock/skills

[15] Firecrawl (2026). "Firecrawl". GitHub. https://github.com/firecrawl/firecrawl

[16] Agency Agents (2026). "Agency Agents". GitHub. https://github.com/msitarzewski/agency-agents

## Methodology Appendix: 166 条逐条分类

字段含义：`采纳候选` = 值得继续官方核验；`待核` = 需补证据、授权或隔离试验；`拒绝` = 不进入正式候选池。标签是主风险或价值标签，详细判定遵循前述门禁。

| # | 分类 | 决策 | 标签 | X 原帖 |
| ---: | --- | --- | --- | --- |
| 1 | github | 拒绝 | incomplete | [原帖](https://x.com/nanyuan0412/status/2082976360231014731) |
| 2 | agent | 采纳候选 | finance,high-stars | [原帖](https://x.com/eastweb3eth/status/2083367213675999632) |
| 3 | skill | 采纳候选 | video,automation | [原帖](https://x.com/s1dashu/status/2083194631546871925) |
| 4 | skill | 待核 | copyright,injection | [原帖](https://x.com/XAMTO_AI/status/2082539152101331094) |
| 5 | github | 采纳候选 | marketing,founder | [原帖](https://x.com/AdrianPunk115/status/2082628240150020307) |
| 6 | hook | 待核 | monitoring,promo | [原帖](https://x.com/Pluvio9yte/status/2082482018362032549) |
| 7 | skill | 拒绝 | duplicate,portrait | [原帖](https://x.com/liyue_ai/status/2082489124758720992) |
| 8 | skill | 待核 | creative,source | [原帖](https://x.com/Sirilee2026/status/2082354036318326855) |
| 9 | skill | 拒绝 | duplicate | [原帖](https://x.com/nini_incrypto_/status/2081565726935032099) |
| 10 | github | 采纳候选 | saas,stack | [原帖](https://x.com/Ryrenz/status/2080895912591655041) |
| 11 | prompt | 采纳候选 | design,low-risk | [原帖](https://x.com/xiaoxiaodong01/status/2080990831788605681) |
| 12 | mcp | 待核 | supply-chain,credentials | [原帖](https://x.com/jglcn1991/status/2081207886605422636) |
| 13 | github | 拒绝 | advertising | [原帖](https://x.com/XChatScout/status/2081017369108037985) |
| 14 | github | 拒绝 | copyright,circumvention | [原帖](https://x.com/grgerwcwetwet/status/2080983940186489055) |
| 15 | agent | 待核 | roundup,evidence | [原帖](https://x.com/DaoyiL49442/status/2080941992587235699) |
| 16 | mcp | 待核 | browser,authz | [原帖](https://x.com/GitHub_Daily/status/2080956301895754095) |
| 17 | agent | 拒绝 | safety-bypass | [原帖](https://x.com/pritipatelfgoo/status/2080852540909101385) |
| 18 | skill | 待核 | finance | [原帖](https://x.com/rollingSirius/status/2080940354677989842) |
| 19 | github | 待核 | duplicate,geo | [原帖](https://x.com/yaojingang/status/2081038973217145233) |
| 20 | hook | 拒绝 | advertising,evidence | [原帖](https://x.com/cevenif/status/2080944393989857383) |
| 21 | agent | 采纳候选 | knowledge,privacy | [原帖](https://x.com/xiaoying_eth/status/2080822855034667448) |
| 22 | hook | 待核 | web3,finance | [原帖](https://x.com/maomao_acrypto/status/2081102885769588845) |
| 23 | mcp | 采纳候选 | knowledge,high-stars | [原帖](https://x.com/GYLQ520/status/2081170196618985652) |
| 24 | github | 采纳候选 | ocr,local-first | [原帖](https://x.com/fly_in_X/status/2080910348287369351) |
| 25 | github | 待核 | crawler,tos,privacy | [原帖](https://x.com/maomao_acrypto/status/2080926887363170743) |
| 26 | skill | 拒绝 | duplicate | [原帖](https://x.com/beefnoode/status/2080952940815347875) |
| 27 | skill | 采纳候选 | product-management | [原帖](https://x.com/yanliudreamer/status/2080849249189929176) |
| 28 | github | 采纳候选 | threejs,generative | [原帖](https://x.com/XAMTO_AI/status/2080764961572434279) |
| 29 | github | 拒绝 | clickbait,low-signal | [原帖](https://x.com/SgLittlesmart/status/2080827378117628009) |
| 30 | agent | 拒绝 | duplicate,fragment | [原帖](https://x.com/weichen_ink/status/2080806103408128156) |
| 31 | agent | 待核 | video,copyright,provider | [原帖](https://x.com/weichen_ink/status/2080806100539265441) |
| 32 | github | 拒绝 | suspicious-service | [原帖](https://x.com/white88com/status/2080565385548779741) |
| 33 | agent | 采纳候选 | education,high-stars | [原帖](https://x.com/IndieDevHailey/status/2080918734747918836) |
| 34 | skill | 采纳候选 | wechat,design | [原帖](https://x.com/zjp1997720/status/2080900173291802647) |
| 35 | agent | 待核 | voice,biometric | [原帖](https://x.com/GYLQ520/status/2080731305218883941) |
| 36 | skill | 采纳候选 | github-readme,primary-source | [原帖](https://x.com/I_am_oil_oil/status/2080644025426530472) |
| 37 | hook | 待核 | repost,copyright,tos | [原帖](https://x.com/daweifs/status/2080622851862704518) |
| 38 | skill | 拒绝 | duplicate | [原帖](https://x.com/seekjourney/status/2080624069742043176) |
| 39 | agent | 拒绝 | duplicate | [原帖](https://x.com/NFTCPS/status/2080509633589112881) |
| 40 | hook | 采纳候选 | productivity,integrations | [原帖](https://x.com/geekbb/status/2080456680148447727) |
| 41 | skill | 待核 | roundup | [原帖](https://x.com/laobaishare/status/2080494332528976233) |
| 42 | skill | 采纳候选 | sdd,tdd | [原帖](https://x.com/AISuperDomain/status/2080450323861393567) |
| 43 | skill | 待核 | download,copyright | [原帖](https://x.com/cnyzgkc/status/2080313967860441423) |
| 44 | skill | 采纳候选 | agent-loop,evidence | [原帖](https://x.com/yibie/status/2080443399057097126) |
| 45 | mcp | 采纳候选 | web-research | [原帖](https://x.com/BTCqzy1/status/2080527704924082486) |
| 46 | github | 采纳候选 | web-to-app | [原帖](https://x.com/Huahuazo/status/2080557343646110022) |
| 47 | agent | 采纳候选 | rag,high-stars | [原帖](https://x.com/Ryrenz/status/2080473120587080180) |
| 48 | agent | 采纳候选 | education,architecture | [原帖](https://x.com/GitHub_Daily/status/2080503264391598154) |
| 49 | github | 拒绝 | piracy | [原帖](https://x.com/white88com/status/2080259403689975959) |
| 50 | skill | 待核 | persona,privacy,copyright | [原帖](https://x.com/Jack_FluxAI/status/2079776688041279697) |
| 51 | skill | 待核 | roundup,video | [原帖](https://x.com/BTCqzy1/status/2079864598866415927) |
| 52 | agent | 采纳候选 | multi-agent,runaway | [原帖](https://x.com/geekbb/status/2080252819400233243) |
| 53 | github | 采纳候选 | ui,vocabulary | [原帖](https://x.com/stometaverse/status/2079921679476957480) |
| 54 | skill | 拒绝 | medical,critical | [原帖](https://x.com/fhwofjow51260/status/2079907234902155686) |
| 55 | github | 待核 | marketplace,promo | [原帖](https://x.com/yhslgg/status/2079908118067310896) |
| 56 | github | 待核 | osint,privacy | [原帖](https://x.com/cevenif/status/2080102597076086929) |
| 57 | skill | 采纳候选 | slides,codex | [原帖](https://x.com/tuturetom/status/2079908323952832761) |
| 58 | github | 采纳候选 | api,culture | [原帖](https://x.com/xiaoying_eth/status/2080206537004589383) |
| 59 | agent | 待核 | video,promo,cost | [原帖](https://x.com/NFTCPS/status/2080178569179988363) |
| 60 | agent | 待核 | knowledge-graph,source | [原帖](https://x.com/0xCodez/status/2080250266851463209) |
| 61 | mcp | 采纳候选 | cli,high-permission | [原帖](https://x.com/Huahuazo/status/2079902025790414993) |
| 62 | skill | 采纳候选 | official,research | [原帖](https://x.com/opensourcelab9/status/2080057809950150778) |
| 63 | agent | 待核 | roundup,stars | [原帖](https://x.com/so_ainsight/status/2080144636170117582) |
| 64 | github | 采纳候选 | codex,guide | [原帖](https://x.com/knowledgefxg/status/2080262589804839241) |
| 65 | github | 拒绝 | duplicate,fragment | [原帖](https://x.com/ecommartinez/status/2079979488117751877) |
| 66 | github | 待核 | scraping,tos | [原帖](https://x.com/ecommartinez/status/2079979317086556524) |
| 67 | hook | 采纳候选 | research,cost-control | [原帖](https://x.com/Xudong07452910/status/2079879124777099361) |
| 68 | github | 待核 | destructive,cleanup | [原帖](https://x.com/GitHub_Daily/status/2080193731769389078) |
| 69 | github | 拒绝 | paywall-bypass | [原帖](https://x.com/Huahuazo/status/2080162240318365800) |
| 70 | github | 拒绝 | piracy | [原帖](https://x.com/baifanweb/status/2079927653126328410) |
| 71 | hook | 待核 | publishing,tos | [原帖](https://x.com/wanerfu/status/2080146898384744468) |
| 72 | skill | 采纳候选 | video,high-engagement | [原帖](https://x.com/QingQ77/status/2079947072191820084) |
| 73 | skill | 待核 | distillation,copyright,injection | [原帖](https://x.com/aigclink/status/2079565741167378835) |
| 74 | github | 采纳候选 | geo,paper | [原帖](https://x.com/yaojingang/status/2079376226997923961) |
| 75 | github | 拒绝 | piracy | [原帖](https://x.com/NFTCPS/status/2052250456366465042) |
| 76 | github | 待核 | generic | [原帖](https://x.com/xiaogaifun/status/2077738772528259181) |
| 77 | github | 待核 | telegram,privacy | [原帖](https://x.com/Suu766/status/2078109224790532546) |
| 78 | agent | 拒绝 | incomplete | [原帖](https://x.com/yhslgg/status/2068317116831510838) |
| 79 | github | 待核 | osint,privacy | [原帖](https://x.com/yhslgg/status/2067563682096374200) |
| 80 | github | 拒绝 | privacy,abuse | [原帖](https://x.com/yhslgg/status/2068219780943753401) |
| 81 | skill | 待核 | duplicate,portrait | [原帖](https://x.com/fhwofjow51260/status/2078098576895611088) |
| 82 | github | 采纳候选 | crawler,high-stars | [原帖](https://x.com/IndieDevHailey/status/2030841369007415670) |
| 83 | hook | 采纳候选 | research,automation | [原帖](https://x.com/XAMTO_AI/status/2077304912438870046) |
| 84 | github | 待核 | youtube,copyright,privacy | [原帖](https://x.com/pengchujin/status/2043982221762277678) |
| 85 | github | 待核 | security,dual-use | [原帖](https://x.com/GitHub_Daily/status/2076932237925458132) |
| 86 | github | 采纳候选 | obsidian,knowledge | [原帖](https://x.com/geekbb/status/2067955305414377476) |
| 87 | hook | 采纳候选 | geo,automation | [原帖](https://x.com/yaojingang/status/2078036628019585130) |
| 88 | github | 拒绝 | promo,incomplete | [原帖](https://x.com/rwayne/status/2078492912577638888) |
| 89 | github | 采纳候选 | knowledge,finance | [原帖](https://x.com/yibie/status/2040561560993890430) |
| 90 | github | 拒绝 | piracy | [原帖](https://x.com/Huahuazo/status/2077506742309782001) |
| 91 | github | 拒绝 | incomplete | [原帖](https://x.com/LonglinX/status/2078318406424793326) |
| 92 | github | 拒绝 | irrelevant | [原帖](https://x.com/MaxForAI/status/2078727187168190692) |
| 93 | mcp | 待核 | aggregator,credentials,tos | [原帖](https://x.com/rionaifantasy/status/2078058926554136746) |
| 94 | github | 待核 | downloader,copyright | [原帖](https://x.com/iluciddreaming/status/2078690813635449080) |
| 95 | hook | 采纳候选 | research,eval-loop | [原帖](https://x.com/omarsar0/status/2077792894459793714) |
| 96 | prompt | 待核 | instruction,context-mix | [原帖](https://x.com/Astronaut_1216/status/2077583572018282675) |
| 97 | prompt | 拒绝 | critical,authz | [原帖](https://x.com/xcarry16/status/2077739460801003596) |
| 98 | agent | 待核 | model,provenance,security | [原帖](https://x.com/WolfTrainer_101/status/2077576703312859347) |
| 99 | github | 拒绝 | incomplete | [原帖](https://x.com/Zesee/status/2077723280534851786) |
| 100 | skill | 采纳候选 | research,self-improvement | [原帖](https://x.com/rickawsb/status/2077660335104782564) |
| 101 | skill | 采纳候选 | compliance | [原帖](https://x.com/gkxspace/status/2077400123852595394) |
| 102 | agent | 拒绝 | pseudoscience | [原帖](https://x.com/wdy188/status/2075095535237906563) |
| 103 | prompt | 采纳候选 | review,separation-of-duties | [原帖](https://x.com/Xudong07452910/status/2077687181372748208) |
| 104 | hook | 采纳候选 | multi-agent,production-claim | [原帖](https://x.com/Ryrenz/status/2075538775036375417) |
| 105 | hook | 采纳候选 | cost,agent-loop | [原帖](https://x.com/Xudong07452910/status/2075422760852135997) |
| 106 | mcp | 待核 | critical,desktop,authz | [原帖](https://x.com/yunxi0623/status/2075551241749561582) |
| 107 | skill | 拒绝 | offensive-security | [原帖](https://x.com/cevenif/status/2075128572461682830) |
| 108 | skill | 采纳候选 | engineering,primary-source | [原帖](https://x.com/XAMTO_AI/status/2075530973802840368) |
| 109 | prompt | 采纳候选 | github,prior-art | [原帖](https://x.com/laowangbabababa/status/2075778112181428414) |
| 110 | agent | 采纳候选 | expert-source,harness | [原帖](https://x.com/PandaTalk8/status/2075597861430145196) |
| 111 | mcp | 采纳候选 | workflow,high-stars | [原帖](https://x.com/Ryrenz/status/2075459754302808123) |
| 112 | prompt | 采纳候选 | codex,routing | [原帖](https://x.com/KyrieCheungYep/status/2075601435467931851) |
| 113 | github | 拒绝 | promo,grey-market | [原帖](https://x.com/NFTCPS/status/2075409348336234618) |
| 114 | skill | 拒绝 | leak,proprietary | [原帖](https://x.com/jinchenma_ai/status/2074416525742875104) |
| 115 | github | 拒绝 | anti-detection,abuse | [原帖](https://x.com/SusChan0x/status/2074759958021939597) |
| 116 | github | 拒绝 | incomplete | [原帖](https://x.com/yunxi0623/status/2074818514612035683) |
| 117 | skill | 待核 | browser,credentials | [原帖](https://x.com/Vincent_AINotes/status/2074769374154719370) |
| 118 | agent | 待核 | voice-clone,biometric | [原帖](https://x.com/NFTCPS/status/2074813244360028259) |
| 119 | skill | 拒绝 | catalog-duplicate | [原帖](https://x.com/Xudong07452910/status/2074666024205693390) |
| 120 | github | 采纳候选 | document,high-stars | [原帖](https://x.com/mdancho84/status/2074819073620275264) |
| 121 | agent | 待核 | finance,roundup | [原帖](https://x.com/cevenif/status/2074786317028749797) |
| 122 | github | 采纳候选 | ocr,rust | [原帖](https://x.com/li9292/status/2074429132159484313) |
| 123 | github | 拒绝 | duplicate,fragment | [原帖](https://x.com/li9292/status/2074429236103053489) |
| 124 | github | 拒绝 | irrelevant,fragment | [原帖](https://x.com/li9292/status/2074693358996668745) |
| 125 | prompt | 采纳候选 | engineering,fail-fast | [原帖](https://x.com/s1dashu/status/2074496025369481318) |
| 126 | prompt | 拒绝 | misinformation,unsafe-config | [原帖](https://x.com/Vincent_AINotes/status/2074725845529497902) |
| 127 | github | 待核 | film,copyright | [原帖](https://x.com/xpg0970/status/2074264672887595432) |
| 128 | prompt | 采纳候选 | coding,quality | [原帖](https://x.com/0xQiYan/status/2074364160947966026) |
| 129 | skill | 拒绝 | reverse-engineered,proprietary | [原帖](https://x.com/Xudong07452910/status/2074096018342166930) |
| 130 | github | 采纳候选 | vector-db,high-stars | [原帖](https://x.com/CycleDecoded/status/2074381815671062693) |
| 131 | agent | 待核 | roundup | [原帖](https://x.com/so_ainsight/status/2073967686875517141) |
| 132 | github | 拒绝 | plagiarism,spam | [原帖](https://x.com/wadezone/status/2070797608206135537) |
| 133 | mcp | 待核 | social-api,tos,pii | [原帖](https://x.com/gkxspace/status/2073347102424355027) |
| 134 | github | 拒绝 | irrelevant,accusation | [原帖](https://x.com/grok/status/2060806324804268093) |
| 135 | agent | 待核 | finance,data-license | [原帖](https://x.com/_zheergen/status/2069657364203225245) |
| 136 | mcp | 待核 | commerce,write,authz,outside30d | [原帖](https://x.com/AYi_AInotes/status/2042970104921542896) |
| 137 | agent | 拒绝 | duplicate | [原帖](https://x.com/XAMTO_AI/status/2067886351396327858) |
| 138 | github | 待核 | roundup,business | [原帖](https://x.com/Smartpigai/status/2066368348804497654) |
| 139 | github | 待核 | downloader,copyright | [原帖](https://x.com/iluciddreaming/status/2069408885656760524) |
| 140 | github | 采纳候选 | codex,reference,outside30d | [原帖](https://x.com/DivyanshT91162/status/2068160328438034769) |
| 141 | hook | 采纳候选 | research,proactive-agent,outside30d | [原帖](https://x.com/Xudong07452910/status/2068166964674019456) |
| 142 | prompt | 采纳候选 | review,shift-left,outside30d | [原帖](https://x.com/AYi_AInotes/status/2068160125328617743) |
| 143 | github | 拒绝 | rumor,outside30d | [原帖](https://x.com/iluciddreaming/status/2066083287333048830) |
| 144 | github | 采纳候选 | education,outside30d | [原帖](https://x.com/cheery9998/status/2062165009686278262) |
| 145 | agent | 拒绝 | duplicate,fragment,outside30d | [原帖](https://x.com/alexxubyte/status/2062186590202687637) |
| 146 | agent | 采纳候选 | data-agent,architecture,outside30d | [原帖](https://x.com/alexxubyte/status/2062186586431987780) |
| 147 | prompt | 采纳候选 | goal,planning,outside30d | [原帖](https://x.com/vista8/status/2062189983096557995) |
| 148 | prompt | 拒绝 | duplicate,fragment,outside30d | [原帖](https://x.com/vista8/status/2062190082350612867) |
| 149 | github | 拒绝 | duplicate,clickbait,outside30d | [原帖](https://x.com/RelaxView/status/2061809383193932099) |
| 150 | github | 采纳候选 | codex,tutorial,outside30d | [原帖](https://x.com/Huanusa/status/2061818094029336764) |
| 151 | hook | 待核 | voc,privacy,outside30d | [原帖](https://x.com/iluciddreaming/status/2060997879842631780) |
| 152 | github | 拒绝 | incomplete,outside30d | [原帖](https://x.com/iluciddreaming/status/2060963515989401993) |
| 153 | hook | 采纳候选 | digest,dedup,outside30d | [原帖](https://x.com/iluciddreaming/status/2061093088966090970) |
| 154 | hook | 待核 | roundup,duplicate,outside30d | [原帖](https://x.com/dair_ai/status/2061104504821412281) |
| 155 | skill | 采纳候选 | context,workflow,outside30d | [原帖](https://x.com/grgerwcwetwet/status/2061054868153119208) |
| 156 | agent | 待核 | anecdote,outside30d | [原帖](https://x.com/turingou/status/2060787462830796879) |
| 157 | agent | 拒绝 | rumor,subjective,outside30d | [原帖](https://x.com/MaxForAI/status/2060803032124895338) |
| 158 | skill | 采纳候选 | harness,book,outside30d | [原帖](https://x.com/Xudong07452910/status/2060896543524229323) |
| 159 | github | 拒绝 | misleading,outside30d | [原帖](https://x.com/RelaxView/status/2059491535499207037) |
| 160 | agent | 待核 | case-study,outside30d | [原帖](https://x.com/MindOS_Lisa/status/2059651727260041691) |
| 161 | agent | 采纳候选 | research,architecture,outside30d | [原帖](https://x.com/dair_ai/status/2057159497282707875) |
| 162 | agent | 拒绝 | speculative-reply,outside30d | [原帖](https://x.com/dan_hawkley/status/2057443251377094715) |
| 163 | agent | 采纳候选 | research,memory,outside30d | [原帖](https://x.com/dair_ai/status/2057182105671750047) |
| 164 | skill | 拒绝 | duplicate,outside30d | [原帖](https://x.com/omarsar0/status/2058936160291004483) |
| 165 | skill | 待核 | unreleased,copyright,outside30d | [原帖](https://x.com/omarsar0/status/2059281679961768442) |
| 166 | skill | 采纳候选 | video,storytelling,outside30d | [原帖](https://x.com/joshesye/status/2053639131134308413) |
