---
title: Message
group: components
---

# Message

輕量內嵌訊息通知，支援自動消失、四種色調和靈活位置。

## Import

```svelte
<script>
  import { Message } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                                  | Default    | Description                |
| ---------------- | ----------------------------------------------------- | ---------- | -------------------------- |
| `open`           | `boolean`                                             | `true`     | 訊息是否可見                |
| `tone`           | `'info' \| 'success' \| 'warning' \| 'error'`         | `'info'`   | 色調                        |
| `title`          | `string`                                              | —          | 加粗標題                    |
| `description`    | `string`                                              | —          | 描述文字                    |
| `children`       | `Snippet`                                             | —          | 自訂內容（覆蓋 description）|
| `leading`        | `Snippet`                                             | —          | 自訂前置圖示                |
| `duration`       | `number`                                              | `0`        | 自動關閉時長 ms（0=不自動） |
| `closable`       | `boolean`                                             | `true`     | 顯示關閉按鈕                |
| `placement`      | `'top' \| 'top-right' \| 'top-left' \| 'bottom' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | 螢幕位置 |
| `onOpenChange`   | `(open: boolean) => void`                             | —          | 開關狀態變化時觸發          |
| `onTimeout`      | `() => void`                                          | —          | 自動關閉計時器觸發時回呼     |

## Usage

```svelte
<script>
  import { Message } from '@persona-ui/lib';
  let saved = $state(false);
</script>

<button onclick={() => { saved = true; }}>儲存</button>

{#if saved}
  <Message
    tone="success"
    title="已儲存！"
    description="你的修改已儲存。"
    duration={3000}
    onOpenChange={(o) => { if (!o) saved = false; }}
  />
{/if}
```

### 持久訊息

```svelte
<Message
  tone="warning"
  title="需要操作"
  description="請驗證你的 Email 地址。"
  closable={false}
  placement="top"
/>
```

## 色調

- `info` — 藍色，`role="status"`，`aria-live="polite"`
- `success` — 綠色，`role="status"`，`aria-live="polite"`
- `warning` — 黃色，`role="status"`，`aria-live="polite"`
- `error` — 紅色，`role="alert"`，`aria-live="assertive"`

## Accessibility

- `role="status"`（info/success/warning）或 `role="alert"`（error）
- `aria-live` 反映嚴重程度
- 預設色調圖示（裝飾性，`aria-hidden`）
- 關閉按鈕有清晰的 `aria-label`
