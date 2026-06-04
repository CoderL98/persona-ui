---
title: Alert
group: components
---

# Alert

## Import

```svelte
<script>
  import { Alert } from '@persona-ui/lib';
</script>
```

Alert component with 4 tones (info/success/warning/error), 3 variants, and dismissible mode.

## API

| Prop          | Type                                    | Default  | Description       |
| ------------- | --------------------------------------- | -------- | ----------------- |
| `tone`        | `'info'\|'success'\|'warning'\|'error'` | `'info'` | Color tone        |
| `variant`     | `'soft'\|'outlined'\|'filled'`          | `'soft'` | Visual style      |
| `dismissible` | `boolean`                               | `false`  | Show close button |
| `title`       | `Snippet`                               | —        | Title content     |
| `children`    | `Snippet`                               | —        | Body content      |
| `icon`        | `Snippet`                               | —        | Leading icon      |
| `actions`     | `Snippet`                               | —        | Action buttons    |
| `onDismiss`   | `(e) => void`                           | —        | Dismiss handler   |
| `texts`       | `{ dismiss: string }`                   | —        | Text overrides (see below) |

## Usage

```svelte
<Alert tone="error">An error occurred.</Alert>
<Alert tone="info" dismissible>Dismiss me.</Alert>
```
