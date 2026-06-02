# DataTable

Data-driven table with columns, sorting, and selection.

## API

| Prop         | Type                   | Description                                     |
| ------------ | ---------------------- | ----------------------------------------------- |
| `data`       | `T[]`                  | Row data                                        |
| `columns`    | `DataTableColumn<T>[]` | Column definitions (key/header/sortable/render) |
| `selectable` | `boolean`              | Enable row selection                            |
| `texts`      | `{ selectAll: string, selectRow: string }` | Text overrides (see below) |

## Usage

```svelte
<DataTable data={[{id:1,name:'Alice'}]} columns={[{key:'name',header:'Name'}]} />
```
