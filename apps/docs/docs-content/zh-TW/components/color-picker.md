---
title: ColorPicker
group: components
---

# ColorPicker

顏色選擇器，帶預設色板、hex/RGB/HSL 輸入框和原生拾色器回退。

## Import

```svelte
<script>
  import { ColorPicker } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                | Default     | Description              |
| ---------------- | ----------------------------------- | ----------- | ------------------------ |
| `value`          | `string`                            | —           | 受控 hex 顏色            |
| `defaultValue`   | `string`                            | `'#000000'` | 非受控預設顏色            |
| `showPalette`    | `boolean`                           | `true`      | 顯示預設色板              |
| `palette`        | `string[]`                          | 20 色色板   | 自訂 hex 顏色陣列         |
| `showInput`      | `boolean`                           | `true`      | 顯示 hex 輸入 + 原生拾色器 |
| `format`         | `'hex' \| 'rgb' \| 'hsl'`           | `'hex'`     | 觸發器上顯示的格式        |
| `disabled`       | `boolean`                           | `false`     | 禁用狀態                  |
| `aria-label`     | `string`                            | `'顏色選擇器'` | 無障礙標籤              |
| `onValueChange`  | `(color: string) => void`           | —           | 顏色變化時觸發            |

## Usage

```svelte
<script>
  import { ColorPicker } from '@persona-ui/lib';
  let color = $state('#5b8def');
</script>

<ColorPicker bind:value={color} />
<p>已選：{color}</p>
```

### 自訂色板

```svelte
<ColorPicker
  bind:value={color}
  palette={['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6']}
/>
```

### RGB / HSL 顯示

```svelte
<ColorPicker bind:value={color} format="rgb" />
<ColorPicker bind:value={color} format="hsl" />
```

## Accessibility

- 觸發器是帶 `aria-haspopup="dialog"` 的標籤化 `<button>`
- 每個色板是 `role="option"` 帶 `aria-selected`
- hex 輸入框有關聯的 `<label>`
- 原生拾色器作為精確顏色輸入的回退
