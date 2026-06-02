---
title: Popover
group: components
---

# Popover

Popover overlay with trigger toggle, Escape close, and 6 placements.

## API

| Prop                 | Type                                                             | Default    | Description             |
| -------------------- | ---------------------------------------------------------------- | ---------- | ----------------------- |
| `open`/`defaultOpen` | `boolean`                                                        | `false`    | Controlled/uncontrolled |
| `placement`          | `'top'\|'bottom'\|'left'\|'right'\|'bottom-start'\|'bottom-end'` | `'bottom'` | Placement               |
| `trigger`            | `Snippet`                                                        | —          | Trigger element         |

## Usage

```svelte
<Popover>
  {#snippet trigger()}<Button>Open</Button>{/snippet}
  <div>Popover content</div>
</Popover>
```
