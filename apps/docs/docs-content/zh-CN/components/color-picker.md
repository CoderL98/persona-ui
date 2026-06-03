---
title: ColorPicker
group: components
---

# ColorPicker

颜色选择器，带预设色板、hex/RGB/HSL 输入框和原生拾色器回退。

## Import

```svelte
<script>
  import { ColorPicker } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                | Default     | Description                |
| ---------------- | ----------------------------------- | ----------- | -------------------------- |
| `value`          | `string`                            | —           | 受控 hex 颜色              |
| `defaultValue`   | `string`                            | `'#000000'` | 非受控默认颜色              |
| `showPalette`    | `boolean`                           | `true`      | 显示预设色板                |
| `palette`        | `string[]`                          | 20 色色板   | 自定义 hex 颜色数组         |
| `showInput`      | `boolean`                           | `true`      | 显示 hex 输入 + 原生拾色器  |
| `format`         | `'hex' \| 'rgb' \| 'hsl'`           | `'hex'`     | 触发器上显示的格式          |
| `disabled`       | `boolean`                           | `false`     | 禁用状态                    |
| `aria-label`     | `string`                            | `'颜色选择器'` | 无障碍标签                  |
| `onValueChange`  | `(color: string) => void`           | —           | 颜色变化时触发              |

## Usage

```svelte
<script>
  import { ColorPicker } from '@persona-ui/lib';
  let color = $state('#5b8def');
</script>

<ColorPicker bind:value={color} />
<p>已选：{color}</p>
```

### 自定义色板

```svelte
<ColorPicker
  bind:value={color}
  palette={['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6']}
/>
```

### RGB / HSL 显示

```svelte
<ColorPicker bind:value={color} format="rgb" />
<ColorPicker bind:value={color} format="hsl" />
```

## Accessibility

- 触发器是带 `aria-haspopup="dialog"` 的标签化 `<button>`
- 每个色板是 `role="option"` 带 `aria-selected`
- hex 输入框有关联的 `<label>`
- 原生拾色器作为精确颜色输入的回退
