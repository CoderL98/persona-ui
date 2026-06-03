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

用於將相關內容組合在一起的容器元件。

## 匯入

```svelte
<script>
  import { Card } from '@persona-ui/lib';
</script>
```

## API

| Prop       | Type                                   | Default      | Description                |
| ---------- | -------------------------------------- | ------------ | -------------------------- |
| `variant`  | `'elevated' \| 'filled' \| 'outlined'` | `'elevated'` | 視覺變體                   |
| `padding`  | `'sm' \| 'md' \| 'lg'`                 | `'md'`       | 內部留白                   |
| `title`    | `Snippet`                              | —            | 標題區域                   |
| `children` | `Snippet`                              | —            | 主體內容                   |
| `actions`  | `Snippet`                              | —            | 底部操作區                 |
| `class`    | `string`                               | —            | 附加的 CSS 類別            |
| `style`    | `string`                               | —            | 行內樣式（用於覆寫 token） |

其餘屬性會透傳至根 `<div>` 元素。

## 變體

| Variant    | Apple                                          | Material                                     |
| ---------- | ---------------------------------------------- | -------------------------------------------- |
| `elevated` | 半透明背景，柔和陰影，22px 圓角                | surface 背景，MD3 elevation，12px 圓角       |
| `filled`   | 著色的半透明背景，無陰影                       | surface-container 背景，無陰影               |
| `outlined` | 透明背景，細微邊框                             | surface 背景，outline 邊框                   |

## 元件 Token

| Token                  | Default                       | Purpose      |
| ---------------------- | ----------------------------- | ------------ |
| `--pui-card-bg`        | `var(--pui-surface-raised)`   | 背景         |
| `--pui-card-radius`    | `var(--pui-radius-container)` | 圓角半徑     |
| `--pui-card-elevation` | `var(--pui-elevation-1)`      | 陰影         |
| `--pui-card-padding`   | `var(--pui-space-4)`          | 內部留白     |

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
