---
title: 選擇器
group: components
---

# 選擇器

支援頁面內 listbox 與原生 `<select>` 兩種渲染模式的下拉選擇器。

## 匯入

```svelte
<script>
  import { Select } from '@persona-ui/lib';
</script>
```

## API

| 屬性            | 型別             | 預設     | 說明                                                  |
| -------------- | ---------------- | ------- | ---------------------------------------------------- |
| `value`        | `string`         | —       | 受控的選取值                                          |
| `defaultValue` | `string`         | —       | 非受控預設值                                          |
| `options`      | `SelectOption[]` | —       | 顯示於 listbox 中的選項                               |
| `native`       | `boolean`        | `false` | 使用平台原生 `<select>` 取代 listbox                  |
| `name`         | `string`         | —       | 表單名稱（原生模式用於送出表單）                      |
| `placeholder`  | `string`         | —       | 尚未選取時的佔位文字                                  |
| `label`        | `string`         | —       | 可見標籤                                              |
| `helperText`   | `string`         | —       | 輔助文字                                              |
| `error`        | `string`         | —       | 錯誤訊息（會設定 `aria-invalid`）                     |
| `disabled`     | `boolean`        | `false` | 停用狀態                                              |
| `texts`        | `Record<string, string>` | — | 為個別實例覆寫內部顯示文字                            |
| `class`        | `string`         | —       | 額外的 CSS 類別                                       |
| `style`        | `string`         | —       | 行內樣式                                              |
| `onchange`     | `(value: string, e: Event) => void` | — | 選取變更處理函式                                      |

`SelectOption` 結構:`{ value: string, label: string, disabled?: boolean }`

## 原生模式

設定 `native` 即可使用平台原生 `<select>` —— 在行動裝置上,作業系統選擇器提供更佳體驗時特別實用。

```svelte
<Select
  native
  name="country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'cn', label: 'China' },
    { value: 'jp', label: 'Japan' }
  ]}
/>
```

## 用法

```svelte
<Select
  label="Favorite framework"
  placeholder="Pick one"
  defaultValue="svelte"
  options={[
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' }
  ]}
/>
```
