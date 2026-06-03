---
title: Select
group: components
---

# Select

A dropdown selector with both an in-page listbox and a native `<select>` rendering mode.

## Import

```svelte
<script>
  import { Select } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type             | Default | Description                                       |
| -------------- | ---------------- | ------- | ------------------------------------------------- |
| `value`        | `string`         | —       | Controlled selected value                         |
| `defaultValue` | `string`         | —       | Uncontrolled default                              |
| `options`      | `SelectOption[]` | —       | Options to render in the listbox                  |
| `native`       | `boolean`        | `false` | Use the platform-native `<select>` instead of the listbox |
| `name`         | `string`         | —       | Form name (used by native mode for submission)    |
| `placeholder`  | `string`         | —       | Placeholder when nothing is selected              |
| `label`        | `string`         | —       | Visible label                                     |
| `helperText`   | `string`         | —       | Helper / caption text                             |
| `error`        | `string`         | —       | Error message (sets `aria-invalid`)               |
| `disabled`     | `boolean`        | `false` | Disabled state                                    |
| `texts`        | `Record<string, string>` | — | Override any internal display strings per instance |
| `class`        | `string`         | —       | Additional CSS classes                            |
| `style`        | `string`         | —       | Inline style                                      |
| `onValueChange`     | `(value: string, e: Event) => void` | — | Selection change handler              |

`SelectOption` shape: `{ value: string, label: string, disabled?: boolean }`

## Native mode

Set `native` to render the platform's native `<select>` — useful for mobile where the OS picker offers a better experience.

```svelte
<Select
  native
  name="country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'cn', label: 'China' },
    { value: 'jp', label: 'Japan' }
  ]}
/>
```

## Usage

```svelte
<Select
  label="Favorite framework"
  placeholder="Pick one"
  defaultValue="svelte"
  options={[
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' }
  ]}
/>
```
