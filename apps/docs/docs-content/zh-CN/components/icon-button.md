---
title: 图标按钮
group: components
---

# IconButton 图标按钮

## Import

```svelte
<script>
  import { 图标按钮 } from '@persona-ui/lib';
</script>
```

一个带有可访问标签的圆形纯图标按钮。

## 导入

```svelte
<script>
  import { IconButton } from '@persona-ui/lib';
</script>
```

## API

| Prop       | Type                                          | Default      | Description                       |
| ---------- | --------------------------------------------- | ------------ | --------------------------------- |
| `variant`  | `'filled' \| 'tonal' \| 'outlined' \| 'text'` | `'filled'`   | 视觉变体                          |
| `size`     | `'sm' \| 'md' \| 'lg'`                        | `'md'`       | 尺寸预设                          |
| `label`    | `string`                                      | **required** | 可访问标签（`aria-label`）        |
| `disabled` | `boolean`                                     | `false`      | 禁用状态                          |
| `loading`  | `boolean`                                     | `false`      | 显示加载指示器并设置 `aria-busy`  |
| `children` | `Snippet`                                     | —            | 图标内容                          |
| `class`    | `string`                                      | —            | 附加的 CSS 类                     |
| `style`    | `string`                                      | —            | 内联样式（用于覆盖 token）        |
| `onclick`  | `(e: MouseEvent) => void`                     | —            | 点击处理函数                      |

## 组件 Token

| Token                      | Default                       | Purpose          |
| -------------------------- | ----------------------------- | ---------------- |
| `--pui-icon-button-size`   | `40px`                        | 按钮宽度/高度    |
| `--pui-icon-button-radius` | `var(--pui-radius-control)`   | 圆角半径         |
| `--pui-icon-button-bg`     | `var(--pui-color-primary)`    | 背景             |
| `--pui-icon-button-fg`     | `var(--pui-color-on-primary)` | 图标颜色         |
| `--pui-icon-button-shadow` | `var(--pui-elevation-1)`      | 投影             |

## 用法

```svelte
<IconButton label="Search" variant="tonal">
  <svg><!-- search icon --></svg>
</IconButton>

<IconButton label="Settings" variant="outlined" style="--pui-icon-button-bg: oklch(0.9 0.05 250);">
  <svg><!-- gear icon --></svg>
</IconButton>
```
