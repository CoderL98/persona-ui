---
title: 堆叠
group: components
---

# Stack

flexbox 布局原语，用于垂直/水平堆叠，统一的 gap、对齐和 justify 控制。

## Import

```svelte
<script>
  import { Stack } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                                                | Default     | Description              |
| ---------------- | ------------------------------------------------------------------- | ----------- | ------------------------ |
| `direction`      | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'`           | `'column'`  | flex 方向                |
| `align`          | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'`           | `'stretch'` | 交叉轴对齐                |
| `justify`        | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'`   | 主轴对齐                  |
| `gap`            | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12`                   | `0`         | 子项间距                  |
| `wrap`           | `'wrap' \| 'nowrap' \| 'wrap-reverse'`                              | `'nowrap'`  | flex 换行                |
| `inline`         | `boolean`                                                           | `false`     | 用 `inline-flex`         |
| `children`       | `Snippet`                                                           | —           | 子元素                    |

## Usage

```svelte
<Stack direction="column" gap={4} align="center">
  <h2>标题</h2>
  <p>描述</p>
  <Button>操作</Button>
</Stack>
```

### 水平工具栏

```svelte
<Stack direction="row" gap={2} align="center" justify="between">
  <span>Logo</span>
  <Stack direction="row" gap={1}>
    <Button variant="ghost">登录</Button>
    <Button>注册</Button>
  </Stack>
</Stack>
```

### 内联堆叠

```svelte
<Stack inline direction="row" gap={2} align="center">
  <Badge>新</Badge>
  <span>项标签</span>
</Stack>
```

## 相对纯 Tailwind 的优势

- 类型安全的 `direction` / `align` / `justify` / `gap` / `wrap` 枚举
- gap 值对齐设计系统间距刻度
- 不用记 Tailwind 类名如何映射到轴
