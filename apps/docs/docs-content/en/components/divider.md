---
title: Divider
group: components
---

# Divider

## Import

```svelte
<script>
  import { Divider } from '@persona-ui/lib';
</script>
```

A separator line, optionally with a label.

## API

| Prop          | Type                         | Default        | Description             |
| ------------- | ---------------------------- | -------------- | ----------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction               |
| `inset`       | `boolean`                    | `false`        | Left/right inset margin |
| `children`    | `Snippet`                    | —              | Label content           |

## Component Tokens

| Token                     | Purpose                     |
| ------------------------- | --------------------------- |
| `--pui-divider-color`     | Separator color             |
| `--pui-divider-thickness` | Border width                |
| `--pui-divider-inset`     | Inset margin                |
| `--pui-divider-gap`       | Gap between label and lines |

## Usage

```svelte
<Divider />
<Divider inset />
<Divider>Section</Divider>
```
