---
title: 命令面板
group: components
---

# CommandPalette

命令面板对话框，支持搜索过滤和键盘导航。

## API

| Prop          | Type                                                        | Description                            |
| ------------- | ----------------------------------------------------------- | -------------------------------------- |
| `items`       | `CommandItem[]`                                             | 命令列表，包含 id/label/description/shortcut |
| `placeholder` | `string`                                                    | 搜索输入框占位文字                     |
| `onSelect`    | `(id) => void`                                              | 命令选中回调                           |
| `texts`       | `{ placeholder: string, emptyText: string, close: string }` | 文案覆盖（见下文）                     |

## 用法

```svelte
<CommandPalette items={[{id:'new',label:'New File',shortcut:'⌘N'}]} />
```
