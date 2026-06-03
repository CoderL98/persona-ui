---
title: SegmentedControl
group: components
---

# SegmentedControl

## Import

```svelte
<script>
  import { SegmentedControl } from '@persona-ui/lib';
</script>
```

Segmented button group, single-select, radio group behavior.

## API

| Prop    | Type            | Default | Description         |
| ------- | --------------- | ------- | ------------------- |
| `items` | `SegmentItem[]` | `[]`    | Segment definitions |

## Usage

```svelte
<SegmentedControl items={[{value:'d',label:'Day'},{value:'w',label:'Week'}]} />
```
