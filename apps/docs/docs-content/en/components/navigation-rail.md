---
title: NavigationRail
group: components
---

# NavigationRail

Vertical navigation rail with icon + label items.

## API

| Prop       | Type                   | Description                          |
| ---------- | ---------------------- | ------------------------------------ |
| `items`    | `NavigationRailItem[]` | Items with value/label/icon/disabled |
| `onchange` | `(value) => void`      | Selection callback                   |

## Usage

```svelte
<NavigationRail items={[{value:'home',label:'Home'},{value:'search',label:'Search'}]} />
```
