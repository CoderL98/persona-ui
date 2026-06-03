---
title: EmptyState
group: components
---

# EmptyState

## Import

```svelte
<script>
  import { EmptyState } from '@persona-ui/lib';
</script>
```

Empty state display with icon, title, description, and actions.

## API

| Prop       | Type      | Description             |
| ---------- | --------- | ----------------------- |
| `icon`     | `Snippet` | Large icon/illustration |
| `title`    | `Snippet` | Heading text            |
| `children` | `Snippet` | Description body        |

## Usage

```svelte
<EmptyState>
  {#snippet title()}No results{/snippet}
  <p>Try adjusting your search.</p>
</EmptyState>
```
