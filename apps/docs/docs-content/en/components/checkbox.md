---
title: Checkbox
group: components
---

# Checkbox

A binary toggle with label and description, supporting `indeterminate` state for partial group selection.

## Import

```svelte
<script>
  import { Checkbox } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                  | Default | Description                                          |
| ---------------- | ------------------------------------- | ------- | ---------------------------------------------------- |
| `checked`        | `boolean`                             | —       | Controlled checked state                             |
| `defaultChecked` | `boolean`                             | `false` | Uncontrolled default                                 |
| `indeterminate`  | `boolean`                             | `false` | Indeterminate state (visually distinct, not a tri-state value) |
| `disabled`       | `boolean`                             | `false` | Disabled state                                       |
| `label`          | `string`                              | —       | Visible label                                        |
| `description`    | `string`                              | —       | Helper text under the label                          |
| `name`           | `string`                              | —       | Form name — participates in native form submission   |
| `value`          | `string`                              | `'on'`  | Form value submitted when checked                    |
| `required`       | `boolean`                             | `false` | Required indicator                                   |
| `class`          | `string`                              | —       | Additional CSS classes                               |
| `style`          | `string`                              | —       | Inline style                                         |
| `onCheckedChange`     | `(checked: boolean, e: Event) => void` | —       | Change handler                                       |

## States

- **checked** — filled box, value submitted on form
- **unchecked** — empty box
- **indeterminate** — dash icon; use for parent of a partial group
- **disabled** — 38% opacity, no pointer events

## Usage

```svelte
<Checkbox label="I agree to the terms" defaultChecked />
<Checkbox label="Subscribe to newsletter" />
<Checkbox indeterminate label="Select all" description="3 of 5 selected" />
<Checkbox disabled label="Locked option" />
```
