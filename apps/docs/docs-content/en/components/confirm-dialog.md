---
title: ConfirmDialog
group: components
---

# ConfirmDialog

A pre-built confirmation dialog with default and danger tones, loading state, and full keyboard support.

## Import

```svelte
<script>
  import { ConfirmDialog } from '@persona-ui/lib';
</script>
```

## API

| Prop               | Type                              | Default      | Description                              |
| ------------------ | --------------------------------- | ------------ | ---------------------------------------- |
| `open`             | `boolean`                         | `false`      | Whether the dialog is open               |
| `title`            | `string`                          | —            | Dialog title (required)                  |
| `description`      | `string`                          | —            | Description text                         |
| `children`         | `Snippet`                         | —            | Custom body content (overrides description) |
| `footer`           | `Snippet`                         | —            | Custom footer (overrides default buttons) |
| `tone`             | `'default' \| 'danger'`           | `'default'`  | Tone of the confirm button               |
| `confirmText`      | `string`                          | `'Confirm'`  | Confirm button text                      |
| `cancelText`       | `string`                          | `'Cancel'`   | Cancel button text                       |
| `loading`          | `boolean`                         | `false`      | Show loading state, disables buttons     |
| `closeOnOutsideClick` | `boolean`                      | `true`       | Close on backdrop click                  |
| `closeOnEscape`    | `boolean`                         | `true`       | Close on Escape                          |
| `onOpenChange`     | `(open: boolean) => void`         | —            | Fired when open state changes            |
| `onConfirm`        | `() => void`                      | —            | Fired when confirm is clicked            |
| `onCancel`         | `() => void`                      | —            | Fired when cancel is clicked / dismissed |

## Keyboard

- `Escape` — Cancel and close
- `Tab` — Move between cancel and confirm buttons

## Usage

```svelte
<script>
  import { ConfirmDialog, Button } from '@persona-ui/lib';

  let open = $state(false);
  let deleting = $state(false);

  async function handleDelete() {
    deleting = true;
    try {
      await fetch('/api/items/123', { method: 'DELETE' });
      open = false;
    } finally {
      deleting = false;
    }
  }
</script>

<Button onclick={() => open = true}>Delete</Button>

<ConfirmDialog
  bind:open
  title="Delete this item?"
  description="This action cannot be undone."
  tone="danger"
  confirmText="Delete"
  loading={deleting}
  onConfirm={handleDelete}
/>
```

## Accessibility

- Root is `role="alertdialog"` with `aria-modal="true"`
- `aria-labelledby` links to the title
- `aria-describedby` links to the description
- First focusable element receives focus on open
- Previous focus is restored on close
