---
title: 對話框
group: components
---

# 對話框

模態對話框，包含標題、描述、底部區域，支援焦點陷阱與 Escape 關閉。

## API

| Prop                  | Type             | Default | Description            |
| --------------------- | ---------------- | ------- | ---------------------- |
| `open`/`defaultOpen`  | `boolean`        | `false` | 受控/非受控            |
| `modal`               | `boolean`        | `true`  | 是否設定 aria-modal    |
| `closeOnEscape`       | `boolean`        | `true`  | Escape 關閉            |
| `closeOnOutsideClick` | `boolean`        | `true`  | 點擊遮罩關閉           |
| `onopenchange`        | `(open) => void` | —       | 開啟狀態回呼           |
| `texts`               | `{ close: string }`      | —       | 文案覆寫（見下）       |

## 用法

```svelte
<Dialog>
  {#snippet title()}Confirm{/snippet}
  <p>Are you sure?</p>
</Dialog>
```
