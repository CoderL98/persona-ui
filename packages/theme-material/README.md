# @persona-ui/theme-material

Material 3 (Material You) 主题 — 用于 Persona UI 组件库。

## 安装

```bash
pnpm add @persona-ui/theme-material @persona-ui/lib
```

## 使用

在你的 `app.css`（或全局样式入口）中：

```css
@import "@persona-ui/lib/core.css";
@import "@persona-ui/theme-material/material.css";
```

并在 HTML 根节点上加 `data-theme="material"` 与 `data-mode="light|dark"`：

```html
<html data-theme="material" data-mode="light">…</html>
```

## 主题对象

```ts
import { themeDef as material } from "@persona-ui/theme-material";
import type { ThemeDef } from "@persona-ui/lib";

console.log(material.id);           // "material"
console.log(material.label);        // "Material 3"
console.log(material.cssVarPrefix); // "pui-md-sys"
console.log(material.darkSupport);  // true
```

## 主题聚合示例

```ts
import { apple } from "@persona-ui/theme-apple";
import { material } from "@persona-ui/theme-material";
import type { ThemeRegistry } from "@persona-ui/lib";

export const ALL_THEMES: ThemeRegistry = Object.freeze([apple, material]);
```

## 依赖

- `peerDependencies`: `@persona-ui/lib` ^0.1.0
