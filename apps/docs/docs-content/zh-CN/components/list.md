---
title: 列表
group: components
---

# 列表

提供 plain / inset / grouped 变体的列表容器。

## API

| Prop      | Type                          | Default   | Description  |
| --------- | ----------------------------- | --------- | ------------ |
| `variant` | `'plain'\|'inset'\|'grouped'` | `'plain'` | 视觉样式     |

## Usage

```svelte
<List variant="grouped">
  {#snippet children()}
    <ListItem title="Item 1" />
    <ListItem title="Item 2" />
  {/snippet}
</List>
```
