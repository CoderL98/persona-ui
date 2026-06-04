---
title: 確認對話框
group: components
---

# ConfirmDialog

預建的確認對話框，帶預設與危險兩種色調、載入狀態和完整鍵盤支援。

## Import

```svelte
<script>
  import { ConfirmDialog } from '@persona-ui/lib';
</script>
```

## API

| Prop                 | Type                              | Default      | Description                |
| -------------------- | --------------------------------- | ------------ | -------------------------- |
| `open`               | `boolean`                         | `false`      | 對話框是否開啟              |
| `title`              | `string`                          | —            | 標題（必填）                |
| `description`        | `string`                          | —            | 描述文字                    |
| `children`           | `Snippet`                         | —            | 自訂內容（覆蓋 description）|
| `footer`             | `Snippet`                         | —            | 自訂底部（覆蓋預設按鈕）   |
| `tone`               | `'default' \| 'danger'`           | `'default'`  | 確認按鈕色調                |
| `confirmText`        | `string`                          | `'確認'`     | 確認按鈕文字                |
| `cancelText`         | `string`                          | `'取消'`     | 取消按鈕文字                |
| `loading`            | `boolean`                         | `false`      | 載入狀態，禁用按鈕          |
| `closeOnOutsideClick` | `boolean`                        | `true`       | 點擊背景關閉                |
| `closeOnEscape`      | `boolean`                         | `true`       | Escape 關閉                 |
| `onOpenChange`       | `(open: boolean) => void`         | —            | 開關狀態變化時觸發          |
| `onConfirm`          | `() => void`                      | —            | 點擊確認時觸發              |
| `onCancel`           | `() => void`                      | —            | 點擊取消 / 關閉時觸發        |

## 鍵盤

- `Escape` — 取消並關閉
- `Tab` — 在取消和確認按鈕間移動

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

<Button onClick={() => open = true}>刪除</Button>

<ConfirmDialog
  bind:open
  title="刪除此項？"
  description="此操作不可復原。"
  tone="danger"
  confirmText="刪除"
  loading={deleting}
  onConfirm={handleDelete}
/>
```

## Accessibility

- 根節點是 `role="alertdialog"`，`aria-modal="true"`
- `aria-labelledby` 關聯標題
- `aria-describedby` 關聯描述
- 開啟時第一個可聚焦元素獲得焦點
- 關閉時還原先前的焦點
