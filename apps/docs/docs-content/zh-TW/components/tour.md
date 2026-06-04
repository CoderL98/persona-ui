---
title: 導覽
group: components
---

# Tour

產品導覽元件，聚焦目標元素並顯示分步說明。

## Import

```svelte
<script>
  import { Tour, Button } from '@persona-ui/lib';
</script>
```

## API

| Prop               | Type                                                  | Default   | Description                  |
| ------------------ | ----------------------------------------------------- | --------- | ---------------------------- |
| `open`             | `boolean`                                             | `false`   | 導覽是否開啟                  |
| `steps`            | `TourStep[]`                                          | —         | 導覽步驟列表                  |
| `value`            | `number`                                              | —         | 受控當前步驟索引              |
| `spotlightPadding` | `number`                                              | `8`       | 聚光區周圍內邊距（px）         |
| `closeOnEscape`    | `boolean`                                             | `true`    | Escape 關閉導覽               |
| `showProgress`     | `boolean`                                             | `true`    | 顯示 "1 / N" 進度            |
| `showSkip`         | `boolean`                                             | `true`    | 顯示跳過按鈕                  |
| `texts`            | `{ next?, prev?, done?, skip? }`                      | 英文      | 自訂按鈕文案                  |
| `onOpenChange`     | `(open: boolean) => void`                             | —         | 開啟/關閉時觸發               |
| `onValueChange`    | `(index: number) => void`                             | —         | 步驟變化時觸發                |
| `onComplete`       | `() => void`                                          | —         | 最後一步 Done 時觸發          |
| `popoverContent`   | `Snippet`                                             | —         | 自訂彈窗內容                  |

### `TourStep`

```ts
type TourStep = {
  target: string;        // 目標元素 CSS 選擇器
  title: string;         // 彈窗標題
  content?: string;      // 描述文字
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  disableInteraction?: boolean;
};
```

## 鍵盤

- `Escape` — 關閉導覽
- `←` / `→` — 上一步 / 下一步
- `Enter` / `Space`（在按鈕上）— 啟用

## Usage

```svelte
<script>
  import { Tour, Button } from '@persona-ui/lib';

  let open = $state(false);

  const steps = [
    { target: '#step-1', title: '歡迎', content: '點擊這裡開始' },
    { target: '#step-2', title: '收件匣', content: '查看新訊息' },
    { target: '#step-3', title: '設定', content: '自訂偏好' },
  ];
</script>

<Button onClick={() => open = true}>開始導覽</Button>

<button id="step-1">開始</button>
<button id="step-2">收件匣</button>
<button id="step-3">設定</button>

<Tour bind:open {steps} onComplete={() => console.log('導覽完成！')} />
```

## 位置

`placement: 'auto'`（預設）時，彈窗自動定位在可用空間最大的一側。

## Accessibility

- 彈窗是 `role="dialog"`，`aria-label` 與步驟標題一致
- `Escape` 關閉導覽
- 所有按鈕都有正確的 `aria-label`
- 目標元素用焦點環視覺高亮
