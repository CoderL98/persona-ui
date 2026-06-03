---
title: 分頁
group: components
---

# Pagination

分頁導航元件，支援上一頁/下一頁、省略號摺疊和可選的跳頁輸入框。

## Import

```svelte
<script>
  import { Pagination } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                       | Default        | Description                  |
| ---------------- | -------------------------- | -------------- | ---------------------------- |
| `value`          | `number`                   | —              | 受控當前頁（從 1 開始）      |
| `defaultValue`   | `number`                   | `1`            | 非受控預設頁                  |
| `total`          | `number`                   | —              | 總頁數                        |
| `siblingCount`   | `number`                   | `1`            | 當前頁兩側顯示的頁數          |
| `showEdges`      | `boolean`                  | `true`         | 始終顯示首頁/末頁             |
| `showJumpTo`     | `boolean`                  | `false`        | 顯示"跳到"輸入框              |
| `disabled`       | `boolean`                  | `false`        | 禁用狀態                      |
| `aria-label`     | `string`                   | `'分頁'`       | 無障礙標籤                    |
| `onValueChange`  | `(page: number) => void`   | —              | 頁碼變化時觸發                |

## 鍵盤

- `←` / `→` — 上一頁 / 下一頁
- `Home` / `End` — 跳到第一頁 / 最後一頁
- `Tab` — 在頁碼按鈕間移動

## Usage

```svelte
<script>
  let page = $state(1);
</script>

<Pagination
  total={20}
  bind:value={page}
  siblingCount={2}
  showJumpTo
  onValueChange={(p) => console.log('頁:', p)}
/>
```

## 行為

- `total <= 7` 時直接顯示所有頁碼，不省略
- 更大總數時用省略號摺疊中間頁
- 活動頁設 `aria-current="page"`
- 第一頁禁用上一頁，最後一頁禁用下一頁

## Accessibility

- 根節點是 `<nav>` 帶 `aria-label`
- 每個頁碼是帶標籤的 `<button>`
- 活動頁使用 `aria-current="page"`
- 跳頁輸入框有關聯的 `<label>`
