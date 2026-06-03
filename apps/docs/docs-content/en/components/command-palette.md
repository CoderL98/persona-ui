---
title: CommandPalette
group: components
---

# CommandPalette

Command palette dialog with search filtering and keyboard navigation.

## API

| Prop          | Type            | Description                                 |
| ------------- | --------------- | ------------------------------------------- |
| `items`       | `CommandItem[]` | Commands with id/label/description/shortcut |
| `placeholder` | `string`        | Search input placeholder                    |
| `onSelect`    | `(id) => void`  | Command selection callback                  |
| `texts`       | `{ placeholder: string, emptyText: string, close: string }` | Text overrides (see below) |

## Usage

```svelte
<CommandPalette items={[{id:'new',label:'New File',shortcut:'⌘N'}]} />
```
