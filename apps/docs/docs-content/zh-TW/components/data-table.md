---
title: 資料表格
group: components
---

# DataTable

## Import

```svelte
<script>
  import { 資料表格 } from '@persona-ui/lib';
</script>
```

由資料驅動的表格，支援欄位定義、排序與選取。

## API

| 屬性          | 類型                     | 說明                                       |
| ------------- | ------------------------ | ------------------------------------------ |
| `data`        | `T[]`                    | 列資料                                     |
| `columns`     | `DataTableColumn<T>[]`   | 欄位定義（key / header / sortable / render） |
| `selectable`  | `boolean`                | 啟用列選取                                 |
| `texts`       | `{ selectAll: string, selectRow: string }` | 文字覆寫（見下）              |

## 用法

```svelte
<DataTable data={[{id:1,name:'Alice'}]} columns={[{key:'name',header:'Name'}]} />
```
