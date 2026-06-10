# @persona-ui/theme-material

Material 3(Material You)主题 —— 用于 Persona UI 组件库。提供 Material You 的
token、elevation、state layer 与 dynamic-color 支持,完全通过 design token
(CSS 变量)实现,可与任何 `@persona-ui/lib` 组件组合使用。

- 源码:[`packages/theme-material/`](https://github.com/CoderL98/persona-ui/tree/main/packages/theme-material)
- 依赖:[`@persona-ui/lib`](https://github.com/CoderL98/persona-ui/blob/main/packages/lib/README_CN.md)
- English: [README.md](https://github.com/CoderL98/persona-ui/blob/main/packages/theme-material/README.md)

## 安装

```bash
pnpm add @persona-ui/theme-material @persona-ui/lib
```

## 使用

在你的 `app.css`(或全局样式入口)中:

```css
@import "@persona-ui/lib/core.css";
@import "@persona-ui/theme-material/material.css";
```

并在 HTML 根节点(或任意子树)上加 `data-theme="material"` 与 `data-mode="light"`
或 `data-mode="dark"`:

```html
<html data-theme="material" data-mode="light">…</html>
```

## 主题对象

本包导出冻结的 `themeDef: ThemeDef`:

```ts
import { themeDef as material } from "@persona-ui/theme-material";
import type { ThemeDef } from "@persona-ui/lib";

console.log(material.id);           // "material"
console.log(material.label);        // "Material 3"
console.log(material.cssVarPrefix); // "pui-md-sys"
console.log(material.darkSupport);  // true
```

## 主题聚合示例(消费方)

将各已安装主题包的 `themeDef` 合并为一个注册表,供主题切换器 / 预览网格使用:

```ts
import { themeDef as apple } from "@persona-ui/theme-apple";
import { themeDef as material } from "@persona-ui/theme-material";
import type { ThemeRegistry } from "@persona-ui/lib";

export const ALL_THEMES: ThemeRegistry = Object.freeze([apple, material]);
```

> **重要约束**:`cssVarPrefix` 在同一注册表内必须全局唯一(它作用域
> `[data-theme={id}]` 的样式隔离)。发布新主题包前务必确认不与现有前缀冲突。

## 依赖

- `peerDependencies`:`@persona-ui/lib` `^0.1.0`

---

## 协议

MIT

[English](https://github.com/CoderL98/persona-ui/blob/main/packages/theme-material/README.md)
