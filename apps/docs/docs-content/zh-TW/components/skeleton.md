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

載入時的佔位形狀元件。

## API

| Prop             | Type                       | Default  | Description       |
| ---------------- | -------------------------- | -------- | ----------------- |
| `shape`          | `'text'\|'rect'\|'circle'` | `'text'` | 形狀              |
| `width`/`height` | `string`                   | —        | 自訂尺寸          |
| `animated`       | `boolean`                  | `true`   | 啟用脈衝動畫      |

## 用法

```svelte
<Skeleton shape="text" />
<Skeleton shape="circle" width="48px" height="48px" />
```
