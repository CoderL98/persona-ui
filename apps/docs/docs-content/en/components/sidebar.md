---
title: Sidebar
group: components
---

# Sidebar

## Import

```svelte
<script>
  import { Sidebar } from '@persona-ui/lib';
</script>
```

Collapsible sidebar with header/content/footer sections.

## API

| Prop                           | Type      | Description     |
| ------------------------------ | --------- | --------------- |
| `collapsed`/`defaultCollapsed` | `boolean` | Collapsed state |
| `header`                       | `Snippet` | Top section     |
| `children`                     | `Snippet` | Content section |
| `footer`                       | `Snippet` | Bottom section  |
| `texts`                        | `{ toggle: string }` | Text overrides (see below) |

## Usage

```svelte
<Sidebar>
  {#snippet header()}<h3>Menu</h3>{/snippet}
  <nav>...</nav>
</Sidebar>
```
