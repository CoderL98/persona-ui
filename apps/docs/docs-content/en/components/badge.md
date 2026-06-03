---
title: Badge
group: components
---

# Badge

## Import

```svelte
<script>
  import { Badge } from '@persona-ui/lib';
</script>
```

A small label for counts, statuses, or notifications.

## API

| Prop       | Type                                                          | Default     | Description             |
| ---------- | ------------------------------------------------------------- | ----------- | ----------------------- |
| `tone`     | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'error'` | `'neutral'` | Color tone              |
| `size`     | `'sm' \| 'md'`                                                | `'md'`      | Size                    |
| `dot`      | `boolean`                                                     | `false`     | Dot-only mode           |
| `count`    | `number`                                                      | —           | Numeric count           |
| `max`      | `number`                                                      | `99`        | Max before showing `N+` |
| `children` | `Snippet`                                                     | —           | Custom label content    |

## Usage

```svelte
<Badge count={5} />
<Badge count={100} max={99} />
<Badge dot tone="error" />
<Badge tone="primary">New</Badge>
```
