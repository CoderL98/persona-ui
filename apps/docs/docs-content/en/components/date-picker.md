---
title: DatePicker
group: components
---

# DatePicker

Date picker combining TextField + Popover + Calendar.

## API

| Prop          | Type             | Default         | Description             |
| ------------- | ---------------- | --------------- | ----------------------- |
| `label`       | `string`         | —               | Field label             |
| `placeholder` | `string`         | `'Pick a date'` | Input placeholder       |
| `locale`      | `string`         | `'en-US'`       | Date format locale      |
| `onValueChange`    | `(date) => void` | —               | Date selection callback |
| `texts`       | `{ pickDate: string }`    | —               | Text overrides (see below) |

## Usage

```svelte
<DatePicker label="Start date" />
```
