---
title: 标签芯片
group: components
---

# Chip 标签芯片

一种用于标签、筛选器或选项的紧凑型交互式标签。

## API

| Prop        | Type                                                          | Default     | Description                |
| ----------- | ------------------------------------------------------------- | ----------- | -------------------------- |
| `variant`   | `'filled' \| 'outlined' \| 'text'`                            | `'filled'`  | 视觉变体                   |
| `tone`      | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'error'` | `'neutral'` | 颜色色调                   |
| `selected`  | `boolean`                                                     | `false`     | 选中状态                   |
| `disabled`  | `boolean`                                                     | `false`     | 禁用状态                   |
| `removable` | `boolean`                                                     | `false`     | 显示移除按钮               |
| `children`  | `Snippet`                                                     | —           | 标签内容                   |
| `leading`   | `Snippet`                                                     | —           | 前置图标                   |
| `trailing`  | `Snippet`                                                     | —           | 后置图标                   |
| `onRemove`  | `(e: MouseEvent) => void`                                     | —           | 移除事件处理函数           |
| `texts`     | `{ remove: string }`                                          | —           | 文案覆盖（见下文）         |

## 用法

```svelte
<Chip>Label</Chip>
<Chip variant="outlined" selected>Active filter</Chip>
<Chip removable>Dismissable</Chip>
```
