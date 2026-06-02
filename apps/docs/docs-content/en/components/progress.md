---
title: Progress
group: components
---

# Progress

Progress bar with determinate and indeterminate modes.

## API

| Prop            | Type      | Default | Description               |
| --------------- | --------- | ------- | ------------------------- |
| `value`         | `number`  | —       | Current value             |
| `max`           | `number`  | `100`   | Maximum value             |
| `indeterminate` | `boolean` | `false` | Animated unknown progress |
| `texts`   | `{ progress: string }` | — | Text overrides (see below) |

## Usage

```svelte
<Progress value={65} />
<Progress indeterminate />
```
