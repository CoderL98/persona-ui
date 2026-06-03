---
title: DateRangePicker
group: components
---

# DateRangePicker

A calendar-driven range picker with configurable granularity (year, month, day, hour, minute, second).

## Import

```svelte
<script>
  import { DateRangePicker } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                  | Default       | Description                                          |
| -------------- | --------------------- | ------------- | ---------------------------------------------------- |
| `value`        | `DateRangeValue`      | —             | Controlled value — `{ start, end }`                 |
| `defaultValue` | `DateRangeValue`      | —             | Uncontrolled default                                 |
| `granularity`  | `'year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second'` | `'day'` | Selection granularity |
| `min`          | `Date`                | —             | Minimum selectable date                              |
| `max`          | `Date`                | —             | Maximum selectable date                              |
| `locale`       | `string`              | `'en-US'`     | Locale for date formatting                           |
| `placeholder`  | `string`              | —             | Placeholder when no range selected                   |
| `label`        | `string`              | —             | Visible label                                        |
| `helperText`   | `string`              | —             | Helper / caption text                                |
| `error`        | `string`              | —             | Error message (sets `aria-invalid`)                  |
| `disabled`     | `boolean`             | `false`       | Disabled state                                       |
| `texts`        | `Record<string, string>` | —         | Override internal display strings                    |
| `footer`       | `Snippet`             | —             | Custom footer content (e.g. preset shortcuts)        |
| `class`        | `string`              | —             | Additional CSS classes                               |
| `style`        | `string`              | —             | Inline style                                         |
| `onValueChange`     | `(range: DateRangeValue) => void` | — | Fires when the user picks a range (values are always full `Date` objects) |

`DateRangeValue` shape: `{ start: Date \| null, end: Date \| null }`

## Granularity

Pick the lowest precision your range needs:

```svelte
<!-- Year-only: pick "2024 — 2025" -->
<DateRangePicker granularity="year" />

<!-- With time -->
<DateRangePicker granularity="hour" />
<DateRangePicker granularity="minute" />
```

## Usage

```svelte
<DateRangePicker
  label="Trip dates"
  defaultValue={{ start: new Date('2026-06-01'), end: new Date('2026-06-10') }}
/>
```
