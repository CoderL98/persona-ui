---
title: 列表方塊
group: components
---

# 列表方塊 (Listbox)

獨立的、無障礙的選項清單 — 支援單選或多選，完整的鍵盤導覽。

## 匯入

```ts
import { Listbox } from '@persona-ui/lib/components/listbox';
```

## API

| 屬性            | 類型                                            | 預設值 | 說明                                                  |
| --------------- | ----------------------------------------------- | ------ | ----------------------------------------------------- |
| `value`         | `string \| string[]`                            | —      | 受控值（單選為 string，多選為陣列）                   |
| `defaultValue`  | `string \| string[]`                            | —      | 非受控初始值                                          |
| `multiple`      | `boolean`                                       | `false`| 啟用多選模式                                          |
| `options`       | `{ value: string, label: string, disabled?: boolean }[]` | `[]` | 選項清單                       |
| `disabled`      | `boolean`                                       | `false`| 停用整個列表方塊                                      |
| `texts`         | `{ options: string }`                           | —      | 文字覆寫                                              |
| `onchange`      | `(value, e: Event) => void`                     | —      | 選擇變化回呼                                          |

## 狀態

| 狀態      | 觸發                | 結果                                              |
| --------- | ------------------- | ------------------------------------------------- |
| 預設      | 渲染                | 僅鍵盤聚焦時高亮第一項                            |
| 懸停      | `:hover`            | 列底色微變                                        |
| 選中      | 點擊 / Enter / 空白鍵 | primary container 背景                          |
| 停用      | `disabled` / 單列   | 透明度降低，停用 pointer-events                   |
| 作用中    | 方向鍵              | surface variant 背景（焦點指示）                  |

## 用法

### 單選

```svelte
<script>
  import { Listbox } from '@persona-ui/lib/components/listbox';
  let value = $state('apple');
</script>

<Listbox
  bind:value
  options={[
    { value: 'apple', label: '蘋果' },
    { value: 'orange', label: '橘子' },
    { value: 'banana', label: '香蕉' },
  ]}
/>
```

### 多選

```svelte
<script>
  import { Listbox } from '@persona-ui/lib/components/listbox';
  let value = $state(['react', 'svelte']);
</script>

<Listbox
  multiple
  bind:value
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid', disabled: true },
  ]}
/>
```

## 無障礙

- 容器具有 `role="listbox"`，可鍵盤聚焦（tabindex=0）
- 每個選項具有 `role="option"` 與 `aria-selected` 反映當前值
- `multiple` 模式下具有 `aria-multiselectable="true"`
- 停用列具有 `aria-disabled`
- 鍵盤：
  - <kbd>↓</kbd> / <kbd>↑</kbd> — 移動作用中選項
  - <kbd>Home</kbd> / <kbd>End</kbd> — 跳到首項 / 末項
  - <kbd>Enter</kbd> / <kbd>Space</kbd> — 選擇作用中項

## 相關元件

- [Select](./select) — 帶彈層觸發器的列表方塊（適合表單）
- [Combobox](./combobox) — 列表方塊 + 文字輸入（可過濾）
- [Menu](./menu) — 列表方塊的選單語意（動作項）
