---
title: 抽屉
group: components
---

# 抽屉

侧边抽屉，用于导航或辅助内容。

## API

| Prop   | Type              | Default  | Description |
| ------ | ----------------- | -------- | ----------- |
| `side` | `'left'\|'right'` | `'left'` | 抽屉方向    |

## 用法

```svelte
<Drawer side="left">
  {#snippet title()}Navigation{/snippet}
  <nav>...</nav>
</Drawer>
```
