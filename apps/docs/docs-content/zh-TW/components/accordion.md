---
title: 折疊面板
group: components
---

# 折疊面板

## Import

```svelte
<script>
  import { 折疊面板 } from '@persona-ui/lib';
</script>
```

支援單 / 多面板展開的可收合元件。

## API

| Prop       | Type              | Description                     |
| ---------- | ----------------- | ------------------------------- |
| `items`    | `AccordionItem[]` | 包含 value / title / disabled 的項目 |
| `multiple` | `boolean`         | 允許多個面板同時開啟            |
| `onValueChange` | `(value) => void` | 選中回呼                        |

## Usage

```svelte
<Accordion items={[{value:'1',title:'FAQ 1'},{value:'2',title:'FAQ 2'}]} />
```
