---
title: 加载指示器
group: components
---

# Spinner

## Import

```svelte
<script>
  import { 加载指示器 } from '@persona-ui/lib';
</script>
```

加载指示器，支持 3 种尺寸和装饰模式。

## API

| Prop         | Type                  | Default | Description              |
| ------------ | --------------------- | ------- | ------------------------ |
| `size`       | `'sm'\|'md'\|'lg'`    | `'md'`  | 尺寸预设                 |
| `decorative` | `boolean`             | `false` | 为 true 时设置 aria-hidden |
| `texts`      | `{ loading: string }` | —       | 文案覆盖（见下文）       |

## 用法

```svelte
<Spinner size="sm" />
<Spinner decorative />
```
