---
title: BottomNavigation
group: components
---

# BottomNavigation

A mobile-style bottom navigation bar with icons, labels, badges, and roving tabindex keyboard support.

## Import

```svelte
<script>
  import { BottomNavigation } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                  | Default                 | Description                          |
| ---------------- | ------------------------------------- | ----------------------- | ------------------------------------ |
| `value`          | `string`                              | —                       | Controlled active item id            |
| `defaultValue`   | `string`                              | —                       | Uncontrolled default                 |
| `items`          | `BottomNavigationItem[]`               | —                       | Items to display                     |
| `showLabels`     | `boolean`                             | `true`                  | Show labels next to icons            |
| `iconsOnly`      | `boolean`                             | `false`                 | Hide labels (icons only)             |
| `aria-label`     | `string`                              | `'Bottom navigation'`   | Accessible label for the nav         |
| `onValueChange`  | `(id: string) => void`                | —                       | Fired when active item changes       |

### `BottomNavigationItem`

```ts
type BottomNavigationItem = {
  id: string;
  label: string;
  icon: Snippet;
  badge?: number | string;
  disabled?: boolean;
};
```

## Keyboard

- `Tab` / `Shift+Tab` — Enter / leave the navigation
- `←` / `→` / `↑` / `↓` — Move between items
- `Home` / `End` — Jump to first / last item
- `Enter` / `Space` — Activate the focused item

## Usage

```svelte
<script>
  import { BottomNavigation } from '@persona-ui/lib';
  let active = $state('home');
</script>

<BottomNavigation
  bind:value={active}
  items={[
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'search', label: 'Search', icon: SearchIcon },
    { id: 'inbox', label: 'Inbox', icon: InboxIcon, badge: 3 },
    { id: 'profile', label: 'Profile', icon: ProfileIcon },
  ]}
/>
```

## Accessibility

- Root is `<nav>` with `aria-label`
- Each item is a `<button>` with `role="tab"` and `aria-selected`
- Active item also gets `aria-current="page"`
- Disabled items have `aria-disabled` and `tabindex="-1"`
- Safe-area insets are respected (notched devices)
