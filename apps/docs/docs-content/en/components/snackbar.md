---
title: Snackbar
description: MD3 标准的轻量反馈条 — 操作完成后短暂显示
---

<script>
  import { Snackbar } from '$lib';
</script>

# Snackbar

Material Design 3 标准的轻量反馈条，用于告知用户操作结果或简短信息，自动消失（默认 4 秒）。

## Import

```ts
import { Snackbar } from '@persona-ui/lib';
```

## Basic

```svelte
<Snackbar message="保存成功" defaultOpen={true} />
```

## Tones

4 档语义色：

- `info`（默认）— 一般信息
- `success` — 成功反馈
- `warning` — 警告
- `error` — 错误

```svelte
<Snackbar message="已发送" tone="info" />
<Snackbar message="操作成功" tone="success" />
<Snackbar message="请注意" tone="warning" />
<Snackbar message="网络错误" tone="error" />
```

## Action

`kind="action"` 包含操作按钮（不自动消失，需用户主动关）：

```svelte
<Snackbar
  message="已删除"
  kind="action"
  actionLabel="撤销"
  defaultOpen={true}
  onAction={() => console.log('undo')}
  onOpenChange={(open) => console.log('open:', open)}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | 受控开关 |
| `defaultOpen` | `boolean` | `false` | 默认开关（非受控）|
| `tone` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | 语义色 |
| `kind` | `"default" \| "action"` | `"default"` | 行为模式 |
| `duration` | `number` | `4000` | 持续毫秒（`kind="default"` 时生效）|
| `message` | `string` | — | **必填** 文案 |
| `actionLabel` | `string` | — | 操作按钮文案 |
| `onOpenChange` | `(open: boolean) => void` | — | 开关状态变化回调（驼峰）|
| `onAction` | `() => void` | — | 操作按钮点击回调 |
| `class` | `string` | — | 额外 class |
| `style` | `string` | — | 内联样式 |
| `id` | `string` | — | DOM id |

## A11y

- `role="status"` + `aria-live="polite"` 让屏幕阅读器自动播报
- 关闭按钮带 `aria-label="Dismiss"`
- 定位在屏幕底部 + `env(safe-area-inset-bottom)`，iPhone 刘海屏安全
- 点 action 按钮自动触发 light 档 haptic

## See also

- [Toast](/docs/components/toast) — 命令式 API 的轻量提示
- [Alert](/docs/components/alert) — 嵌入式警示
- [Fab](/docs/components/fab) — 主要操作按钮
