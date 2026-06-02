# Card

A container component for grouping related content.

## Import

```svelte
<script>
  import { Card } from '@persona-ui/lib';
</script>
```

## API

| Prop       | Type                                   | Default      | Description                        |
| ---------- | -------------------------------------- | ------------ | ---------------------------------- |
| `variant`  | `'elevated' \| 'filled' \| 'outlined'` | `'elevated'` | Visual variant                     |
| `padding`  | `'sm' \| 'md' \| 'lg'`                 | `'md'`       | Inner padding                      |
| `title`    | `Snippet`                              | —            | Header/title area                  |
| `children` | `Snippet`                              | —            | Main body content                  |
| `actions`  | `Snippet`                              | —            | Bottom action area                 |
| `class`    | `string`                               | —            | Additional CSS classes             |
| `style`    | `string`                               | —            | Inline style (for token overrides) |

All other attributes are forwarded to the root `<div>` element.

## Variants

| Variant    | Apple                                    | Material                               |
| ---------- | ---------------------------------------- | -------------------------------------- |
| `elevated` | Translucent bg, soft shadow, 22px radius | Surface bg, MD3 elevation, 12px radius |
| `filled`   | Tinted translucent bg, no shadow         | Surface-container bg, no shadow        |
| `outlined` | Transparent bg, subtle border            | Surface bg, outline border             |

## Component Tokens

| Token                  | Default                       | Purpose       |
| ---------------------- | ----------------------------- | ------------- |
| `--pui-card-bg`        | `var(--pui-surface-raised)`   | Background    |
| `--pui-card-radius`    | `var(--pui-radius-container)` | Border radius |
| `--pui-card-elevation` | `var(--pui-elevation-1)`      | Box shadow    |
| `--pui-card-padding`   | `var(--pui-space-4)`          | Inner padding |

## Usage

```svelte
<Card variant="elevated" padding="md">
  {#snippet title()}
    <h3>Card Title</h3>
  {/snippet}
  <p>Main content goes here.</p>
  {#snippet actions()}
    <Button variant="filled">Action</Button>
  {/snippet}
</Card>
```
