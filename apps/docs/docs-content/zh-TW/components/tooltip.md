---
title: 工具提示
group: components
---

# 工具提示

支援 4 個方向的工具提示，可控制顯示延遲，hover/focus 觸發。

## API

| Prop        | Type                               | Default    | Description      |
| ----------- | ---------------------------------- | ---------- | ---------------- |
| `content`   | `string \| Snippet`                | —          | 提示內容         |
| `placement` | `'top'\|'right'\|'bottom'\|'left'` | `'bottom'` | 顯示方向         |
| `delay`     | `number`                           | `400`      | 顯示延遲（ms）   |
| `disabled`  | `boolean`                          | `false`    | 是否停用         |

## 用法

```svelte
<Tooltip content="Help text"><Button>Hover me</Button></Tooltip>
```
