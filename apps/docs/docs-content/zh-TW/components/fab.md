---
title: Fab 浮動操作按鈕
description: MD3 Floating Action Button — 螢幕中代表主要操作的懸浮按鈕
---

<script>
  import { Fab } from '$lib';
  import Stack from '$lib/components/stack/Stack.svelte';
</script>

# Fab

Material Design 3 標準的浮動操作按鈕，代表螢幕中最重要的單一操作。

## 引入

```ts
import { Fab } from '@persona-ui/lib';
```

## 基礎

```svelte
<Fab label="新增" onclick={() => console.log('Add')} />
```

## 變體

4 檔顏色變體：

```svelte
<Fab label="表面" variant="surface" />
<Fab label="主色" variant="primary" />
<Fab label="次色" variant="secondary" />
<Fab label="第三色" variant="tertiary" />
```

## 尺寸

3 檔尺寸符合 MD3 規範：

- `small` (40dp)
- `regular` (56dp，預設)
- `large` (96dp)

```svelte
<Fab label="緊湊" size="small" />
<Fab label="標準" size="regular" />
<Fab label="擴展" size="large" extendedLabel="新增" />
```

## API

| Prop | 類型 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `variant` | `"surface" \| "primary" \| "secondary" \| "tertiary"` | `"primary"` | 顏色變體 |
| `size` | `"small" \| "regular" \| "large"` | `"regular"` | 尺寸 |
| `label` | `string` | — | **必填**，無障礙標籤 |
| `extendedLabel` | `string` | — | Extended FAB 描述 |
| `disabled` | `boolean` | `false` | 禁用 |
| `loading` | `boolean` | `false` | 載入中 |
| `children` | `Snippet` | — | 圖示 |
| `onClick` | `(e: MouseEvent) => void` | — | 點擊回呼 |
| `class` | `string` | — | 額外 class |
| `style` | `string` | — | 內聯樣式 |
| `id` | `string` | — | DOM id |

## 無障礙

- 必填 `label` 渲染為 `aria-label`
- 點擊自動觸發 medium 檔觸感
- 觸控目標至少 48×48dp

## 另見

- [Button](/docs/components/button)
- [IconButton](/docs/components/icon-button)
- [Snackbar](/docs/components/snackbar)
