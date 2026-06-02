# Chip

A compact interactive label for tags, filters, or choices.

## API

| Prop        | Type                                                          | Default     | Description        |
| ----------- | ------------------------------------------------------------- | ----------- | ------------------ |
| `variant`   | `'filled' \| 'outlined' \| 'text'`                            | `'filled'`  | Visual variant     |
| `tone`      | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'error'` | `'neutral'` | Color tone         |
| `selected`  | `boolean`                                                     | `false`     | Selected state     |
| `disabled`  | `boolean`                                                     | `false`     | Disabled state     |
| `removable` | `boolean`                                                     | `false`     | Show remove button |
| `children`  | `Snippet`                                                     | —           | Label content      |
| `leading`   | `Snippet`                                                     | —           | Leading icon       |
| `trailing`  | `Snippet`                                                     | —           | Trailing icon      |
| `onremove`  | `(e: MouseEvent) => void`                                     | —           | Remove handler     |
| `texts`     | `{ remove: string }`                                          | —           | Text overrides (see below) |

## Usage

```svelte
<Chip>Label</Chip>
<Chip variant="outlined" selected>Active filter</Chip>
<Chip removable>Dismissable</Chip>
```
