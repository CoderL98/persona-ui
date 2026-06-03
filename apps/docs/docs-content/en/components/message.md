---
title: Message
group: components
---

# Message

A lightweight inline message notification with auto-dismiss, four tones, and flexible placement.

## Import

```svelte
<script>
  import { Message } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                                  | Default          | Description                              |
| ---------------- | ----------------------------------------------------- | ---------------- | ---------------------------------------- |
| `open`           | `boolean`                                             | `true`           | Whether the message is visible           |
| `tone`           | `'info' \| 'success' \| 'warning' \| 'error'`         | `'info'`         | Color tone                               |
| `title`          | `string`                                              | —                | Bold title                               |
| `description`    | `string`                                              | —                | Description text                         |
| `children`       | `Snippet`                                             | —                | Custom content (overrides description)   |
| `leading`        | `Snippet`                                             | —                | Custom leading icon                      |
| `duration`       | `number`                                              | `0`              | Auto-close duration in ms (0 = no auto)  |
| `closable`       | `boolean`                                             | `true`           | Show close button                        |
| `placement`      | `'top' \| 'top-right' \| 'top-left' \| 'bottom' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Screen position |
| `onOpenChange`   | `(open: boolean) => void`                             | —                | Fired when open state changes            |
| `onTimeout`      | `() => void`                                          | —                | Fired when the auto-close timer fires    |

## Usage

```svelte
<script>
  import { Message } from '@persona-ui/lib';
  let saved = $state(false);
</script>

<button onclick={() => { saved = true; }}>Save</button>

{#if saved}
  <Message
    tone="success"
    title="Saved!"
    description="Your changes have been saved."
    duration={3000}
    onOpenChange={(o) => { if (!o) saved = false; }}
  />
{/if}
```

### Persistent message

```svelte
<Message
  tone="warning"
  title="Action required"
  description="Please verify your email address."
  closable={false}
  placement="top"
/>
```

## Tones

- `info` — Blue, `role="status"`, `aria-live="polite"`
- `success` — Green, `role="status"`, `aria-live="polite"`
- `warning` — Yellow, `role="status"`, `aria-live="polite"`
- `error` — Red, `role="alert"`, `aria-live="assertive"`

## Accessibility

- `role="status"` (info/success/warning) or `role="alert"` (error)
- `aria-live` reflects severity
- Default tone-specific icons (decorative, `aria-hidden`)
- Close button has a clear `aria-label`
