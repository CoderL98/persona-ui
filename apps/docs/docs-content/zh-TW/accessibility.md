---
title: 無障礙
group: guide
---

# 無障礙

Persona UI 致力於讓所有元件都具備鍵盤可達性、對螢幕閱讀器友善，並尊重使用者的偏好設定。

## 鍵盤策略

- 所有可互動元件皆可透過 Tab 鍵取得焦點。
- Enter/Space 啟用按鈕、開關、連結。
- 方向鍵用於在 TabList、RadioGroup、Menu、Listbox、Combobox、Slider、TreeView 中導覽。
- Escape 關閉浮動層（Dialog、Sheet、Drawer、Popover、Menu、Select 選項、Combobox 選項）。
- 開啟的模態對話框會捕捉焦點；關閉後焦點會回到觸發元素。

## 焦點可見

- 所有可互動元素在 `:focus-visible` 時顯示一條 2px 的 `--pui-color-primary` 描邊。
- 該描邊遵循 `--pui-radius-control` 以維持一致的圓角。
- 使用滑鼠點擊時不會顯示焦點環（遵循原生 `:focus-visible` 行為）。

## ARIA

元件使用以下角色與屬性：

| Component  | Role                              | Key Attributes                                                |
| ---------- | --------------------------------- | ------------------------------------------------------------- |
| Button     | `<button>`                        | `aria-busy` (loading), `aria-label`                           |
| IconButton | `<button>`                        | `aria-label` (required)                                       |
| Switch     | `<button role="switch">`          | `aria-checked`                                                |
| Checkbox   | `<button role="checkbox">`        | `aria-checked` (supports `"mixed"`)                           |
| Listbox    | `role="listbox"`                  | `aria-selected` on options                                    |
| Select     | `role="combobox"`                 | `aria-expanded`, `aria-controls`, `aria-haspopup`             |
| Combobox   | `role="combobox"`                 | `aria-expanded`, `aria-autocomplete`, `aria-activedescendant` |
| Dialog     | `role="dialog"`                   | `aria-modal`, `aria-labelledby`, `aria-describedby`           |
| Menu       | `role="menu"`                     | `role="menuitem"` on items                                    |
| Tabs       | `role="tablist"`                  | `role="tab"`, `role="tabpanel"`, `aria-selected`              |
| Progress   | `role="progressbar"`              | `aria-valuenow`, `aria-valuemin`, `aria-valuemax`             |
| Alert      | `role="alert"` or `role="status"` | `aria-live="polite"`                                          |
| Spinner    | `role="status"` or `presentation` | `aria-hidden` (decorative)                                    |
| TreeView   | `role="tree"`                     | `role="treeitem"`, `aria-expanded`, `aria-selected`           |
| Breadcrumb | `<nav aria-label="Breadcrumb">`   | `aria-current="page"`                                         |
| Tooltip    | `role="tooltip"`                  | `aria-describedby` on trigger                                 |

> 註：表頭與所有 ARIA 角色、屬性值保持英文原樣，以便與源碼對照。

## 減少動效

Persona UI 透過 `prefers-reduced-motion: reduce` 媒體查詢在所有元件中關閉動畫、過渡與縮放變換。此規則在 `shared.css` 中以 CSS 強制實作。

## 色彩對比

- 所有語意化的色彩權杖皆以 OKLCH 定義，確保可預期的對比度。
- 主色/錯誤色背景上的文字使用 `--pui-color-on-primary` / `--pui-color-on-error`。
- 增強對比模式（`data-contrast="more"`）會強制次級文字與主級文字對比度一致。
- 焦點環使用強調色，寬度 2px，偏移 2px。

## 標籤

- `IconButton` 必須提供 `label` 屬性 → `aria-label`。
- `TextField`、`Textarea`、`Select`、`Combobox`、`SearchField` 支援 `label` 與 `aria-label`。
- `Switch`、`Checkbox`、`Radio` 支援 `label` 屬性；`RadioGroup` 支援 `label` → `<legend>`。
- 錯誤訊息使用 `role="alert"`，並透過 `aria-describedby` 進行關聯。

## 停用狀態

被停用的元件：

- 無法取得焦點（使用原生 `disabled` 屬性或 `pointer-events: none`）。
- 透過 `--pui-opacity-disabled` 設定 38% 的不透明度。
- 不回應點擊與鍵盤事件。
