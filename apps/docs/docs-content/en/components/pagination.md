---
title: Pagination
group: components
---

# Pagination

Page navigation with prev/next, ellipsis collapsing, and optional jump-to-page input.

## Import

```svelte
<script>
  import { Pagination } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                       | Default        | Description                              |
| ---------------- | -------------------------- | -------------- | ---------------------------------------- |
| `value`          | `number`                   | —              | Controlled current page (1-indexed)      |
| `defaultValue`   | `number`                   | `1`            | Uncontrolled default page                |
| `total`          | `number`                   | —              | Total number of pages                    |
| `siblingCount`   | `number`                   | `1`            | Pages shown on each side of current      |
| `showEdges`      | `boolean`                  | `true`         | Always show first/last page              |
| `showJumpTo`     | `boolean`                  | `false`        | Show "Go to" quick-jump input            |
| `disabled`       | `boolean`                  | `false`        | Disabled state                           |
| `aria-label`     | `string`                   | `'Pagination'` | Accessible label                         |
| `onValueChange`  | `(page: number) => void`   | —              | Fired when page changes                  |

## Keyboard

- `←` / `→` — Previous / next page
- `Home` / `End` — Jump to first / last page
- `Tab` — Move between page buttons

## Usage

```svelte
<script>
  let page = $state(1);
</script>

<Pagination
  total={20}
  bind:value={page}
  siblingCount={2}
  showJumpTo
  onValueChange={(p) => console.log('Page:', p)}
/>
```

## Behavior

- For `total <= 7`, all pages are shown without ellipsis
- For larger totals, ellipses collapse the middle pages
- `aria-current="page"` is set on the active page
- Previous button is disabled on page 1, Next on last page

## Accessibility

- Root is `<nav>` with `aria-label`
- Each page is a labeled `<button>`
- Active page uses `aria-current="page"`
- Jump-to input has a `<label>` association
