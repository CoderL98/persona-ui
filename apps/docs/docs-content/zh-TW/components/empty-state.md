---
title: 空狀態
group: components
---

# EmptyState 空狀態

## Import

```svelte
<script>
  import { 空狀態 } from '@persona-ui/lib';
</script>
```

帶有圖示、標題、描述與操作的空狀態展示。

## API

| Prop       | Type      | Description       |
| ---------- | --------- | ----------------- |
| `icon`     | `Snippet` | 大尺寸圖示/插畫   |
| `title`    | `Snippet` | 標題文字          |
| `children` | `Snippet` | 描述正文          |

## 用法

```svelte
<EmptyState>
  {#snippet title()}No results{/snippet}
  <p>Try adjusting your search.</p>
</EmptyState>
```
