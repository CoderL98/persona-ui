---
title: 手风琴
group: components
---

# 手风琴

支持单 / 多面板展开的可折叠手风琴。

## API

| Prop       | Type              | Description                     |
| ---------- | ----------------- | ------------------------------- |
| `items`    | `AccordionItem[]` | 包含 value / title / disabled 的项 |
| `multiple` | `boolean`         | 允许多个面板同时打开            |
| `onValueChange` | `(value) => void` | 选中回调                        |

## Usage

```svelte
<Accordion items={[{value:'1',title:'FAQ 1'},{value:'2',title:'FAQ 2'}]} />
```
