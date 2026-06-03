---
title: 对话框
group: components
---

# 对话框

模态对话框，包含标题、描述、底部区域，支持焦点陷阱与 Escape 关闭。

## API

| Prop                  | Type             | Default | Description            |
| --------------------- | ---------------- | ------- | ---------------------- |
| `open`/`defaultOpen`  | `boolean`        | `false` | 受控/非受控            |
| `modal`               | `boolean`        | `true`  | 是否设置 aria-modal    |
| `closeOnEscape`       | `boolean`        | `true`  | Escape 关闭            |
| `closeOnOutsideClick` | `boolean`        | `true`  | 点击遮罩关闭           |
| `onOpenChange`        | `(open) => void` | —       | 打开状态回调           |
| `texts`               | `{ close: string }`      | —       | 文案覆盖（见下）       |

## 用法

```svelte
<Dialog>
  {#snippet title()}Confirm{/snippet}
  <p>Are you sure?</p>
</Dialog>
```
