---
title: InputGroup
group: components
---

# InputGroup

Group a TextField with leading/trailing addons (icons, text, or buttons) to create composite inputs.

## Import

```svelte
<script>
  import { InputGroup, TextField, Button } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                | Default        | Description                |
| ---------------- | ------------------- | -------------- | -------------------------- |
| `leading`        | `Snippet`           | —              | Leading addon (icon/text)  |
| `trailing`       | `Snippet`           | —              | Trailing addon (icon/text) |
| `orientation`    | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `disabled`       | `boolean`           | `false`        | Disabled state             |
| `children`       | `Snippet`           | —              | The main input element     |
| `aria-label`     | `string`            | —              | Accessible label for the group |

## Usage

### With leading icon

```svelte
<script>
  import { InputGroup, TextField } from '@persona-ui/lib';
</script>

<InputGroup leading={() => '🔍'}>
  <TextField placeholder="Search…" />
</InputGroup>
```

### With trailing button

```svelte
<InputGroup
  trailing={() => html`<Button>Send</Button>`}
>
  <TextField placeholder="Type a message…" />
</InputGroup>
```

### Currency input

```svelte
<InputGroup leading={() => '$'}>
  <TextField type="number" placeholder="0.00" />
</InputGroup>
```

### URL with protocol

```svelte
<InputGroup
  leading={() => 'https://'}
  trailing={() => html`<Button>Go</Button>`}
>
  <TextField placeholder="example.com" />
</InputGroup>
```

## Accessibility

- Root is `role="group"` for related controls
- `aria-disabled` reflects disabled state
- Each child input keeps its own focusability
