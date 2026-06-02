---
title: 橫幅
group: components
---

# Banner

頁面級橫幅，支援 4 種語義色調與吸頂模式。

## API

| Prop     | Type                                    | Default  | Description           |
| -------- | --------------------------------------- | -------- | --------------------- |
| `tone`   | `'info'\|'success'\|'warning'\|'error'` | `'info'` | 顏色色調              |
| `sticky` | `boolean`                               | `false`  | 吸附於視口頂部        |

## 用法

```svelte
<Banner tone="warning">Your session will expire soon.</Banner>
```
