---
title: Calendar
group: components
---

# Calendar

Month-view calendar with date selection.

## API

| Prop        | Type             | Description              |
| ----------- | ---------------- | ------------------------ | -------------------------- |
| `locale`    | `string`         | `'en-US'`                | Locale for month/day names |
| `min`/`max` | `Date`           | Min/max selectable dates |
| `onchange`  | `(date) => void` | Date selection callback  |
| `texts`     | `{ months: string[], weekdays: string[], prevMonth: string, nextMonth: string }` | Text overrides (see below) |

## Usage

```svelte
<Calendar onchange={(d) => console.log(d)} />
```
