---
title: 悬浮卡片
group: components
---

# HoverCard

悬停触发的工具提示风格卡片，用于在悬停/聚焦时显示丰富内容（资料预览、链接预览等）。

## Import

```svelte
<script>
  import { HoverCard } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                       | Default | Description                  |
| ---------------- | ------------------------------------------ | ------- | ---------------------------- |
| `children`       | `Snippet`                                  | —       | 触发元素                      |
| `content`        | `Snippet`                                  | —       | 卡片内容                      |
| `placement`      | `'top' \| 'bottom' \| 'left' \| 'right' \| 'auto'` | `'auto'` | 首选位置         |
| `openDelay`      | `number`                                   | `300`   | 显示前延迟（ms）              |
| `closeDelay`     | `number`                                   | `100`   | 隐藏前延迟（ms）              |
| `maxWidth`       | `number`                                   | `320`   | 最大宽度（px）                |
| `aria-label`     | `string`                                   | —       | 无障碍标签                    |

## Usage

```svelte
<script>
  import { HoverCard } from '@persona-ui/lib';
</script>

<HoverCard maxWidth={280}>
  <a href="https://svelte.dev" class="underline">Svelte</a>
  {#snippet content()}
    <p class="font-semibold">Svelte</p>
    <p class="text-xs opacity-80">赛博增强的 Web 应用</p>
  {/snippet}
</HoverCard>
```

## 行为

- 悬停或聚焦后 `openDelay` ms 显示
- 离开后 `closeDelay` ms 隐藏
- 卡片自身有 hover 处理防止闪烁
- `placement: 'auto'` 选择空间最大的一侧

## Accessibility

- 卡片是 `role="tooltip"`
- 触发器可键盘聚焦（focusin / focusout）
- 鼠标和键盘用户体验一致
