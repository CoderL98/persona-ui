---
title: TimePicker
group: components
---

# TimePicker

A time-of-day picker with 12h and 24h formats, configurable minute steps, and full keyboard support.

## Import

```svelte
<script>
  import { TimePicker } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                  | Default  | Description                                |
| -------------- | --------------------- | -------- | ------------------------------------------ |
| `value`        | `string`              | —        | Controlled value (HH:MM string)            |
| `defaultValue` | `string`              | —        | Uncontrolled default                       |
| `format`       | `'12h' \| '24h'`      | `'24h'`  | Time format — 12h shows AM/PM              |
| `minuteStep`   | `number`              | `5`      | Minute step (must divide 60)               |
| `placeholder`  | `string`              | —        | Placeholder when no time selected          |
| `label`        | `string`              | —        | Visible label                              |
| `helperText`   | `string`              | —        | Helper / caption text                      |
| `error`        | `string`              | —        | Error message (sets `aria-invalid`)        |
| `disabled`     | `boolean`             | `false`  | Disabled state                             |
| `texts`        | `Record<string, string>` | —     | Override internal display strings          |
| `class`        | `string`              | —        | Additional CSS classes                     |
| `style`        | `string`              | —        | Inline style                               |
| `onValueChange`     | `(time: string) => void` | —     | Fires when user selects a time             |

## Usage

```svelte
<TimePicker label="Start time" format="12h" minuteStep={15} />

<TimePicker
  label="Alarm"
  defaultValue="07:30"
  format="24h"
  minuteStep={5}
/>

<TimePicker label="End time" error="Pick an end time after the start." />
```
