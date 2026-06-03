---
title: Combobox
group: components
---

# Combobox

A filterable single- or multi-select dropdown with a free-text input. Multi-select renders selected items as removable tags.

## Import

```svelte
<script>
  import { Combobox } from '@persona-ui/lib';
</script>
```

## API

| Prop                | Type                       | Default | Description                                          |
| ------------------- | -------------------------- | ------- | ---------------------------------------------------- |
| `value`             | `string \| string[]`       | —       | Controlled value (array when `multiple`)            |
| `defaultValue`      | `string \| string[]`       | —       | Uncontrolled default                                 |
| `multiple`          | `boolean`                  | `false` | Enable multi-select with tag chips                   |
| `inputValue`        | `string`                   | —       | Controlled text in the input                         |
| `defaultInputValue` | `string`                   | `''`    | Uncontrolled default input text                      |
| `options`           | `ComboboxOption[]`         | —       | Options to filter / select                           |
| `placeholder`       | `string`                   | —       | Placeholder for the input                            |
| `label`             | `string`                   | —       | Visible label                                        |
| `helperText`        | `string`                   | —       | Helper / caption text                                |
| `error`             | `string`                   | —       | Error message (sets `aria-invalid`)                  |
| `disabled`          | `boolean`                  | `false` | Disabled state                                       |
| `texts`             | `Record<string, string>`   | —       | Override internal display strings per instance       |
| `class`             | `string`                   | —       | Additional CSS classes                               |
| `style`             | `string`                   | —       | Inline style                                         |
| `onInputChange`           | `(inputValue: string, e: Event) => void` | — | Input text change handler                |
| `onValueChange`          | `(value, e: Event) => void` | —       | Selection change handler                             |

`ComboboxOption` shape: `{ value: string, label: string, disabled?: boolean }`

## Usage

```svelte
<!-- Single-select -->
<Combobox
  label="Pick a fruit"
  placeholder="Search…"
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
  ]}
/>

<!-- Multi-select -->
<Combobox
  multiple
  label="Tags"
  defaultValue={['svelte', 'tailwind']}
  options={[
    { value: 'svelte', label: 'Svelte' },
    { value: 'tailwind', label: 'Tailwind' },
    { value: 'typescript', label: 'TypeScript' }
  ]}
/>
```
