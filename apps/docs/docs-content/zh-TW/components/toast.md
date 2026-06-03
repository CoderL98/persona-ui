---
title: 輕提示
group: components
---

# Toast

## Import

```svelte
<script>
  import { 輕提示 } from '@persona-ui/lib';
</script>
```

暫時性通知元件，支援自動關閉、4 種語義色調及操作按鈕。

## API

| Prop                 | Type                                    | Default  | Description                          |
| -------------------- | --------------------------------------- | -------- | ------------------------------------ |
| `tone`               | `'info'\|'success'\|'warning'\|'error'` | `'info'` | 顏色色調                             |
| `open`/`defaultOpen` | `boolean`                               | `false`  | 受控/非受控模式                      |
| `duration`           | `number`                                | `5000`   | 自動關閉毫秒數（0 表示不自動關閉）   |
| `dismissible`        | `boolean`                               | `true`   | 顯示關閉按鈕                         |
| `onOpenChange`       | `(open) => void`                        | —        | 開啟狀態變更回呼                     |
| `texts`              | `{ dismiss: string }`                   | —        | 文字覆寫（見下文）                   |

## 用法

```svelte
<Toast defaultOpen tone="success">Saved!</Toast>
```
