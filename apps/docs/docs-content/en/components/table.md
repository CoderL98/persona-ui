---
title: Table
group: components
---

# Table

## Import

```svelte
<script>
  import { Table } from '@persona-ui/lib';
</script>
```

Basic HTML table with density and striped mode.

## API

| Prop      | Type                                 | Default    | Description            |
| --------- | ------------------------------------ | ---------- | ---------------------- |
| `density` | `'compact'\|'normal'\|'comfortable'` | `'normal'` | Row height             |
| `striped` | `boolean`                            | `false`    | Alternating row colors |

## Usage

```svelte
<Table striped>
  <thead><tr><th>Name</th></tr></thead>
  <tbody><tr><td>Alice</td></tr></tbody>
</Table>
```
