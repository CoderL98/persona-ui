---
title: Form
group: components
---

# Form

A semantic form container with submit handling, layout options, and an actions slot for buttons.

## Import

```svelte
<script>
  import { Form, FormField, TextField, Button } from '@persona-ui/lib';
</script>
```

## API

| Prop        | Type                          | Default      | Description                          |
| ----------- | ----------------------------- | ------------ | ------------------------------------ |
| `onSubmit`  | `(e: SubmitEvent) => void`    | —            | Form submit handler                  |
| `layout`    | `'vertical' \| 'horizontal'`  | `'vertical'` | Field layout direction               |
| `disabled`  | `boolean`                     | `false`      | Reserved (no native form disabled)   |
| `children`  | `Snippet`                     | —            | Form body content                    |
| `actions`   | `Snippet`                     | —            | Footer action buttons area           |
| `class`     | `string`                      | —            | Additional CSS classes               |
| `style`     | `string`                      | —            | Inline style                         |

## FormField

A label + helper/error wrapper for a single form field.

| Prop         | Type      | Default | Description            |
| ------------ | --------- | ------- | ---------------------- |
| `label`      | `string`  | —       | Visible label          |
| `required`   | `boolean` | `false` | Required asterisk      |
| `helperText` | `string`  | —       | Helper text below      |
| `error`      | `string`  | —       | Error message + role   |
| `children`   | `Snippet` | —       | The actual field       |

## Usage

```svelte
<Form
  layout="vertical"
  onSubmit={(e) => console.log('submit')}
  actions={() => html`<Button type="submit">Save</Button>`}
>
  <FormField label="Email" required>
    <TextField type="email" placeholder="you@example.com" />
  </FormField>
  <FormField label="Password" error="Required">
    <TextField type="password" />
  </FormField>
</Form>
```

## Accessibility

- The outer `<form>` element handles native form submission
- Each `FormField` produces a `<label>` linked to its child by `for`/`id`
- Error text is announced via `role="alert"`
- Pressing Enter inside any field triggers submit
