import { getDb } from "../api/queries/connection";
import { skills } from "../db/schema";

async function importClaudeCodeSkills() {
  const db = getDb();
  console.log("Importing Claude Code skills...");
  let count = 0;

  await db.insert(skills).values({
    title: "Claude Code 基础斜杠命令大全",
    titleEn: "Claude Code Basic Slash Commands",
    role: "claude",
    tags: ["Claude Code", "斜杠命令", "入门", "速查"],
    tagsEn: ["Claude Code", "Slash Commands", "Beginner", "Cheatsheet"],
    content: `# Claude Code 基础斜杠命令大全

掌握这 18 个核心命令，覆盖 80% 以上的日常开发场景。

## 会话管理（必用）

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| /help | 获取帮助，显示所有可用命令 | 忘记命令时随时查看 |
| /clear | 清空当前对话历史 | 对话内容过多、开始新任务时 |
| /compact | 压缩对话内容，节省 Token | Token 不够时，保留核心要点 |
| /resume | 恢复上一次中断的对话 | 不小心退出后快速恢复 |
| /reset | 回退到上一个 ANCHOR 代码节点 | AI 生成错误时回退 |
| /cost | 显示当前会话 Token 消耗与费用 | 控制成本，避免超支 |
| /stats | 显示每日使用情况、会话历史 | 查看使用统计 |
| /usage | 显示订阅计划限额和速率限制 | 查看 API 配额 |

## 项目管理

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| /init | 初始化项目，生成 CLAUDE.md | 新项目首次使用 |
| /memory | 编辑持久记忆文件 CLAUDE.md | 更新项目规范 |
| /config | 打开配置界面 | 调整工具权限和设置 |
| /add-dir | 添加额外的工作目录 | Monorepo 多包管理 |

## 代码审查

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| /review | 代码审查 | 完成代码后请求审查 |
| /security-review | 安全审查 | 检查安全漏洞 |
| /pr-comments | 查看 PR 注释 | 查看 GitHub PR 反馈 |
| /diff | 查看代码修改对比 | 确认 AI 修改的内容 |

## 模型与工具

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| /model | 选择或切换 AI 模型 | Sonnet/Opus/Haiku 切换 |
| /mcp | MCP 服务器管理 | 连接外部系统 |
| /skills | 查看可用技能 | 查看已安装的 Skills |
| /tools | 查看可用工具 | 查看 Read/Edit/Bash/Grep |
| /plugin | 插件管理 | 管理 Claude Code 插件 |
| /version | 查看 Claude Code 版本 | 确认当前版本 |
| /doctor | 环境检测诊断 | 排查连接问题 |

## 学习路径建议

**第一周**：掌握 /clear、/compact、claude --continue
**第二周**：学会 /init 建立项目知识库和 /review 代码审查
**第三周**：熟练使用 /model 切换模型和 Shift+Tab 切换工作模式
**持续进阶**：按需学习 MCP、Skills 和 Agents 等高级功能`,
    description: "Claude Code 18个核心斜杠命令速查，覆盖会话管理、项目管理、代码审查、模型切换四大类，掌握30%命令即可覆盖80%日常场景",
    descriptionEn: "18 core slash commands for Claude Code covering session management, project management, code review, and model switching",
    scenario: "日常开发中快速调用Claude Code功能，提升交互效率",
    scenarioEn: "Quickly invoke Claude Code functions during daily development to improve interaction efficiency",
    problemFocus: "Claude Code命令繁多，新手不知从何学起，需要一份分层优先级的命令速查",
    problemFocusEn: "Claude Code has many commands; beginners don't know where to start and need a prioritized command reference",
    author: "知乎 · 苏三说技术",
    likes: 89, views: "12.5K", comments: 23,
  });
  count++;

  await db.insert(skills).values({
    title: "Claude Code 10个隐藏高级命令",
    titleEn: "Claude Code 10 Hidden Advanced Commands",
    role: "claude",
    tags: ["Claude Code", "隐藏命令", "高级技巧", "效率工具"],
    tagsEn: ["Claude Code", "Hidden Commands", "Advanced", "Productivity"],
    content: `# Claude Code 10个隐藏高级命令

这些命令没有在官方文档中重点介绍，但能让效率翻倍。

## 1. /btw — 插话不污染上下文 ⭐⭐⭐⭐⭐

**核心作用**：Claude 执行任务时，可插入临时问题，不打断主流程，且临时对话不计入历史上下文
**使用场景**：重构代码、数据抓取等长任务中，临时查询目录位置、流程细节
**操作方式**：输入 /btw + 空格 + 问题，回答后按空格/回车关闭临时对话
**优势**：复用当前提示缓存，几乎不消耗 Token

## 2. /rewind — AI开发后悔药 ⭐⭐⭐⭐⭐

**核心作用**：支持单独回退代码、单独回退对话，或两者同时回退，还可总结回退内容
**触发方式**：输入 /rewind 或连按两次 Esc
**适用场景**：测试新方案无效后回退代码保留对话，避免重复解释需求
**特点**：不影响手动编辑或通过 Bash 修改的文件，试错成本极低
**四种模式**：
- 回退代码（保留对话）
- 回退对话（保留代码）
- 两者同时回退
- 总结回退内容

## 3. /insights — 使用习惯分析报告 ⭐⭐⭐⭐

**核心作用**：生成一份 HTML 报告，分析你过去一个月使用 Claude Code 的习惯
**适用场景**：月度复盘，发现低效操作，反向优化工作流
**价值**：替代传统 /review，能识别冗余导入、重复逻辑等细微问题

## 4. /model opusplan — Pro 用户性价比拨档 ⭐⭐⭐⭐⭐

**核心作用**：Claude 在需要复杂推理时自动以 plan 模式调用 Claude Opus 4.6，执行阶段切换回 Sonnet 4.6
**适用场景**：复杂任务规划与执行，节省 Opus 额度
**优势**：在效果与成本之间动态平衡

## 5. /simplify — 三合一代码审查 ⭐⭐⭐⭐

**核心作用**：把代码评审折叠成一个快捷命令，启动三个并行 Agent 分别审查代码复用、代码质量和运行效率
**适用场景**：功能更新后的质量检查，精简复杂实现
**价值**：相当于三位虚拟同事同时 Review

## 6. /branch — 平行宇宙分叉探索 ⭐⭐⭐

**核心作用**：将当前对话复制为一个新会话，原线程不受影响
**适用场景**：同一需求尝试两种技术方案，无需担心互相干扰
**区别于 /rewind**：/rewind 是"回退过去"，/branch 是"开辟新路径"

## 7. /loop — 定时循环执行任务 ⭐⭐⭐

**核心作用**：按指定间隔重复执行任务，最长持续 3 天，自动过期后自我删除
**语法**：/loop + 时间间隔 + 任务指令（如 /loop 5m 检查部署状态）
**适用场景**：监控部署状态、定时备份、周期性任务
**优势**：结果实时同步至对话上下文，Claude 可基于结果自动判断后续操作

## 8. /rc (/remote-control) — 手机远程操控 ⭐⭐⭐⭐

**核心作用**：生成专属 URL，手机打开即可同步终端会话，支持双向操作
**适用场景**：外出时临时调整代码、查看任务进度，无需携带电脑
**特点**：代码仍在本地电脑运行，手机仅作为"遥控器"，兼顾便捷与数据安全
**注意**：Team/Enterprise 可能需管理员开启

## 9. /export — 对话一键导出 ⭐⭐⭐

**核心作用**：将当前整段对话（含讨论过程、代码片段、决策逻辑）导出为 Markdown 文件
**适用场景**：保存架构方案、bug 排查思路，跨工具协作（如与 Codex 联用）

## 10. /fast — 低延迟模式 ⭐⭐⭐

**核心作用**：更偏速度/价格切换，适合不需要复杂推理的快速任务
**适用场景**：简单查询、快速确认类任务

---

## 使用建议

- 长会话必用 /btw：避免临时提问导致任务跑偏
- 部署前跑 /simplify：减少冗余代码与潜在 bug
- 每月一次 /insights：系统性优化工作流
- Pro 用户优先启用 /model opusplan：最大化利用订阅额度`,
    description: "10个未在官方文档重点介绍的隐藏命令：/btw插话不污染上下文、/rewind后悔药、/insights使用报告、/model opusplan智能模型切换、/simplify三合一代码审查、/branch会话分叉、/loop定时任务、/rc手机遥控、/export导出对话、/fast低延迟模式",
    descriptionEn: "10 hidden commands not prominently documented: /btw, /rewind, /insights, /model opusplan, /simplify, /branch, /loop, /rc, /export, /fast",
    scenario: "提升Claude Code日常使用效率，解锁高级交互能力",
    scenarioEn: "Improve daily Claude Code efficiency and unlock advanced interaction capabilities",
    problemFocus: "很多用户只使用最基础的对话功能，不知道Claude Code内置了大量提升效率的隐藏命令",
    problemFocusEn: "Many users only use basic chat features, unaware of built-in hidden commands that boost efficiency",
    author: "知乎 · 大模型爱好者社区",
    likes: 156, views: "28.3K", comments: 45,
  });
  count++;

  console.log(`Imported ${count} Claude Code skills so far...`);

  await db.insert(skills).values({
    title: "Claude Code 快捷键完全指南",
    titleEn: "Claude Code Keyboard Shortcuts Complete Guide",
    role: "claude",
    tags: ["Claude Code", "快捷键", "效率", "操作技巧"],
    tagsEn: ["Claude Code", "Shortcuts", "Efficiency", "Tips"],
    content: `# Claude Code 快捷键完全指南

掌握这些快捷键，让你的操作行云流水。

## 全局快捷键（任何场景都有效）

| 快捷键 | 功能 | 说明 |
|--------|------|------|
| Ctrl+C | 取消/打断当前 AI 执行 | 跑偏了赶紧刹车，保留快捷键无法重新绑定 |
| Ctrl+D | 退出 Claude Code | 安全退出应用 |
| Ctrl+T | 切换任务列表 | 查看/隐藏后台任务 |
| Ctrl+O | 切换详细输出模式 | 显示/隐藏内部思考过程、工具调用细节 |
| Ctrl+L | 清屏 | 保留对话历史，仅清空屏幕显示 |

## 聊天输入区快捷键

| 快捷键 | 功能 | 说明 |
|--------|------|------|
| Enter | 提交消息 | 发送当前输入 |
| Shift+Enter | 换行不提交 | 跨平台通用，多行输入必备 |
| Ctrl+J | 换行 | Mac 也可用 Option+Enter |
| Escape | 取消输入 | 清空当前输入框 |
| Ctrl+G | 外部编辑器 | 在默认编辑器中打开当前输入，适合长文本 |
| Ctrl+S | 暂存提示 | 保存当前输入以便稍后继续 |
| Ctrl+U | 删除整行 | 修正错误指令更高效 |
| Ctrl+R | 反向搜索历史 | 交互式搜索之前问过的问题 |
| Ctrl+V | 粘贴截图 | Mac 也是 Ctrl+V（不是 Cmd+V），debug 时直接贴报错界面 |
| Ctrl+_ (Ctrl+Shift+-) | 撤销操作 | 撤销上一次操作 |

## 模式切换快捷键

| 快捷键 | 功能 | 说明 |
|--------|------|------|
| Shift+Tab | 切换权限模式 | 在 Auto-Accept、Plan 和普通模式之间循环 |
| Tab | 循环切换权限模式 | 等同于 Shift+Tab |
| Alt+P / Option+P | 切换模型 | 不清空输入框快速切换模型 |
| Alt+T / Option+T | 扩展思考模式 | 开启/关闭深度推理模式 |
| Ctrl+B | 后台运行任务 | 对于 build 工具、开发服务器等长时间运行命令很有用 |
| Ctrl+S (两次) | 终止后台代理 | 终止正在后台运行的任务 |

## 救命快捷键

| 快捷键 | 功能 | 使用场景 |
|--------|------|----------|
| Esc + Esc | 回退代码/对话 | 改坏了一键回退，比 Git 操作快多了 |
| Ctrl+C | 打断生成 | AI 跑偏时立即刹车 |
| Shift+Tab | 切换权限 | 临时需要 AI 自动执行时切换信任模式 |

## Mac 终端 Option 键配置

Mac 用户需要配置 Option 键为 Meta 键才能使用 Alt 快捷键：

| 终端 | 配置方式 |
|------|----------|
| iTerm2 | Settings → Profiles → Keys → Left/Right Option key → 选 "Esc+" |
| Terminal.app | Settings → Profiles → Keyboard → 勾选 "Use Option as Meta key" |
| VS Code Terminal | 设置 `"terminal.integrated.macOptionIsMeta": true` |
| Ghostty | 配置文件 `~/.config/ghostty/config` 添加 `macos-option-as-alt = true` |

> 配置后 Option 键在终端内会变成 Alt/Meta 键。Ghostty 可用 `macos-option-as-alt = left` 只改左边 Option 键。

## 快捷前缀

| 前缀 | 功能 | 示例 |
|------|------|------|
| ! | 直接进入 Bash 模式 | `!npm test` 不需要 Claude 确认 |
| @ | 触发文件路径自动补全 | `@src/components/Button.tsx` |

## 实战建议

1. **肌肉记忆三件套**：Shift+Enter 换行 + Ctrl+V 贴图 + Esc+Esc 回退
2. **调试必开**：Ctrl+O 看详细输出，了解 AI 的思考过程
3. **历史复用**：Ctrl+R 搜索历史 prompt，避免重复输入
4. **后台任务**：Ctrl+B 把 build、dev server 放到后台，不阻塞交互`,
    description: "Claude Code完整快捷键手册：全局快捷键、输入区快捷键、模式切换、Mac Option键配置、快捷前缀四大类，掌握12个核心快捷键即可大幅提升操作流畅度",
    descriptionEn: "Complete keyboard shortcuts guide for Claude Code: global shortcuts, input shortcuts, mode switching, Mac configuration, and quick prefixes",
    scenario: "日常开发中提升Claude Code操作效率，减少重复按键和菜单查找",
    scenarioEn: "Improve daily Claude Code operation efficiency and reduce repetitive keystrokes",
    problemFocus: "很多用户纯打字聊天，不知道Claude Code设计了丰富的快捷键系统",
    problemFocusEn: "Many users only type text unaware of the rich keyboard shortcut system",
    author: "腾讯云 · 火山引擎",
    likes: 134, views: "21.7K", comments: 31,
  });
  count++;

  await db.insert(skills).values({
    title: "Claude Code 上下文管理艺术",
    titleEn: "Claude Code Context Management Art",
    role: "claude",
    tags: ["Claude Code", "上下文管理", "Token优化", "会话管理"],
    tagsEn: ["Claude Code", "Context Management", "Token Optimization", "Session"],
    content: `# Claude Code 上下文管理艺术

上下文是稀缺资源，清晰度是最高杠杆。掌握上下文管理，让 Claude Code 持续把一件事做完。

## 核心原则

> 上下文不是越满越好。指令超过一定长度后，Agent 对早期指令的遵守率开始下降。
> 一个被反复验证的发现：500 行的 CLAUDE.md 不会让 Claude 更聪明，只会让它更困惑。

## 有效窗口公式

Claude Code 用一个精确公式刻画对话空间：
- 预留空间 = min(最大输出令牌, 20,000)
- 有效窗口 = 模型上下文窗口 - 预留空间

举例：200K 上下文窗口，最大输出 16,384 令牌：
- 预留 = min(16,384, 20,000) = 16,384
- 有效窗口 = 200,000 - 16,384 = **183,616 令牌**

## 上下文管理命令

| 命令 | 功能 | 最佳实践 |
|------|------|----------|
| /context | 查看 Token 占用结构 | 定期监控，了解上下文分布 |
| /compact | 压缩对话保留摘要 | 上下文接近满载前主动压缩 |
| /clear | 清空历史（保留代码改动） | 同一问题被纠偏两次以上就重来 |
| /memory | 编辑 CLAUDE.md 持久记忆 | 将重要规范沉淀到文件 |
| claude --continue | 恢复当前目录最近会话 | 中断后继续工作 |
| claude --resume | 打开选择器恢复历史会话 | 多项目切换 |

## CLAUDE.md 层级体系

Claude Code 支持 CLAUDE.md 的层级继承：

```
~/.claude/CLAUDE.md     ← 个人偏好（全局）
    ↓ 覆盖
./CLAUDE.md             ← 项目共享（项目级）
    ↓ 覆盖
子目录/CLAUDE.md        ← 按需加载（模块级）
```

**适用场景**：
- **单项目**：根目录放 CLAUDE.md，自动发现
- **Monorepo**：子目录放独立的 CLAUDE.md，处理该目录内容时自动加载
- **团队协作**：项目级 CLAUDE.md 纳入 Git 管理，作为"项目宪法"

## 模块化规则目录

复杂项目推荐使用 `.claude/rules/` 目录：

```
.claude/
├── rules/
│   ├── code-style.md      # 代码风格
│   ├── security.md        # 安全规范
│   └── api-design.md      # API设计
├── skills/                # 可复用 SOP
└── agents/                # 子代理定义
```

所有放在 `.claude/rules/` 下的 `.md` 文件会被自动加载，无需手动 @import。

## 高效上下文加载策略

### 1. @提及精确加载
不要让它通读整个仓库，用 @ 引用具体文件：
- ❌ `@src/`（加载整个目录）
- ✅ `@src/components/Button.tsx @src/utils/helpers.ts`

### 2. 新任务开新会话
不要在单个会话中处理超过三个不相关任务。

### 3. 复制粘贴重置
当对话跑偏严重时，复制当前需求描述，粘贴到新会话，往往能"刷新"AI 的理解。

### 4. SCRATCHPAD.md 外部存储
对于需要长期跟踪的中间结果，写入 SCRATCHPAD.md 文件，而非全部塞入上下文。

## Token 优化技巧

| 技巧 | 说明 | 节省效果 |
|------|------|----------|
| 使用 @ 提及 | 只加载需要的文件 | 30-50% |
| 定期 /compact | 清理历史保留摘要 | 40-60% |
| 使用 Subagents | 并行处理减少串行上下文 | 50-70% |
| 避免重复加载 | 检查 /context 输出 | 20-30% |

## 常见问答

**Q: 上下文超出限制怎么办？**
1. /context 查看占用
2. /compact "保留项目背景和当前任务"
3. /clear 清空重来
4. 减少文件引用，精确 @ 提及
5. 使用 Subagents 分担上下文`,
    description: "Claude Code上下文管理完整指南：有效窗口公式、CLAUDE.md层级继承、模块化规则目录、Token优化技巧、精确加载策略，解决上下文膨胀导致的质量下降问题",
    descriptionEn: "Complete context management guide: effective window formula, CLAUDE.md hierarchy, modular rules, token optimization, and precise loading strategies",
    scenario: "长对话开发中避免上下文丢失和质量下降，保持AI对项目规范的持续遵守",
    scenarioEn: "Avoid context loss and quality degradation during long conversations, maintain AI compliance with project rules",
    problemFocus: "上下文膨胀导致模型注意力分散、推理质量下降，长对话中Claude对规则的遵守率从100%降至约70%",
    problemFocusEn: "Context膨胀 causes attention分散 and quality下降; rule compliance drops from 100% to ~70% in long conversations",
    author: "知乎 · CSDN",
    likes: 112, views: "18.9K", comments: 28,
  });
  count++;

  await db.insert(skills).values({
    title: "CLAUDE.md 配置工程化完全指南",
    titleEn: "CLAUDE.md Configuration Engineering Complete Guide",
    role: "claude",
    tags: ["Claude Code", "CLAUDE.md", "工程化", "项目规范"],
    tagsEn: ["Claude Code", "CLAUDE.md", "Engineering", "Project Standards"],
    content: `# CLAUDE.md 配置工程化完全指南

CLAUDE.md 是你和 AI 之间沟通的桥梁，是项目的"宪法"。

## 核心原则

> **如果删除某一行会导致 Claude 犯错，那就保留；否则删除。**

❌ "请写出优雅的代码。"（浪费 Token，模糊不可执行）
✅ "使用 npm run test:unit 运行单元测试。"（高价值信息）

## 标准结构模板

```markdown
# 项目名称

## 项目概述
[一句话简介]

## 技术栈
- 前端：React 18 + TypeScript + Vite
- 后端：Node.js + Express
- 数据库：PostgreSQL

## 项目结构
```
src/
├── components/     # UI 组件
├── hooks/          # 自定义 Hooks
├── utils/          # 工具函数
└── types/          # 类型定义
```

## 开发命令
- 启动：`npm run dev`（port 3000）
- 测试：`npm test`（单测: `npm test -- Button.test.tsx`）
- 构建：`npm run build`
- Lint：`npm run lint`

## 编码规范
- 缩进：2 空格
- 组件：PascalCase（如 `UserProfile.tsx`）
- 函数：camelCase
- 类型：PascalCase + 后缀 Type（如 `UserType`）
- 禁止使用 `any` 类型

## 架构规则
- 分层：Controller → Service → Repository → DAO
- 禁止跳层调用
- 所有外部 API 调用必须有超时控制和重试策略
- 日志必须包含 trace_id，使用 context 传递

## Git 工作流
- 分支：feature/、bugfix/、hotfix/
- Commit 格式：`type(scope): subject`
- 提交前必须通过测试和 lint

## 注意事项（Gotchas）
- 数据库事务必须通过 repository 层的 Tx 方法管理
- 禁止在 Controller 中直接注入 DAO
```

## 创建方法

### 方法1：/init 命令（推荐）
在项目根目录运行 `/init`，Claude Code 自动分析代码库结构并生成初始 CLAUDE.md。

### 方法2：手动编写
按照上述模板结构，根据项目实际情况填写。

### 方法3：实时添加（最灵活）
在对话中直接请求 Claude 更新 CLAUDE.md：
```
将"总是使用日志库而不是 console.log"添加到 CLAUDE.md 中。
```

## 维护策略

### 有机生长
当 Claude 做出了需要纠正的假设，不要只是临时修正。直接告诉 Claude：
> "将'总是使用日志库而不是 console.log'这条规则添加到我的 CLAUDE.md 文件中。"

### 定期 Review
- **每周**：review 一次 CLAUDE.md 是否需要更新
- **版本控制**：与 Git 一起管理，重大更新做标记
- **团队同步**：重要更改后及时通知团队成员

### 自动化沉淀
通过 GitHub Action，在 PR 评论中 @claude，让它将新规范添加到 CLAUDE.md。创建反馈循环，将团队集体智慧源源不断沉淀到核心文件。

## Monorepo 场景

```
monorepo/
├── CLAUDE.md                    # 全局规范
├── packages/
│   ├── frontend/
│   │   └── CLAUDE.md          # 前端专用：React + Tailwind
│   └── backend/
│       └── CLAUDE.md          # 后端专用：Go + gRPC
```

合并规则：父目录 CLAUDE.md 先加载，子目录 CLAUDE.md 优先级更高，局部规则覆盖全局规则。

## 个人配置 CLAUDE.local.md

存放不应提交到版本控制的个人偏好：
- 习惯的编辑器 quirks
- 偏好的代码冗余度
- 个人快捷键配置

**务必添加到 .gitignore**，避免泄露个人配置。

## 最佳实践总结

1. **保持简洁**：60-100 行足够，超过 200 行考虑拆分到 rules/ 目录
2. **包含可执行命令**：Claude 可以直接复制执行
3. **使用项目统一术语**：避免 AI 猜测
4. **示例丰富**：提供具体代码示例和配置
5. **结构化组织**：Markdown 标题分层，便于 AI 解析
6. **定期清理**：删除已完成的临时任务和过时规则`,
    description: "CLAUDE.md工程化配置完整指南：标准模板、创建方法、维护策略、Monorepo层级继承、个人配置分离，让CLAUDE.md成为团队协作的"项目宪法"",
    descriptionEn: "Complete CLAUDE.md engineering guide: standard template, creation methods, maintenance strategy, Monorepo inheritance, personal config separation",
    scenario: "新项目初始化或现有项目规范化，建立AI协作的持久上下文",
    scenarioEn: "New project initialization or existing project standardization, establish persistent context for AI collaboration",
    problemFocus: "没有CLAUDE.md时Claude每次会话都从零开始，不了解项目规范，导致代码风格不一致、架构违规",
    problemFocusEn: "Without CLAUDE.md Claude starts from scratch each session, unaware of project standards, causing inconsistent style and architecture violations",
    author: "知乎 · Tony Bai",
    likes: 167, views: "32.1K", comments: 52,
  });
  count++;

  console.log(`Imported ${count} Claude Code skills so far...`);

  await db.insert(skills).values({
    title: "Claude Code Agent 与 Subagent 编排",
    titleEn: "Claude Code Agent and Subagent Orchestration",
    role: "claude",
    tags: ["Claude Code", "Agent", "Subagent", "多代理", "编排"],
    tagsEn: ["Claude Code", "Agent", "Subagent", "Multi-Agent", "Orchestration"],
    content: `# Claude Code Agent 与 Subagent 编排

让 Claude Code 像一个团队一样工作，每个 Agent 专职负责特定任务。

## 为什么需要 Subagent？

**核心价值不是"并行"，而是"隔离"。**

扫代码库、跑测试、做审查这类会产生大量输出的事，塞进主线程很快就把有效上下文挤没了。Subagent 有独立的上下文窗口，完成任务后只返回结果摘要给主会话。

## 内置 Agent 类型

| Agent | 职责 | 使用场景 |
|-------|------|----------|
| **Plan Agent** | 复杂任务规划 | 涉及 >2 个文件时先用 Plan 模式 |
| **Explore Agent** | 代码库探索 | 了解项目结构、查找相关代码 |
| **Task Agent** | 具体任务执行 | 执行规划后的具体编码工作 |

## 自定义 Subagent 定义

在 `.claude/agents/` 目录下创建 Agent 定义文件：

```markdown
---
name: code-reviewer
description: PROACTIVELY review code changes before merging
tools: Read, Glob, Bash
disallowedTools: Write, Edit
model: sonnet
maxTurns: 15
---

审查当前分支相对于 main 分支的所有变更。

关注点：
1. 类型安全
2. 错误处理完整性
3. 性能隐患
4. 安全漏洞

输出格式：按严重程度排列的发现列表。
```

**配置要点**：
- `tools / disallowedTools`：限定能用什么工具
- `model`：探索任务用 Haiku 省成本，重要审查用 Opus
- `maxTurns`：防止跑飞
- `isolation: worktree`：需要动文件时隔离文件系统

## 8 角色分层架构（工程化交付框架）

| Agent | 职责 | 关键约束 |
|-------|------|----------|
| intent-resolver | 意图识别 + 阶段路由 | 只路由不执行 |
| requirement-analyst | 需求文档创建/更新 | 不碰技术知识 |
| design-planner | 技术方案 + 实施规格 | 不写代码 |
| review-arch | 架构合规审查 | 只写审查文件 |
| review-risk | 风险覆盖审查 | 对照历史坑点 |
| review-impact | 影响面审查 | 识别跨服务遗漏 |
| code-implementer | 编码实施 | 不做需求分析 |
| experience-depositor | 经验沉淀 | 不改代码 |

## 核心设计原则

### 1. 文件即状态，Agent 间不通信
所有状态都写入文件。需求文档里用状态标签记录当前阶段，审查意见写入独立文件，实施规格写入 exec-plans/。下一个 Agent 启动时，通过读文件获取上游全部输出。

**好处：断点续做。** 需求做到一半去开会，回来后直接从方案设计阶段继续。

### 2. JIT 上下文加载
不一次性把所有知识灌入，而是按阶段按需加载：
- 需求分析阶段：只加载业务知识
- 方案设计阶段：加载技术知识
- 编码实施阶段：加载经验模式

### 3. 角色分层
Planner 负责规划，Worker 负责执行，Judge 负责评审。最终奏效的架构是角色分层，而非平等协作（20 个 Agent 自由协作会退化为 2-3 个的吞吐量）。

## 常见反模式

❌ **子代理权限和主线程一样宽** → 隔离没有意义
❌ **输出格式不固定** → 主线程拿到没法用
❌ **子任务之间强依赖** → 频繁共享中间状态
❌ **给 subagent 分配模糊的工具权限** → 明确列出 allowlist

## 高频操作清单

**开始新任务**：
1. 开一个新会话（不要在长会话里切换任务）
2. 复杂任务先用 Plan Mode（Shift+Tab 两次）列出步骤
3. 让 Claude Code 先读 CLAUDE.md，确认上下文
4. 上下文用到 50% 时手动 /compact

**多步骤任务**：
1. 让 Claude Code 先输出任务清单
2. 逐步确认后再执行
3. 每完成一个关键步骤做一次 git commit
4. 出错时不要在同一会话反复修正，新开会话带上 commit history`,
    description: "Claude Code Agent编排完整方法论：内置Agent类型、自定义Subagent定义、8角色分层架构、文件即状态设计、JIT上下文加载、常见反模式避坑",
    descriptionEn: "Complete Agent orchestration methodology: built-in agents, custom subagent definition, 8-role hierarchy, file-as-state design, JIT context loading",
    scenario: "复杂项目开发中将工作拆分给不同AI角色，减少上下文污染与角色混乱",
    scenarioEn: "Split work among different AI roles in complex projects, reduce context pollution and role confusion",
    problemFocus: "单一会话处理复杂任务时上下文过载，AI开始"忘记"早期约束，架构违规率上升至30%",
    problemFocusEn: "Single session handling complex tasks causes context overload; AI forgets early constraints, architecture violation rises to 30%",
    author: "掘金 · SegmentFault",
    likes: 98, views: "15.4K", comments: 19,
  });
  count++;

  await db.insert(skills).values({
    title: "Claude Code Tools系统与MCP集成",
    titleEn: "Claude Code Tools System and MCP Integration",
    role: "claude",
    tags: ["Claude Code", "Tools", "MCP", "外部集成", "扩展"],
    tagsEn: ["Claude Code", "Tools", "MCP", "Integration", "Extension"],
    content: `# Claude Code Tools系统与MCP集成

从"改本地仓库"扩展到"操作真实系统"。

## 内置 Tools 系统

Claude Code 的核心执行层包含四大工具：

| 工具 | 功能 | 使用场景 |
|------|------|----------|
| **Read** | 读取文件内容 | 查看代码、配置文件、日志 |
| **Edit** | 编辑文件内容 | 修改代码、更新配置 |
| **Bash** | 执行 Shell 命令 | 运行测试、构建、部署脚本 |
| **Grep** | 搜索代码 | 全局查找函数定义、引用 |

**并行调用**：Claude Code 支持同时调用多个工具，大幅提升效率。

## 快捷前缀

| 前缀 | 功能 | 示例 |
|------|------|------|
| ! | 直接进入 Bash 模式，不需要 Claude 确认 | `!npm test` |
| @ | 触发文件路径自动补全 | `@src/components/Button.tsx` |

## MCP（Model Context Protocol）

### 什么是 MCP？

MCP 是 Claude Code 连接外部真实系统的标准协议。通过 MCP，Claude 可以：
- 查外部数据作为上下文（Resources）
- 执行动作（Tools）
- 固化模板（Prompts）

### MCP 服务器配置

```bash
# 添加 MCP 服务器
claude mcp add <name> <command>

# 示例：连接 PostgreSQL
claude mcp add postgres npx -y @modelcontextprotocol/server-postgres

# 查看已配置的 MCP
claude mcp list

# 在 CLAUDE.md 中禁用不需要的服务器
disabledMcpServers: ["server-name"]
```

### 推荐 MCP 服务器

| 服务器 | 功能 | 场景 |
|--------|------|------|
| @modelcontextprotocol/server-postgres | PostgreSQL 数据库 | 查询数据作为上下文 |
| @modelcontextprotocol/server-github | GitHub API | 读取 Issue、PR、代码 |
| @modelcontextprotocol/server-notion | Notion | 读取文档知识库 |
| @modelcontextprotocol/server-figma | Figma | 读取设计稿 |
| @modelcontextprotocol/server-slack | Slack | 发送通知 |

### STDIO vs HTTP 模式

| 模式 | 适用场景 | 建议 |
|------|----------|------|
| STDIO | 本地工具 | 适合本地开发 |
| HTTP | 远程服务 | 团队共享，便于统一权限与审计 |

**建议**：团队场景优先 HTTP 形态，便于统一权限与审计。

## 配置黄金法则

> 上下文窗口是"硬通货"。你可以引入很多配置，但单个项目同时启用的 MCP 服务器应少于 10 个，保持活跃工具总数在 80 个以下。

- 切勿全盘照搬复杂配置
- 只选用对当前项目有用的部分
- 用 `disabledMcpServers` 字段禁用不需要的服务器

## 连接外部系统实战

### 场景1：数据库查询
```
帮我查询用户表最近7天的注册数据，分析增长趋势。
```
（通过 MCP 连接 PostgreSQL，Claude 直接执行 SQL）

### 场景2：设计稿转代码
```
参考 Figma 设计稿（链接），实现这个页面的 React 组件。
```
（通过 MCP 读取 Figma 设计 token 和布局信息）

### 场景3：自动化工作流
```
完成代码审查后，在 Slack 通知团队，并在 Linear 创建跟进任务。
```
（通过 MCP 连接 Slack 和 Linear）

## Plugin 打包分发

把 commands + hooks + agents + skills + mcp 打包成一个 Plugin，跨项目复用、版本化管理：

```
.claude/
├── commands/          # 自定义斜杠命令
├── hooks/             # 事件触发器
├── agents/            # 子代理
├── skills/            # 可复用 SOP
└── mcp/               # MCP 配置
```

Plugin 本质是一个"团队最佳实践包"，让能力变成团队资产。`,
    description: "Claude Code Tools系统与MCP集成指南：四大内置工具、MCP服务器配置、STDIO/HTTP模式选择、推荐MCP列表、Plugin打包分发，让AI连接真实世界",
    descriptionEn: "Tools system and MCP integration guide: 4 built-in tools, MCP server config, STDIO/HTTP modes, recommended MCPs, Plugin packaging",
    scenario: "将Claude Code从本地代码编辑器升级为连接数据库、GitHub、设计稿、协作工具的全栈开发助手",
    scenarioEn: "Upgrade Claude Code from local editor to full-stack assistant connecting DB, GitHub, design tools, and collaboration platforms",
    problemFocus: "AI只能在本地仓库操作，无法访问真实数据源和外部系统，限制了自动化能力",
    problemFocusEn: "AI can only operate local repo, cannot access real data sources and external systems, limiting automation",
    author: "CSDN · 知乎",
    likes: 76, views: "11.2K", comments: 14,
  });
  count++;

  await db.insert(skills).values({
    title: "Claude Code Hooks 自动化工作流",
    titleEn: "Claude Code Hooks Automated Workflow",
    role: "claude",
    tags: ["Claude Code", "Hooks", "自动化", "工作流", "事件触发"],
    tagsEn: ["Claude Code", "Hooks", "Automation", "Workflow", "Event Triggers"],
    content: `# Claude Code Hooks 自动化工作流

Hooks 的价值不是"自动运行脚本"，而是**把不能交给 Claude 临场发挥的事，重新收回到确定性流程**。

## 核心思想

> 格式化要不要跑、保护文件能不能改、任务完成后要不要通知——这些事不要指望 Claude 每次都自己记得。

## Hooks 配置结构

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "pattern": "*.rs",
        "hooks": [
          {
            "type": "command",
            "command": "cargo check 2>&1 | head -30",
            "statusMessage": "Running cargo check..."
          }
        ]
      }
    ],
    "Notification": [
      {
        "type": "command",
        "command": "osascript -e 'display notification \"Task completed\" with title \"Claude Code\"'"
      }
    ]
  }
}
```

## 事件类型

| 事件 | 触发时机 | 用途 |
|------|----------|------|
| **PostToolUse** | 工具使用后 | 自动格式化、自动测试 |
| **PreToolUse** | 工具使用前 | 权限检查、危险操作拦截 |
| **Notification** | 任务完成 | 桌面通知、Slack 消息 |

## 三层叠加稳定架构

| 层级 | 职责 | 作用 |
|------|------|------|
| **CLAUDE.md** | 声明"提交前必须通过测试和 lint" | 给 Claude 行为准则 |
| **Skill** | 告诉 Claude 顺序、如何看失败、如何修复 | 固化执行路径 |
| **Hook** | 对关键路径执行硬性校验，必要时阻断 | 确定性保证 |

> **三样少任何一层都会有漏洞。** 只写 CLAUDE.md 规则，Claude 经常当没看见；只靠 Hooks，细节判断又做不了。

## 实战配置示例

### 示例1：保存后自动格式化
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "pattern": "*.{ts,tsx}",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write {{file}}",
            "statusMessage": "Running prettier..."
          }
        ]
      }
    ]
  }
}
```

### 示例2：修改关键文件前拦截
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit",
        "pattern": ".env*",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'WARNING: Modifying sensitive file' && exit 1",
            "statusMessage": "Checking sensitive file..."
          }
        ]
      }
    ]
  }
}
```

### 示例3：Rust 项目自动检查
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "pattern": "*.rs",
        "hooks": [
          {
            "type": "command",
            "command": "cargo check 2>&1 | head -30",
            "statusMessage": "Running cargo check..."
          },
          {
            "type": "command",
            "command": "cargo fmt",
            "statusMessage": "Running cargo fmt..."
          }
        ]
      }
    ]
  }
}
```

## 关键注意事项

⚠️ **限制输出长度**：` | head -30`，避免 Hook 输出污染上下文
⚠️ **失败阻断**：Hook 命令返回非 0 会阻断 Claude 的后续操作
⚠️ **性能敏感**：Hook 在每个匹配的工具调用后执行，保持轻量

## 与 CI/CD 的区别

| 对比项 | Hooks | CI/CD |
|--------|-------|-------|
| 触发时机 | 每次工具调用 | 代码提交后 |
| 反馈速度 | 即时 | 分钟级 |
| 作用范围 | 开发时质量门禁 | 部署前质量把关 |
| 定位 | 开发阶段即时反馈 | 发布阶段最终确认 |

**两者互补**：Hooks 保证开发时的即时反馈，CI/CD 保证发布前的最终确认。`,
    description: "Claude Code Hooks自动化工作流指南：事件类型、三层叠加架构、实战配置示例、关键注意事项，把不能临场发挥的事收回到确定性流程",
    descriptionEn: "Hooks automation workflow guide: event types, three-layer architecture, practical configs, key precautions, bring non-deterministic tasks into deterministic flows",
    scenario: "建立开发阶段的质量门禁，自动格式化、自动测试、危险操作拦截",
    scenarioEn: "Establish development-stage quality gates: auto-format, auto-test, dangerous operation interception",
    problemFocus: "依赖Claude临场发挥记住跑测试和格式化，经常遗漏，导致代码质量不稳定",
    problemFocusEn: "Relying on Claude to remember tests and formatting on the fly often leads to omissions and unstable code quality",
    author: "掘金 · CSDN",
    likes: 67, views: "9.8K", comments: 11,
  });
  count++;

  console.log(`Imported ${count} Claude Code skills so far...`);

  await db.insert(skills).values({
    title: "Claude Code Skills 固化SOP",
    titleEn: "Claude Code Skills Standard Operating Procedures",
    role: "claude",
    tags: ["Claude Code", "Skills", "SOP", "标准流程", "可复用"],
    tagsEn: ["Claude Code", "Skills", "SOP", "Standard Process", "Reusable"],
    content: `# Claude Code Skills 固化SOP

Skill 是可复用的指令模块，把标准操作流程（SOP）沉淀下来，让输出结构稳定、验收可重复。

## Skill 是什么？

Skill 放在 `.claude/skills/` 目录下，每个 Skill 一个目录，里面有 `SKILL.md`。

```
.claude/skills/
├── create-api-route/
│   └── SKILL.md
├── code-review/
│   └── SKILL.md
└── db-migration/
    └── SKILL.md
```

## Skill 定义格式

```markdown
---
name: create-api-route
description: 创建新的 API Route，包含类型定义和错误处理
argument-hint: "[route-path]"
allowed-tools: Read, Write, Edit, Glob
---

根据用户提供的路由路径，创建完整的 API Route 文件。

步骤：
1. 在 `src/app/api/{path}/route.ts` 创建文件
2. 定义 Request/Response 类型
3. 实现错误处理中间件
4. 在路由注释中标注 HTTP 方法
```

## 两种调用方式

1. **手动触发**：通过 `/create-api-route` 斜杠命令手动调用
2. **自动触发**：在 description 中写明触发条件，Claude Code 自动识别调用

## 推荐优先沉淀的 4 类 Skill

### 1. PR/变更总结
```markdown
---
name: pr-summary
description: 生成 PR 描述，包含风险/验证/回滚/影响面
---

审查当前分支变更，输出：
- 变更摘要（一行话描述）
- 影响面分析
- 验证步骤
- 回滚方案
- 风险等级（低/中/高）
```

### 2. 结构化 Code Review
```markdown
---
name: structured-review
description: 按标准清单进行代码审查
---

关注点（按严重程度排列）：
1. 类型安全
2. 错误处理完整性
3. 性能隐患
4. 安全漏洞
5. 代码可维护性

输出格式：
- 🔴 必须修：阻塞性问题
- 🟡 建议修：优化建议
- 🟢 风险：潜在风险点
- ✅ 验证点：需要人工确认的地方
```

### 3. 数据库迁移
```markdown
---
name: db-migration
description: 生成可回滚的数据库迁移脚本
---

强制要求：
1. 迁移脚本必须包含 down() 回滚方法
2. 大数据量变更必须分批次执行
3. 添加字段必须有默认值或允许 NULL
4. 删除操作前必须先备份

输出：迁移文件 + 回滚验证命令
```

### 4. 文档生成
```markdown
---
name: doc-generation
description: 生成 API 文档/运行手册/排障手册
---

根据代码生成：
- API 接口文档（OpenAPI 格式）
- 运行手册（启动/部署/监控）
- 排障手册（常见问题 + 解决方案）
```

## Skill 设计原则

1. **描述符要短**：Claude 通过 description 判断是否触发，简洁明确
2. **输出格式固定**：主线程拿到结果后能直接使用
3. **步骤清晰**：1-2-3 顺序执行，不要模糊表述
4. **包含验收标准**：什么样的输出算"完成"

## 团队共享实践

### 版本化管理
```bash
git add .claude/skills/
git commit -m "docs: add code-review skill"
```

### 共享项目级 Skills
在 `.claude/skills/` 下创建团队共享的技能，通过 Git 实现协作规范的版本化与一键复用。

### 自动触发设计
```markdown
---
name: team-frontend-guide
description: PROACTIVELY enforce frontend coding standards when modifying UI components
---

当检测到修改 `src/components/` 或 `src/pages/` 下的文件时自动触发。

检查清单：
- 组件使用 PascalCase 命名
- Props 必须有类型定义
- 使用 Tailwind CSS 而非内联样式
- 必须包含 loading/error 状态
```

## 常见反模式

❌ **步骤模糊**："优化代码" → ✅ "1. 提取重复逻辑 2. 替换低效算法 3. 添加错误处理"
❌ **权限过宽**：不限制 allowed-tools → ✅ 明确列出 Read, Edit, Bash
❌ **输出不固定**：每次格式不同 → ✅ 定义严格的输出模板`,
    description: "Claude Code Skills固化SOP指南：Skill定义格式、4类推荐Skill模板、两种调用方式、团队共享实践、自动触发设计，让标准流程沉淀为可复用资产",
    descriptionEn: "Skills SOP guide: definition format, 4 recommended templates, two invocation methods, team sharing, auto-trigger design",
    scenario: "团队中将重复性工作（PR总结、代码审查、数据库迁移、文档生成）沉淀为可复用Skill",
    scenarioEn: "Team沉淀 repetitive work (PR summary, code review, DB migration, doc generation) as reusable Skills",
    problemFocus: "每次让Claude做同类任务，输出格式不稳定，需要反复纠正，浪费大量上下文",
    problemFocusEn: "Each time asking Claude for similar tasks, output format is unstable requiring repeated corrections, wasting context",
    author: "SegmentFault · 掘金",
    likes: 83, views: "13.5K", comments: 16,
  });
  count++;

  await db.insert(skills).values({
    title: "Claude Code 工程化交付框架",
    titleEn: "Claude Code Engineering Delivery Framework",
    role: "claude",
    tags: ["Claude Code", "工程化", "交付框架", "最佳实践", "规范驱动"],
    tagsEn: ["Claude Code", "Engineering", "Delivery Framework", "Best Practices", "Spec-Driven"],
    content: `# Claude Code 工程化交付框架

从"Vibe Coding"到"规范驱动开发（SDD）"，建立可复制的工程闭环。

## 为什么需要工程化框架？

**问题1：上下文丢失**
长对话中 Claude 对 CLAUDE.md 规则的遵守率约 70%，剩下 30% 的违规需要人工逐行审查。

**问题2：重复犯错**
上次踩过的坑（如 JOIN 没索引导致全表扫描），下次同类需求又踩一遍。经验只存在于开发者脑子里。

**问题3：质量不可控**
AI 能写代码，但不能替代人对架构和业务的理解。

## 核心理念

### 三个设计原则

1. **文件即状态，Agent 间不通信**
   - 所有状态写入文件，Agent 通过读文件获取上游输出
   - 直接好处：**断点续做**，关闭终端去开会，回来后直接从当前阶段继续

2. **JIT 上下文加载**
   - 不按阶段一次性加载所有知识，而是按需加载
   - 需求分析阶段只加载业务知识，编码阶段只加载技术知识

3. **没有 Verifier 就没有工程上的 Agent**
   - 必须给 Claude 一个"验证它自己工作"的方法
   - ❌ "修复这个 Bug。" → ✅ "修复这个 Bug，并编写测试用例验证修复成功。"

## 四级实施路线图

### 第一级：最小可用（1-2 小时）

获取 **80% 收益**的最小配置：

1. 写一个精简的 CLAUDE.md（60 行以内，只写最核心的规则）
2. 加两个 Pre-tool Hooks（分层校验 + 项目最常犯的错误类型）
3. 这就够你获得 80% 的收益

### 第二级：结构化知识（半天到一天）

1. 建立 `context/` 目录结构
2. 用 `/load-service` 给核心服务生成技术总结
3. 建立 `INDEX.md` 索引和 JIT 加载协议
4. 写 2-3 个最重要的规则文件

### 第三级：完整管道（2-3 天）

1. 定义 8 个 Agent 角色
2. 搭建 `/deliver` 命令和完整工作流
3. 建立审查机制和经验沉淀闭环

## PR-First 工作流

```
1. 明确需求 → 2. 让 Claude 制定计划 → 3. Review 计划 → 4. 执行 → 5. 自动审查 → 6. 提交 PR
```

**关键动作**：
- 复杂任务务必从 Plan 模式开始（Shift+Tab 两次）
- 执行中发生偏离，**立即切回 Plan 模式重规划**，而非反复修补
- 每完成一个关键步骤做一次 git commit
- 出错时不要在同一会话反复修正，新开会话带上 commit history

## Git Worktrees 并行开发

```bash
# 创建独立 worktree，每个运行完全隔离的功能开发
git worktree add ../feature-auth auth-branch
git worktree add ../feature-payment payment-branch
```

**优势**：
- 多开终端窗口或 Claude Code 实例
- 并行处理多个独立任务
- 通过快捷键快速切换

## 验证闭环

| 层级 | 验证方式 | 作用 |
|------|----------|------|
| 开发时 | Hooks（格式化、测试） | 即时反馈 |
| 提交前 | Claude Code /review | AI 审查 |
| PR 时 | GitHub Action CI | 最终确认 |
| 发布后 | 监控告警 | 线上验证 |

## 日常操作清单

**开始新任务**：
1. 开一个新会话（不要在长会话里切换任务）
2. 复杂任务先用 Plan Mode（Shift+Tab 两次）列出步骤
3. 让 Claude Code 先读 CLAUDE.md，确认上下文
4. 上下文用到 50% 时手动 /compact

**代码审查**：
1. 切到功能分支后启动 review subagent
2. subagent 只分配 Read/Glob/Bash 权限，禁止写操作
3. 审查完成后人工确认再合并

**避免**：
- 不要在单个会话中处理超过三个不相关任务
- 不要在 CLAUDE.md 中写超过 200 行（拆到 rules/ 目录）
- 不要给 subagent 分配模糊的工具权限（明确列出 allowlist）
- 不要跳过 /compact（上下文膨胀后质量直线下降）

## 判断你是否需要第三级

**应该搭建第三级，如果**：
- 代码库超过 5 万行，有明确的分层架构
- 团队需要反复交付同类需求
- 有多个服务需要协同变更
- 已经有了人工版交付 SOP，想让 AI 接管重复环节

**停在第一级，如果**：
- 个人项目或早期创业，代码库还很小
- 技术栈和架构还在频繁变动
- 需求类型高度多样化`,
    description: "Claude Code工程化交付框架：规范驱动开发SDD、PR-First工作流、Git Worktrees并行开发、四级实施路线图、验证闭环，从Vibe Coding升级到可复制的工程体系",
    descriptionEn: "Engineering delivery framework: spec-driven development, PR-First workflow, Git Worktrees, 4-level roadmap, verification闭环",
    scenario: "团队规模化使用Claude Code时建立工程化规范，避免上下文丢失、重复犯错、质量不可控",
    scenarioEn: "Establish engineering standards when teams scale Claude Code usage, avoiding context loss, repeated mistakes, and uncontrolled quality",
    problemFocus: "个人随意使用Claude Code导致代码风格不一致、架构违规、经验无法沉淀，团队协同时问题放大",
    problemFocusEn: "Personal随意 use leads to inconsistent style, architecture violations, and unpreserved experience; problems amplify in团队协作",
    author: "知乎 · 掘金 · CSDN",
    likes: 143, views: "25.6K", comments: 38,
  });
  count++;

  console.log(`Successfully imported ${count} Claude Code skills!`);
  process.exit(0);
}

importClaudeCodeSkills().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
