---
title: 分隔線
group: components
---

# Divider 分隔線

一條分隔線，可選附加標籤。

## API

| Prop          | Type                         | Default        | Description       |
| ------------- | ---------------------------- | -------------- | ----------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向              |
| `inset`       | `boolean`                    | `false`        | 左右內縮外距      |
| `children`    | `Snippet`                    | —              | 標籤內容          |

## 元件 Token

| Token                     | Purpose                  |
| ------------------------- | ------------------------ |
| `--pui-divider-color`     | 分隔線顏色               |
| `--pui-divider-thickness` | 邊框寬度                 |
| `--pui-divider-inset`     | 內縮外距                 |
| `--pui-divider-gap`       | 標籤與分隔線之間的間距   |

## 用法

```svelte
<Divider />
<Divider inset />
<Divider>Section</Divider>
```
