---
title: 表格
group: components
---

# 表格

基础 HTML 表格，支持密度与斑马纹模式。

## API

| Prop      | Type                                 | Default    | Description            |
| --------- | ------------------------------------ | ---------- | ---------------------- |
| `density` | `'compact'\|'normal'\|'comfortable'` | `'normal'` | 行高                   |
| `striped` | `boolean`                            | `false`    | 交替行背景色           |

## Usage

```svelte
<Table striped>
  <thead><tr><th>Name</th></tr></thead>
  <tbody><tr><td>Alice</td></tr></tbody>
</Table>
```
