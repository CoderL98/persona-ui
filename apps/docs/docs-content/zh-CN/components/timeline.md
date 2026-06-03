---
title: Timeline
group: components
---

# Timeline

垂直或水平排列的事件时间轴，支持时间戳、状态点和可选内容。

## Import

```svelte
<script>
  import { Timeline } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                                | Default        | Description                |
| -------------- | ----------------------------------- | -------------- | -------------------------- |
| `items`        | `TimelineItem[]`                    | —              | 时间轴条目列表              |
| `orientation`  | `'vertical' \| 'horizontal'`        | `'vertical'`   | 布局方向                    |
| `activeIndex`  | `number`                            | `-1`           | 高亮活动条目                |
| `pending`      | `boolean`                           | `false`        | 最后连接线显示脉冲动画      |
| `aria-label`   | `string`                            | `'时间轴'`     | 无障碍标签                  |

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
    { id: '1', title: '订单已下单', timestamp: '2小时前', status: 'success' },
    { id: '2', title: '支付确认', timestamp: '2小时前', status: 'success' },
    { id: '3', title: '已发货', timestamp: '1小时前', status: 'info' },
    { id: '4', title: '派送中', timestamp: '5分钟前', status: 'info' },
  ];
</script>

<Timeline items={events} activeIndex={2} />
```

## 状态颜色

- `default` — 灰色
- `success` — 绿色
- `warning` — 黄色
- `error` — 红色
- `info` — 主色

## Accessibility

- 根节点是 `<ol>` 保留有序列表语义
- 活动条目视觉上区分（光圈 + 缩放）
- 用 `aria-label` 描述时间轴代表的内容
