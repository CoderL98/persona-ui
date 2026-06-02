---
title: 列表项
group: components
---

# 列表项

带 title / description / leading / trailing 插槽与链接支持的列表项。

## API

| Prop                 | Type                | Description             |
| -------------------- | ------------------- | ----------------------- |
| `title`              | `string \| Snippet` | 主文本                  |
| `description`        | `string \| Snippet` | 次文本                  |
| `leading`/`trailing` | `Snippet`           | 左 / 右插槽             |
| `href`               | `string`            | 设置后渲染为 `<a>`      |
| `selected`           | `boolean`           | 选中状态                |
| `disabled`           | `boolean`           | 禁用状态                |

## Usage

```svelte
<ListItem title="Inbox" description="3 new" />
<ListItem href="/settings" title="Settings" />
```
