---
title: 按钮
group: components
---

# Button 按钮

## Import

```svelte
<script>
  import { 按钮 } from '@persona-ui/lib';
</script>
```

一个多功能的按钮组件，提供 4 种视觉变体和 3 种尺寸。

## 导入

```svelte
<script>
  import { Button } from '@persona-ui/lib';
</script>
```

## API

| Prop       | Type                                           | Default    | Description                              |
| ---------- | ---------------------------------------------- | ---------- | ---------------------------------------- |
| `variant`  | `'filled' \| 'tonal' \| 'outlined' \| 'ghost'` | `'filled'` | 视觉变体                                 |
| `size`     | `'sm' \| 'md' \| 'lg'`                         | `'md'`     | 尺寸预设                                 |
| `disabled` | `boolean`                                      | `false`    | 禁用状态                                 |
| `loading`  | `boolean`                                      | `false`    | 显示加载指示器并设置 `aria-busy`         |
| `children` | `Snippet`                                      | —          | 标签/内容                                |
| `leading`  | `Snippet`                                      | —          | 前置图标                                 |
| `trailing` | `Snippet`                                      | —          | 后置图标                                 |
| `class`    | `string`                                       | —          | 附加的 CSS 类                            |
| `style`    | `string`                                       | —          | 内联样式（用于覆盖 token）               |
| `onClick`            | `(e: MouseEvent) => void`                      | —          | 点击处理函数                             |

其余属性会透传到底层的 `<button>` 元素。

## 变体

| Variant    | Apple                                | Material                                       |
| ---------- | ------------------------------------ | ---------------------------------------------- |
| `filled`   | 半透明 primary 背景，大圆角          | 不透明 primary，胶囊形状，附加 state layer     |
| `elevated` | 抬升的半透明控件，柔和阴影           | 抬升表面按钮，MD3 elevation 2                  |
| `tonal`    | primary-container 背景，无阴影       | primary-container 背景，无阴影                 |
| `outlined` | 透明背景，细微描边                   | 透明背景，outline 描边                         |
| `text`     | 透明，纯文字，类链接外观             | 透明，纯文字，附加 state layer                 |

## 状态

- **hover**：Apple — 放大 1.02；Material — state layer 覆盖
- **focus-visible**：2px primary 颜色的轮廓线
- **pressed**：Apple — 缩小 0.97；Material — state layer 覆盖
- **disabled**：38% 不透明度，禁止指针事件
- **loading**：显示加载指示器，`aria-busy="true"`，禁止点击

## 组件 Token

| Token                       | Default                       | Purpose            |
| --------------------------- | ----------------------------- | ------------------ |
| `--pui-button-bg`           | `var(--pui-color-primary)`    | 背景色             |
| `--pui-button-fg`           | `var(--pui-color-on-primary)` | 文字颜色           |
| `--pui-button-radius`       | `var(--pui-radius-control)`   | 圆角半径           |
| `--pui-button-gap`          | `var(--pui-space-2)`          | 元素之间的间距     |
| `--pui-button-padding-x`    | `var(--pui-space-4)`          | 水平内边距         |
| `--pui-button-padding-y`    | `var(--pui-space-2)`          | 垂直内边距         |
| `--pui-button-shadow`       | `var(--pui-elevation-1)`      | 投影               |
| `--pui-button-border-color` | `transparent`                 | 边框颜色           |

## 本地覆盖示例

```svelte
<Button
  variant="filled"
  style="--pui-button-radius: 2px; --pui-button-bg: oklch(0.5 0.25 300);"
>
  Custom Button
</Button>
```
