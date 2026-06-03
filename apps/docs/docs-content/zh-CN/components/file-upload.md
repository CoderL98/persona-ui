---
title: FileUpload
group: components
---

# FileUpload

支持拖拽和点击上传的文件上传组件，带文件列表和大小/类型过滤。

## Import

```svelte
<script>
  import { FileUpload } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                | Default                                  | Description                       |
| ---------------- | ----------------------------------- | ---------------------------------------- | --------------------------------- |
| `value`          | `FileUploadFile[]`                  | —                                        | 受控文件列表                      |
| `defaultValue`   | `FileUploadFile[]`                  | `[]`                                     | 非受控默认文件列表                |
| `accept`         | `string`                            | —                                        | MIME / 扩展名过滤（如 `image/*,.pdf`）|
| `multiple`       | `boolean`                           | `false`                                  | 是否允许多选                      |
| `maxSize`        | `number`                            | —                                        | 单文件最大字节数                  |
| `disabled`       | `boolean`                           | `false`                                  | 禁用状态                          |
| `placeholder`    | `string`                            | `'拖拽文件或点击选择'`                   | 空状态文本                        |
| `helperText`     | `string`                            | —                                        | 拖拽区下方帮助文字                |
| `error`          | `string`                            | —                                        | 错误信息（同时设 `aria-invalid`）  |
| `leading`        | `Snippet`                           | —                                        | 自定义前置图标                    |
| `onValueChange`  | `(files: FileUploadFile[]) => void` | —                                        | 文件增删时触发                    |
| `onRemove`       | `(index: number) => void`           | —                                        | 单个文件被删除时触发              |
| `onDrop`         | `(e: DragEvent) => void`            | —                                        | 原生 drop 事件                    |
| `onDragOver`     | `(e: DragEvent) => void`            | —                                        | 原生 dragover 事件                |

### `FileUploadFile`

```ts
type FileUploadFile = {
  name: string;
  size: number;
  type: string;
  url?: string;
};
```

## Usage

```svelte
<script>
  let files = $state([]);
</script>

<FileUpload
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024}
  bind:value={files}
  helperText="单个文件最大 5MB"
/>
```

## 键盘

- 聚焦拖拽区后按 `Enter` / `Space` 打开文件选择器

## Accessibility

- 拖拽区是 `role="button"`，`aria-label` 与 placeholder 一致
- `aria-disabled` 反映禁用状态
- 每个文件行带标签化的删除按钮
- 错误使用 `role="alert"`
