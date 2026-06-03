---
title: TreeView
group: components
---

# TreeView

## Import

```svelte
<script>
  import { TreeView } from '@persona-ui/lib';
</script>
```

Tree view with expandable/collapsible nodes and selection.

## API

| Prop          | Type           | Description               |
| ------------- | -------------- | ------------------------- |
| `nodes`       | `TreeNode[]`   | Tree data structure       |
| `selectedId`  | `string`       | Controlled selected node  |
| `expandedIds` | `string[]`     | Controlled expanded nodes |
| `onSelect`    | `(id) => void` | Selection callback        |

## Usage

```svelte
<TreeView nodes={[{id:'1',label:'Folder',children:[{id:'1-1',label:'File'}]}]} />
```
