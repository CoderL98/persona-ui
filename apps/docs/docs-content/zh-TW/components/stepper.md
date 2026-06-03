---
title: Stepper
group: components
---

# Stepper

多步進度指示器，支援水平/垂直佈局、可選描述和錯誤狀態。

## Import

```svelte
<script>
  import { Stepper } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                     | Default        | Description                  |
| ---------------- | ---------------------------------------- | -------------- | ---------------------------- |
| `steps`          | `StepperStep[]`                          | —              | 步驟定義陣列                  |
| `value`          | `number`                                 | —              | 受控當前步驟（從 0 開始）      |
| `defaultValue`   | `number`                                 | `0`            | 非受控預設步驟                |
| `orientation`    | `'horizontal' \| 'vertical'`             | `'horizontal'` | 佈局方向                      |
| `clickable`      | `boolean`                                | `true`         | 是否允許點擊切換步驟          |
| `showIndicators` | `boolean`                                | `true`         | 顯示步驟號/勾選/錯誤圖示       |
| `errorSteps`     | `number[]`                               | `[]`           | 錯誤狀態的步驟索引            |
| `aria-label`     | `string`                                 | `'進度'`       | 無障礙標籤                    |
| `onValueChange`  | `(index: number) => void`                | —              | 當前步驟變化時觸發            |

### `StepperStep`

```ts
type StepperStep = {
  id?: string;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: Snippet;
};
```

## 鍵盤

- `Tab` — 在步驟按鈕間移動
- `Enter` / `Space` — 啟用當前聚焦的步驟
- `←` / `→` / `↑` / `↓` — 在步驟間移動焦點
- `Home` / `End` — 跳到第一步 / 最後一步

## Usage

```svelte
<script>
  import { Stepper, Button } from '@persona-ui/lib';

  const steps = [
    { label: '帳號', description: '建立帳號' },
    { label: '資料', description: '個人資訊' },
    { label: '確認', description: '核對詳情' },
    { label: '完成' },
  ];

  let current = $state(0);
</script>

<Stepper {steps} bind:value={current} />

<div class="mt-4 flex justify-between">
  <Button disabled={current === 0} onclick={() => current--}>上一步</Button>
  <Button onclick={() => current++}>下一步</Button>
</div>
```

## 狀態

- **complete** — 當前步驟之前的步驟（實心勾選）
- **current** — 活動步驟（實心帶光圈）
- **upcoming** — 當前步驟之後（灰色）
- **error** — `errorSteps` 中的步驟（紅色 X）

## Accessibility

- 容器是 `<ol>` 保留有序列表語義
- 每個步驟是 `<button>`，活動步驟帶 `aria-current="step"`
- 禁用步驟有 `aria-disabled` 和 `tabindex=-1`
