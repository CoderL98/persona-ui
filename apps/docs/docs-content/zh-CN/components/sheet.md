---
title: 抽屉面板
group: components
---

# Sheet

从底部/左侧/右侧/顶部滑出的浮层面板。

## API

| Prop    | Type                               | Default    | Description        |
| ------- | ---------------------------------- | ---------- | ------------------ |
| `side`  | `'top'\|'right'\|'bottom'\|'left'` | `'bottom'` | 进入方向           |
| `texts` | `{ close: string }`                | —          | 文案覆盖（见下文） |

## 用法

```svelte
<Sheet side="bottom">
  {#snippet title()}Sheet Title{/snippet}
  <p>Sheet content.</p>
</Sheet>
```
