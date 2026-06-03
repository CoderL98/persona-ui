---
title: 底部導覽列
group: components
---

# BottomNavigation

行動端風格的底部導航列，支援圖示、文字、徽標和 roving tabindex 鍵盤。

## Import

```svelte
<script>
  import { BottomNavigation } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                  | Default                 | Description              |
| ---------------- | ------------------------------------- | ----------------------- | ------------------------ |
| `value`          | `string`                              | —                       | 受控當前項 id             |
| `defaultValue`   | `string`                              | —                       | 非受控預設值              |
| `items`          | `BottomNavigationItem[]`               | —                       | 要顯示的項                |
| `showLabels`     | `boolean`                             | `true`                  | 在圖示旁顯示文字          |
| `iconsOnly`      | `boolean`                             | `false`                 | 隱藏文字（僅圖示）        |
| `aria-label`     | `string`                              | `'底部導航'`            | 導航的無障礙標籤          |
| `onValueChange`  | `(id: string) => void`                | —                       | 當前項變化時觸發          |

### `BottomNavigationItem`

```ts
type BottomNavigationItem = {
  id: string;
  label: string;
  icon: Snippet;
  badge?: number | string;
  disabled?: boolean;
};
```

## 鍵盤

- `Tab` / `Shift+Tab` — 進入 / 離開導航
- `←` / `→` / `↑` / `↓` — 在項之間移動
- `Home` / `End` — 跳到第一項 / 最後一項
- `Enter` / `Space` — 啟用當前項

## Usage

```svelte
<script>
  import { BottomNavigation } from '@persona-ui/lib';
  let active = $state('home');
</script>

<BottomNavigation
  bind:value={active}
  items={[
    { id: 'home', label: '首頁', icon: HomeIcon },
    { id: 'search', label: '搜尋', icon: SearchIcon },
    { id: 'inbox', label: '收件匣', icon: InboxIcon, badge: 3 },
    { id: 'profile', label: '我的', icon: ProfileIcon },
  ]}
/>
```

## Accessibility

- 根節點是 `<nav>` 帶 `aria-label`
- 每項是帶 `role="tab"` 和 `aria-selected` 的 `<button>`
- 當前項還設 `aria-current="page"`
- 禁用項有 `aria-disabled` 和 `tabindex="-1"`
- 尊重安全區（異形螢幕）
