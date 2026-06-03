---
title: Dialog
group: components
---

# Dialog

## Import

```svelte
<script>
  import { Dialog } from '@persona-ui/lib';
</script>
```

Modal dialog with title, description, footer, focus trap, and Escape close.

## API

| Prop                  | Type             | Default | Description             |
| --------------------- | ---------------- | ------- | ----------------------- |
| `open`/`defaultOpen`  | `boolean`        | `false` | Controlled/uncontrolled |
| `modal`               | `boolean`        | `true`  | aria-modal              |
| `closeOnEscape`       | `boolean`        | `true`  | Escape to close         |
| `closeOnOutsideClick` | `boolean`        | `true`  | Backdrop click to close |
| `onOpenChange`        | `(open) => void` | —       | Open state callback     |
| `texts`               | `{ close: string }`      | —       | Text overrides (see below) |

## Usage

```svelte
<Dialog>
  {#snippet title()}Confirm{/snippet}
  <p>Are you sure?</p>
</Dialog>
```
