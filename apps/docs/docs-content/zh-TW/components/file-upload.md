---
title: FileUpload
group: components
---

# FileUpload

支援拖曳和點擊上傳的檔案上傳元件，帶檔案列表和大小/類型過濾。

## Import

```svelte
<script>
  import { FileUpload } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                | Default                                  | Description                            |
| ---------------- | ----------------------------------- | ---------------------------------------- | -------------------------------------- |
| `value`          | `FileUploadFile[]`                  | —                                        | 受控檔案列表                           |
| `defaultValue`   | `FileUploadFile[]`                  | `[]`                                     | 非受控預設檔案列表                     |
| `accept`         | `string`                            | —                                        | MIME / 副檔名過濾（如 `image/*,.pdf`）  |
| `multiple`       | `boolean`                           | `false`                                  | 是否允許多選                           |
| `maxSize`        | `number`                            | —                                        | 單檔最大位元組數                       |
| `disabled`       | `boolean`                           | `false`                                  | 禁用狀態                               |
| `placeholder`    | `string`                            | `'拖曳檔案或點擊選擇'`                   | 空狀態文字                             |
| `helperText`     | `string`                            | —                                        | 拖曳區下方說明文字                     |
| `error`          | `string`                            | —                                        | 錯誤訊息（同時設 `aria-invalid`）       |
| `leading`        | `Snippet`                           | —                                        | 自訂前置圖示                           |
| `onValueChange`  | `(files: FileUploadFile[]) => void` | —                                        | 檔案增刪時觸發                         |
| `onRemove`       | `(index: number) => void`           | —                                        | 單個檔案被刪除時觸發                   |
| `onDrop`         | `(e: DragEvent) => void`            | —                                        | 原生 drop 事件                         |
| `onDragOver`     | `(e: DragEvent) => void`            | —                                        | 原生 dragover 事件                     |

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
  helperText="單檔最大 5MB"
/>
```

## 鍵盤

- 聚焦拖曳區後按 `Enter` / `Space` 開啟檔案選擇器

## Accessibility

- 拖曳區是 `role="button"`，`aria-label` 與 placeholder 一致
- `aria-disabled` 反映禁用狀態
- 每個檔案行帶標籤化的刪除按鈕
- 錯誤使用 `role="alert"`
