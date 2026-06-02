---
title: Tooltip
group: components
---

# Tooltip

Tooltip with 4 placement directions, delay control, hover/focus trigger.

## API

| Prop        | Type                               | Default    | Description     |
| ----------- | ---------------------------------- | ---------- | --------------- |
| `content`   | `string \| Snippet`                | —          | Tooltip content |
| `placement` | `'top'\|'right'\|'bottom'\|'left'` | `'bottom'` | Direction       |
| `delay`     | `number`                           | `400`      | Show delay (ms) |
| `disabled`  | `boolean`                          | `false`    | Disable tooltip |

## Usage

```svelte
<Tooltip content="Help text"><Button>Hover me</Button></Tooltip>
```
