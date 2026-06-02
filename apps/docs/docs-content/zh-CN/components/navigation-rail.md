---
title: 导航栏
group: components
---

# NavigationRail

带图标 + 标签的垂直导航栏。

## API

| 属性      | 类型                  | 说明                                  |
| --------- | --------------------- | ------------------------------------- |
| `items`   | `NavigationRailItem[]` | 条目（value / label / icon / disabled） |
| `onchange` | `(value) => void`    | 选中回调                              |

## 用法

```svelte
<NavigationRail items={[{value:'home',label:'Home'},{value:'search',label:'Search'}]} />
```
