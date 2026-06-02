---
title: 進度條
group: components
---

# Progress

進度條元件，支援確定進度與不確定進度兩種模式。

## API

| Prop            | Type                   | Default | Description           |
| --------------- | ---------------------- | ------- | --------------------- |
| `value`         | `number`               | —       | 目前值                |
| `max`           | `number`               | `100`   | 最大值                |
| `indeterminate` | `boolean`              | `false` | 進度未知的動畫模式    |
| `texts`         | `{ progress: string }` | —       | 文字覆寫（見下文）    |

## 用法

```svelte
<Progress value={65} />
<Progress indeterminate />
```
