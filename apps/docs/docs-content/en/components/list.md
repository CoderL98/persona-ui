---
title: List
group: components
---

# List

## Import

```svelte
<script>
  import { List } from '@persona-ui/lib';
</script>
```

List container with plain/inset/grouped variants.

## API

| Prop      | Type                          | Default   | Description  |
| --------- | ----------------------------- | --------- | ------------ |
| `variant` | `'plain'\|'inset'\|'grouped'` | `'plain'` | Visual style |

## Usage

```svelte
<List variant="grouped">
  {#snippet children()}
    <ListItem title="Item 1" />
    <ListItem title="Item 2" />
  {/snippet}
</List>
```
