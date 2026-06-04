---
title: 确认对话框
group: components
---

# ConfirmDialog

预构建的确认对话框，带默认与危险两种色调、加载状态和完整键盘支持。

## Import

```svelte
<script>
  import { ConfirmDialog } from '@persona-ui/lib';
</script>
```

## API

| Prop                 | Type                              | Default      | Description                |
| -------------------- | --------------------------------- | ------------ | -------------------------- |
| `open`               | `boolean`                         | `false`      | 对话框是否打开              |
| `title`              | `string`                          | —            | 标题（必填）                |
| `description`        | `string`                          | —            | 描述文本                    |
| `children`           | `Snippet`                         | —            | 自定义内容（覆盖 description）|
| `footer`             | `Snippet`                         | —            | 自定义底部（覆盖默认按钮）   |
| `tone`               | `'default' \| 'danger'`           | `'default'`  | 确认按钮色调                |
| `confirmText`        | `string`                          | `'确认'`     | 确认按钮文本                |
| `cancelText`         | `string`                          | `'取消'`     | 取消按钮文本                |
| `loading`            | `boolean`                         | `false`      | 加载状态，禁用按钮          |
| `closeOnOutsideClick` | `boolean`                        | `true`       | 点击背景关闭                |
| `closeOnEscape`      | `boolean`                         | `true`       | Escape 关闭                 |
| `onOpenChange`       | `(open: boolean) => void`         | —            | 开关状态变化时触发          |
| `onConfirm`          | `() => void`                      | —            | 点击确认时触发              |
| `onCancel`           | `() => void`                      | —            | 点击取消 / 关闭时触发        |

## 键盘

- `Escape` — 取消并关闭
- `Tab` — 在取消和确认按钮间移动

## Usage

```svelte
<script>
  import { ConfirmDialog, Button } from '@persona-ui/lib';

  let open = $state(false);
  let deleting = $state(false);

  async function handleDelete() {
    deleting = true;
    try {
      await fetch('/api/items/123', { method: 'DELETE' });
      open = false;
    } finally {
      deleting = false;
    }
  }
</script>

<Button onClick={() => open = true}>删除</Button>

<ConfirmDialog
  bind:open
  title="删除此项？"
  description="此操作不可撤销。"
  tone="danger"
  confirmText="删除"
  loading={deleting}
  onConfirm={handleDelete}
/>
```

## Accessibility

- 根节点是 `role="alertdialog"`，`aria-modal="true"`
- `aria-labelledby` 关联标题
- `aria-describedby` 关联描述
- 打开时第一个可聚焦元素获得焦点
- 关闭时还原之前的焦点
