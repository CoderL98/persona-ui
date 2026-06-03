---
title: BottomNavigation
group: components
---

# BottomNavigation

移动端风格的底部导航栏，支持图标、文字、徽标和 roving tabindex 键盘。

## Import

```svelte
<script>
  import { BottomNavigation } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                  | Default                 | Description              |
| ---------------- | ------------------------------------- | ----------------------- | ------------------------ |
| `value`          | `string`                              | —                       | 受控活动项 id             |
| `defaultValue`   | `string`                              | —                       | 非受控默认值              |
| `items`          | `BottomNavigationItem[]`               | —                       | 要显示的项                |
| `showLabels`     | `boolean`                             | `true`                  | 在图标旁显示文字          |
| `iconsOnly`      | `boolean`                             | `false`                 | 隐藏文字（仅图标）        |
| `aria-label`     | `string`                              | `'底部导航'`            | 导航的无障碍标签          |
| `onValueChange`  | `(id: string) => void`                | —                       | 活动项变化时触发          |

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

## 键盘

- `Tab` / `Shift+Tab` — 进入 / 离开导航
- `←` / `→` / `↑` / `↓` — 在项之间移动
- `Home` / `End` — 跳到第一项 / 最后一项
- `Enter` / `Space` — 激活当前项

## Usage

```svelte
<script>
  import { BottomNavigation } from '@persona-ui/lib';
  let active = $state('home');
</script>

<BottomNavigation
  bind:value={active}
  items={[
    { id: 'home', label: '首页', icon: HomeIcon },
    { id: 'search', label: '搜索', icon: SearchIcon },
    { id: 'inbox', label: '收件箱', icon: InboxIcon, badge: 3 },
    { id: 'profile', label: '我的', icon: ProfileIcon },
  ]}
/>
```

## Accessibility

- 根节点是 `<nav>` 带 `aria-label`
- 每项是带 `role="tab"` 和 `aria-selected` 的 `<button>`
- 活动项还设 `aria-current="page"`
- 禁用项有 `aria-disabled` 和 `tabindex="-1"`
- 尊重安全区（异形屏）
