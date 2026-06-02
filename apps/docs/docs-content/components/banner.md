# Banner

Page-level banner with 4 tones and sticky mode.

## API

| Prop     | Type                                    | Default  | Description              |
| -------- | --------------------------------------- | -------- | ------------------------ |
| `tone`   | `'info'\|'success'\|'warning'\|'error'` | `'info'` | Color tone               |
| `sticky` | `boolean`                               | `false`  | Stick to top of viewport |

## Usage

```svelte
<Banner tone="warning">Your session will expire soon.</Banner>
```
