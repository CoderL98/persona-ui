---
title: 步骤条
group: components
---

# Stepper

多步进度指示器，支持水平/垂直布局、可选描述和错误状态。

## Import

```svelte
<script>
  import { Stepper } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                     | Default        | Description                  |
| ---------------- | ---------------------------------------- | -------------- | ---------------------------- |
| `steps`          | `StepperStep[]`                          | —              | 步骤定义数组                  |
| `value`          | `number`                                 | —              | 受控当前步骤（从 0 开始）      |
| `defaultValue`   | `number`                                 | `0`            | 非受控默认步骤                |
| `orientation`    | `'horizontal' \| 'vertical'`             | `'horizontal'` | 布局方向                      |
| `clickable`      | `boolean`                                | `true`         | 是否允许点击切换步骤          |
| `showIndicators` | `boolean`                                | `true`         | 显示步骤号/勾选/错误图标       |
| `errorSteps`     | `number[]`                               | `[]`           | 错误状态的步骤索引            |
| `aria-label`     | `string`                                 | `'进度'`       | 无障碍标签                    |
| `onValueChange`  | `(index: number) => void`                | —              | 当前步骤变化时触发            |

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

## 键盘

- `Tab` — 在步骤按钮间移动
- `Enter` / `Space` — 激活当前聚焦的步骤
- `←` / `→` / `↑` / `↓` — 在步骤间移动焦点
- `Home` / `End` — 跳到第一步 / 最后一步

## Usage

```svelte
<script>
  import { Stepper, Button } from '@persona-ui/lib';

  const steps = [
    { label: '账号', description: '创建账号' },
    { label: '资料', description: '个人信息' },
    { label: '确认', description: '核对详情' },
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

## 状态

- **complete** — 当前步骤之前的步骤（实心勾选）
- **current** — 活动步骤（实心带光圈）
- **upcoming** — 当前步骤之后（灰色）
- **error** — `errorSteps` 中的步骤（红色 X）

## Accessibility

- 容器是 `<ol>` 保留有序列表语义
- 每个步骤是 `<button>`，活动步骤带 `aria-current="step"`
- 禁用步骤有 `aria-disabled` 和 `tabindex=-1`
