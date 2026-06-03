---
title: 菜单
group: components
---

# 菜单

## Import

```svelte
<script>
  import { 菜单 } from '@persona-ui/lib';
</script>
```

下拉菜单，包含菜单项与键盘导航，支持危险操作与快捷键。

## API

| Prop       | Type           | Description                                            |
| ---------- | -------------- | ------------------------------------------------------ |
| `items`    | `MenuItem[]`   | 菜单项，包含 id/label/disabled/destructive/shortcut    |
| `trigger`  | `Snippet`      | 触发元素                                               |
| `onSelect` | `(id) => void` | 选中回调                                               |

## 用法

```svelte
<Menu items={[{id:'edit',label:'Edit'},{id:'delete',label:'Delete',destructive:true}]}>
  {#snippet trigger()}<Button>Menu</Button>{/snippet}
</Menu>
```
