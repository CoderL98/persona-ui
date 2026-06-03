---
title: CodeBlock
group: components
---

# CodeBlock

語法高亮代碼展示元件，內建複製按鈕、行號和 12 種支援語言。

## Import

```svelte
<script>
  import { CodeBlock } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                                    | Default      | Description                |
| ---------------- | ------------------------------------------------------- | ------------ | -------------------------- |
| `code`           | `string`                                                | —            | 程式碼內容                  |
| `language`       | `CodeBlockLanguage`                                     | `'ts'`       | 語法語言                    |
| `showLanguage`   | `boolean`                                               | `true`       | 顯示語言標籤                |
| `showCopy`       | `boolean`                                               | `true`       | 顯示複製按鈕                |
| `filename`       | `string`                                                | —            | 頭部顯示的檔名              |
| `showLineNumbers` | `boolean`                                              | `false`      | 顯示行號                    |
| `maxHeight`      | `number`                                                | —            | 捲動前最大高度（px）         |
| `onCopy`         | `() => void`                                            | —            | 複製成功時觸發              |

### `CodeBlockLanguage`

```ts
type CodeBlockLanguage = 'svelte' | 'ts' | 'tsx' | 'js' | 'jsx' | 'html' | 'css' | 'json' | 'bash' | 'sh' | 'md' | 'yaml';
```

## Usage

### 基礎

```svelte
<CodeBlock code="const x = 1;" language="ts" />
```

### 帶檔名（自動隱藏語言標籤）

```svelte
<CodeBlock
  code={`<script>
  let count = $state(0);
</script>`}
  language="svelte"
  filename="Counter.svelte"
/>
```

### 帶行號和最大高度

```svelte
<CodeBlock
  code={longCode}
  showLineNumbers
  maxHeight={400}
/>
```

### 不顯示複製按鈕

```svelte
<CodeBlock code="x = 1" showCopy={false} />
```

## 行為

- 複製使用 Clipboard API，非安全內容回退到 `document.execCommand('copy')`
- 複製後圖示切換為勾選 1.5 秒
- 沒有 filename/language/copy 時不顯示頭部
- 語法高亮是輕量正則實現，無外部依賴

## Accessibility

- 容器有 `aria-label`
- 複製按鈕有清晰的 `aria-label`
- 行號 `aria-hidden="true"`（裝飾性）
