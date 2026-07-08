---
title: Catalog 合同 Schema 迁移工作流
doc_type: workflow
module: catalog
topic: catalog-contract-schema
status: stable
created: 2026-06-14
updated: 2026-06-14
owner: self
source: human+ai
---

# Catalog 合同 Schema 迁移工作流

## 目标

- 在不破坏既有产线的前提下，收敛 catalog 合同 schema 的演进路径。
- 用同一套规则约束 `app/scripts/catalog-source-contract.schema.json` 与 `app/scripts/generate-catalog.mjs` 的兼容边界。

## 现状边界

`app/scripts/generate-catalog.mjs` 读取以下输入：

- `app/scripts/catalog-source-contract.schema.json`（结构校验 Schema）
- `app/scripts/catalog-source-contract.json`（业务约束合同）
- `app/src/data/catalogSource.json`（内容源）

默认行为：`catalog-source-contract` 的 `schemaVersion` 主版本必须与脚本支持主版本一致，否则直接失败。

## 兼容策略

- 当前默认主版本：`1`。
- 通过环境变量 `CATALOG_SOURCE_CONTRACT_SUPPORTED_MAJOR` 指定当前运行时可接受的合同主版本。
- 当 `schemaVersion` 主版本与当前可接受值不一致时，脚本返回：
  - `Invalid catalog source: contract schemaVersion major must be X, got Y`
- 当主版本参数不可解析（如 `NaN`）时，脚本返回：
  - `Invalid catalog source: supported contract schema major must be a positive integer, got ...`

## 迁移窗口执行规则

### 1. 预备

1. 在 `app/scripts/catalog-source-contract.json` 上提交兼容改动前，准备一份本地临时合同（如 `tmp` 下）；
2. 优先更新 `catalog-source-contract.schema.json` 或新增新主版本合同结构，保证 schema 自检通过；
3. 明确新增字段的 `required` 边界与默认值策略，避免向下兼容缺失导致 `generate-catalog` 脱靶。

### 2. 兼容试跑（只读）

1. 在临时分支执行：
   - `CATALOG_SOURCE_CONTRACT_SUPPORTED_MAJOR=<新主版本> npm run catalog:generate`
2. 校验控制台输出中已生成预期分类 `manifest`。
3. 核对产物：
   - `prompt.json`、`skill.json`、`hook.json`、`mcp.json`、`agent.json`、`github.json`
4. 对新增字段做语义抽样核对：字段名、计数、分类、排序是否稳定可接受。

### 3. 回归

1. `npm run catalog:check`
2. `npm run test api/catalog-source.test.ts`
3. `npm run verify`

### 4. 收口与发布

1. 确认迁移完成时，默认主版本参数恢复为 `1`（除非发布决策已切换）。
2. 仅在版本发布时清空或落库 `CATALOG_SOURCE_CONTRACT_SUPPORTED_MAJOR` 的临时设置；
3. 将新主版本作为文档与发布记录的一部分固定，避免“环境变量记忆”成为长期默认行为。

## 禁止项

- 禁止在未通过 `verify` 前将新主版本写入默认 `catalog-source-contract.json` 的生产主版本；
- 禁止把 `CATALOG_SOURCE_CONTRACT_SUPPORTED_MAJOR` 写入仓库默认配置或启动脚本；
- 禁止在合同升级期间跳过 `public/catalog` 生成一致性回归；
- 禁止将 `schemaVersion` 修改作为“测试临时变量”，必须附带明确验收记录。
