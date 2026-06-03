---
title: 分段控制器
group: components
---

# SegmentedControl

## Import

```svelte
<script>
  import { 分段控制器 } from '@persona-ui/lib';
</script>
```

分段按钮组，单选，行为类似单选组。

## API

| Prop    | Type            | Default | Description    |
| ------- | --------------- | ------- | -------------- |
| `items` | `SegmentItem[]` | `[]`    | 分段定义       |

## 用法

```svelte
<SegmentedControl items={[{value:'d',label:'Day'},{value:'w',label:'Week'}]} />
```
