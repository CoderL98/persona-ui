---
title: 工具栏
group: components
---

# Toolbar

顶部工具栏，包含 leading/trailing/children 插槽，支持 sticky 模式。

## API

| Prop       | Type                | Description    |
| ---------- | ------------------- | -------------- |
| `title`    | `string \| Snippet` | 居中标题       |
| `leading`  | `Snippet`           | 左侧操作       |
| `trailing` | `Snippet`           | 右侧操作       |
| `sticky`   | `boolean`           | 固定在顶部     |
| `texts`    | `{ toolbar: string }` | 文案覆盖（见下） |

## 用法

```svelte
<Toolbar title="My App">
  {#snippet leading()}<IconButton label="Back">...</IconButton>{/snippet}
</Toolbar>
```
