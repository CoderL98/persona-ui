---
title: 圖示按鈕
group: components
---

# IconButton 圖示按鈕

## Import

```svelte
<script>
  import { 圖示按鈕 } from '@persona-ui/lib';
</script>
```

一個帶有可存取標籤的圓形純圖示按鈕。

## 匯入

```svelte
<script>
  import { IconButton } from '@persona-ui/lib';
</script>
```

## API

| Prop       | Type                                          | Default      | Description                       |
| ---------- | --------------------------------------------- | ------------ | --------------------------------- |
| `variant`  | `'filled' \| 'tonal' \| 'outlined' \| 'text'` | `'filled'`   | 視覺變體                          |
| `size`     | `'sm' \| 'md' \| 'lg'`                        | `'md'`       | 尺寸預設                          |
| `label`    | `string`                                      | **required** | 可存取標籤（`aria-label`）        |
| `disabled` | `boolean`                                     | `false`      | 停用狀態                          |
| `loading`  | `boolean`                                     | `false`      | 顯示載入指示器並設定 `aria-busy`  |
| `children` | `Snippet`                                     | —            | 圖示內容                          |
| `class`    | `string`                                      | —            | 附加的 CSS 類別                   |
| `style`    | `string`                                      | —            | 行內樣式（用於覆寫 token）        |
| `onClick`            | `(e: MouseEvent) => void`                     | —            | 點擊處理函式                      |

## 元件 Token

| Token                      | Default                       | Purpose          |
| -------------------------- | ----------------------------- | ---------------- |
| `--pui-icon-button-size`   | `40px`                        | 按鈕寬度/高度    |
| `--pui-icon-button-radius` | `var(--pui-radius-control)`   | 圓角半徑         |
| `--pui-icon-button-bg`     | `var(--pui-color-primary)`    | 背景             |
| `--pui-icon-button-fg`     | `var(--pui-color-on-primary)` | 圖示顏色         |
| `--pui-icon-button-shadow` | `var(--pui-elevation-1)`      | 陰影             |

## 用法

```svelte
<IconButton label="Search" variant="tonal">
  <svg><!-- search icon --></svg>
</IconButton>

<IconButton label="Settings" variant="outlined" style="--pui-icon-button-bg: oklch(0.9 0.05 250);">
  <svg><!-- gear icon --></svg>
</IconButton>
```
