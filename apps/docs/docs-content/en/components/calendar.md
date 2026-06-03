---
title: Calendar
group: components
---

# Calendar

## Import

```svelte
<script>
  import { Calendar } from '@persona-ui/lib';
</script>
```

Month-view calendar with date selection.

## API

| Prop        | Type             | Description              |
| ----------- | ---------------- | ------------------------ | -------------------------- |
| `locale`    | `string`         | `'en-US'`                | Locale for month/day names |
| `min`/`max` | `Date`           | Min/max selectable dates |
| `onValueChange`  | `(date) => void` | Date selection callback  |
| `texts`     | `{ months: string[], weekdays: string[], prevMonth: string, nextMonth: string }` | Text overrides (see below) |

## Usage

```svelte
<Calendar onValueChange={(d) => console.log(d)} />
```
