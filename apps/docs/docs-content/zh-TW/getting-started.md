---
title: 快速上手
group: guide
---

# Persona UI 快速上手

Persona UI 是一個 Svelte 5 元件庫，採用「雙重人格」的設計系統——透過純 CSS、無須額外類別的主題機制，在 **Apple HIG** 與 **Material Design 3** 兩套視覺語法之間靈活切換。

## 安裝

主題 CSS 已拆分到獨立 npm 包,需至少再裝一個主題包:

```bash
pnpm add @persona-ui/lib
pnpm add @persona-ui/theme-apple    # 或 @persona-ui/theme-material
```

## 引入樣式

在根 CSS 檔案(或全域樣式進入點)中:

```css
@import "@persona-ui/lib/core.css";
@import "@persona-ui/theme-apple/apple.css";
/* 或:@import "@persona-ui/theme-material/material.css"; */
```

> `@persona-ui/lib/styles.css` 仍可作為向後相容別名(v0.2.0 起標記 deprecated),
> 新程式碼請直接用 `core.css` + 主題包進入點。

## 設定當前主題

在 `<html>` 標籤（或任意容器元素）上設定主題：

```html
<html data-theme="apple" data-mode="light"></html>
```

- `data-theme="apple"` — Apple HIG 風格的視覺
- `data-theme="material"` — Material Design 3 風格的視覺
- `data-mode="light"` — 淺色模式
- `data-mode="dark"` — 深色模式

## 你的第一個元件

```svelte
<script>
  import { Button } from '@persona-ui/lib';
</script>

<Button variant="filled">點擊我</Button>
```

## 切換主題

透過修改 `data-theme` 屬性即可在主題之間切換：

```svelte
<script>
  let theme = $state('apple');
  function toggle() {
    theme = theme === 'apple' ? 'material' : 'apple';
    document.documentElement.setAttribute('data-theme', theme);
  }
</script>

<button onclick={toggle}>切換到 {theme === 'apple' ? 'Material' : 'Apple'}</button>
<Button>我會跟隨當前主題</Button>
```

## 局部覆寫

透過 `style` 在實例層級覆寫任意元件的設計權杖：

```svelte
<Button
  variant="filled"
  style="--pui-button-radius: 2px; --pui-button-bg: oklch(0.6 0.2 250);"
>
  自訂圓角與顏色
</Button>
```

## 容器級主題

你也可以將主題限定在某個子樹範圍內：

```svelte
<div data-theme="material">
  <Button variant="filled">這個按鈕使用 Material 風格</Button>
</div>
```

## 下一步

- [主題設定指南](theming) — 詳細的主題概念
- [設計權杖參考](tokens) — 全部 CSS 變數
- [元件](/docs/components/)：
  - [Button](components/button)
  - [Card](components/card)
  - [TextField](components/text-field)
  - [Switch](components/switch)
