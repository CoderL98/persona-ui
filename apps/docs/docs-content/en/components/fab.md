---
title: Fab
description: MD3 Floating Action Button — 屏幕中代表主要操作的悬浮按钮
---

<script>
  import { Fab } from '$lib';
  import Stack from '$lib/components/stack/Stack.svelte';
</script>

# Fab

Material Design 3 标准的浮动操作按钮（Floating Action Button），代表屏幕中最重要的单一操作。

## Import

```ts
import { Fab } from '@persona-ui/lib';
```

## Basic

<svelte:component
  this={Fab}
  label="Add"
  variant="primary"
  size="regular"
  onclick={() => alert('Add clicked')}
/>

```svelte
<Fab label="Add" onclick={() => console.log('Add')} />
```

## Variants

Fab 提供 4 档颜色变体（对应 MD3 4 档强调度）：

<Stack direction="row" gap="md">
  <svelte:component this={Fab} label="Surface" variant="surface" />
  <svelte:component this={Fab} label="Primary" variant="primary" />
  <svelte:component this={Fab} label="Secondary" variant="secondary" />
  <svelte:component this={Fab} label="Tertiary" variant="tertiary" />
</Stack>

```svelte
<Fab label="Surface" variant="surface" />
<Fab label="Primary" variant="primary" />
<Fab label="Secondary" variant="secondary" />
<Fab label="Tertiary" variant="tertiary" />
```

## Sizes

3 档尺寸符合 MD3 规范：

- `small` (40dp) — 紧凑工具栏场景
- `regular` (56dp) — 标准 FAB（默认）
- `large` (96dp) — Extended FAB

```svelte
<Fab label="Compact" size="small" />
<Fab label="Standard" size="regular" />
<Fab label="Extended" size="large" extendedLabel="Create" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"surface" \| "primary" \| "secondary" \| "tertiary"` | `"primary"` | 颜色变体 |
| `size` | `"small" \| "regular" \| "large"` | `"regular"` | 尺寸（40 / 56 / 96dp）|
| `label` | `string` | — | **必填**，无障碍标签（aria-label）|
| `extendedLabel` | `string` | — | Extended FAB 的描述文字（仅 `size="large"` 时显示）|
| `disabled` | `boolean` | `false` | 禁用 |
| `loading` | `boolean` | `false` | 加载态 |
| `children` | `Snippet` | — | 图标 |
| `onClick` | `(e: MouseEvent) => void` | — | 点击回调（驼峰命名）|
| `class` | `string` | — | 额外 class |
| `style` | `string` | — | 内联样式 |
| `id` | `string` | — | DOM id |

## A11y

- `aria-label` 由 `label` prop 渲染（必填）
- 点击自动触发 medium 档 haptic（比 Button 的 light 重一档，因为 FAB 通常代表"主要操作"）
- 触控目标至少 48×48dp
- 焦点环使用 `:focus-visible` 显式呈现

## See also

- [Button](/docs/components/button) — 普通操作按钮
- [IconButton](/docs/components/icon-button) — 纯图标按钮
- [Snackbar](/docs/components/snackbar) — 操作反馈条
