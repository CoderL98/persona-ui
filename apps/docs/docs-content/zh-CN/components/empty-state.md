---
title: 空状态
group: components
---

# EmptyState 空状态

带有图标、标题、描述与操作的空状态展示。

## API

| Prop       | Type      | Description       |
| ---------- | --------- | ----------------- |
| `icon`     | `Snippet` | 大尺寸图标/插画   |
| `title`    | `Snippet` | 标题文字          |
| `children` | `Snippet` | 描述正文          |

## 用法

```svelte
<EmptyState>
  {#snippet title()}No results{/snippet}
  <p>Try adjusting your search.</p>
</EmptyState>
```
