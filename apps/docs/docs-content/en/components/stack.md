---
title: Stack
group: components
---

# Stack

A flexbox layout primitive for vertical/horizontal stacking with consistent gap, alignment, and justify controls.

## Import

```svelte
<script>
  import { Stack } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                                                | Default     | Description                |
| ---------------- | ------------------------------------------------------------------- | ----------- | -------------------------- |
| `direction`      | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'`           | `'column'`  | Flex direction             |
| `align`          | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'`           | `'stretch'` | Cross-axis alignment       |
| `justify`        | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'`   | Main-axis alignment        |
| `gap`            | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12`                   | `0`         | Gap between children       |
| `wrap`           | `'wrap' \| 'nowrap' \| 'wrap-reverse'`                              | `'nowrap'`  | Flex wrap                  |
| `inline`         | `boolean`                                                           | `false`     | Use `inline-flex`          |
| `children`       | `Snippet`                                                           | —           | Stack children             |

## Usage

```svelte
<Stack direction="column" gap={4} align="center">
  <h2>Title</h2>
  <p>Description</p>
  <Button>Action</Button>
</Stack>
```

### Horizontal toolbar

```svelte
<Stack direction="row" gap={2} align="center" justify="between">
  <span>Logo</span>
  <Stack direction="row" gap={1}>
    <Button variant="ghost">Login</Button>
    <Button>Sign up</Button>
  </Stack>
</Stack>
```

### Inline stack

```svelte
<Stack inline direction="row" gap={2} align="center">
  <Badge>New</Badge>
  <span>Item label</span>
</Stack>
```

## Benefits over plain Tailwind

- Type-safe `direction` / `align` / `justify` / `gap` / `wrap` enums
- Gap values aligned to the design system spacing scale
- No need to memorize which Tailwind class maps to which axis
