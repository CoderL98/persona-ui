---
title: Snackbar 反馈条
description: MD3 标准的轻量反馈条 — 操作完成后短暂显示
---

<script>
  import { Snackbar } from '$lib';
</script>

# Snackbar

Material Design 3 标准的轻量反馈条，用于告知用户操作结果，自动消失（默认 4 秒）。

## 引入

```ts
import { Snackbar } from '@persona-ui/lib';
```

## 基础

```svelte
<Snackbar message="保存成功" defaultOpen={true} />
```

## 语义色

4 档语义：

- `info`（默认）
- `success` — 成功
- `warning` — 警告
- `error` — 错误

```svelte
<Snackbar message="已发送" tone="info" />
<Snackbar message="操作成功" tone="success" />
<Snackbar message="请注意" tone="warning" />
<Snackbar message="网络错误" tone="error" />
```

## Action

`kind="action"` 含操作按钮（不自动消失）：

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

## API

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | — | 受控开关 |
| `defaultOpen` | `boolean` | `false` | 默认开关 |
| `tone` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | 语义色 |
| `kind` | `"default" \| "action"` | `"default"` | 行为模式 |
| `duration` | `number` | `4000` | 持续毫秒 |
| `message` | `string` | — | **必填** 文案 |
| `actionLabel` | `string` | — | 操作按钮文案 |
| `onOpenChange` | `(open: boolean) => void` | — | 开关回调 |
| `onAction` | `() => void` | — | 操作按钮回调 |
| `class` | `string` | — | 额外 class |
| `style` | `string` | — | 内联样式 |
| `id` | `string` | — | DOM id |

## 无障碍

- `role="status"` + `aria-live="polite"`
- 关闭按钮 `aria-label="Dismiss"`
- iPhone 刘海屏 `env(safe-area-inset-bottom)` 安全

## 另见

- [Toast](/docs/components/toast) — 命令式提示
- [Alert](/docs/components/alert) — 嵌入式警示
- [Fab](/docs/components/fab) — 主要操作按钮
