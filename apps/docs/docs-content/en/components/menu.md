---
title: Menu
group: components
---

# Menu

## Import

```svelte
<script>
  import { Menu } from '@persona-ui/lib';
</script>
```

Dropdown menu with items, keyboard navigation, destructive/shortcut support.

## API

| Prop       | Type           | Description                                            |
| ---------- | -------------- | ------------------------------------------------------ |
| `items`    | `MenuItem[]`   | Menu items with id/label/disabled/destructive/shortcut |
| `trigger`  | `Snippet`      | Trigger element                                        |
| `onSelect` | `(id) => void` | Selection callback                                     |

## Usage

```svelte
<Menu items={[{id:'edit',label:'Edit'},{id:'delete',label:'Delete',destructive:true}]}>
  {#snippet trigger()}<Button>Menu</Button>{/snippet}
</Menu>
```
