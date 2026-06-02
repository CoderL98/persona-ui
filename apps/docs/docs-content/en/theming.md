---
title: Theming Guide
group: guide
---

# Theming Guide

Persona UI uses a **CSS-Variable-based token engine** to switch between design personalities. No JavaScript theme provider is required.

## Standards Alignment

Persona UI is independently authored and is **not affiliated with Apple or Google**. It provides:

- **Apple HIG-aligned visual track** — color roles, material/vibrancy, typography, and interaction patterns inspired by Apple's Human Interface Guidelines.
- **Material Design 3-aligned visual track** — color roles, tonal palettes, elevation levels, shape scale, typography scale, and state layers aligned with Material Design 3.

The alignment is implemented through semantic tokens, component state behavior, accessibility constraints, and visual regression tests. Persona UI does not implement every HIG/Material guideline and should not be claimed as "official" or "perfect replication."

## Priority System

```
inline style (instance override)
  > component default tokens
    > [data-theme] track tokens
      > :root semantic tokens
        > component fallback values
```

## Theme Selection

### Global Theme

```html
<html data-theme="apple">
  <html data-theme="material"></html>
</html>
```

### Light/Dark Mode

```html
<html data-theme="apple" data-mode="light">
  <html data-theme="apple" data-mode="dark"></html>
</html>
```

### Container-Level Theme

Any element can become a theme root:

```html
<div data-theme="material">
  <!-- All Persona UI components here use Material -->
</div>
```

This allows **mixed-theme islands** — an Apple page with a Material sidebar.

## Local Instance Override

Every component accepts a `style` prop that is forwarded to the root DOM element:

```svelte
<Button style="--pui-button-radius: 20px; --pui-button-bg: deeppink;">
  Customized
</Button>
```

All component tokens use `var(--pui-<component>-<property>, <fallback>)`, so instance-level variables always win.

## Design Tracks

### Apple HIG (`data-theme="apple"`)

- **Surfaces**: translucent, blur backdrop, subtle borders
- **Radius**: large (`14px` controls, `22px` containers)
- **Elevation**: soft ambient shadows
- **Motion**: spring-based easing, short durations
- **State changes**: scale + opacity, subtle

### Material 3 (`data-theme="material"`)

- **Surfaces**: opaque, color-role-based (surface, surface-container, etc.)
- **Radius**: pill-shaped controls (`999px`), `12px` containers
- **Elevation**: defined levels (0–5), tonal overlay in dark mode
- **Motion**: predictable easing, emphasis on state transitions
- **State layers**: hover `0.08`, pressed `0.12`, focus `0.12`

## Visual Comparison

| Property          | Apple                 | Material                 |
| ----------------- | --------------------- | ------------------------ |
| Button radius     | `14px`                | `999px` (pill)           |
| Card radius       | `22px`                | `12px`                   |
| Surface treatment | Translucent + blur    | Opaque, color-role-based |
| Elevation style   | Soft ambient          | Defined levels           |
| Focus ring        | Primary color outline | Primary color outline    |
| Dark mode surface | Dimmed translucency   | MD3 dark surface colors  |

## Best Practices

- **Do not use `!important`** — the CSS variable cascade handles priority.
- **Use semantic tokens** in your own components: `var(--pui-color-primary)`, `var(--pui-surface-base)`.
- **Override component tokens** via `style`, not by adding competing CSS classes.
- **Reduce motion** is respected automatically via `prefers-reduced-motion`.
