---
title: 載入指示器
group: components
---

# Spinner

## Import

```svelte
<script>
  import { 載入指示器 } from '@persona-ui/lib';
</script>
```

載入指示器，支援 3 種尺寸及裝飾模式。

## API

| Prop         | Type                  | Default | Description                  |
| ------------ | --------------------- | ------- | ---------------------------- |
| `size`       | `'sm'\|'md'\|'lg'`    | `'md'`  | 尺寸預設                     |
| `decorative` | `boolean`             | `false` | 為 true 時設定 aria-hidden   |
| `texts`      | `{ loading: string }` | —       | 文字覆寫（見下文）           |

## 用法

```svelte
<Spinner size="sm" />
<Spinner decorative />
```
