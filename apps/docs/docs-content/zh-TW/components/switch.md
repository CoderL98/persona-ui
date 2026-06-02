---
title: 開關
group: components
---

# 開關

帶有無障礙 `role="switch"` 的開關元件。

## 匯入

```svelte
<script>
  import { Switch } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                 | Default | Description              |
| ---------------- | -------------------- | ------- | ------------------------ |
| `checked`        | `boolean`            | —       | 受控選取狀態             |
| `defaultChecked` | `boolean`            | `false` | 非受控預設值             |
| `disabled`       | `boolean`            | `false` | 停用狀態                 |
| `label`          | `string`             | —       | 可見標籤                 |
| `class`          | `string`             | —       | 額外的 CSS 類別          |
| `style`          | `string`             | —       | 行內樣式（用於 token 覆寫） |
| `onchange`       | `(e: Event) => void` | —       | 變更處理器               |

其餘屬性會轉發至根 `<div>` 元素。

## 受控與非受控

```svelte
<!-- Controlled -->
<Switch checked={notifications} onchange={(e) => toggle()} />

<!-- Uncontrolled -->
<Switch defaultChecked label="Enable notifications" />
```

## 無障礙

- 使用 `role="switch"` 與 `aria-checked`
- 可透過 Tab 聚焦
- 透過 `label` 屬性或 `aria-label` 提供可見標籤
- 鍵盤：點擊／Enter 切換

## 元件 Tokens

| Token                           | Default                            | Purpose       |
| ------------------------------- | ---------------------------------- | ------------- |
| `--pui-switch-track-bg`         | `var(--pui-ref-gray-30)`           | 關閉時軌道色  |
| `--pui-switch-track-checked-bg` | `var(--pui-color-primary)`         | 開啟時軌道色  |
| `--pui-switch-thumb-bg`         | `var(--pui-ref-gray-0)`            | 滑塊顏色      |
| `--pui-switch-track-width`      | `44px` (Apple) / `52px` (Material) | 軌道寬度      |
| `--pui-switch-track-height`     | `24px` (Apple) / `32px` (Material) | 軌道高度      |

## 用法

```svelte
<Switch label="Airplane Mode" defaultChecked />
<Switch label="Notifications" disabled />
<Switch style="--pui-switch-track-checked-bg: oklch(0.7 0.2 150);" defaultChecked label="Green toggle" />
```
