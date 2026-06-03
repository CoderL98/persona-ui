---
title: FileUpload
group: components
---

# FileUpload

A drag-and-drop file upload component with click-to-browse, file list, and size/type filtering.

## Import

```svelte
<script>
  import { FileUpload } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                | Default                                         | Description                          |
| ---------------- | ----------------------------------- | ----------------------------------------------- | ------------------------------------ |
| `value`          | `FileUploadFile[]`                  | —                                               | Controlled list of files             |
| `defaultValue`   | `FileUploadFile[]`                  | `[]`                                            | Uncontrolled default list            |
| `accept`         | `string`                            | —                                               | MIME / extension filter (e.g. `image/*,.pdf`) |
| `multiple`       | `boolean`                           | `false`                                         | Allow selecting multiple files       |
| `maxSize`        | `number`                            | —                                               | Max file size in bytes               |
| `disabled`       | `boolean`                           | `false`                                         | Disabled state                       |
| `placeholder`    | `string`                            | `'Drop files here or click to browse'`          | Empty state text                     |
| `helperText`     | `string`                            | —                                               | Helper text below the dropzone       |
| `error`          | `string`                            | —                                               | Error message (also sets `aria-invalid`) |
| `leading`        | `Snippet`                           | —                                               | Custom leading icon                  |
| `onValueChange`  | `(files: FileUploadFile[]) => void` | —                                               | Fired when files are added/replaced  |
| `onRemove`       | `(index: number) => void`           | —                                               | Fired when a file is removed         |
| `onDrop`         | `(e: DragEvent) => void`            | —                                               | Native drop event                    |
| `onDragOver`     | `(e: DragEvent) => void`            | —                                               | Native dragover event                |

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
  helperText="Up to 5MB per file"
/>
```

## Keyboard

- `Enter` / `Space` on the dropzone opens the file picker
- `Tab` to focus the dropzone, then `Enter` to open the picker

## Accessibility

- Dropzone is a `role="button"` with `aria-label` matching the placeholder
- `aria-disabled` reflects the disabled state
- Each file row has a labeled remove button
- Errors use `role="alert"`
