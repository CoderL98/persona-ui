---
title: Toast
group: components
---

# Toast

## Import

```svelte
<script>
  import { Toast } from '@persona-ui/lib';
</script>
```

Temporary notification with auto-dismiss, 4 tones, and action support.

## API

| Prop                 | Type                                    | Default  | Description                    |
| -------------------- | --------------------------------------- | -------- | ------------------------------ |
| `tone`               | `'info'\|'success'\|'warning'\|'error'` | `'info'` | Color tone                     |
| `open`/`defaultOpen` | `boolean`                               | `false`  | Controlled/uncontrolled        |
| `duration`           | `number`                                | `5000`   | Auto-dismiss ms (0=no dismiss) |
| `dismissible`        | `boolean`                               | `true`   | Show close button              |
| `onOpenChange`       | `(open) => void`                        | —        | Open state callback            |
| `texts`              | `{ dismiss: string }`                      | —        | Text overrides (see below) |

## Usage

```svelte
<Toast defaultOpen tone="success">Saved!</Toast>
```
