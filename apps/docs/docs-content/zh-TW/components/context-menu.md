---
title: 右鍵選單
group: components
---

# ContextMenu

右鍵上下文選單，支援分隔線、快速鍵、危險操作和完整鍵盤導航。

## Import

```svelte
<script>
  import { ContextMenu } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                | Default           | Description              |
| ---------------- | ------------------- | ----------------- | ------------------------ |
| `open`           | `boolean`           | `false`           | 選單是否開啟              |
| `position`       | `{ x: number; y: number }` | `{ x: 0, y: 0 }` | 視口座標 |
| `items`          | `ContextMenuItem[]` | —                 | 選單項                    |
| `closeOnSelect`  | `boolean`           | `true`            | 點擊項後關閉              |
| `onOpenChange`   | `(open: boolean) => void` | —           | 關閉時觸發                |

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
  在此右鍵
</div>

<ContextMenu
  bind:open
  position={pos}
  items={[
    { label: '剪下', shortcut: '⌘X', onSelect: () => console.log('Cut') },
    { separator: true },
    { label: '複製', shortcut: '⌘C', onSelect: () => console.log('Copy') },
    { label: '貼上', shortcut: '⌘V', onSelect: () => console.log('Paste') },
    { separator: true },
    { label: '刪除', destructive: true, onSelect: () => console.log('Delete') },
  ]}
/>
```

## 鍵盤

- `Escape` — 關閉選單
- `↑` / `↓` — 在項之間移動
- `Enter` / `Space` — 啟用高亮項
- 滑鼠懸停也高亮項

## Accessibility

- 根節點是 `role="menu"`，`aria-orientation="vertical"`
- 項是 `role="menuitem"`
- 分隔線是 `role="separator"`
- 危險項用危險色
- 禁用項有 `aria-disabled` 和 `disabled`
