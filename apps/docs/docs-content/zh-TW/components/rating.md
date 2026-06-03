---
title: Rating
group: components
---

# Rating

可互動的星級評分元件，支援半星、完整鍵盤控制和唯讀模式。

## Import

```svelte
<script>
  import { Rating } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                | Default      | Description                  |
| ---------------- | ----------------------------------- | ------------ | ---------------------------- |
| `value`          | `number`                            | —            | 受控值（0 到 max）            |
| `defaultValue`   | `number`                            | `0`          | 非受控預設值                  |
| `max`            | `number`                            | `5`          | 星數                          |
| `allowHalf`      | `boolean`                           | `false`      | 允許半星（基於滑鼠位置）        |
| `readonly`       | `boolean`                           | `false`      | 唯讀模式                      |
| `disabled`       | `boolean`                           | `false`      | 禁用狀態                      |
| `size`           | `'sm' \| 'md' \| 'lg'`              | `'md'`       | 尺寸變體                      |
| `color`          | `string`                            | warning      | 啟用顏色                      |
| `inactiveColor`  | `string`                            | outline      | 未啟用顏色                    |
| `aria-label`     | `string`                            | `'評分'`     | 無障礙標籤                    |
| `onValueChange`  | `(value: number) => void`           | —            | 值變化時觸發                  |
| `onHoverChange`  | `(value: number) => void`           | —            | 懸停值變化時觸發（0 表示清除）  |
| `icon`           | `Snippet`                           | 星形         | 自訂圖示（覆蓋預設星形）       |

## 鍵盤

- `←` / `→` — 減 1 / 加 1（`allowHalf` 時為 0.5）
- `Shift + ←` / `Shift + →` — 減 1 / 加 1
- `Home` — 設為 0
- `End` — 設為 max

## Usage

```svelte
<script>
  import { Rating } from '@persona-ui/lib';
  let rating = $state(3);
</script>

<Rating bind:value={rating} />

<!-- 半星支援 -->
<Rating bind:value={rating} allowHalf />

<!-- 唯讀展示 -->
<Rating value={4} readonly />

<!-- 自訂顏色 -->
<Rating bind:value={rating} color="#3b82f6" />
```

## Accessibility

- 根節點是 `role="slider"`，帶 `aria-valuemin/max/now`
- `aria-valuetext` 提供 "N out of M" 朗讀
- `aria-readonly` / `aria-disabled` 反映狀態
- 每個星形按鈕都有 `aria-label`
