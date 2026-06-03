---
title: ContextMenu
group: components
---

# ContextMenu

A right-click context menu with separator support, shortcuts, destructive actions, and full keyboard navigation.

## Import

```svelte
<script>
  import { ContextMenu } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                | Default           | Description                  |
| ---------------- | ------------------- | ----------------- | ---------------------------- |
| `open`           | `boolean`           | `false`           | Whether the menu is open     |
| `position`       | `{ x: number; y: number }` | `{ x: 0, y: 0 }` | Viewport coordinates |
| `items`          | `ContextMenuItem[]` | —                 | Menu items                   |
| `closeOnSelect`  | `boolean`           | `true`            | Close on item click          |
| `onOpenChange`   | `(open: boolean) => void` | —           | Fired when menu closes       |

### `ContextMenuItem`

```ts
type ContextMenuItem = {
  id?: string;
  label?: string;
  icon?: Snippet;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
  shortcut?: string;
  onSelect?: () => void;
};
```

## Usage

```svelte
<script>
  import { ContextMenu } from '@persona-ui/lib';
  let open = $state(false);
  let pos = $state({ x: 0, y: 0 });

  function handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    pos = { x: e.clientX, y: e.clientY };
    open = true;
  }
</script>

<div oncontextmenu={handleContextMenu}>
  Right-click here
</div>

<ContextMenu
  bind:open
  position={pos}
  items={[
    { label: 'Cut', shortcut: '⌘X', onSelect: () => console.log('Cut') },
    { separator: true },
    { label: 'Copy', shortcut: '⌘C', onSelect: () => console.log('Copy') },
    { label: 'Paste', shortcut: '⌘V', onSelect: () => console.log('Paste') },
    { separator: true },
    { label: 'Delete', destructive: true, onSelect: () => console.log('Delete') },
  ]}
/>
```

## Keyboard

- `Escape` — Close the menu
- `↑` / `↓` — Move between items
- `Enter` / `Space` — Activate the highlighted item
- Mouse hover also highlights the item

## Accessibility

- Root is `role="menu"` with `aria-orientation="vertical"`
- Items are `role="menuitem"`
- Separators are `role="separator"`
- Destructive items get a danger color
- Disabled items have `aria-disabled` and `disabled`
