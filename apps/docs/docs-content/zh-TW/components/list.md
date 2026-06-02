---
title: 清單
group: components
---

# 清單

提供 plain / inset / grouped 變體的清單容器。

## API

| Prop      | Type                          | Default   | Description  |
| --------- | ----------------------------- | --------- | ------------ |
| `variant` | `'plain'\|'inset'\|'grouped'` | `'plain'` | 視覺樣式     |

## Usage

```svelte
<List variant="grouped">
  {#snippet children()}
    <ListItem title="Item 1" />
    <ListItem title="Item 2" />
  {/snippet}
</List>
```
