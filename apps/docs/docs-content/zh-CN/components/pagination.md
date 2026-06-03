---
title: Pagination
group: components
---

# Pagination

分页导航组件，支持上一页/下一页、省略号折叠和可选的跳页输入框。

## Import

```svelte
<script>
  import { Pagination } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                       | Default        | Description                  |
| ---------------- | -------------------------- | -------------- | ---------------------------- |
| `value`          | `number`                   | —              | 受控当前页（从 1 开始）        |
| `defaultValue`   | `number`                   | `1`            | 非受控默认页                  |
| `total`          | `number`                   | —              | 总页数                        |
| `siblingCount`   | `number`                   | `1`            | 当前页两侧显示的页数          |
| `showEdges`      | `boolean`                  | `true`         | 始终显示首页/末页             |
| `showJumpTo`     | `boolean`                  | `false`        | 显示"跳到"输入框              |
| `disabled`       | `boolean`                  | `false`        | 禁用状态                      |
| `aria-label`     | `string`                   | `'分页'`       | 无障碍标签                    |
| `onValueChange`  | `(page: number) => void`   | —              | 页码变化时触发                |

## 键盘

- `←` / `→` — 上一页 / 下一页
- `Home` / `End` — 跳到第一页 / 最后一页
- `Tab` — 在页码按钮间移动

## Usage

```svelte
<script>
  let page = $state(1);
</script>

<Pagination
  total={20}
  bind:value={page}
  siblingCount={2}
  showJumpTo
  onValueChange={(p) => console.log('页:', p)}
/>
```

## 行为

- `total <= 7` 时直接显示所有页码，不省略
- 更大总数时用省略号折叠中间页
- 活动页设 `aria-current="page"`
- 第一页禁用上一页，最后一页禁用下一页

## Accessibility

- 根节点是 `<nav>` 带 `aria-label`
- 每个页码是带标签的 `<button>`
- 活动页使用 `aria-current="page"`
- 跳页输入框有关联的 `<label>`
