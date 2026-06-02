---
title: 抽屜面板
group: components
---

# Sheet

由底部/左側/右側/頂部滑出的浮層面板。

## API

| Prop    | Type                               | Default    | Description        |
| ------- | ---------------------------------- | ---------- | ------------------ |
| `side`  | `'top'\|'right'\|'bottom'\|'left'` | `'bottom'` | 進入方向           |
| `texts` | `{ close: string }`                | —          | 文字覆寫（見下文） |

## 用法

```svelte
<Sheet side="bottom">
  {#snippet title()}Sheet Title{/snippet}
  <p>Sheet content.</p>
</Sheet>
```
