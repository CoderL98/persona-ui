---
title: Menu
group: components
---

# Menu

Dropdown menu with items, keyboard navigation, destructive/shortcut support.

## API

| Prop       | Type           | Description                                            |
| ---------- | -------------- | ------------------------------------------------------ |
| `items`    | `MenuItem[]`   | Menu items with id/label/disabled/destructive/shortcut |
| `trigger`  | `Snippet`      | Trigger element                                        |
| `onselect` | `(id) => void` | Selection callback                                     |

## Usage

```svelte
<Menu items={[{id:'edit',label:'Edit'},{id:'delete',label:'Delete',destructive:true}]}>
  {#snippet trigger()}<Button>Menu</Button>{/snippet}
</Menu>
```
