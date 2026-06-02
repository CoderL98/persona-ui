---
title: 徽章
group: components
---

# Badge 徽章

用於顯示計數、狀態或通知的小型標籤。

## API

| Prop       | Type                                                          | Default     | Description                |
| ---------- | ------------------------------------------------------------- | ----------- | -------------------------- |
| `tone`     | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'error'` | `'neutral'` | 顏色色調                   |
| `size`     | `'sm' \| 'md'`                                                | `'md'`      | 尺寸                       |
| `dot`      | `boolean`                                                     | `false`     | 僅顯示圓點                 |
| `count`    | `number`                                                      | —           | 數字計數                   |
| `max`      | `number`                                                      | `99`        | 超過該值時顯示 `N+`        |
| `children` | `Snippet`                                                     | —           | 自訂標籤內容               |

## 用法

```svelte
<Badge count={5} />
<Badge count={100} max={99} />
<Badge dot tone="error" />
<Badge tone="primary">New</Badge>
```
