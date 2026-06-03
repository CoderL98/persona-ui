---
title: 工具提示
group: components
---

# 工具提示

## Import

```svelte
<script>
  import { 工具提示 } from '@persona-ui/lib';
</script>
```

支持 4 个方向的工具提示，可控显示延迟，hover/focus 触发。

## API

| Prop        | Type                               | Default    | Description      |
| ----------- | ---------------------------------- | ---------- | ---------------- |
| `content`   | `string \| Snippet`                | —          | 提示内容         |
| `placement` | `'top'\|'right'\|'bottom'\|'left'` | `'bottom'` | 出现方向         |
| `delay`     | `number`                           | `400`      | 显示延迟（ms）   |
| `disabled`  | `boolean`                          | `false`    | 是否禁用         |

## 用法

```svelte
<Tooltip content="Help text"><Button>Hover me</Button></Tooltip>
```
