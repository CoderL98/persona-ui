---
title: 进度条
group: components
---

# Progress

进度条组件，支持确定进度和不确定进度两种模式。

## API

| Prop            | Type                   | Default | Description           |
| --------------- | ---------------------- | ------- | --------------------- |
| `value`         | `number`               | —       | 当前值                |
| `max`           | `number`               | `100`   | 最大值                |
| `indeterminate` | `boolean`              | `false` | 进度未知的动画模式    |
| `texts`         | `{ progress: string }` | —       | 文案覆盖（见下文）    |

## 用法

```svelte
<Progress value={65} />
<Progress indeterminate />
```
