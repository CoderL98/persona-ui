---
title: Message
group: components
---

# Message

轻量内联消息通知，支持自动消失、四种色调和灵活位置。

## Import

```svelte
<script>
  import { Message } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                                  | Default    | Description                |
| ---------------- | ----------------------------------------------------- | ---------- | -------------------------- |
| `open`           | `boolean`                                             | `true`     | 消息是否可见                |
| `tone`           | `'info' \| 'success' \| 'warning' \| 'error'`         | `'info'`   | 色调                        |
| `title`          | `string`                                              | —          | 加粗标题                    |
| `description`    | `string`                                              | —          | 描述文本                    |
| `children`       | `Snippet`                                             | —          | 自定义内容（覆盖 description）|
| `leading`        | `Snippet`                                             | —          | 自定义前置图标              |
| `duration`       | `number`                                              | `0`        | 自动关闭时长 ms（0=不自动） |
| `closable`       | `boolean`                                             | `true`     | 显示关闭按钮                |
| `placement`      | `'top' \| 'top-right' \| 'top-left' \| 'bottom' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | 屏幕位置 |
| `onOpenChange`   | `(open: boolean) => void`                             | —          | 开关状态变化时触发          |
| `onTimeout`      | `() => void`                                          | —          | 自动关闭定时器触发时回调     |

## Usage

```svelte
<script>
  import { Message } from '@persona-ui/lib';
  let saved = $state(false);
</script>

<button onclick={() => { saved = true; }}>保存</button>

{#if saved}
  <Message
    tone="success"
    title="已保存！"
    description="你的修改已保存。"
    duration={3000}
    onOpenChange={(o) => { if (!o) saved = false; }}
  />
{/if}
```

### 持久消息

```svelte
<Message
  tone="warning"
  title="需要操作"
  description="请验证你的邮箱地址。"
  closable={false}
  placement="top"
/>
```

## 色调

- `info` — 蓝色，`role="status"`，`aria-live="polite"`
- `success` — 绿色，`role="status"`，`aria-live="polite"`
- `warning` — 黄色，`role="status"`，`aria-live="polite"`
- `error` — 红色，`role="alert"`，`aria-live="assertive"`

## Accessibility

- `role="status"`（info/success/warning）或 `role="alert"`（error）
- `aria-live` 反映严重程度
- 默认色调图标（装饰性，`aria-hidden`）
- 关闭按钮有清晰的 `aria-label`
