---
title: 卡片
group: components
---

# Card 卡片

## Import

```svelte
<script>
  import { 卡片 } from '@persona-ui/lib';
</script>
```

用于将相关内容组合在一起的容器组件。

## 导入

```svelte
<script>
  import { Card } from '@persona-ui/lib';
</script>
```

## API

| Prop       | Type                                   | Default      | Description                |
| ---------- | -------------------------------------- | ------------ | -------------------------- |
| `variant`  | `'elevated' \| 'filled' \| 'outlined'` | `'elevated'` | 视觉变体                   |
| `padding`  | `'sm' \| 'md' \| 'lg'`                 | `'md'`       | 内部留白                   |
| `title`    | `Snippet`                              | —            | 标题区域                   |
| `children` | `Snippet`                              | —            | 主体内容                   |
| `actions`  | `Snippet`                              | —            | 底部操作区                 |
| `class`    | `string`                               | —            | 附加的 CSS 类              |
| `style`    | `string`                               | —            | 内联样式（用于覆盖 token） |

其余属性会透传到根 `<div>` 元素。

## 变体

| Variant    | Apple                                          | Material                                     |
| ---------- | ---------------------------------------------- | -------------------------------------------- |
| `elevated` | 半透明背景，柔和阴影，22px 圆角                | surface 背景，MD3 elevation，12px 圆角       |
| `filled`   | 着色的半透明背景，无阴影                       | surface-container 背景，无阴影               |
| `outlined` | 透明背景，细微描边                             | surface 背景，outline 描边                   |

## 组件 Token

| Token                  | Default                       | Purpose      |
| ---------------------- | ----------------------------- | ------------ |
| `--pui-card-bg`        | `var(--pui-surface-raised)`   | 背景         |
| `--pui-card-radius`    | `var(--pui-radius-container)` | 圆角半径     |
| `--pui-card-elevation` | `var(--pui-elevation-1)`      | 投影         |
| `--pui-card-padding`   | `var(--pui-space-4)`          | 内部留白     |

## 用法

```svelte
<Card variant="elevated" padding="md">
  {#snippet title()}
    <h3>Card Title</h3>
  {/snippet}
  <p>Main content goes here.</p>
  {#snippet actions()}
    <Button variant="filled">Action</Button>
  {/snippet}
</Card>
```
