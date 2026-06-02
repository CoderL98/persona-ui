# @persona-ui/lib

Svelte 5 dual-personality component library — Apple HIG & Material 3 in one API.

## Install

```bash
pnpm add @persona-ui/lib
```

Peer dep: `svelte ^5.0.0`

## Quick start

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '@persona-ui/lib/styles.css';
</script>

<html data-theme="apple" data-mode="light">
  <slot />
</html>
```

```svelte
<!-- any component -->
<script>
  import { Button } from '@persona-ui/lib';
</script>

<Button variant="filled">Click me</Button>
```

## Switch theme

Toggle the `data-theme` attribute on `<html>` (or any container):

```svelte
<html data-theme="apple" data-mode="light">
  <!-- ... -->
</html>
```

| Attribute        | Values                  | Effect                            |
| ---------------- | ----------------------- | --------------------------------- |
| `data-theme`     | `'apple'` \| `'material'` | Visual grammar                  |
| `data-mode`      | `'light'` \| `'dark'`     | Color scheme                    |

Themes can be scoped to any subtree:

```html
<div data-theme="material" data-mode="dark">
  <Button variant="filled">Material dark button</Button>
</div>
```

## Local override

Every component exposes CSS variable tokens for per-instance customization:

```svelte
<Button
  variant="filled"
  style="--pui-button-radius: 2px; --pui-button-bg: oklch(0.5 0.18 145);"
>
  Custom
</Button>
```

See each component's documentation for its full token list.

## API surface

40+ components across 5 groups:

- **Foundation** — Button, IconButton, Card, Divider, Badge, Chip, Avatar, Kbd
- **Form** — TextField, Textarea, Checkbox, Radio, Switch, Slider, Select, Combobox, SearchField, DatePicker, TimePicker, DateRangePicker
- **Feedback** — Alert, Banner, Toast, Progress, Spinner, Skeleton, EmptyState
- **Overlay** — Tooltip, Popover, Menu, Dialog, CommandPalette, Drawer
- **Navigation** — Tabs, SegmentedControl, Breadcrumb, Toolbar, Sidebar
- **Data** — List, Accordion, Table, Calendar, TreeView

All components support the Svelte 5 snippet API and forward extra attributes to their root element.

## Tree-shaking

Import individual components for optimal bundle size:

```ts
import Button from '@persona-ui/lib/components/button/Button.svelte';
import '@persona-ui/lib/styles.css';
```

The library is `sideEffects: ["**/*.css"]` — only the stylesheet you import counts as a side effect.

## License

MIT

[中文文档](./README_CN.md)
