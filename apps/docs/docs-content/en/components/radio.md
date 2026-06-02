---
title: Radio
group: components
---

# Radio

A single-selection group of mutually exclusive options, plus standalone `Radio` items.

## Import

```svelte
<script>
  import { RadioGroup, Radio } from '@persona-ui/lib';
</script>
```

## API

### RadioGroup

| Prop           | Type                                | Default       | Description                            |
| -------------- | ----------------------------------- | ------------- | -------------------------------------- |
| `value`        | `string`                            | —             | Controlled selected value              |
| `defaultValue` | `string`                            | —             | Uncontrolled default                   |
| `name`         | `string`                            | —             | Form name — shared by all child radios |
| `orientation`  | `'horizontal' \| 'vertical'`        | `'vertical'`  | Layout direction                       |
| `disabled`     | `boolean`                           | `false`       | Disables every child radio             |
| `label`        | `string`                            | —             | Group label                            |
| `class`        | `string`                            | —             | Additional CSS classes                 |
| `style`        | `string`                            | —             | Inline style                           |
| `onchange`     | `(value: string, e: Event) => void` | —             | Selection change handler               |

### Radio

| Prop       | Type     | Default | Description           |
| ---------- | -------- | ------- | --------------------- |
| `value`    | `string` | —       | The value submitted when selected |
| `label`    | `string` | —       | Visible label         |
| `disabled` | `boolean` | `false` | Disabled state      |
| `class`    | `string` | —       | Additional CSS classes |
| `style`    | `string` | —       | Inline style         |

## Usage

```svelte
<RadioGroup label="Choose one" name="plan">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" defaultChecked />
  <Radio value="team" label="Team" />
</RadioGroup>

<RadioGroup label="Size" orientation="horizontal" defaultValue="m">
  <Radio value="s" label="S" />
  <Radio value="m" label="M" />
  <Radio value="l" label="L" />
</RadioGroup>
```
