---
title: 主題設定指南
group: guide
---

# 主題設定指南

Persona UI 使用 **以 CSS 變數為基礎的權杖引擎** 來切換不同的設計人格。無須任何 JavaScript 主題提供者。

## 標準對齊

Persona UI 獨立開發，與 Apple 或 Google **沒有官方關聯**。它提供：

- **對齊 Apple HIG 的視覺軌** — 顏色角色、材質/模糊、字體與互動模式皆受 Apple Human Interface Guidelines 啟發。
- **對齊 Material Design 3 的視覺軌** — 顏色角色、色調色板、層級、形狀尺度、字體尺度、狀態層皆與 Material Design 3 保持一致。

對齊工作透過語意權杖、元件狀態行為、無障礙約束與視覺回歸測試落實。Persona UI 並未實作 HIG/Material 的全部指引，請勿將其聲稱為「官方」或「完美復刻」。

## 優先順序體系

```
inline style (instance override)
  > component default tokens
    > [data-theme] track tokens
      > :root semantic tokens
        > component fallback values
```

## 選擇主題

### 全域主題

```html
<html data-theme="apple">
  <html data-theme="material"></html>
</html>
```

### 淺色/深色模式

```html
<html data-theme="apple" data-mode="light">
  <html data-theme="apple" data-mode="dark"></html>
</html>
```

### 容器級主題

任意元素都可以成為主題根：

```html
<div data-theme="material">
  <!-- 此範圍內所有 Persona UI 元件使用 Material 風格 -->
</div>
```

這種方式可以實現 **混合主題孤島** ——例如一個 Apple 頁面中嵌入 Material 風格的側邊欄。

## 實例級覆寫

每個元件都接收一個 `style` 屬性，會被透傳到根 DOM 元素：

```svelte
<Button style="--pui-button-radius: 20px; --pui-button-bg: deeppink;">
  自訂樣式
</Button>
```

所有元件權杖皆遵循 `var(--pui-<component>-<property>, <fallback>)` 的寫法，因此實例級變數始終會勝出。

## 設計軌道

### Apple HIG（`data-theme="apple"`）

- **表面**：半透明、背景模糊、細邊框
- **圓角**：較大（控制項 `14px`，容器 `22px`）
- **層級**：柔和的環境光陰影
- **動效**：基於彈簧的緩動，較短的時長
- **狀態變化**：縮放 + 透明度，細膩克制

### Material 3（`data-theme="material"`）

- **表面**：不透明，基於顏色角色（surface、surface-container 等）
- **圓角**：藥丸狀控制項（`999px`），容器 `12px`
- **層級**：定義明確的層級（0–5），深色模式下使用色調疊加
- **動效**：可預期的緩動，強調狀態過渡
- **狀態層**：懸停 `0.08`，按下 `0.12`，聚焦 `0.12`

## 視覺對比

| 屬性         | Apple           | Material                |
| ------------ | --------------- | ----------------------- |
| 按鈕圓角      | `14px`          | `999px`（藥丸）          |
| 卡片圓角      | `22px`          | `12px`                  |
| 表面處理      | 半透明 + 模糊   | 不透明、基於顏色角色     |
| 陰影風格      | 柔和的環境光    | 層級分明                |
| 焦點環        | 主色描邊        | 主色描邊                |
| 深色模式表面  | 變暗的半透明    | MD3 深色表面色           |

## 最佳實踐

- **不要使用 `!important`** ——CSS 變數層疊已經處理了優先順序。
- **使用語意權杖** 來建構你自己的元件：`var(--pui-color-primary)`、`var(--pui-surface-base)`。
- **透過 `style` 覆寫元件權杖**，而不是去寫衝突的 CSS 類別。
- **減少動效** 透過 `prefers-reduced-motion` 自動生效。
