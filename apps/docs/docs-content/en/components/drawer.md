---
title: Drawer
group: components
---

# Drawer

Side drawer for navigation or secondary content.

## API

| Prop   | Type              | Default  | Description |
| ------ | ----------------- | -------- | ----------- |
| `side` | `'left'\|'right'` | `'left'` | Drawer side |

## Usage

```svelte
<Drawer side="left">
  {#snippet title()}Navigation{/snippet}
  <nav>...</nav>
</Drawer>
```
