---
title: 選單
group: components
---

# 選單

## Import

```svelte
<script>
  import { 選單 } from '@persona-ui/lib';
</script>
```

下拉選單，包含選單項目與鍵盤導覽，支援危險操作與快捷鍵。

## API

| Prop       | Type           | Description                                            |
| ---------- | -------------- | ------------------------------------------------------ |
| `items`    | `MenuItem[]`   | 選單項目，包含 id/label/disabled/destructive/shortcut  |
| `trigger`  | `Snippet`      | 觸發元素                                               |
| `onSelect` | `(id) => void` | 選中回呼                                               |

## 用法

```svelte
<Menu items={[{id:'edit',label:'Edit'},{id:'delete',label:'Delete',destructive:true}]}>
  {#snippet trigger()}<Button>Menu</Button>{/snippet}
</Menu>
```
