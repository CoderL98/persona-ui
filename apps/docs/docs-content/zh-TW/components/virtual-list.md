---
title: 虛擬列表
group: components
---

# VirtualList

虛擬捲動清單，只渲染可見區域內的項目，用於大型資料集的流暢捲動。

## Import

```svelte
<script>
  import { VirtualList } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                                | Default | Description                  |
| ---------------- | --------------------------------------------------- | ------- | ---------------------------- |
| `itemCount`      | `number`                                            | —       | 項目總數                      |
| `itemHeight`     | `number`                                            | —       | 每個項目固定高度（px）         |
| `height`         | `number`                                            | —       | 視口高度（px）                |
| `overscan`       | `number`                                            | `3`     | 視口外額外渲染的項目數         |
| `aria-label`     | `string`                                            | —       | 清單區域無障礙標籤            |
| `item`           | `Snippet<[{ index: number; style: string }]>`       | —       | 項目渲染函式                  |
| `onRangeChange`  | `(range: { start: number; end: number }) => void`   | —       | 可見範圍變化時觸發            |

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
  onRangeChange={(r) => console.log('可見:', r)}
/>
```

> **注意**：`item` snippet 接收 `{ index, style }`，其中 `style` 是帶項目固定高度的 CSS 字串。

## 行為

- 只渲染可見區域 + overscan 範圍內的項目
- 總捲軸高度 = `itemCount × itemHeight`
- `scrollTop` 變化重新計算可見範圍
- `itemCount` 變化時重設捲動到頂部

## 使用場景

- 超過 100 項的清單，全量渲染效能差
- 等高行（元件假定統一高度）
- 變高項目需用其他虛擬化策略

## Accessibility

- 視口是帶 `aria-label` 的可捲動區域
- 項目從渲染內容繼承可聚焦性
- 鍵盤捲動（方向鍵、Page Up/Down）按預期工作
