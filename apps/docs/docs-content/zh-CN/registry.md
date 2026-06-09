---
title: 主题注册中心 — 社区主题
group: guide
---

# 主题注册中心

Persona UI 的主题注册中心——第三方作者可以基于 `@persona-ui/lib` 创建/分发主题，
用户可以一条命令安装到自己的项目。

> **翻译状态**：本页面为英文版的中文翻译占位。完整内容请参考
> [English version](/docs/registry)。

## 简介

注册中心让社区能复用 lib 的所有组件、token 系统，只贡献"长什么样"（CSS + themeDef）。
CI 自动校验 token 覆盖、CSS 语法、视觉回归、scope 命名。

## 快速开始（贡献者）

1. fork 仓库
2. 创建 `packages/theme-{id}/`
3. 写 `themeDef` + CSS
4. 加 `test:tokens` 测试（基于 `@persona-ui/lib/tokens-manifest`）
5. 提 PR

**CLI 命令：**

| 命令 | 用途 |
| ---- | ---- |
| `list [registry-url]` | 列出 registry 索引里所有主题 |
| `info <theme-name>` | 显示某个主题的详细 manifest（依赖、文件、安装命令） |
| `add <source>` | 拉取主题文件到项目目录 |

## 安装（用户视角）

```bash
# 浏览可用主题
pnpm dlx @persona-ui/cli list

# 查看某个主题详情
pnpm dlx @persona-ui/cli info theme-apple

# 官方主题
pnpm add @persona-ui/lib @persona-ui/theme-apple

# CLI 一键安装
pnpm dlx @persona-ui/cli add https://persona-ui.ricecakecat.com/r/theme-apple.json
```

## 命名约定

| 命名 | 用途 | 谁可以发布 |
|------|------|----------|
| `@persona-ui/theme-{id}` | 官方主题 | 仅仓库所有者 |
| `@<your-scope>/theme-{id}` | 第三方 fork | 任何 npm 用户 |

## 详见

- [English version](/docs/registry) — 完整内容
- [Theming Guide](/docs/theming)
- [shadcn-svelte registry](https://shadcn-svelte.com/registry) — 设计灵感
