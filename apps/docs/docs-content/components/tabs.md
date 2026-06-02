# Tabs

Tab navigation with horizontal/vertical orientation and keyboard support.

## API

| Prop          | Type                       | Default        | Description        |
| ------------- | -------------------------- | -------------- | ------------------ |
| `items`       | `TabItem[]`                | `[]`           | Tab definitions    |
| `orientation` | `'horizontal'\|'vertical'` | `'horizontal'` | Direction          |
| `onchange`    | `(value) => void`          | —              | Selection callback |

## Usage

```svelte
<Tabs items={[{value:'a',label:'Tab A'},{value:'b',label:'Tab B'}]} />
```
