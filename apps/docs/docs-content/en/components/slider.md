---
title: Slider
group: components
---

# Slider

A single-value or range slider with optional tick marks, supporting keyboard navigation.

## Import

```svelte
<script>
  import { Slider } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                          | Default | Description                                  |
| -------------- | ----------------------------- | ------- | -------------------------------------------- |
| `value`        | `number \| [number, number]`  | —       | Controlled value (tuple for range)           |
| `defaultValue` | `number \| [number, number]`  | —       | Uncontrolled default                         |
| `min`          | `number`                      | `0`     | Minimum value                                |
| `max`          | `number`                      | `100`   | Maximum value                                |
| `step`         | `number`                      | `1`     | Step increment                               |
| `marks`        | `SliderMark[]`                | —       | Tick marks along the track (must align with `step`) |
| `range`        | `boolean`                     | `false` | Enable dual-thumb range mode                 |
| `disabled`     | `boolean`                     | `false` | Disabled state                               |
| `label`        | `string`                      | —       | Visible label                                |
| `showValue`    | `boolean`                     | `false` | Display the current value next to the label  |
| `class`        | `string`                      | —       | Additional CSS classes                       |
| `style`        | `string`                      | —       | Inline style                                 |
| `oninput`      | `(value, e: Event) => void`   | —       | Fires while dragging                         |
| `onchange`     | `(value, e: Event) => void`   | —       | Fires when the user releases the thumb       |

`SliderMark` shape: `{ value: number, label?: string }`

## Usage

```svelte
<!-- Single value -->
<Slider min={0} max={100} defaultValue={30} showValue />

<!-- Range -->
<Slider range defaultValue={[20, 80]} min={0} max={100} />

<!-- With marks -->
<Slider min={0} max={100} step={25} marks={[
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' }
]} />
```
