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

分段按鈕組，單選，行為類似單選組。

## API

| Prop    | Type            | Default | Description    |
| ------- | --------------- | ------- | -------------- |
| `items` | `SegmentItem[]` | `[]`    | 分段定義       |

## 用法

```svelte
<SegmentedControl items={[{value:'d',label:'Day'},{value:'w',label:'Week'}]} />
```
