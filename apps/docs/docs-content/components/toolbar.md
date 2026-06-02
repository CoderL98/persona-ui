# Toolbar

Top toolbar with leading/trailing/children slots, sticky mode.

## API

| Prop       | Type                | Description           |
| ---------- | ------------------- | --------------------- |
| `title`    | `string \| Snippet` | Center title          |
| `leading`  | `Snippet`           | Left-aligned actions  |
| `trailing` | `Snippet`           | Right-aligned actions |
| `sticky`   | `boolean`           | Stick to top          |
| `texts`    | `{ toolbar: string }` | Text overrides (see below) |

## Usage

```svelte
<Toolbar title="My App">
  {#snippet leading()}<IconButton label="Back">...</IconButton>{/snippet}
</Toolbar>
```
