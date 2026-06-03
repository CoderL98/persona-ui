---
title: 徽章
group: components
---

# Badge 徽章

## Import

```svelte
<script>
  import { 徽章 } from '@persona-ui/lib';
</script>
```

用于显示计数、状态或通知的小型标签。

## API

| Prop       | Type                                                          | Default     | Description                |
| ---------- | ------------------------------------------------------------- | ----------- | -------------------------- |
| `tone`     | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'error'` | `'neutral'` | 颜色色调                   |
| `size`     | `'sm' \| 'md'`                                                | `'md'`      | 尺寸                       |
| `dot`      | `boolean`                                                     | `false`     | 仅显示圆点                 |
| `count`    | `number`                                                      | —           | 数字计数                   |
| `max`      | `number`                                                      | `99`        | 超过该值时显示 `N+`        |
| `children` | `Snippet`                                                     | —           | 自定义标签内容             |

## 用法

```svelte
<Badge count={5} />
<Badge count={100} max={99} />
<Badge dot tone="error" />
<Badge tone="primary">New</Badge>
```
