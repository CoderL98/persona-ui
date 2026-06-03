---
title: 树视图
group: components
---

# 树视图

## Import

```svelte
<script>
  import { 树视图 } from '@persona-ui/lib';
</script>
```

支持节点展开 / 折叠与选中的树视图。

## API

| Prop          | Type           | Description               |
| ------------- | -------------- | ------------------------- |
| `nodes`       | `TreeNode[]`   | 树形数据结构              |
| `selectedId`  | `string`       | 受控的当前选中节点        |
| `expandedIds` | `string[]`     | 受控的已展开节点列表      |
| `onSelect`    | `(id) => void` | 选中回调                  |

## Usage

```svelte
<TreeView nodes={[{id:'1',label:'Folder',children:[{id:'1-1',label:'File'}]}]} />
```
