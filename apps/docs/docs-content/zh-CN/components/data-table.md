---
title: 数据表格
group: components
---

# DataTable

由数据驱动的表格，支持列定义、排序与选中。

## API

| 属性          | 类型                     | 说明                                       |
| ------------- | ------------------------ | ------------------------------------------ |
| `data`        | `T[]`                    | 行数据                                     |
| `columns`     | `DataTableColumn<T>[]`   | 列定义（key / header / sortable / render） |
| `selectable`  | `boolean`                | 启用行选择                                 |
| `texts`       | `{ selectAll: string, selectRow: string }` | 文本覆盖（见下）              |

## 用法

```svelte
<DataTable data={[{id:1,name:'Alice'}]} columns={[{key:'name',header:'Name'}]} />
```
