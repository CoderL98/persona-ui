---
title: 命令面板
group: components
---

# CommandPalette

## Import

```svelte
<script>
  import { 命令面板 } from '@persona-ui/lib';
</script>
```

命令面板對話方塊，支援搜尋篩選與鍵盤導覽。

## API

| Prop          | Type                                                        | Description                                  |
| ------------- | ----------------------------------------------------------- | -------------------------------------------- |
| `items`       | `CommandItem[]`                                             | 命令清單，包含 id/label/description/shortcut |
| `placeholder` | `string`                                                    | 搜尋輸入框預留位置文字                       |
| `onSelect`    | `(id) => void`                                              | 命令選擇回呼                                 |
| `texts`       | `{ placeholder: string, emptyText: string, close: string }` | 文字覆寫（見下文）                           |

## 用法

```svelte
<CommandPalette items={[{id:'new',label:'New File',shortcut:'⌘N'}]} />
```
