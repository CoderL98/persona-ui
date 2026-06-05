# @persona-ui/theme-apple

Apple HIG (Human Interface Guidelines) 主题 — 用于 Persona UI 组件库。

## 安装

```bash
pnpm add @persona-ui/theme-apple @persona-ui/lib
```

## 使用

在你的 `app.css`（或全局样式入口）中：

```css
@import "@persona-ui/lib/core.css";
@import "@persona-ui/theme-apple/apple.css";
```

并在 HTML 根节点上加 `data-theme="apple"` 与 `data-mode="light|dark"`：

```html
<html data-theme="apple" data-mode="light">…</html>
```

## 主题对象

```ts
import { themeDef as apple } from "@persona-ui/theme-apple";
import type { ThemeDef } from "@persona-ui/lib";

console.log(apple.id);           // "apple"
console.log(apple.label);        // "Apple HIG"
console.log(apple.cssVarPrefix); // "pui-apple"
console.log(apple.darkSupport);  // true
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
