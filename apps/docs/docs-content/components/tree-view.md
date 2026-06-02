# TreeView

Tree view with expandable/collapsible nodes and selection.

## API

| Prop          | Type           | Description               |
| ------------- | -------------- | ------------------------- |
| `nodes`       | `TreeNode[]`   | Tree data structure       |
| `selectedId`  | `string`       | Controlled selected node  |
| `expandedIds` | `string[]`     | Controlled expanded nodes |
| `onselect`    | `(id) => void` | Selection callback        |

## Usage

```svelte
<TreeView nodes={[{id:'1',label:'Folder',children:[{id:'1-1',label:'File'}]}]} />
```
