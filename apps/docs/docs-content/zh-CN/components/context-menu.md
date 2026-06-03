---
title: 右键菜单
group: components
---

# ContextMenu

右键上下文菜单，支持分隔线、快捷键、危险操作和完整键盘导航。

## Import

```svelte
<script>
  import { ContextMenu } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                | Default           | Description              |
| ---------------- | ------------------- | ----------------- | ------------------------ |
| `open`           | `boolean`           | `false`           | 菜单是否打开              |
| `position`       | `{ x: number; y: number }` | `{ x: 0, y: 0 }` | 视口坐标 |
| `items`          | `ContextMenuItem[]` | —                 | 菜单项                    |
| `closeOnSelect`  | `boolean`           | `true`            | 点击项后关闭              |
| `onOpenChange`   | `(open: boolean) => void` | —           | 关闭时触发                |

### `ContextMenuItem`

```ts
type ContextMenuItem = {
  id?: string;
  label?: string;
  icon?: Snippet;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
  shortcut?: string;
  onSelect?: () => void;
};
```

## Usage

```svelte
<script>
  import { ContextMenu } from '@persona-ui/lib';
  let open = $state(false);
  let pos = $state({ x: 0, y: 0 });

  function handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    pos = { x: e.clientX, y: e.clientY };
    open = true;
  }
</script>

<div oncontextmenu={handleContextMenu}>
  在此右键
</div>

<ContextMenu
  bind:open
  position={pos}
  items={[
    { label: '剪切', shortcut: '⌘X', onSelect: () => console.log('Cut') },
    { separator: true },
    { label: '复制', shortcut: '⌘C', onSelect: () => console.log('Copy') },
    { label: '粘贴', shortcut: '⌘V', onSelect: () => console.log('Paste') },
    { separator: true },
    { label: '删除', destructive: true, onSelect: () => console.log('Delete') },
  ]}
/>
```

## 键盘

- `Escape` — 关闭菜单
- `↑` / `↓` — 在项之间移动
- `Enter` / `Space` — 激活高亮项
- 鼠标悬停也高亮项

## Accessibility

- 根节点是 `role="menu"`，`aria-orientation="vertical"`
- 项是 `role="menuitem"`
- 分隔线是 `role="separator"`
- 危险项用危险色
- 禁用项有 `aria-disabled` 和 `disabled`
