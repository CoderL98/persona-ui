# @persona-ui/cli

## 0.1.4-beta

> ⚠️ 注意：CLI **不在** changeset `fixed` 组内（[`.changeset/config.json`](../../.changeset/config.json) 只固定 lib / docs / theme-apple / theme-material）。CLI 有**独立版本节奏**，与上述 4 个包不强同步。但本次手动将其 version 字段与 lib 一致，原因是 CLI 仍处于早期预发布阶段，发布脚本按 `package.json#version` 推断 npm dist-tag（`next`），与 lib 同步有利于一次性发版。后续若 lib 进入稳定期，CLI 节奏可独立。

### Minor Changes

- **feat(cli): 新增 `@persona-ui/cli` 包用于主题安装和注册表管理**（commit `315e866`）
  - 联邦 shadcn-svelte 模型：从中心 registry 拉主题模板安装到消费方项目
  - 入口：`bin.pui-cli → dist/index.js`（`#!/usr/bin/env node` shebang 通过 `scripts/inject-shebang.mjs` 注入）
  - 子命令骨架（首个版本）：`add`
  - 依赖：`commander` / `zod` / `picocolors` / `node-fetch-native`
  - 工具：`tsx`（开发运行）+ `vitest`（单测）
  - 配合 [apps/docs/static/r/](https://github.com/CoderL98/persona-ui) 下的 registry item JSON 使用

- **feat(cli): 新增 `list` / `info` 命令 + 修复 fetch 拼接**（commit `a352d99`）
  - `list`：列出 registry 索引里所有主题
  - `info`：显示某个主题的详细 manifest
  - 修复 fetch 路径拼接（`base + path` 边界条件）
  - 入口 `src/index.ts` 同步注册 3 个子命令：`addCommand` / `listCommand` / `infoCommand`

- **chore(config): 抽取 `PERSONA_UI_BASE_URL` 统一域名管控**（commit `ecf6ab6`）
  - 消费方接入主题注册中心，消除硬编码域名
  - CLI 与 docs 共用 `PERSONA_UI_BASE_URL` 环境变量（默认 `https://persona-ui.ricecakecat.com`）

### Patch Changes

- build: `tsc -p tsconfig.json` + `node scripts/inject-shebang.mjs` 生成可执行 dist
- chore: `.gitignore` 添加 `.env` 文件排除规则

## 0.1.0 (2026-06-04)

CLI 初始发布（与 monorepo 首个版本一同发布）。

- 入口：`pui-cli` 命令（npm global 或 `npx pui-cli`）
- 子命令：`add <url-or-path>` 从 registry item 拉文件到目标目录
- 支持本地路径与远程 URL 两种 registry item 源

## Unreleased

> 当前 `package.json#version` 已为 `0.1.4-beta`。
> 在 `0.1.4-beta` 之后的下一次发布之前，所有新变更都将汇总在此节。

### Planned

- `init` 命令：在消费方项目写入主题 token shim + 注册中心配置
- `update` / `remove` 命令：双向同步已安装主题
- `--dry-run` / `--force` 通用 flag
- CI 发布：`scripts/publish-cli.sh` 已就绪（shebang 校验 + `npx pui-cli --version` 端到端验证）
