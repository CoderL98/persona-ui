# @persona-ui/theme-material

Material 3 (Material You) theme for the Persona UI component library.
Provides Material You tokens, elevation, state layers, and dynamic-color
support — implemented entirely through design tokens (CSS variables) so it
composes with any `@persona-ui/lib` component.

- Source: [`packages/theme-material/`](https://github.com/CoderL98/persona-ui/tree/main/packages/theme-material)
- Depends on: [`@persona-ui/lib`](https://github.com/CoderL98/persona-ui/blob/main/packages/lib/README.md)
- 中文版: [README_CN.md](https://github.com/CoderL98/persona-ui/blob/main/packages/theme-material/README_CN.md)

## Install

```bash
pnpm add @persona-ui/theme-material @persona-ui/lib
```

## Usage

In your `app.css` (or your global stylesheet entry):

```css
@import "@persona-ui/lib/core.css";
@import "@persona-ui/theme-material/material.css";
```

Then mark the HTML root (or any subtree) with `data-theme="material"` and
`data-mode="light"` or `data-mode="dark"`:

```html
<html data-theme="material" data-mode="light">…</html>
```

## Theme object

The package exports a frozen `themeDef: ThemeDef`:

```ts
import { themeDef as material } from "@persona-ui/theme-material";
import type { ThemeDef } from "@persona-ui/lib";

console.log(material.id);           // "material"
console.log(material.label);        // "Material 3"
console.log(material.cssVarPrefix); // "pui-md-sys"
console.log(material.darkSupport);  // true
```

## Aggregating themes (consumer side)

Combine the theme definitions from each installed theme package into a
single registry for your switcher / preview grid:

```ts
import { themeDef as apple } from "@persona-ui/theme-apple";
import { themeDef as material } from "@persona-ui/theme-material";
import type { ThemeRegistry } from "@persona-ui/lib";

export const ALL_THEMES: ThemeRegistry = Object.freeze([apple, material]);
```

> **Constraint**: `cssVarPrefix` must be unique across all themes in the
> registry (it scopes `[data-theme={id}]` style isolation). Verify no
> collision before publishing a new theme package.

## Dependencies

- `peerDependencies`: `@persona-ui/lib` `^0.1.0`

---

## License

MIT

[中文版](https://github.com/CoderL98/persona-ui/blob/main/packages/theme-material/README_CN.md)
