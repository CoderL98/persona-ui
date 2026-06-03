---
title: 虚拟列表
group: components
---

# VirtualList

虚拟滚动列表，只渲染可见区域内的项目，用于大型数据集的流畅滚动。

## Import

```svelte
<script>
  import { VirtualList } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                                | Default | Description                  |
| ---------------- | --------------------------------------------------- | ------- | ---------------------------- |
| `itemCount`      | `number`                                            | —       | 项目总数                      |
| `itemHeight`     | `number`                                            | —       | 每个项目固定高度（px）         |
| `height`         | `number`                                            | —       | 视口高度（px）                |
| `overscan`       | `number`                                            | `3`     | 视口外额外渲染的项目数         |
| `aria-label`     | `string`                                            | —       | 列表区域无障碍标签            |
| `item`           | `Snippet<[{ index: number; style: string }]>`       | —       | 项目渲染函数                  |
| `onRangeChange`  | `(range: { start: number; end: number }) => void`   | —       | 可见范围变化时触发            |

## Usage

```svelte
<script>
  import { VirtualList } from '@persona-ui/lib';

  const count = 10_000;
</script>

<VirtualList
  {itemCount}
  itemHeight={48}
  height={400}
  item={(p) => `<div style="${p.style}">Item #${p.index + 1}</div>`}
  onRangeChange={(r) => console.log('可见:', r)}
/>
```

> **注意**：`item` snippet 接收 `{ index, style }`，其中 `style` 是带项目固定高度的 CSS 字符串。

## 行为

- 只渲染可见区域 + overscan 范围内的项目
- 总滚动条高度 = `itemCount × itemHeight`
- `scrollTop` 变化重新计算可见范围
- `itemCount` 变化时重置滚动到顶部

## 使用场景

- 超过 100 项的列表，全量渲染性能差
- 等高行（组件假定统一高度）
- 变高项目需用其他虚拟化策略

## Accessibility

- 视口是带 `aria-label` 的可滚动区域
- 项目从渲染内容继承可聚焦性
- 键盘滚动（方向键、Page Up/Down）按预期工作
