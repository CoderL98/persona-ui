---
title: 麵包屑
group: components
---

# Breadcrumb

## Import

```svelte
<script>
  import { 麵包屑 } from '@persona-ui/lib';
</script>
```

導覽麵包屑，支援連結與當前頁標記。

## API

| Prop    | Type               | Default | Description    |
| ------- | ------------------ | ------- | -------------- |
| `items` | `BreadcrumbItem[]` | `[]`    | 麵包屑路徑     |
| `texts` | `{ breadcrumb: string }` | — | 文案覆寫（見下） |

## 用法

```svelte
<Breadcrumb items={[{label:'Home',href:'/'},{label:'Page',current:true}]} />
```
