# @persona-ui/lib

> Theme-agnostic Svelte 5 component library — one API across Apple HIG and Material 3.

`@persona-ui/lib` is the component body of the Persona UI monorepo. It ships **no**
theme implementation of its own: every visual decision is expressed as a design
token (CSS variable), and the actual look is injected by the companion theme
packages — `@persona-ui/theme-apple` / `@persona-ui/theme-material` (or any
third-party `@persona-ui/theme-*` package).

- Source: [`packages/lib/`](https://github.com/CoderL98/persona-ui/tree/main/packages/lib)
- Docs site: [persona-ui.ricecakecat.com](https://persona-ui.ricecakecat.com)
- 中文文档: [README_CN.md](https://github.com/CoderL98/persona-ui/blob/main/packages/lib/README_CN.md)

---

## Install

```bash
pnpm add @persona-ui/lib
# Pick at least one theme
pnpm add @persona-ui/theme-apple
# or
pnpm add @persona-ui/theme-material
```

### Peer dependencies

| Package | Version |
| --- | --- |
| `svelte` | `^5.0.0` |

Theme packages depend on `@persona-ui/lib` via `workspace:*` in this monorepo
and `peerDependencies` when consumed from npm — install both.

---

## Quick start

### 1. Import the stylesheets

Theme CSS has been split out into its own packages since v0.2.0. The order
matters: `core.css` provides tokens / fonts / motion / utilities, then a
theme package overrides the values of those tokens.

```css
/* src/app.css */
@import '@persona-ui/lib/core.css';
@import '@persona-ui/theme-apple/apple.css';
/* or: @import '@persona-ui/theme-material/material.css'; */
```

> `@persona-ui/lib/styles.css` still works as a backward-compatible alias
> (marked deprecated since v0.2.0). New code should use `core.css` plus a
> theme package entry directly.

### 2. Switch theme / mode

Toggle `data-theme` and `data-mode` on `<html>` (or any container):

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '../app.css';
  let { children } = $props();
</script>

<html lang="en" data-theme="apple" data-mode="light">
  {@render children?.()}
</html>
```

Two attributes control the look:

- **`data-theme`** — visual grammar. Built-in values: `apple`, `material`. Any
  other value is allowed as long as a `@persona-ui/theme-*` package declares
  that `id` in its `themeDef`.
- **`data-mode`** — color scheme, either `light` or `dark`.

Theme scoping works on any subtree — handy for side-by-side comparisons:

```svelte
<div data-theme="material" data-mode="dark">
  <Button variant="filled">Dark Material button</Button>
</div>
```

### 3. Use a component

```svelte
<script>
  import { Button } from '@persona-ui/lib';
</script>

<Button variant="filled" size="md" onclick={() => console.log('clicked')}>
  Click me
</Button>
```

---

## Theme system

### Three layers

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. Component layer (this package — theme-agnostic)            │
│    - 70+ components, only reference --pui-* CSS variables     │
│    - Exposes the ThemeDef / ThemeRegistry type contract       │
├─────────────────────────────────────────────────────────────┤
│ 2. Theme contract layer (this package's themes/)             │
│    - Defines ThemeDef: id / label / cssVarPrefix / darkSupport│
│    - Default THEMES registry is empty; consumers aggregate    │
├─────────────────────────────────────────────────────────────┤
│ 3. Theme implementation layer (@persona-ui/theme-*)          │
│    - theme-apple   : pui-apple prefix, HIG grammar            │
│    - theme-material: pui-md-sys prefix, M3 / Material You     │
│    - Third parties may publish theme-fluent / theme-cupertino │
└─────────────────────────────────────────────────────────────┘
```

### Consumer aggregation (theme switcher)

Each theme package exports a frozen `themeDef: ThemeDef`. Consumers aggregate
them in their own application layer:

```ts
// src/lib/themes.ts
import { themeDef as apple } from '@persona-ui/theme-apple';
import { themeDef as material } from '@persona-ui/theme-material';
import type { ThemeRegistry } from '@persona-ui/lib';

export const THEMES: ThemeRegistry = Object.freeze([apple, material]);
```

> **Constraint**: `cssVarPrefix` must be globally unique across all themes
> (it powers the `[data-theme={id}]` style isolation). Verify no collision
> before publishing a new theme.

### Adding a third-party theme

1. Publish an npm package `@persona-ui/theme-xxx` that exports
   `themeDef: ThemeDef` and ships `xxx.css`
2. Have the consumer append that `themeDef` to their `THEMES` array
3. Declare `@persona-ui/lib` as a `peerDependency` from the theme package

---

## Component inventory

**70+ components**, grouped by use case:

**Foundation**
Button · IconButton · Fab · Card · Divider · Badge · Chip · Avatar · Kbd · Spinner · Skeleton · Progress

**Form**
TextField · Textarea · InputGroup · InputOTP · Checkbox · Radio / RadioGroup · Switch · Slider · Select · Listbox · Combobox · SearchField · DatePicker · DateRangePicker · TimePicker · ColorPicker · Rating · FileUpload · Form / FormField

**Feedback**
Alert · Banner · Toast / ToastViewport · Snackbar · Message · EmptyState · ConfirmDialog

**Overlay**
Tooltip · Popover · HoverCard · Menu · ContextMenu · Dialog · Sheet · Drawer · CommandPalette

**Navigation**
Tabs · SegmentedControl · Breadcrumb · Pagination · Stepper · Toolbar · Sidebar · NavigationRail · BottomNavigation · Tour

**Data**
List / ListItem · Accordion · Table · DataTable · Calendar · Timeline · TreeView · VirtualList · Carousel

**Display**
CodeBlock · Chart · SectionHeading · Stack

All components follow the same conventions:

- Props declared with Svelte 5 runes: `let { ... } = $props()`
- Event callbacks as camelCase HTML attributes (`onclick`, `onOpenChange`,
  `onValueChange` — not the Svelte 4 `on:click` form)
- Extra attributes are forwarded to the root element; children use the
  Svelte 5 snippet API (`children` + `{@render children?.()}`)
- Visuals are 100% design-token driven — no hard-coded color, type, or
  spacing inside components

See the full API at the [docs site component index](https://persona-ui.ricecakecat.com/en/components).

---

## Local overrides (design tokens)

Every component exposes `--pui-*-*` CSS variables for per-instance tweaks:

```svelte
<Button
  variant="filled"
  style="
    --pui-button-radius: 2px;
    --pui-button-bg: oklch(0.5 0.18 145);
  "
>
  Custom
</Button>
```

The fallback chain follows the form
`var(--pui-button-bg, var(--pui-color-primary))` — missing component-level
tokens fall back to the global tokens. Per-component token lists live on
each component's docs page.

---

## Tree-shaking

`package.json` declares `"sideEffects": ["**/*.css"]`, which means every JS
/ Svelte export is safe to drop. For the smallest bundles, prefer the
sub-path imports:

```ts
// Recommended — sub-path imports, no full index.ts side effects
import Button from '@persona-ui/lib/components/button/Button.svelte';
```

```ts
// Root entry also tree-shakes with modern bundlers
import { Button } from '@persona-ui/lib';
```

`exports` exposes `components/*` sub-paths plus three standalone CSS /
asset entry points: `styles.css`, `core.css`, and `tokens-manifest`.

---

## TypeScript

`tsconfig.base.json` enables `strict` + `verbatimModuleSyntax` +
`isolatedModules`. All type exports are explicitly tagged with `export type`.
Consumers should follow the same pattern:

```ts
import { Button } from '@persona-ui/lib';
import type { ButtonProps, ButtonVariant, ButtonSize } from '@persona-ui/lib';
```

---

## Develop & test

From the monorepo root:

```bash
pnpm install
pnpm --filter @persona-ui/lib build         # svelte-package + tokens-manifest.json
pnpm --filter @persona-ui/lib check         # svelte-check
pnpm --filter @persona-ui/lib test:unit     # 140+ vitest specs
pnpm --filter @persona-ui/lib test:unit:watch
pnpm --filter @persona-ui/lib test:unit Button   # a single spec file
```

The release flow is driven by changesets; see the [root README § Release](https://github.com/CoderL98/persona-ui/blob/main/README.md#release-flow).

---

## License

MIT © [CoderL98](https://github.com/CoderL98)

[中文版](https://github.com/CoderL98/persona-ui/blob/main/packages/lib/README_CN.md)
