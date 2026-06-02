---
title: TextField
group: components
---

# TextField

A text input component with label, helper text, and error state.

## Import

```svelte
<script>
  import { TextField } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                                                   | Default  | Description                         |
| -------------- | ------------------------------------------------------ | -------- | ----------------------------------- |
| `value`        | `string`                                               | —        | Controlled value                    |
| `defaultValue` | `string`                                               | `''`     | Uncontrolled default                |
| `label`        | `string`                                               | —        | Visible label                       |
| `placeholder`  | `string`                                               | —        | Placeholder text                    |
| `helperText`   | `string`                                               | —        | Helper/caption text                 |
| `error`        | `string`                                               | —        | Error message (sets `aria-invalid`) |
| `type`         | `'text' \| 'email' \| 'password' \| 'search' \| 'url'` | `'text'` | Input type                          |
| `disabled`     | `boolean`                                              | `false`  | Disabled state                      |
| `readonly`     | `boolean`                                              | `false`  | Read-only                           |
| `required`     | `boolean`                                              | `false`  | Required indicator                  |
| `leading`      | `Snippet`                                              | —        | Leading icon/element                |
| `trailing`     | `Snippet`                                              | —        | Trailing icon/element               |
| `class`        | `string`                                               | —        | Additional CSS classes              |
| `style`        | `string`                                               | —        | Inline style                        |
| `oninput`      | `(e: Event) => void`                                   | —        | Input handler                       |
| `onchange`     | `(e: Event) => void`                                   | —        | Change handler                      |

All other attributes are forwarded to the `<input>` element.

## Controlled vs Uncontrolled

```svelte
<!-- Controlled -->
<TextField value={name} oninput={(e) => name = e.target.value} label="Name" />

<!-- Uncontrolled -->
<TextField defaultValue="John" label="Name" />
```

## Component Tokens

| Token                   | Default                     | Purpose            |
| ----------------------- | --------------------------- | ------------------ |
| `--pui-field-bg`        | `var(--pui-surface-base)`   | Input background   |
| `--pui-field-border`    | `var(--pui-outline)`        | Border color       |
| `--pui-field-radius`    | `var(--pui-radius-control)` | Border radius      |
| `--pui-field-padding-x` | `var(--pui-space-3)`        | Horizontal padding |
| `--pui-field-padding-y` | `var(--pui-space-2)`        | Vertical padding   |

## Usage

```svelte
<TextField label="Email" type="email" placeholder="you@example.com" helperText="We'll never share your email." />
<TextField label="Password" type="password" error="Password is required." />
```
