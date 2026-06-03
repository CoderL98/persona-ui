---
title: 導覽列
group: components
---

# NavigationRail

## Import

```svelte
<script>
  import { 導覽列 } from '@persona-ui/lib';
</script>
```

帶圖示 + 標籤的垂直導覽列。

## API

| 屬性      | 類型                  | 說明                                  |
| --------- | --------------------- | ------------------------------------- |
| `items`   | `NavigationRailItem[]` | 條目（value / label / icon / disabled） |
| `onValueChange` | `(value) => void`    | 選取回呼                              |

## 用法

```svelte
<NavigationRail items={[{value:'home',label:'Home'},{value:'search',label:'Search'}]} />
```
