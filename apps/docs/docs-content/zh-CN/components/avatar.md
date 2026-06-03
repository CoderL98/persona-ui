---
title: 头像
group: components
---

# Avatar 头像

## Import

```svelte
<script>
  import { 头像 } from '@persona-ui/lib';
</script>
```

用户头像组件，支持图片、缩写字母回退和状态指示点。

## API

| Prop       | Type                                        | Default | Description                  |
| ---------- | ------------------------------------------- | ------- | ---------------------------- |
| `src`      | `string`                                    | —       | 图片 URL                     |
| `alt`      | `string`                                    | —       | 图片替代文本                 |
| `name`     | `string`                                    | —       | 全名（生成缩写字母）         |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`      | `'md'`  | 尺寸                         |
| `status`   | `'online' \| 'offline' \| 'busy' \| 'away'` | —       | 状态指示点                   |
| `children` | `Snippet`                                   | —       | 回退内容                     |

## 用法

```svelte
<Avatar src="photo.jpg" alt="User" />
<Avatar name="John Doe" />
<Avatar name="Jane" status="online" />
```
