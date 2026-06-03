---
title: 頭像
group: components
---

# Avatar 頭像

## Import

```svelte
<script>
  import { 頭像 } from '@persona-ui/lib';
</script>
```

使用者頭像元件，支援圖片、縮寫字母回退與狀態指示點。

## API

| Prop       | Type                                        | Default | Description                  |
| ---------- | ------------------------------------------- | ------- | ---------------------------- |
| `src`      | `string`                                    | —       | 圖片 URL                     |
| `alt`      | `string`                                    | —       | 圖片替代文字                 |
| `name`     | `string`                                    | —       | 全名（產生縮寫字母）         |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`      | `'md'`  | 尺寸                         |
| `status`   | `'online' \| 'offline' \| 'busy' \| 'away'` | —       | 狀態指示點                   |
| `children` | `Snippet`                                   | —       | 回退內容                     |

## 用法

```svelte
<Avatar src="photo.jpg" alt="User" />
<Avatar name="John Doe" />
<Avatar name="Jane" status="online" />
```
