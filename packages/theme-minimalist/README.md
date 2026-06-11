# @persona-ui/theme-minimalist

Ultra-minimal ink-on-paper theme for the Persona UI component library. Near-
monochrome, near-zero radius, fastest motion. For interfaces that should
disappear.

- Source: [`packages/theme-minimalist/`](https://github.com/CoderL98/persona-ui/tree/main/packages/theme-minimalist)
- Depends on: [`@persona-ui/lib`](https://github.com/CoderL98/persona-ui/blob/main/packages/lib/README.md)

## Install

```bash
pnpm add @persona-ui/theme-minimalist @persona-ui/lib
```

## Usage

In your `app.css` (or your global stylesheet entry):

```css
@import '@persona-ui/lib/core.css';
@import '@persona-ui/theme-minimalist/minimalist.css';
```

Then mark the HTML root (or any subtree) with `data-theme="minimalist"` and
`data-mode="light"` or `data-mode="dark"`:

```html
<html data-theme="minimalist" data-mode="light">
  …
</html>
```

## Theme object

The package exports a frozen `themeDef: ThemeDef`:

```ts
import { themeDef as minimalist } from '@persona-ui/theme-minimalist';
import type { ThemeDef } from '@persona-ui/lib';

console.log(minimalist.id); // "minimalist"
console.log(minimalist.label); // "Minimalist"
console.log(minimalist.cssVarPrefix); // "pui-minimal"
console.log(minimalist.darkSupport); // true
```

## Design notes

- **Ink palette**: foreground is near-black (`oklch(15% 0 0)`) on near-white
  paper (`oklch(100% 0 0)`); in dark mode the relationship is inverted.
- **Near-zero radius**: `--pui-radius-control: 6px`, `--pui-radius-container:
14px`. Avoids both squircle (Apple) and large pill (Material) personalities.
- **Fastest motion**: enter `80ms`, leave `100ms`, swap `120ms` — using
  `cubic-bezier(0.4, 0, 0.2, 1)`. No spring.
- **Hairline elevation**: shadows reduce to a single 1px top line at low alpha,
  instead of layered material drop shadows.
- **Restrained color**: the only chromatic accent is a desaturated blue
  (`oklch(60% 0.14 250)`) used sparingly for tertiary surfaces; red is
  reserved for error / destructive states.

## Aggregating themes (consumer side)

Combine the theme definitions from each installed theme package into a
single registry for your switcher / preview grid:

```ts
import { themeDef as apple } from '@persona-ui/theme-apple';
import { themeDef as material } from '@persona-ui/theme-material';
import { themeDef as minimalist } from '@persona-ui/theme-minimalist';
import type { ThemeRegistry } from '@persona-ui/lib';

export const ALL_THEMES: ThemeRegistry = Object.freeze([
  apple,
  material,
  minimalist,
]);
```

> **Constraint**: `cssVarPrefix` must be unique across all themes in the
> registry (it scopes `[data-theme={id}]` style isolation). Verify no
> collision before publishing a new theme package.

## Dependencies

- `peerDependencies`: `@persona-ui/lib` `^0.1.0`

---

## License

MIT
