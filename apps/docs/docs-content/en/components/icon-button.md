---
title: IconButton
group: components
---

# IconButton

A circular icon-only button with accessible label.

## Import

```svelte
<script>
  import { IconButton } from '@persona-ui/lib';
</script>
```

## API

| Prop       | Type                                          | Default      | Description                        |
| ---------- | --------------------------------------------- | ------------ | ---------------------------------- |
| `variant`  | `'filled' \| 'tonal' \| 'outlined' \| 'text'` | `'filled'`   | Visual variant                     |
| `size`     | `'sm' \| 'md' \| 'lg'`                        | `'md'`       | Size preset                        |
| `label`    | `string`                                      | **required** | Accessible label (`aria-label`)    |
| `disabled` | `boolean`                                     | `false`      | Disabled state                     |
| `loading`  | `boolean`                                     | `false`      | Shows spinner, `aria-busy`         |
| `children` | `Snippet`                                     | —            | Icon content                       |
| `class`    | `string`                                      | —            | Additional CSS classes             |
| `style`    | `string`                                      | —            | Inline style (for token overrides) |
| `onclick`  | `(e: MouseEvent) => void`                     | —            | Click handler                      |

## Component Tokens

| Token                      | Default                       | Purpose             |
| -------------------------- | ----------------------------- | ------------------- |
| `--pui-icon-button-size`   | `40px`                        | Button width/height |
| `--pui-icon-button-radius` | `var(--pui-radius-control)`   | Border radius       |
| `--pui-icon-button-bg`     | `var(--pui-color-primary)`    | Background          |
| `--pui-icon-button-fg`     | `var(--pui-color-on-primary)` | Icon color          |
| `--pui-icon-button-shadow` | `var(--pui-elevation-1)`      | Box shadow          |

## Usage

```svelte
<IconButton label="Search" variant="tonal">
  <svg><!-- search icon --></svg>
</IconButton>

<IconButton label="Settings" variant="outlined" style="--pui-icon-button-bg: oklch(0.9 0.05 250);">
  <svg><!-- gear icon --></svg>
</IconButton>
```
