---
name: persona-ui
description: 在第三方 Svelte/SvelteKit 项目中安装、配置并使用 persona-ui 组件库
tags: [svelte, sveltekit, component-library, design-system]
---

# persona-ui 使用助手

这是给第三方项目使用 persona-ui 的 Claude Code skill。它帮助在业务项目中安装 `@persona-ui/lib`、导入主题 CSS、配置主题切换，并使用 persona-ui 组件构建界面。

如果用户是在维护 persona-ui 仓库源码、开发新组件或主题包，请改用 `/persona-ui-dev`。

## 何时使用

当用户在普通 Svelte/SvelteKit 项目中提出以下需求时使用：

- 安装或接入 persona-ui
- 配置 Apple、Material、Minimalist 主题
- 修复 persona-ui 样式不生效、主题不切换、暗色模式异常
- 使用 persona-ui 组件实现页面、表单、弹层、导航、数据展示
- 从其他 UI 组件迁移到 persona-ui
- 在项目中封装主题切换器或设计系统入口

不要在第三方项目中修改 `packages/lib`、`packages/theme-*`、`apps/docs` 这类 persona-ui monorepo 内部路径；这些属于 `/persona-ui-dev` 的职责。

## 接入前检查

先确认目标项目：

- 是否使用 Svelte 5 或 SvelteKit
- 包管理器是 `pnpm`、`npm`、`yarn` 还是 `bun`
- 是否已经有全局 CSS 入口，例如 `src/app.css`
- 是否已经有根布局，例如 `src/routes/+layout.svelte`
- 是否已有主题系统、dark mode、Tailwind 或其他 UI 库

如果项目不是 Svelte/SvelteKit，不要直接套用示例；先说明 persona-ui 是 Svelte 组件库。

## 安装

按项目包管理器选择命令：

```bash
# pnpm
pnpm add @persona-ui/lib @persona-ui/theme-apple

# npm
npm install @persona-ui/lib @persona-ui/theme-apple

# yarn
yarn add @persona-ui/lib @persona-ui/theme-apple

# bun
bun add @persona-ui/lib @persona-ui/theme-apple
```

可选主题包：

```bash
pnpm add @persona-ui/theme-material
pnpm add @persona-ui/theme-minimalist
```

至少安装一个主题包，否则组件可能只有结构样式而没有目标主题视觉。

## CSS 导入

在全局 CSS 入口中先导入 core，再导入主题 CSS：

```css
/* src/app.css */
@import '@persona-ui/lib/core.css';
@import '@persona-ui/theme-apple/apple.css';
```

多个主题可以同时导入：

```css
@import '@persona-ui/lib/core.css';
@import '@persona-ui/theme-apple/apple.css';
@import '@persona-ui/theme-material/material.css';
@import '@persona-ui/theme-minimalist/minimalist.css';
```

`@persona-ui/lib/styles.css` 是兼容别名；新接入优先使用 `@persona-ui/lib/core.css`。

## SvelteKit 配置

在根布局导入全局 CSS，并在可包裹应用的元素上设置 `data-theme` 和 `data-mode`：

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<div data-theme="apple" data-mode="light">
  {@render children?.()}
</div>
```

如果项目控制 `src/app.html` 的 `<html>` 属性，也可以把 `data-theme` / `data-mode` 放到 `<html>` 上。不要在 Svelte 组件里直接渲染新的 `<html>` 元素。

## 基础使用

```svelte
<script lang="ts">
  import { Button, Card, TextField } from '@persona-ui/lib';
</script>

<Card>
  <TextField label="Email" placeholder="you@example.com" />
  <Button variant="filled">Continue</Button>
</Card>
```

使用组件前先查看实际导出的组件和类型；不要凭空假设不存在的 prop。若不确定，搜索项目依赖或参考 persona-ui 文档。

## 主题切换

最小主题切换可以绑定到应用根节点：

```svelte
<script lang="ts">
  import '../app.css';

  let { children } = $props();
  let theme = $state<'apple' | 'material' | 'minimalist'>('apple');
  let mode = $state<'light' | 'dark'>('light');
</script>

<div data-theme={theme} data-mode={mode}>
  {@render children?.()}
</div>
```

实现持久化时注意 SSR：访问 `localStorage`、`document`、`window` 前确认代码只在浏览器端运行。

## 常见排查

### 组件没有样式

检查：

- 是否导入了 `@persona-ui/lib/core.css`
- 是否导入了至少一个主题 CSS
- CSS 是否在根布局或应用入口中全局加载
- `data-theme` 是否与已导入主题匹配，例如 `apple`、`material`、`minimalist`

### 主题不切换

检查：

- `data-theme` 是否设置在组件所在 DOM 子树的祖先节点上
- 是否导入了对应主题 CSS
- 主题名是否拼写正确
- 是否被应用自己的 CSS 覆盖

### 暗色模式不生效

检查：

- 是否设置 `data-mode="dark"`
- 主题包是否支持 dark mode
- 应用是否有其他全局 dark class 覆盖 persona-ui tokens

### 构建报找不到包

检查：

- `@persona-ui/lib` 和主题包是否已安装到当前项目
- 包管理器 lockfile 是否更新
- monorepo 项目是否安装在正确 workspace

## 编码规则

- 使用 Svelte 5：`$props()`、`$state`、`$derived`、`{@render children?.()}`。
- 事件回调使用现代属性写法，例如 `onclick={...}`；使用组件 prop 时遵循 persona-ui 类型定义。
- 不要复制 persona-ui 内部源码到业务项目；通过 npm 包导入组件和 CSS。
- 业务项目自定义视觉时优先覆盖 CSS variables，而不是直接覆盖组件内部 class。
- 不要在第三方项目里修改 persona-ui 主题包源码；需要新主题时可在业务项目中创建自己的 token 覆盖层，或回到 `/persona-ui-dev` 开发主题包。

## 验证

按项目实际脚本选择验证命令：

```bash
pnpm check
pnpm build
pnpm test
```

如果是 SvelteKit 项目，建议启动开发服务器后实际打开页面确认：

```bash
pnpm dev
```

检查页面时重点确认：组件样式已加载、主题切换有效、dark mode 有效、交互和键盘行为正常。

## 完成前检查清单

- [ ] 已安装 `@persona-ui/lib` 和至少一个主题包
- [ ] 已在全局 CSS 中导入 `@persona-ui/lib/core.css`
- [ ] 已导入对应主题 CSS
- [ ] 组件所在 DOM 子树有正确的 `data-theme` 和 `data-mode`
- [ ] 使用了真实存在的组件导出和 props
- [ ] 未复制或修改 persona-ui monorepo 内部源码
- [ ] 已运行项目自己的 check/build/test 或说明未运行原因
