---
title: 弹出层
group: components
---

# 弹出层

Popover 弹出层，支持触发器切换、Escape 关闭和 6 个弹出位置。

## API

| Prop                 | Type                                                             | Default    | Description      |
| -------------------- | ---------------------------------------------------------------- | ---------- | ---------------- |
| `open`/`defaultOpen` | `boolean`                                                        | `false`    | 受控/非受控      |
| `placement`          | `'top'\|'bottom'\|'left'\|'right'\|'bottom-start'\|'bottom-end'` | `'bottom'` | 弹出位置         |
| `trigger`            | `Snippet`                                                        | —          | 触发元素         |

## 用法

```svelte
<Popover>
  {#snippet trigger()}<Button>Open</Button>{/snippet}
  <div>Popover content</div>
</Popover>
```
