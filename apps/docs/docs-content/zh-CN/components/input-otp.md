---
title: 一次性密码
group: components
---

# InputOTP

一次性密码输入组件，分离的输入槽位、完整键盘导航和粘贴支持。

## Import

```svelte
<script>
  import { InputOTP } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                          | Default      | Description                    |
| ---------------- | ----------------------------- | ------------ | ------------------------------ |
| `value`          | `string`                      | —            | 受控值（拼接后的字符串）        |
| `defaultValue`   | `string`                      | `''`         | 非受控默认值                    |
| `length`         | `number`                      | `6`          | 输入槽位数                      |
| `pattern`        | `RegExp`                      | `/^[0-9]$/`  | 每个槽位允许的字符正则          |
| `mask`           | `boolean`                     | `false`      | 用 `•` 遮盖已输入字符           |
| `type`           | `'text' \| 'number' \| 'password'` | `'text'` | HTML input 类型                 |
| `disabled`       | `boolean`                     | `false`      | 禁用状态                        |
| `readonly`       | `boolean`                     | `false`      | 只读状态                        |
| `autoFocus`      | `boolean`                     | `false`      | 挂载时聚焦第一个槽位            |
| `placeholder`    | `string`                      | `'·'`        | 占位字符                        |
| `aria-label`     | `string`                      | `'验证码'`   | 无障碍标签                      |
| `onValueChange`  | `(value: string) => void`     | —            | 值变化时触发                    |
| `onComplete`     | `(value: string) => void`     | —            | 所有槽位填满时触发              |

## 键盘

- `←` / `→` — 在槽位间切换
- `Backspace` — 清空当前槽位，聚焦上一个
- `Home` / `End` — 跳到第一个 / 最后一个槽位
- `Ctrl+V` / `Cmd+V` / 粘贴 — 从剪贴板一次填充多个槽位
- 输入后自动前进到下一个槽位

## Usage

```svelte
<script>
  import { InputOTP, Button } from '@persona-ui/lib';

  let code = $state('');
</script>

<InputOTP bind:value={code} length={6} onComplete={(v) => console.log('Code:', v)} />
<Button disabled={code.length !== 6} onclick={() => submit(code)}>验证</Button>
```

## Accessibility

- 容器是 `role="group"` 带 `aria-label`
- 每个槽位有描述性 `aria-label`（如 "Digit 1 of 6"）
- number 类型自动设 `inputmode="numeric"`，移动端弹数字键盘
- `autocomplete="one-time-code"` 集成系统 OTP 自动填充
