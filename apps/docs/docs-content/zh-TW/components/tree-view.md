---
title: 樹狀檢視
group: components
---

# 樹狀檢視

支援節點展開 / 收合與選取的樹狀檢視。

## API

| Prop          | Type           | Description               |
| ------------- | -------------- | ------------------------- |
| `nodes`       | `TreeNode[]`   | 樹狀資料結構              |
| `selectedId`  | `string`       | 受控的當前選取節點        |
| `expandedIds` | `string[]`     | 受控的已展開節點清單      |
| `onSelect`    | `(id) => void` | 選取回呼                  |

## Usage

```svelte
<TreeView nodes={[{id:'1',label:'Folder',children:[{id:'1-1',label:'File'}]}]} />
```
