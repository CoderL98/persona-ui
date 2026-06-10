---
title: Getting Started
group: guide
---

# Getting Started with Persona UI

Persona UI is a Svelte 5 component library with a dual-personality design system — switching between **Apple HIG** and **Material Design 3** visual grammars via CSS classless theming.

## Installation

Theme CSS lives in separate packages, so you also need to install at least one theme:

```bash
pnpm add @persona-ui/lib
pnpm add @persona-ui/theme-apple    # or @persona-ui/theme-material
```

## Import Styles

In your root CSS file (or any global stylesheet entry):

```css
@import "@persona-ui/lib/core.css";
@import "@persona-ui/theme-apple/apple.css";
/* or: @import "@persona-ui/theme-material/material.css"; */
```

> `@persona-ui/lib/styles.css` still works as a backward-compatible alias
> (deprecated since v0.2.0). New code should use `core.css` plus a theme
> package entry directly.

## Set the Active Theme

Set the theme on `<html>` (or any container element):

```html
<html data-theme="apple" data-mode="light"></html>
```

- `data-theme="apple"` — Apple HIG-inspired visuals
- `data-theme="material"` — Material Design 3 visuals
- `data-mode="light"` — Light mode
- `data-mode="dark"` — Dark mode

## Your First Component

```svelte
<script>
  import { Button } from '@persona-ui/lib';
</script>

<Button variant="filled">Click me</Button>
```

## Switching Themes

Toggle between themes by changing the `data-theme` attribute:

```svelte
<script>
  let theme = $state('apple');
  function toggle() {
    theme = theme === 'apple' ? 'material' : 'apple';
    document.documentElement.setAttribute('data-theme', theme);
  }
</script>

<button onclick={toggle}>Switch to {theme === 'apple' ? 'Material' : 'Apple'}</button>
<Button>I follow the current theme</Button>
```

## Local Override

Override any component's token at the instance level via `style`:

```svelte
<Button
  variant="filled"
  style="--pui-button-radius: 2px; --pui-button-bg: oklch(0.6 0.2 250);"
>
  Custom Radius & Color
</Button>
```

## Container-Level Theme

You can also scope a theme to a subtree:

```svelte
<div data-theme="material">
  <Button variant="filled">This button uses Material</Button>
</div>
```

## Next Steps

- [Theming Guide](theming) — detailed theming concepts
- [Token Reference](tokens) — all CSS variables
- [Components](/docs/components/):
  - [Button](components/button)
  - [Card](components/card)
  - [TextField](components/text-field)
  - [Switch](components/switch)
