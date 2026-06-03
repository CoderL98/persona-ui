---
title: 漫游引导
group: components
---

# Tour

产品导览走马灯，聚焦目标元素并显示分步说明。

## Import

```svelte
<script>
  import { Tour, Button } from '@persona-ui/lib';
</script>
```

## API

| Prop               | Type                                                  | Default   | Description                  |
| ------------------ | ----------------------------------------------------- | --------- | ---------------------------- |
| `open`             | `boolean`                                             | `false`   | 导览是否开启                  |
| `steps`            | `TourStep[]`                                          | —         | 导览步骤列表                  |
| `value`            | `number`                                              | —         | 受控当前步骤索引              |
| `spotlightPadding` | `number`                                              | `8`       | 聚光区周围内边距（px）         |
| `closeOnEscape`    | `boolean`                                             | `true`    | Escape 关闭导览               |
| `showProgress`     | `boolean`                                             | `true`    | 显示 "1 / N" 进度            |
| `showSkip`         | `boolean`                                             | `true`    | 显示跳过按钮                  |
| `texts`            | `{ next?, prev?, done?, skip? }`                      | 英文      | 自定义按钮文案                |
| `onOpenChange`     | `(open: boolean) => void`                             | —         | 开启/关闭时触发               |
| `onValueChange`    | `(index: number) => void`                             | —         | 步骤变化时触发                |
| `onComplete`       | `() => void`                                          | —         | 最后一步 Done 时触发          |
| `popoverContent`   | `Snippet`                                             | —         | 自定义弹窗内容                |

### `TourStep`

```ts
type TourStep = {
  target: string;        // 目标元素 CSS 选择器
  title: string;         // 弹窗标题
  content?: string;      // 描述文本
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  disableInteraction?: boolean;
};
```

## 键盘

- `Escape` — 关闭导览
- `←` / `→` — 上一步 / 下一步
- `Enter` / `Space`（在按钮上）— 激活

## Usage

```svelte
<script>
  import { Tour, Button } from '@persona-ui/lib';

  let open = $state(false);

  const steps = [
    { target: '#step-1', title: '欢迎', content: '点击这里开始' },
    { target: '#step-2', title: '收件箱', content: '查看新消息' },
    { target: '#step-3', title: '设置', content: '自定义偏好' },
  ];
</script>

<Button onclick={() => open = true}>开始导览</Button>

<button id="step-1">开始</button>
<button id="step-2">收件箱</button>
<button id="step-3">设置</button>

<Tour bind:open {steps} onComplete={() => console.log('导览完成！')} />
```

## 位置

`placement: 'auto'`（默认）时，弹窗自动定位在可用空间最大的一侧。

## Accessibility

- 弹窗是 `role="dialog"`，`aria-label` 与步骤标题一致
- `Escape` 关闭导览
- 所有按钮都有正确的 `aria-label`
- 目标元素用焦点环视觉高亮
