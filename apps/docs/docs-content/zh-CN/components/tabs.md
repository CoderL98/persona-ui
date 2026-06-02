---
title: 标签页
group: components
---

# 标签页

标签页导航，支持水平/垂直方向与键盘操作。

## API

| Prop          | Type                       | Default        | Description    |
| ------------- | -------------------------- | -------------- | -------------- |
| `items`       | `TabItem[]`                | `[]`           | 标签页定义     |
| `orientation` | `'horizontal'\|'vertical'` | `'horizontal'` | 方向           |
| `onchange`    | `(value) => void`          | —              | 选中回调       |

## 用法

```svelte
<Tabs items={[{value:'a',label:'Tab A'},{value:'b',label:'Tab B'}]} />
```
