---
title: 按鈕
group: components
---

# Button 按鈕

## Import

```svelte
<script>
  import { 按鈕 } from '@persona-ui/lib';
</script>
```

一個多功能的按鈕元件，提供 4 種視覺變體與 3 種尺寸。

## 匯入

```svelte
<script>
  import { Button } from '@persona-ui/lib';
</script>
```

## API

| Prop       | Type                                           | Default    | Description                              |
| ---------- | ---------------------------------------------- | ---------- | ---------------------------------------- |
| `variant`  | `'filled' \| 'tonal' \| 'outlined' \| 'ghost'` | `'filled'` | 視覺變體                                 |
| `size`     | `'sm' \| 'md' \| 'lg'`                         | `'md'`     | 尺寸預設                                 |
| `disabled` | `boolean`                                      | `false`    | 停用狀態                                 |
| `loading`  | `boolean`                                      | `false`    | 顯示載入指示器並設定 `aria-busy`         |
| `children` | `Snippet`                                      | —          | 標籤/內容                                |
| `leading`  | `Snippet`                                      | —          | 前置圖示                                 |
| `trailing` | `Snippet`                                      | —          | 後置圖示                                 |
| `class`    | `string`                                       | —          | 附加的 CSS 類別                          |
| `style`    | `string`                                       | —          | 行內樣式（用於覆寫 token）               |
| `onclick`  | `(e: MouseEvent) => void`                      | —          | 點擊處理函式                             |

其餘屬性會透傳至底層的 `<button>` 元素。

## 變體

| Variant    | Apple                                | Material                                       |
| ---------- | ------------------------------------ | ---------------------------------------------- |
| `filled`   | 半透明 primary 背景，大圓角          | 不透明 primary，膠囊形狀，附加 state layer     |
| `elevated` | 抬升的半透明控制項，柔和陰影         | 抬升表面按鈕，MD3 elevation 2                  |
| `tonal`    | primary-container 背景，無陰影       | primary-container 背景，無陰影                 |
| `outlined` | 透明背景，細微邊框                   | 透明背景，outline 邊框                         |
| `text`     | 透明，純文字，類連結外觀             | 透明，純文字，附加 state layer                 |

## 狀態

- **hover**：Apple — 放大 1.02；Material — state layer 覆蓋
- **focus-visible**：2px primary 顏色的外框線
- **pressed**：Apple — 縮小 0.97；Material — state layer 覆蓋
- **disabled**：38% 不透明度，停用指標事件
- **loading**：顯示載入指示器，`aria-busy="true"`，停用點擊

## 元件 Token

| Token                       | Default                       | Purpose            |
| --------------------------- | ----------------------------- | ------------------ |
| `--pui-button-bg`           | `var(--pui-color-primary)`    | 背景色             |
| `--pui-button-fg`           | `var(--pui-color-on-primary)` | 文字顏色           |
| `--pui-button-radius`       | `var(--pui-radius-control)`   | 圓角半徑           |
| `--pui-button-gap`          | `var(--pui-space-2)`          | 元素之間的間距     |
| `--pui-button-padding-x`    | `var(--pui-space-4)`          | 水平內邊距         |
| `--pui-button-padding-y`    | `var(--pui-space-2)`          | 垂直內邊距         |
| `--pui-button-shadow`       | `var(--pui-elevation-1)`      | 陰影               |
| `--pui-button-border-color` | `transparent`                 | 邊框顏色           |

## 本機覆寫範例

```svelte
<Button
  variant="filled"
  style="--pui-button-radius: 2px; --pui-button-bg: oklch(0.5 0.25 300);"
>
  Custom Button
</Button>
```
