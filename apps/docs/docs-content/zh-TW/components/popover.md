---
title: 彈出層
group: components
---

# 彈出層

## Import

```svelte
<script>
  import { 彈出層 } from '@persona-ui/lib';
</script>
```

Popover 彈出層，支援觸發切換、Escape 關閉和 6 個彈出位置。

## API

| Prop                 | Type                                                             | Default    | Description      |
| -------------------- | ---------------------------------------------------------------- | ---------- | ---------------- |
| `open`/`defaultOpen` | `boolean`                                                        | `false`    | 受控/非受控      |
| `placement`          | `'top'\|'bottom'\|'left'\|'right'\|'bottom-start'\|'bottom-end'` | `'bottom'` | 彈出位置         |
| `trigger`            | `Snippet`                                                        | —          | 觸發元素         |

## 用法

```svelte
<Popover>
  {#snippet trigger()}<Button>Open</Button>{/snippet}
  <div>Popover content</div>
</Popover>
```
