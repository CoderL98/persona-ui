---
title: Rating
group: components
---

# Rating

An interactive star rating component with half-star support, full keyboard control, and read-only mode.

## Import

```svelte
<script>
  import { Rating } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                | Default      | Description                              |
| ---------------- | ----------------------------------- | ------------ | ---------------------------------------- |
| `value`          | `number`                            | —            | Controlled value (0 to max)              |
| `defaultValue`   | `number`                            | `0`          | Uncontrolled default                     |
| `max`            | `number`                            | `5`          | Number of stars                          |
| `allowHalf`      | `boolean`                           | `false`      | Allow half values (mouse-based)          |
| `readonly`       | `boolean`                           | `false`      | Read-only mode                           |
| `disabled`       | `boolean`                           | `false`      | Disabled state                           |
| `size`           | `'sm' \| 'md' \| 'lg'`              | `'md'`       | Size variant                             |
| `color`          | `string`                            | warning      | Active color                             |
| `inactiveColor`  | `string`                            | outline      | Inactive color                           |
| `aria-label`     | `string`                            | `'Rating'`   | Accessible label                         |
| `onValueChange`  | `(value: number) => void`           | —            | Called when value changes                |
| `onHoverChange`  | `(value: number) => void`           | —            | Called when hover value changes (0 to clear) |
| `icon`           | `Snippet`                           | star         | Custom icon (overrides default star)     |

## Keyboard

- `←` / `→` — Decrease / increase by 1 (or 0.5 with `allowHalf`)
- `Shift + ←` / `Shift + →` — Decrease / increase by 1
- `Home` — Set to 0
- `End` — Set to max

## Usage

```svelte
<script>
  import { Rating } from '@persona-ui/lib';
  let rating = $state(3);
</script>

<Rating bind:value={rating} />

<!-- Half-star support -->
<Rating bind:value={rating} allowHalf />

<!-- Read-only display -->
<Rating value={4} readonly />

<!-- Custom color -->
<Rating bind:value={rating} color="#3b82f6" />
```

## Accessibility

- Root is `role="slider"` with proper `aria-valuemin/max/now`
- `aria-valuetext` provides "N out of M" announcement
- `aria-readonly` / `aria-disabled` reflect state
- Each star button has an `aria-label`
