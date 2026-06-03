---
title: 分隔符
group: components
---

# Divider 分隔符

## Import

```svelte
<script>
  import { 分隔符 } from '@persona-ui/lib';
</script>
```

一条分隔线，可选附加标签。

## API

| Prop          | Type                         | Default        | Description       |
| ------------- | ---------------------------- | -------------- | ----------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向              |
| `inset`       | `boolean`                    | `false`        | 左右内缩外边距    |
| `children`    | `Snippet`                    | —              | 标签内容          |

## 组件 Token

| Token                     | Purpose                  |
| ------------------------- | ------------------------ |
| `--pui-divider-color`     | 分隔线颜色               |
| `--pui-divider-thickness` | 边框宽度                 |
| `--pui-divider-inset`     | 内缩外边距               |
| `--pui-divider-gap`       | 标签与分隔线之间的间距   |

## 用法

```svelte
<Divider />
<Divider inset />
<Divider>Section</Divider>
```
