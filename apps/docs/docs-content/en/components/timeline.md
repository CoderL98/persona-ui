---
title: Timeline
group: components
---

# Timeline

A vertical or horizontal list of events with timestamps, status dots, and optional content.

## Import

```svelte
<script>
  import { Timeline } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                                | Default        | Description                |
| -------------- | ----------------------------------- | -------------- | -------------------------- |
| `items`        | `TimelineItem[]`                    | —              | List of timeline entries   |
| `orientation`  | `'vertical' \| 'horizontal'`        | `'vertical'`   | Layout direction           |
| `activeIndex`  | `number`                            | `-1`           | Highlight the active item  |
| `pending`      | `boolean`                           | `false`        | Show pulsing animation on the last connector |
| `aria-label`   | `string`                            | `'Timeline'`   | Accessible label           |

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
    { id: '1', title: 'Order placed', timestamp: '2 hours ago', status: 'success' },
    { id: '2', title: 'Payment confirmed', timestamp: '2 hours ago', status: 'success' },
    { id: '3', title: 'Shipped', timestamp: '1 hour ago', status: 'info' },
    { id: '4', title: 'Out for delivery', timestamp: '5 min ago', status: 'info' },
  ];
</script>

<Timeline items={events} activeIndex={2} />
```

## Status Colors

- `default` — gray
- `success` — green
- `warning` — yellow
- `error` — red
- `info` — primary

## Accessibility

- Root is `<ol>` for ordered list semantics
- Active item is visually distinguished (ring + scale)
- Use `aria-label` to describe what the timeline represents
