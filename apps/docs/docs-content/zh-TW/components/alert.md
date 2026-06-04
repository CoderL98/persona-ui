---
title: 提示框
group: components
---

# Alert

## Import

```svelte
<script>
  import { 提示框 } from '@persona-ui/lib';
</script>
```

Alert 元件，支援 4 種語義色調（info/success/warning/error）、3 種視覺變體，以及可關閉模式。

## API

| Prop          | Type                                    | Default  | Description       |
| ------------- | --------------------------------------- | -------- | ----------------- |
| `tone`        | `'info'\|'success'\|'warning'\|'error'` | `'info'` | 顏色色調          |
| `variant`     | `'soft'\|'outlined'\|'filled'`          | `'soft'` | 視覺樣式          |
| `dismissible` | `boolean`                               | `false`  | 顯示關閉按鈕      |
| `title`       | `Snippet`                               | —        | 標題內容          |
| `children`    | `Snippet`                               | —        | 主體內容          |
| `icon`        | `Snippet`                               | —        | 前置圖示          |
| `actions`     | `Snippet`                               | —        | 操作按鈕          |
| `onDismiss`   | `(e) => void`                           | —        | 關閉事件處理函式  |
| `texts`       | `{ dismiss: string }`                   | —        | 文字覆寫（見下文）|

## 用法

```svelte
<Alert tone="error">An error occurred.</Alert>
<Alert tone="info" dismissible>Dismiss me.</Alert>
```
