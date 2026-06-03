---
title: ColorPicker
group: components
---

# ColorPicker

A color picker with preset palette, hex/RGB/HSL input, and native color picker fallback.

## Import

```svelte
<script>
  import { ColorPicker } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                | Default     | Description                              |
| ---------------- | ----------------------------------- | ----------- | ---------------------------------------- |
| `value`          | `string`                            | —           | Controlled hex color                     |
| `defaultValue`   | `string`                            | `'#000000'` | Uncontrolled default color               |
| `showPalette`    | `boolean`                           | `true`      | Show preset color swatches               |
| `palette`        | `string[]`                          | 20-color set | Custom palette of hex strings            |
| `showInput`      | `boolean`                           | `true`      | Show hex input + native color picker     |
| `format`         | `'hex' \| 'rgb' \| 'hsl'`           | `'hex'`     | Display format on the trigger            |
| `disabled`       | `boolean`                           | `false`     | Disabled state                           |
| `aria-label`     | `string`                            | `'Color picker'` | Accessible label                    |
| `onValueChange`  | `(color: string) => void`           | —           | Called whenever the color changes        |

## Usage

```svelte
<script>
  import { ColorPicker } from '@persona-ui/lib';
  let color = $state('#5b8def');
</script>

<ColorPicker bind:value={color} />
<p>Selected: {color}</p>
```

### Custom palette

```svelte
<ColorPicker
  bind:value={color}
  palette={['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6']}
/>
```

### RGB / HSL display

```svelte
<ColorPicker bind:value={color} format="rgb" />
<ColorPicker bind:value={color} format="hsl" />
```

## Accessibility

- Trigger is a labeled `<button>` with `aria-haspopup="dialog"`
- Each palette swatch is `role="option"` with `aria-selected`
- Hex input has a `<label>` association
- Native color picker is provided as a fallback for color-precise input
