---
title: Timeline
group: components
---

# Timeline

垂直或水平排列的事件時間軸，支援時間戳、狀態點和可選內容。

## Import

```svelte
<script>
  import { Timeline } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                                | Default        | Description              |
| -------------- | ----------------------------------- | -------------- | ------------------------ |
| `items`        | `TimelineItem[]`                    | —              | 時間軸條目列表            |
| `orientation`  | `'vertical' \| 'horizontal'`        | `'vertical'`   | 佈局方向                  |
| `activeIndex`  | `number`                            | `-1`           | 高亮當前條目              |
| `pending`      | `boolean`                           | `false`        | 最後連線顯示脈衝動畫      |
| `aria-label`   | `string`                            | `'時間軸'`     | 無障礙標籤                |

### `TimelineItem`

```ts
type TimelineItem = {
  id?: string;
  title?: string;
  content?: Snippet;
  timestamp?: string;
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
  icon?: Snippet;
  meta?: string;
};
```

## Usage

```svelte
<script>
  import { Timeline } from '@persona-ui/lib';

  const events = [
    { id: '1', title: '訂單已下單', timestamp: '2小時前', status: 'success' },
    { id: '2', title: '付款確認', timestamp: '2小時前', status: 'success' },
    { id: '3', title: '已出貨', timestamp: '1小時前', status: 'info' },
    { id: '4', title: '派送中', timestamp: '5分鐘前', status: 'info' },
  ];
</script>

<Timeline items={events} activeIndex={2} />
```

## 狀態顏色

- `default` — 灰色
- `success` — 綠色
- `warning` — 黃色
- `error` — 紅色
- `info` — 主色

## Accessibility

- 根節點是 `<ol>` 保留有序列表語義
- 當前條目視覺上區分（光圈 + 縮放）
- 用 `aria-label` 描述時間軸代表的內容
