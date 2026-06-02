# Avatar

A user avatar with image, initials fallback, and status dot.

## API

| Prop       | Type                                        | Default | Description                    |
| ---------- | ------------------------------------------- | ------- | ------------------------------ |
| `src`      | `string`                                    | —       | Image URL                      |
| `alt`      | `string`                                    | —       | Image alt text                 |
| `name`     | `string`                                    | —       | Full name (generates initials) |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`      | `'md'`  | Size                           |
| `status`   | `'online' \| 'offline' \| 'busy' \| 'away'` | —       | Status indicator dot           |
| `children` | `Snippet`                                   | —       | Fallback content               |

## Usage

```svelte
<Avatar src="photo.jpg" alt="User" />
<Avatar name="John Doe" />
<Avatar name="Jane" status="online" />
```
