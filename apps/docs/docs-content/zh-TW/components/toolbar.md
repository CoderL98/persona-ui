---
title: 工具列
group: components
---

# Toolbar

## Import

```svelte
<script>
  import { 工具列 } from '@persona-ui/lib';
</script>
```

頂部工具列，包含 leading/trailing/children 插槽，支援 sticky 模式。

## API

| Prop       | Type                | Description    |
| ---------- | ------------------- | -------------- |
| `title`    | `string \| Snippet` | 置中標題       |
| `leading`  | `Snippet`           | 左側操作       |
| `trailing` | `Snippet`           | 右側操作       |
| `sticky`   | `boolean`           | 固定在頂部     |
| `texts`    | `{ toolbar: string }` | 文案覆寫（見下） |

## 用法

```svelte
<Toolbar title="My App">
  {#snippet leading()}<IconButton label="Back">...</IconButton>{/snippet}
</Toolbar>
```
