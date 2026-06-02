---
title: Textarea
group: components
---

# Textarea

A multi-line text input with label, helper text, error state, and configurable resize behavior.

## Import

```svelte
<script>
  import { Textarea } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                                                | Default     | Description                                       |
| -------------- | --------------------------------------------------- | ----------- | ------------------------------------------------- |
| `value`        | `string`                                            | —           | Controlled value                                  |
| `defaultValue` | `string`                                            | `''`        | Uncontrolled default                              |
| `label`        | `string`                                            | —           | Visible label                                     |
| `placeholder`  | `string`                                            | —           | Placeholder text                                  |
| `helperText`   | `string`                                            | —           | Helper / caption text                             |
| `error`        | `string`                                            | —           | Error message (sets `aria-invalid`)               |
| `disabled`     | `boolean`                                           | `false`     | Disabled state                                    |
| `readonly`     | `boolean`                                           | `false`     | Read-only                                         |
| `required`     | `boolean`                                           | `false`     | Required indicator                                |
| `minlength`    | `number`                                            | —           | HTML5 minimum character count                     |
| `maxlength`    | `number`                                            | —           | HTML5 maximum character count                     |
| `rows`         | `number`                                            | `4`         | Initial visible rows                              |
| `resize`       | `'none' \| 'vertical' \| 'horizontal' \| 'both'`    | `'vertical'`| CSS resize handle behavior                        |
| `name`         | `string`                                            | —           | Form name (participates in native form submit)    |
| `leading`      | `Snippet`                                           | —           | Leading element                                   |
| `trailing`     | `Snippet`                                           | —           | Trailing element                                  |
| `class`        | `string`                                            | —           | Additional CSS classes                            |
| `style`        | `string`                                            | —           | Inline style (for token overrides)                |
| `oninput`      | `(e: Event) => void`                                | —           | Input handler                                     |
| `onchange`     | `(e: Event) => void`                                | —           | Change handler                                    |

All other attributes are forwarded to the underlying `<textarea>`.

## Usage

```svelte
<Textarea label="Description" placeholder="Tell us about your project…" rows={6} />

<Textarea
  label="Bio"
  maxlength={280}
  helperText="Up to 280 characters."
  resize="none"
/>

<Textarea label="Required field" required error="This field is required." />
```
