---
title: 側邊欄
group: components
---

# Sidebar

可摺疊側邊欄，包含 header/content/footer 區域。

## API

| Prop                           | Type      | Description    |
| ------------------------------ | --------- | -------------- |
| `collapsed`/`defaultCollapsed` | `boolean` | 摺疊狀態       |
| `header`                       | `Snippet` | 頂部區域       |
| `children`                     | `Snippet` | 內容區域       |
| `footer`                       | `Snippet` | 底部區域       |
| `texts`                        | `{ toggle: string }` | 文案覆寫（見下） |

## 用法

```svelte
<Sidebar>
  {#snippet header()}<h3>Menu</h3>{/snippet}
  <nav>...</nav>
</Sidebar>
```
