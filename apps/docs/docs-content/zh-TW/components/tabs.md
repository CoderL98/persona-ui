---
title: 分頁
group: components
---

# 分頁

分頁導覽，支援水平/垂直方向與鍵盤操作。

## API

| Prop          | Type                       | Default        | Description    |
| ------------- | -------------------------- | -------------- | -------------- |
| `items`       | `TabItem[]`                | `[]`           | 分頁定義       |
| `orientation` | `'horizontal'\|'vertical'` | `'horizontal'` | 方向           |
| `onchange`    | `(value) => void`          | —              | 選中回呼       |

## 用法

```svelte
<Tabs items={[{value:'a',label:'Tab A'},{value:'b',label:'Tab B'}]} />
```
