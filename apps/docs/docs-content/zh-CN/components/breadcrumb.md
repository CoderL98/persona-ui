---
title: 面包屑
group: components
---

# Breadcrumb

## Import

```svelte
<script>
  import { 面包屑 } from '@persona-ui/lib';
</script>
```

导航面包屑，支持链接与当前页标记。

## API

| Prop    | Type               | Default | Description    |
| ------- | ------------------ | ------- | -------------- |
| `items` | `BreadcrumbItem[]` | `[]`    | 面包屑路径     |
| `texts` | `{ breadcrumb: string }` | — | 文案覆盖（见下） |

## 用法

```svelte
<Breadcrumb items={[{label:'Home',href:'/'},{label:'Page',current:true}]} />
```
