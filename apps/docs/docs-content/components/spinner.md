# Spinner

Loading spinner with 3 sizes and decorative mode.

## API

| Prop         | Type               | Default | Description           |
| ------------ | ------------------ | ------- | --------------------- |
| `size`       | `'sm'\|'md'\|'lg'` | `'md'`  | Size preset           |
| `decorative` | `boolean`          | `false` | aria-hidden when true |
| `texts`      | `{ loading: string }`       | —       | Text overrides (see below) |

## Usage

```svelte
<Spinner size="sm" />
<Spinner decorative />
```
