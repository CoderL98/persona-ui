---
title: ListItem
group: components
---

# ListItem

List item with title/description/leading/trailing slots and link support.

## API

| Prop                 | Type                | Description             |
| -------------------- | ------------------- | ----------------------- |
| `title`              | `string \| Snippet` | Primary text            |
| `description`        | `string \| Snippet` | Secondary text          |
| `leading`/`trailing` | `Snippet`           | Left/right slots        |
| `href`               | `string`            | Renders as `<a>` if set |
| `selected`           | `boolean`           | Selected state          |
| `disabled`           | `boolean`           | Disabled state          |

## Usage

```svelte
<ListItem title="Inbox" description="3 new" />
<ListItem href="/settings" title="Settings" />
```
