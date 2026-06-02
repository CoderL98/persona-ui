---
title: SearchField
group: components
---

# SearchField

A search-style input with a leading magnifier icon and an optional clear button.

## Import

```svelte
<script>
  import { SearchField } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                  | Default | Description                                  |
| -------------- | --------------------- | ------- | -------------------------------------------- |
| `value`        | `string`              | —       | Controlled value                             |
| `defaultValue` | `string`              | `''`    | Uncontrolled default                         |
| `placeholder`  | `string`              | —       | Placeholder text                             |
| `label`        | `string`              | —       | Visible label                                |
| `clearable`    | `boolean`             | `true`  | Show a clear (×) button when value is non-empty |
| `disabled`     | `boolean`             | `false` | Disabled state                               |
| `texts`        | `Record<string, string>` | —   | Override internal display strings            |
| `class`        | `string`              | —       | Additional CSS classes                       |
| `style`        | `string`              | —       | Inline style                                 |
| `onInput`      | `(value: string, e: Event) => void` | — | Fires on every keystroke             |
| `onClear`      | `(e: MouseEvent) => void` | —   | Fires when the clear button is clicked      |

## Usage

```svelte
<SearchField placeholder="Search components…" />

<SearchField label="Find user" onInput={(v) => console.log(v)} />

<SearchField defaultValue="svelte" clearable />
```
