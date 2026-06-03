---
title: 快速开始
group: guide
---

# Persona UI 快速开始

Persona UI 是一个 Svelte 5 组件库，采用「双重人格」的设计系统——通过纯 CSS、无需额外类名的主题机制，在 **Apple HIG** 与 **Material Design 3** 两套视觉语法之间灵活切换。

## 安装

```bash
pnpm add @persona-ui/lib
```

## 引入样式

在应用入口文件中引入 Persona UI 样式表：

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '@persona-ui/lib/styles.css';
</script>
```

或者在根 CSS 文件中引入：

```css
@import "@persona-ui/lib/styles.css";
```

## 设置当前主题

在 `<html>` 标签（或任意容器元素）上设置主题：

```html
<html data-theme="apple" data-mode="light"></html>
```

- `data-theme="apple"` — Apple HIG 风格的视觉
- `data-theme="material"` — Material Design 3 风格的视觉
- `data-mode="light"` — 浅色模式
- `data-mode="dark"` — 深色模式

## 你的第一个组件

```svelte
<script>
  import { Button } from '@persona-ui/lib';
</script>

<Button variant="filled">点击我</Button>
```

## 切换主题

通过修改 `data-theme` 属性即可在主题间切换：

```svelte
<script>
  let theme = $state('apple');
  function toggle() {
    theme = theme === 'apple' ? 'material' : 'apple';
    document.documentElement.setAttribute('data-theme', theme);
  }
</script>

<button onclick={toggle}>切换到 {theme === 'apple' ? 'Material' : 'Apple'}</button>
<Button>我跟随当前主题</Button>
```

## 局部覆盖

通过 `style` 在实例层级覆盖任意组件的设计令牌：

```svelte
<Button
  variant="filled"
  style="--pui-button-radius: 2px; --pui-button-bg: oklch(0.6 0.2 250);"
>
  自定义圆角与颜色
</Button>
```

## 容器级主题

你也可以将主题限定在某个子树范围内：

```svelte
<div data-theme="material">
  <Button variant="filled">这个按钮使用 Material 风格</Button>
</div>
```

## 下一步

- [主题指南](theming) — 详细的主题概念
- [设计令牌参考](tokens) — 全部 CSS 变量
- [组件](/docs/components/)：
  - [Button](components/button)
  - [Card](components/card)
  - [TextField](components/text-field)
  - [Switch](components/switch)
