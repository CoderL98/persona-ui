---
title: Stack
group: components
---

# Stack

flexbox 佈局原語，用於垂直/水平堆疊，統一的 gap、對齊和 justify 控制。

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
| `align`          | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'`           | `'stretch'` | 交叉軸對齊                |
| `justify`        | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'`   | 主軸對齊                  |
| `gap`            | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12`                   | `0`         | 子項間距                  |
| `wrap`           | `'wrap' \| 'nowrap' \| 'wrap-reverse'`                              | `'nowrap'`  | flex 換行                |
| `inline`         | `boolean`                                                           | `false`     | 用 `inline-flex`         |
| `children`       | `Snippet`                                                           | —           | 子元素                    |

## Usage

```svelte
<Stack direction="column" gap={4} align="center">
  <h2>標題</h2>
  <p>描述</p>
  <Button>操作</Button>
</Stack>
```

### 水平工具列

```svelte
<Stack direction="row" gap={2} align="center" justify="between">
  <span>Logo</span>
  <Stack direction="row" gap={1}>
    <Button variant="ghost">登入</Button>
    <Button>註冊</Button>
  </Stack>
</Stack>
```

### 內嵌堆疊

```svelte
<Stack inline direction="row" gap={2} align="center">
  <Badge>新</Badge>
  <span>項標籤</span>
</Stack>
```

## 相對純 Tailwind 的優勢

- 型別安全的 `direction` / `align` / `justify` / `gap` / `wrap` 列舉
- gap 值對齊設計系統間距刻度
- 不用記 Tailwind 類別如何對應到軸
