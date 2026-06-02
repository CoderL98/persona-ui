---
title: 標籤晶片
group: components
---

# Chip 標籤晶片

一種用於標籤、篩選器或選項的緊湊型互動式標籤。

## API

| Prop        | Type                                                          | Default     | Description                |
| ----------- | ------------------------------------------------------------- | ----------- | -------------------------- |
| `variant`   | `'filled' \| 'outlined' \| 'text'`                            | `'filled'`  | 視覺變體                   |
| `tone`      | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'error'` | `'neutral'` | 顏色色調                   |
| `selected`  | `boolean`                                                     | `false`     | 選取狀態                   |
| `disabled`  | `boolean`                                                     | `false`     | 停用狀態                   |
| `removable` | `boolean`                                                     | `false`     | 顯示移除按鈕               |
| `children`  | `Snippet`                                                     | —           | 標籤內容                   |
| `leading`   | `Snippet`                                                     | —           | 前置圖示                   |
| `trailing`  | `Snippet`                                                     | —           | 後置圖示                   |
| `onremove`  | `(e: MouseEvent) => void`                                     | —           | 移除事件處理函式           |
| `texts`     | `{ remove: string }`                                          | —           | 文案覆寫（見下文）         |

## 用法

```svelte
<Chip>Label</Chip>
<Chip variant="outlined" selected>Active filter</Chip>
<Chip removable>Dismissable</Chip>
```
