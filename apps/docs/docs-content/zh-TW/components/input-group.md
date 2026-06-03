---
title: 輸入框群組
group: components
---

# InputGroup

將 TextField 與前置/後置附加項（圖示、文字或按鈕）組合，建立複合輸入控制項。

## Import

```svelte
<script>
  import { InputGroup, TextField, Button } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                | Default        | Description              |
| ---------------- | ------------------- | -------------- | ------------------------ |
| `leading`        | `Snippet`           | —              | 前置附加項（圖示/文字）    |
| `trailing`       | `Snippet`           | —              | 後置附加項（圖示/文字）    |
| `orientation`    | `'horizontal' \| 'vertical'` | `'horizontal'` | 佈局方向          |
| `disabled`       | `boolean`           | `false`        | 禁用狀態                  |
| `children`       | `Snippet`           | —              | 主輸入元素                |
| `aria-label`     | `string`            | —              | 組合的無障礙標籤           |

## Usage

### 帶前置圖示

```svelte
<script>
  import { InputGroup, TextField } from '@persona-ui/lib';
</script>

<InputGroup leading={() => '🔍'}>
  <TextField placeholder="搜尋…" />
</InputGroup>
```

### 帶後置按鈕

```svelte
<InputGroup
  trailing={() => html`<Button>送出</Button>`}
>
  <TextField placeholder="輸入訊息…" />
</InputGroup>
```

### 貨幣輸入

```svelte
<InputGroup leading={() => '$'}>
  <TextField type="number" placeholder="0.00" />
</InputGroup>
```

### URL 協定

```svelte
<InputGroup
  leading={() => 'https://'}
  trailing={() => html`<Button>前往</Button>`}
>
  <TextField placeholder="example.com" />
</InputGroup>
```

## Accessibility

- 根節點是 `role="group"` 表示關聯控制項
- `aria-disabled` 反映禁用狀態
- 每個子輸入保留自己的可聚焦性
