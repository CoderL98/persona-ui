---
title: 骨架屏
group: components
---

# Skeleton

## Import

```svelte
<script>
  import { 骨架屏 } from '@persona-ui/lib';
</script>
```

加载占位形状组件。

## API

| Prop             | Type                       | Default  | Description       |
| ---------------- | -------------------------- | -------- | ----------------- |
| `shape`          | `'text'\|'rect'\|'circle'` | `'text'` | 形状              |
| `width`/`height` | `string`                   | —        | 自定义尺寸        |
| `animated`       | `boolean`                  | `true`   | 启用脉冲动画      |

## 用法

```svelte
<Skeleton shape="text" />
<Skeleton shape="circle" width="48px" height="48px" />
```
