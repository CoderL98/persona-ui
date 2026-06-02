---
title: 横幅
group: components
---

# Banner

页面级横幅，支持 4 种语义色调和吸顶模式。

## API

| Prop     | Type                                    | Default  | Description           |
| -------- | --------------------------------------- | -------- | --------------------- |
| `tone`   | `'info'\|'success'\|'warning'\|'error'` | `'info'` | 颜色色调              |
| `sticky` | `boolean`                               | `false`  | 吸附到视口顶部        |

## 用法

```svelte
<Banner tone="warning">Your session will expire soon.</Banner>
```
