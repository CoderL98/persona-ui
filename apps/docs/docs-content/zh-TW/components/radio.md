---
title: 單選
group: components
---

# 單選

## Import

```svelte
<script>
  import { 單選 } from '@persona-ui/lib';
</script>
```

互斥選項的單選群組,亦提供獨立的 `Radio` 項目。

## 匯入

```svelte
<script>
  import { RadioGroup, Radio } from '@persona-ui/lib';
</script>
```

## API

### RadioGroup

| 屬性            | 型別                                | 預設          | 說明                                |
| -------------- | ----------------------------------- | ------------- | ---------------------------------- |
| `value`        | `string`                            | —             | 受控的選取值                        |
| `defaultValue` | `string`                            | —             | 非受控預設值                        |
| `name`         | `string`                            | —             | 表單名稱 — 由所有子層 radio 共用    |
| `orientation`  | `'horizontal' \| 'vertical'`        | `'vertical'`  | 排列方向                            |
| `disabled`     | `boolean`                           | `false`       | 停用所有子層 radio                  |
| `label`        | `string`                            | —             | 群組標籤                            |
| `class`        | `string`                            | —             | 額外的 CSS 類別                     |
| `style`        | `string`                            | —             | 行內樣式                            |
| `onValueChange`     | `(value: string, e: Event) => void` | —             | 選取變更處理函式                    |

### Radio

| 屬性       | 型別      | 預設     | 說明                  |
| ---------- | -------- | ------- | --------------------- |
| `value`    | `string` | —       | 選取時送出的值        |
| `label`    | `string` | —       | 可見標籤              |
| `disabled` | `boolean` | `false` | 停用狀態              |
| `class`    | `string` | —       | 額外的 CSS 類別       |
| `style`    | `string` | —       | 行內樣式              |

## 用法

```svelte
<RadioGroup label="Choose one" name="plan">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" defaultChecked />
  <Radio value="team" label="Team" />
</RadioGroup>

<RadioGroup label="Size" orientation="horizontal" defaultValue="m">
  <Radio value="s" label="S" />
  <Radio value="m" label="M" />
  <Radio value="l" label="L" />
</RadioGroup>
```
