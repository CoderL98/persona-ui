---
title: Breadcrumb
group: components
---

# Breadcrumb

Navigation breadcrumb with link and current page support.

## API

| Prop    | Type               | Default | Description      |
| ------- | ------------------ | ------- | ---------------- |
| `items` | `BreadcrumbItem[]` | `[]`    | Breadcrumb trail |
| `texts` | `{ breadcrumb: string }` | — | Text overrides (see below) |

## Usage

```svelte
<Breadcrumb items={[{label:'Home',href:'/'},{label:'Page',current:true}]} />
```
