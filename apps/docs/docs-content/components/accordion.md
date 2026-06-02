# Accordion

Collapsible accordion with single/multi expand.

## API

| Prop       | Type              | Description                     |
| ---------- | ----------------- | ------------------------------- |
| `items`    | `AccordionItem[]` | Items with value/title/disabled |
| `multiple` | `boolean`         | Allow multiple open panels      |
| `onchange` | `(value) => void` | Selection callback              |

## Usage

```svelte
<Accordion items={[{value:'1',title:'FAQ 1'},{value:'2',title:'FAQ 2'}]} />
```
