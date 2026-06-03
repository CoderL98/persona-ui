---
title: Switch
group: components
---

# Switch

A toggle component with accessible `role="switch"`.

## Import

```svelte
<script>
  import { Switch } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                 | Default | Description                        |
| ---------------- | -------------------- | ------- | ---------------------------------- |
| `checked`        | `boolean`            | —       | Controlled checked state           |
| `defaultChecked` | `boolean`            | `false` | Uncontrolled default               |
| `disabled`       | `boolean`            | `false` | Disabled state                     |
| `label`          | `string`             | —       | Visible label                      |
| `class`          | `string`             | —       | Additional CSS classes             |
| `style`          | `string`             | —       | Inline style (for token overrides) |
| `onValueChange`       | `(e: Event) => void` | —       | Change handler                     |

All other attributes are forwarded to the root `<div>` element.

## Controlled vs Uncontrolled

```svelte
<!-- Controlled -->
<Switch checked={notifications} onValueChange={(e) => toggle()} />

<!-- Uncontrolled -->
<Switch defaultChecked label="Enable notifications" />
```

## Accessibility

- Uses `role="switch"` with `aria-checked`
- Focusable via Tab
- Visible label via `label` prop or `aria-label`
- Keyboard: click/Enter to toggle

## Component Tokens

| Token                           | Default                            | Purpose         |
| ------------------------------- | ---------------------------------- | --------------- |
| `--pui-switch-track-bg`         | `var(--pui-ref-gray-30)`           | Track off color |
| `--pui-switch-track-checked-bg` | `var(--pui-color-primary)`         | Track on color  |
| `--pui-switch-thumb-bg`         | `var(--pui-ref-gray-0)`            | Thumb color     |
| `--pui-switch-track-width`      | `44px` (Apple) / `52px` (Material) | Track width     |
| `--pui-switch-track-height`     | `24px` (Apple) / `32px` (Material) | Track height    |

## Usage

```svelte
<Switch label="Airplane Mode" defaultChecked />
<Switch label="Notifications" disabled />
<Switch style="--pui-switch-track-checked-bg: oklch(0.7 0.2 150);" defaultChecked label="Green toggle" />
```
