---
title: NavigationRail
group: components
---

# NavigationRail

## Import

```svelte
<script>
  import { NavigationRail } from '@persona-ui/lib';
</script>
```

Vertical navigation rail with icon + label items.

## API

| Prop       | Type                   | Description                          |
| ---------- | ---------------------- | ------------------------------------ |
| `items`    | `NavigationRailItem[]` | Items with value/label/icon/disabled |
| `onValueChange` | `(value) => void`      | Selection callback                   |

## Usage

```svelte
<NavigationRail items={[{value:'home',label:'Home'},{value:'search',label:'Search'}]} />
```
