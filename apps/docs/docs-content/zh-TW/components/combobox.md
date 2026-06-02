---
title: 組合方塊
group: components
---

# 組合方塊

支援可篩選的單選或多選下拉,搭配自由輸入文字。多選模式會以可移除的標籤呈現已選項目。

## 匯入

```svelte
<script>
  import { Combobox } from '@persona-ui/lib';
</script>
```

## API

| 屬性                 | 型別                       | 預設     | 說明                                          |
| ------------------- | -------------------------- | ------- | -------------------------------------------- |
| `value`             | `string \| string[]`       | —       | 受控值（`multiple` 為陣列）                  |
| `defaultValue`      | `string \| string[]`       | —       | 非受控預設值                                  |
| `multiple`          | `boolean`                  | `false` | 啟用以標籤呈現的多選模式                      |
| `inputValue`        | `string`                   | —       | 受控的輸入框文字                              |
| `defaultInputValue` | `string`                   | `''`    | 輸入框的非受控預設值                          |
| `options`           | `ComboboxOption[]`         | —       | 用於篩選與選取的選項                          |
| `placeholder`       | `string`                   | —       | 輸入框的佔位文字                              |
| `label`             | `string`                   | —       | 可見標籤                                      |
| `helperText`        | `string`                   | —       | 輔助文字                                      |
| `error`             | `string`                   | —       | 錯誤訊息（會設定 `aria-invalid`）             |
| `disabled`          | `boolean`                  | `false` | 停用狀態                                      |
| `texts`             | `Record<string, string>`   | —       | 為個別實例覆寫內部顯示文字                    |
| `class`             | `string`                   | —       | 額外的 CSS 類別                               |
| `style`             | `string`                   | —       | 行內樣式                                      |
| `oninput`           | `(inputValue: string, e: Event) => void` | — | 輸入文字變更處理函式                  |
| `onchange`          | `(value, e: Event) => void` | —       | 選取變更處理函式                              |

`ComboboxOption` 結構:`{ value: string, label: string, disabled?: boolean }`

## 用法

```svelte
<!-- Single-select -->
<Combobox
  label="Pick a fruit"
  placeholder="Search…"
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
  ]}
/>

<!-- Multi-select -->
<Combobox
  multiple
  label="Tags"
  defaultValue={['svelte', 'tailwind']}
  options={[
    { value: 'svelte', label: 'Svelte' },
    { value: 'tailwind', label: 'Tailwind' },
    { value: 'typescript', label: 'TypeScript' }
  ]}
/>
```
