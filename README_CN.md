# Persona UI

Svelte 5 双主题组件库 —— **Apple HIG** × **Material Design 3**，一套 API 两种设计语言。

只需切换一个 `data-theme` 属性，整套视觉语言立即替换。同一个组件、两种严格不同的设计风格。

[English Documentation](./README.md)

## 包结构

- [`@persona-ui/lib`](./packages/lib) —— 组件库（可发布到 npm）
- [`@persona-ui/docs`](./apps/docs) —— 文档站（也是本 monorepo 的演示项目）

## 快速上手（使用组件库）

```bash
pnpm add @persona-ui/lib
```

```svelte
<script>
  import '@persona-ui/lib/styles.css';
  import { Button } from '@persona-ui/lib';
</script>

<html data-theme="apple" data-mode="light">
  <Button variant="filled">Hello</Button>
</html>
```

## Monorepo 开发

```bash
pnpm install
pnpm dev                # 启动文档站 http://localhost:5173
pnpm build              # 构建 lib + docs
pnpm check              # 在所有包内跑 svelte-check
pnpm test:unit          # 138 个单元测试
pnpm test:a11y          # a11y playwright 测试
pnpm test:visual        # 视觉回归测试
pnpm test:css           # CSS 契约测试
pnpm test               # check + 单元测试
```

## 发布流程

使用 [changesets](https://github.com/changesets/changesets) 管理版本：

```bash
pnpm changeset              # 新增一次变更说明
pnpm changeset:version      # 升级版本号 + 生成 CHANGELOG
pnpm release                # version + 构建 lib + 发布
```

## 架构

```
persona-ui/
├── packages/
│   └── lib/                 # @persona-ui/lib —— 自包含，不依赖 SvelteKit
│       ├── src/lib/         # 组件、internal 工具、样式
│       ├── tests/unit/      # vitest（138 个测试，44 个文件）
│       └── dist/            # 构建产物（svelte-package）
├── apps/
│   └── docs/                # @persona-ui/docs —— SvelteKit 演示
│       ├── src/routes/      # /docs/*  渲染 markdown 文档
│       ├── src/lib/         # 仅 docs 使用的工具（markdown 注册表）
│       ├── static/fonts/    # 5 个 woff2 自托管字体
│       └── tests/           # playwright a11y / css / visual 测试
└── .changeset/              # 版本号 & 变更日志
```

库通过 pnpm workspace 解析 —— `apps/docs` 直接从 `packages/lib/src/lib` 引入 `@persona-ui/lib`（开发时无需构建 lib）。

## 协议

MIT
