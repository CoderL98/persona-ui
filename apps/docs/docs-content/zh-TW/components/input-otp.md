---
title: InputOTP
group: components
---

# InputOTP

一次性密碼輸入元件，分離的輸入槽位、完整鍵盤導航和貼上支援。

## Import

```svelte
<script>
  import { InputOTP } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                          | Default      | Description                        |
| ---------------- | ----------------------------- | ------------ | ---------------------------------- |
| `value`          | `string`                      | —            | 受控值（拼接後的字串）             |
| `defaultValue`   | `string`                      | `''`         | 非受控預設值                       |
| `length`         | `number`                      | `6`          | 輸入槽位數                         |
| `pattern`        | `RegExp`                      | `/^[0-9]$/`  | 每個槽位允許的字元正則             |
| `mask`           | `boolean`                     | `false`      | 用 `•` 遮罩已輸入字元              |
| `type`           | `'text' \| 'number' \| 'password'` | `'text'` | HTML input 類型                    |
| `disabled`       | `boolean`                     | `false`      | 禁用狀態                           |
| `readonly`       | `boolean`                     | `false`      | 唯讀狀態                           |
| `autoFocus`      | `boolean`                     | `false`      | 掛載時聚焦第一個槽位               |
| `placeholder`    | `string`                      | `'·'`        | 佔位字元                           |
| `aria-label`     | `string`                      | `'驗證碼'`   | 無障礙標籤                         |
| `onValueChange`  | `(value: string) => void`     | —            | 值變化時觸發                       |
| `onComplete`     | `(value: string) => void`     | —            | 所有槽位填滿時觸發                 |

## 鍵盤

- `←` / `→` — 在槽位間切換
- `Backspace` — 清空當前槽位，聚焦上一個
- `Home` / `End` — 跳到第一個 / 最後一個槽位
- `Ctrl+V` / `Cmd+V` / 貼上 — 從剪貼簿一次填滿多個槽位
- 輸入後自動前進到下一個槽位

## Usage

```svelte
<script>
  import { InputOTP, Button } from '@persona-ui/lib';

  let code = $state('');
</script>

<InputOTP bind:value={code} length={6} onComplete={(v) => console.log('Code:', v)} />
<Button disabled={code.length !== 6} onclick={() => submit(code)}>驗證</Button>
```

## Accessibility

- 容器是 `role="group"` 帶 `aria-label`
- 每個槽位有描述性 `aria-label`（如 "Digit 1 of 6"）
- number 類型自動設 `inputmode="numeric"`，行動端彈數字鍵盤
- `autocomplete="one-time-code"` 整合系統 OTP 自動填入
