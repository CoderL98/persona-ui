---
title: VirtualList
group: components
---

# VirtualList

A virtualized list that only renders the visible items, for smooth scrolling through large datasets.

## Import

```svelte
<script>
  import { VirtualList } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                                | Default | Description                              |
| ---------------- | --------------------------------------------------- | ------- | ---------------------------------------- |
| `itemCount`      | `number`                                            | —       | Total number of items                    |
| `itemHeight`     | `number`                                            | —       | Fixed height of each item in px          |
| `height`         | `number`                                            | —       | Viewport height in px                    |
| `overscan`       | `number`                                            | `3`     | Extra items rendered above/below viewport |
| `aria-label`     | `string`                                            | —       | Accessible label for the list region     |
| `item`           | `Snippet<[{ index: number; style: string }]>`       | —       | Item renderer                            |
| `onRangeChange`  | `(range: { start: number; end: number }) => void`   | —       | Fired when visible range changes         |

## Usage

```svelte
<script>
  import { VirtualList } from '@persona-ui/lib';

  const items = Array.from({ length: 10_000 }, (_, i) => ({
    id: i,
    label: `Item #${i + 1}`,
  }));
</script>

<VirtualList
  itemCount={items.length}
  itemHeight={48}
  height={400}
  item={(p) => `<div style="${p.style}">Item #${p.index + 1}</div>`}
  onRangeChange={(r) => console.log('Visible:', r)}
/>
```

> **Note:** The `item` snippet receives `{ index, style }` where `style` is a CSS string with the item's fixed height pre-applied.

## Behavior

- Only items within the visible range + overscan are rendered
- Total scrollbar height = `itemCount × itemHeight`
- `scrollTop` changes recompute the visible range
- Changing `itemCount` resets scroll to the top

## When to Use

- Lists with >100 items where rendering all is slow
- Fixed-height rows (the component assumes uniform height)
- For variable-height items, use a different virtualization strategy

## Accessibility

- The viewport is a scrollable region with `aria-label`
- Items inherit focusability from the rendered content
- Keyboard scrolling (arrow keys, page up/down) works as expected
