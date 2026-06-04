---
title: 提示框
group: components
---

# Alert

## Import

```svelte
<script>
  import { 提示框 } from '@persona-ui/lib';
</script>
```

Alert 组件，支持 4 种语义色调（info/success/warning/error）、3 种视觉变体，以及可关闭模式。

## API

| Prop          | Type                                    | Default  | Description       |
| ------------- | --------------------------------------- | -------- | ----------------- |
| `tone`        | `'info'\|'success'\|'warning'\|'error'` | `'info'` | 颜色色调          |
| `variant`     | `'soft'\|'outlined'\|'filled'`          | `'soft'` | 视觉样式          |
| `dismissible` | `boolean`                               | `false`  | 显示关闭按钮      |
| `title`       | `Snippet`                               | —        | 标题内容          |
| `children`    | `Snippet`                               | —        | 主体内容          |
| `icon`        | `Snippet`                               | —        | 前置图标          |
| `actions`     | `Snippet`                               | —        | 操作按钮          |
| `onDismiss`   | `(e) => void`                           | —        | 关闭事件处理函数  |
| `texts`       | `{ dismiss: string }`                   | —        | 文案覆盖（见下文） |

## 用法

```svelte
<Alert tone="error">An error occurred.</Alert>
<Alert tone="info" dismissible>Dismiss me.</Alert>
```
