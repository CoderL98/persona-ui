---
title: 轻提示
group: components
---

# Toast

临时通知组件，支持自动消失、4 种语义色调和操作按钮。

## API

| Prop                 | Type                                    | Default  | Description                       |
| -------------------- | --------------------------------------- | -------- | --------------------------------- |
| `tone`               | `'info'\|'success'\|'warning'\|'error'` | `'info'` | 颜色色调                          |
| `open`/`defaultOpen` | `boolean`                               | `false`  | 受控/非受控模式                   |
| `duration`           | `number`                                | `5000`   | 自动关闭毫秒数（0 表示不自动关闭） |
| `dismissible`        | `boolean`                               | `true`   | 显示关闭按钮                      |
| `onopenchange`       | `(open) => void`                        | —        | 打开状态变化回调                  |
| `texts`              | `{ dismiss: string }`                   | —        | 文案覆盖（见下文）                |

## 用法

```svelte
<Toast defaultOpen tone="success">Saved!</Toast>
```
