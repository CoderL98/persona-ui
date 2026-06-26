# Persona UI

Svelte 5 双主题组件库 —— **Apple HIG** × **Material Design 3**,一套 API 两种设计语言。

只需切换一个 `data-theme` 属性,整套视觉语言立即替换。同一个组件、两种严格不同的设计风格。

[English](https://github.com/CoderL98/persona-ui/blob/main/README.md) · [文档站](https://persona-ui.ricecakecat.com)

## 包索引

| 包                                                                                                                    | 源码                                                                                                  | 说明                               |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [`@persona-ui/lib`](https://github.com/CoderL98/persona-ui/blob/main/packages/lib/README_CN.md)                       | [`packages/lib`](https://github.com/CoderL98/persona-ui/tree/main/packages/lib)                       | 组件库主体(可发布到 npm)           |
| [`@persona-ui/theme-apple`](https://github.com/CoderL98/persona-ui/blob/main/packages/theme-apple/README_CN.md)       | [`packages/theme-apple`](https://github.com/CoderL98/persona-ui/tree/main/packages/theme-apple)       | Apple HIG 主题                     |
| [`@persona-ui/theme-material`](https://github.com/CoderL98/persona-ui/blob/main/packages/theme-material/README_CN.md) | [`packages/theme-material`](https://github.com/CoderL98/persona-ui/tree/main/packages/theme-material) | Material 3 主题                    |
| [`@persona-ui/cli`](https://github.com/CoderL98/persona-ui/blob/main/apps/cli/README_CN.md)                           | [`apps/cli`](https://github.com/CoderL98/persona-ui/tree/main/apps/cli)                               | 从中心 registry 安装主题           |
| [`@persona-ui/docs`](https://github.com/CoderL98/persona-ui/tree/main/apps/docs)                                      | [`apps/docs`](https://github.com/CoderL98/persona-ui/tree/main/apps/docs)                             | 文档站(也是本 monorepo 的演示项目) |

## 快速上手(使用组件库)

```bash
pnpm add @persona-ui/lib
pnpm add @persona-ui/theme-apple   # 或 @persona-ui/theme-material
```

```css
/* src/app.css */
@import '@persona-ui/lib/core.css';
@import '@persona-ui/theme-apple/apple.css';
```

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '../app.css';
  let { children } = $props();
</script>

<html lang="zh-CN" data-theme="apple" data-mode="light">
  {@render children?.()}
</html>
```

```svelte
<!-- 任意组件 -->
<script>
  import { Button } from '@persona-ui/lib';
</script>

<Button variant="filled">你好</Button>
```

主题 CSS 拆分在独立包中,通过 `<html>`(或任意子树)的 `data-theme` /
`data-mode` 属性切换。完整说明见
[`packages/lib/README_CN.md`](https://github.com/CoderL98/persona-ui/blob/main/packages/lib/README_CN.md)。

## Monorepo 开发

```bash
pnpm install
pnpm dev                # 启动文档站 http://localhost:5173
pnpm build              # 构建 lib + 主题包 + docs
pnpm check              # 在所有包内跑 svelte-check
pnpm test:unit          # 140+ 单元测试(vitest)
pnpm test:a11y          # a11y playwright 测试
pnpm test:visual        # 视觉回归测试
pnpm test:css           # CSS 契约测试
pnpm test               # check + 单元测试
```

## Claude Code Skills

本仓库内置两个 Claude Code skills:

| Skill             | 适用人群                         | 用途                                             |
| ----------------- | -------------------------------- | ------------------------------------------------ |
| `/persona-ui`     | 使用 persona-ui 的业务项目开发者 | 安装、配置、使用组件、设置主题、排查接入问题     |
| `/persona-ui-dev` | persona-ui 维护者                | 开发组件、主题包、文档、测试和 design-token 契约 |

### 在本仓库中使用

克隆仓库后，用 Claude Code 打开项目，然后运行:

```text
/persona-ui
/persona-ui-dev
```

如果你的 Claude Code 会话启动时还没有 `.claude/skills/` 目录，请重启 Claude Code，让它重新发现项目级 skills。

### 安装第三方使用版到其他项目

把使用版 skill 目录复制到目标仓库:

```bash
mkdir -p .claude/skills
cp -R /path/to/persona-ui/.claude/skills/persona-ui .claude/skills/persona-ui
```

目标结构应为:

```text
.claude/skills/persona-ui/SKILL.md
```

之后在目标仓库中打开或重启 Claude Code，并运行 `/persona-ui`。

### 安装维护者版 Skill

如果是组件库开发工作，复制维护者版 skill:

```bash
mkdir -p .claude/skills
cp -R /path/to/persona-ui/.claude/skills/persona-ui-dev .claude/skills/persona-ui-dev
```

之后运行 `/persona-ui-dev`。

### 安装为当前用户的全局 Skill

复制任意一个或两个 skill 到 Claude Code 用户级 skills 目录:

```bash
mkdir -p ~/.claude/skills
cp -R /path/to/persona-ui/.claude/skills/persona-ui ~/.claude/skills/persona-ui
cp -R /path/to/persona-ui/.claude/skills/persona-ui-dev ~/.claude/skills/persona-ui-dev
```

之后你可以在任意 Claude Code 会话中使用 `/persona-ui` 或 `/persona-ui-dev`。如果 `skills` 目录是在会话启动后新建的，请重启 Claude Code 一次。

## 发布流程

使用 [changesets](https://github.com/changesets/changesets) 管理版本:

```bash
pnpm changeset              # 新增一次变更说明
pnpm changeset:version      # 升级版本号 + 生成 CHANGELOG
pnpm release                # version + 构建 lib + 发布
```

## 架构

```text
persona-ui/
├── packages/
│   ├── lib/                 # @persona-ui/lib —— 自包含,不依赖 SvelteKit
│   │   ├── src/lib/         # 组件、internal 工具、样式
│   │   ├── tests/unit/      # vitest(140+ 用例)
│   │   └── dist/            # 构建产物(svelte-package)
│   ├── theme-apple/         # @persona-ui/theme-apple —— Apple HIG token
│   └── theme-material/      # @persona-ui/theme-material —— Material 3 token
├── apps/
│   ├── docs/                # @persona-ui/docs —— SvelteKit 演示
│   │   ├── src/routes/      # /[[lang]]/* 渲染 markdown 文档
│   │   ├── src/lib/         # 仅 docs 使用的工具(markdown 注册表、主题聚合)
│   │   ├── static/fonts/    # 自托管 woff2 字体
│   │   └── tests/           # playwright a11y / css / visual 测试
│   └── cli/                 # @persona-ui/cli —— 从 registry 安装主题
└── .changeset/              # 版本号 & 变更日志
```

库通过 pnpm workspace 解析 —— `apps/docs` 直接从 `packages/lib/src/lib`
引入 `@persona-ui/lib`(开发时无需构建 lib)。

## 协议

MIT
