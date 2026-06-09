---
title: Snackbar 反饋條
description: MD3 標準的輕量反饋條 — 操作完成後短暫顯示
---

<script>
  import { Snackbar } from '$lib';
</script>

# Snackbar

Material Design 3 標準的輕量反饋條，用於告知使用者操作結果，自動消失（預設 4 秒）。

## 引入

```ts
import { Snackbar } from '@persona-ui/lib';
```

## 基礎

```svelte
<Snackbar message="儲存成功" defaultOpen={true} />
```

## 語義色

4 檔語義：

- `info`（預設）
- `success` — 成功
- `warning` — 警告
- `error` — 錯誤

```svelte
<Snackbar message="已發送" tone="info" />
<Snackbar message="操作成功" tone="success" />
<Snackbar message="請注意" tone="warning" />
<Snackbar message="網路錯誤" tone="error" />
```

## Action

`kind="action"` 含操作按鈕（不自動消失）：

```svelte
<Snackbar
  message="已刪除"
  kind="action"
  actionLabel="復原"
  defaultOpen={true}
  onAction={() => console.log('undo')}
  onOpenChange={(open) => console.log('open:', open)}
/>
```

## API

| Prop | 類型 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `open` | `boolean` | — | 受控開關 |
| `defaultOpen` | `boolean` | `false` | 預設開關 |
| `tone` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | 語義色 |
| `kind` | `"default" \| "action"` | `"default"` | 行為模式 |
| `duration` | `number` | `4000` | 持續毫秒 |
| `message` | `string` | — | **必填** 文案 |
| `actionLabel` | `string` | — | 操作按鈕文案 |
| `onOpenChange` | `(open: boolean) => void` | — | 開關回呼 |
| `onAction` | `() => void` | — | 操作按鈕回呼 |
| `class` | `string` | — | 額外 class |
| `style` | `string` | — | 內聯樣式 |
| `id` | `string` | — | DOM id |

## 無障礙

- `role="status"` + `aria-live="polite"`
- 關閉按鈕 `aria-label="Dismiss"`
- iPhone 瀏海屏 `env(safe-area-inset-bottom)` 安全

## 另見

- [Toast](/docs/components/toast)
- [Alert](/docs/components/alert)
- [Fab](/docs/components/fab)
