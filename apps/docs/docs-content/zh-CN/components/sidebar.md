---
title: 侧边栏
group: components
---

# Sidebar

## Import

```svelte
<script>
  import { 侧边栏 } from '@persona-ui/lib';
</script>
```

可折叠侧边栏，包含 header/content/footer 区域。

## API

| Prop                           | Type      | Description    |
| ------------------------------ | --------- | -------------- |
| `collapsed`/`defaultCollapsed` | `boolean` | 折叠状态       |
| `header`                       | `Snippet` | 顶部区域       |
| `children`                     | `Snippet` | 内容区域       |
| `footer`                       | `Snippet` | 底部区域       |
| `texts`                        | `{ toggle: string }` | 文案覆盖（见下） |

## 用法

```svelte
<Sidebar>
  {#snippet header()}<h3>Menu</h3>{/snippet}
  <nav>...</nav>
</Sidebar>
```
