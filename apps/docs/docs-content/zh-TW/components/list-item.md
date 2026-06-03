---
title: 清單項目
group: components
---

# 清單項目

## Import

```svelte
<script>
  import { 清單項目 } from '@persona-ui/lib';
</script>
```

帶有 title / description / leading / trailing 插槽與連結支援的清單項目。

## API

| Prop                 | Type                | Description             |
| -------------------- | ------------------- | ----------------------- |
| `title`              | `string \| Snippet` | 主文字                  |
| `description`        | `string \| Snippet` | 次文字                  |
| `leading`/`trailing` | `Snippet`           | 左 / 右插槽             |
| `href`               | `string`            | 設定後渲染為 `<a>`      |
| `selected`           | `boolean`           | 選中狀態                |
| `disabled`           | `boolean`           | 停用狀態                |

## Usage

```svelte
<ListItem title="Inbox" description="3 new" />
<ListItem href="/settings" title="Settings" />
```
