---
title: HoverCard
group: components
---

# HoverCard

懸停觸發的工具提示風格卡片，用於在懸停/聚焦時顯示豐富內容（個人檔案預覽、連結預覽等）。

## Import

```svelte
<script>
  import { HoverCard } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                       | Default | Description                  |
| ---------------- | ------------------------------------------ | ------- | ---------------------------- |
| `children`       | `Snippet`                                  | —       | 觸發元素                      |
| `content`        | `Snippet`                                  | —       | 卡片內容                      |
| `placement`      | `'top' \| 'bottom' \| 'left' \| 'right' \| 'auto'` | `'auto'` | 首選位置         |
| `openDelay`      | `number`                                   | `300`   | 顯示前延遲（ms）              |
| `closeDelay`     | `number`                                   | `100`   | 隱藏前延遲（ms）              |
| `maxWidth`       | `number`                                   | `320`   | 最大寬度（px）                |
| `aria-label`     | `string`                                   | —       | 無障礙標籤                    |

## Usage

```svelte
<script>
  import { HoverCard } from '@persona-ui/lib';
</script>

<HoverCard maxWidth={280}>
  <a href="https://svelte.dev" class="underline">Svelte</a>
  {#snippet content()}
    <p class="font-semibold">Svelte</p>
    <p class="text-xs opacity-80">賽博增強的 Web 應用</p>
  {/snippet}
</HoverCard>
```

## 行為

- 懸停或聚焦後 `openDelay` ms 顯示
- 離開後 `closeDelay` ms 隱藏
- 卡片自身有 hover 處理防止閃爍
- `placement: 'auto'` 選擇空間最大的一側

## Accessibility

- 卡片是 `role="tooltip"`
- 觸發器可鍵盤聚焦（focusin / focusout）
- 滑鼠和鍵盤使用者體驗一致
