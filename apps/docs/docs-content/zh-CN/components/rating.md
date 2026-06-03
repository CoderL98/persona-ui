---
title: 评分
group: components
---

# Rating

可交互的星级评分组件，支持半星、完整键盘控制和只读模式。

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
| `defaultValue`   | `number`                            | `0`          | 非受控默认值                  |
| `max`            | `number`                            | `5`          | 星数                          |
| `allowHalf`      | `boolean`                           | `false`      | 允许半星（基于鼠标位置）        |
| `readonly`       | `boolean`                           | `false`      | 只读模式                      |
| `disabled`       | `boolean`                           | `false`      | 禁用状态                      |
| `size`           | `'sm' \| 'md' \| 'lg'`              | `'md'`       | 尺寸变体                      |
| `color`          | `string`                            | warning      | 激活颜色                      |
| `inactiveColor`  | `string`                            | outline      | 未激活颜色                    |
| `aria-label`     | `string`                            | `'评分'`     | 无障碍标签                    |
| `onValueChange`  | `(value: number) => void`           | —            | 值变化时触发                  |
| `onHoverChange`  | `(value: number) => void`           | —            | 悬停值变化时触发（0 表示清除）  |
| `icon`           | `Snippet`                           | 星形         | 自定义图标（覆盖默认星形）     |

## 键盘

- `←` / `→` — 减 1 / 加 1（`allowHalf` 时为 0.5）
- `Shift + ←` / `Shift + →` — 减 1 / 加 1
- `Home` — 设为 0
- `End` — 设为 max

## Usage

```svelte
<script>
  import { Rating } from '@persona-ui/lib';
  let rating = $state(3);
</script>

<Rating bind:value={rating} />

<!-- 半星支持 -->
<Rating bind:value={rating} allowHalf />

<!-- 只读展示 -->
<Rating value={4} readonly />

<!-- 自定义颜色 -->
<Rating bind:value={rating} color="#3b82f6" />
```

## Accessibility

- 根节点是 `role="slider"`，带 `aria-valuemin/max/now`
- `aria-valuetext` 提供 "N out of M" 朗读
- `aria-readonly` / `aria-disabled` 反映状态
- 每个星形按钮都有 `aria-label`
