---
title: Fab 浮动操作按钮
description: MD3 Floating Action Button — 屏幕中代表主要操作的悬浮按钮
---

<script>
  import { Fab } from '$lib';
  import Stack from '$lib/components/stack/Stack.svelte';
</script>

# Fab

Material Design 3 标准的浮动操作按钮，代表屏幕中最重要的单一操作。

## 引入

```ts
import { Fab } from '@persona-ui/lib';
```

## 基础

```svelte
<Fab label="新建" onclick={() => console.log('Add')} />
```

## 变体

4 档颜色变体（对应 MD3 4 档强调度）：

```svelte
<Fab label="表面" variant="surface" />
<Fab label="主色" variant="primary" />
<Fab label="次色" variant="secondary" />
<Fab label="第三色" variant="tertiary" />
```

## 尺寸

3 档尺寸符合 MD3 规范：

- `small` (40dp) — 紧凑工具栏
- `regular` (56dp) — 标准 FAB（默认）
- `large` (96dp) — Extended FAB

```svelte
<Fab label="紧凑" size="small" />
<Fab label="标准" size="regular" />
<Fab label="扩展" size="large" extendedLabel="新建" />
```

## API

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `"surface" \| "primary" \| "secondary" \| "tertiary"` | `"primary"` | 颜色变体 |
| `size` | `"small" \| "regular" \| "large"` | `"regular"` | 尺寸 |
| `label` | `string` | — | **必填**，无障碍标签 |
| `extendedLabel` | `string` | — | Extended FAB 描述文字 |
| `disabled` | `boolean` | `false` | 禁用 |
| `loading` | `boolean` | `false` | 加载态 |
| `children` | `Snippet` | — | 图标 |
| `onClick` | `(e: MouseEvent) => void` | — | 点击回调 |
| `class` | `string` | — | 额外 class |
| `style` | `string` | — | 内联样式 |
| `id` | `string` | — | DOM id |

## 无障碍

- 必填 `label` 渲染为 `aria-label`
- 点击自动触发 medium 档触感
- 触控目标至少 48×48dp
- 焦点环 `:focus-visible` 显式呈现

## 另见

- [Button](/docs/components/button) — 普通按钮
- [IconButton](/docs/components/icon-button) — 图标按钮
- [Snackbar](/docs/components/snackbar) — 操作反馈
