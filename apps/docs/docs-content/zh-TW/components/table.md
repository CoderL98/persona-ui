---
title: 表格
group: components
---

# 表格

## Import

```svelte
<script>
  import { 表格 } from '@persona-ui/lib';
</script>
```

基礎 HTML 表格，支援密度與斑馬紋模式。

## API

| Prop      | Type                                 | Default    | Description            |
| --------- | ------------------------------------ | ---------- | ---------------------- |
| `density` | `'compact'\|'normal'\|'comfortable'` | `'normal'` | 列高                   |
| `striped` | `boolean`                            | `false`    | 交替列背景色           |

## Usage

```svelte
<Table striped>
  <thead><tr><th>Name</th></tr></thead>
  <tbody><tr><td>Alice</td></tr></tbody>
</Table>
```
