# Button

A versatile button component with 4 variants and 3 sizes.

## Import

```svelte
<script>
  import { Button } from '@persona-ui/lib';
</script>
```

## API

| Prop       | Type                                           | Default    | Description                        |
| ---------- | ---------------------------------------------- | ---------- | ---------------------------------- |
| `variant`  | `'filled' \| 'tonal' \| 'outlined' \| 'ghost'` | `'filled'` | Visual variant                     |
| `size`     | `'sm' \| 'md' \| 'lg'`                         | `'md'`     | Size preset                        |
| `disabled` | `boolean`                                      | `false`    | Disabled state                     |
| `loading`  | `boolean`                                      | `false`    | Shows spinner + `aria-busy`        |
| `children` | `Snippet`                                      | —          | Label/content                      |
| `leading`  | `Snippet`                                      | —          | Leading icon                       |
| `trailing` | `Snippet`                                      | —          | Trailing icon                      |
| `class`    | `string`                                       | —          | Additional CSS classes             |
| `style`    | `string`                                       | —          | Inline style (for token overrides) |
| `onclick`  | `(e: MouseEvent) => void`                      | —          | Click handler                      |

All other attributes are forwarded to the `<button>` element.

## Variants

| Variant    | Apple                                   | Material                                 |
| ---------- | --------------------------------------- | ---------------------------------------- |
| `filled`   | Translucent primary bg, large radius    | Opaque primary, pill-shaped, state layer |
| `elevated` | Raised translucent control, soft shadow | Elevated surface button, MD3 elevation 2 |
| `tonal`    | Primary-container bg, no shadow         | Primary-container bg, no shadow          |
| `outlined` | Transparent bg, subtle border           | Transparent bg, outline border           |
| `text`     | Transparent, text only, link-like       | Transparent, text-only, state layer      |

## States

- **hover**: Apple — scale 1.02; Material — state layer overlay
- **focus-visible**: 2px primary color outline
- **pressed**: Apple — scale 0.97; Material — state layer overlay
- **disabled**: 38% opacity, no pointer events
- **loading**: Shows spinner, `aria-busy="true"`, click disabled

## Component Tokens

| Token                       | Default                       | Purpose              |
| --------------------------- | ----------------------------- | -------------------- |
| `--pui-button-bg`           | `var(--pui-color-primary)`    | Background color     |
| `--pui-button-fg`           | `var(--pui-color-on-primary)` | Text color           |
| `--pui-button-radius`       | `var(--pui-radius-control)`   | Border radius        |
| `--pui-button-gap`          | `var(--pui-space-2)`          | Gap between elements |
| `--pui-button-padding-x`    | `var(--pui-space-4)`          | Horizontal padding   |
| `--pui-button-padding-y`    | `var(--pui-space-2)`          | Vertical padding     |
| `--pui-button-shadow`       | `var(--pui-elevation-1)`      | Box shadow           |
| `--pui-button-border-color` | `transparent`                 | Border color         |

## Local Override Example

```svelte
<Button
  variant="filled"
  style="--pui-button-radius: 2px; --pui-button-bg: oklch(0.5 0.25 300);"
>
  Custom Button
</Button>
```
