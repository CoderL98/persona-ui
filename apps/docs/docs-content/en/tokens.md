---
title: Token Reference
group: guide
---

# Token Reference

Persona UI uses a four-layer CSS variable architecture:

1. **Primitive Tokens** (`--pui-ref-*`) — raw color, spacing, duration values
2. **Semantic Tokens** (`--pui-color-*`, `--pui-surface-*`, etc.) — cross-component roles
3. **Component Tokens** (`--pui-button-*`, `--pui-card-*`, etc.) — per-component defaults
4. **Instance Overrides** — userset via `style="--pui-...: ..."`

## Prefix Convention

All tokens use the `--pui-` prefix to avoid collisions.

### Color

| Token                              | Purpose                      |
| ---------------------------------- | ---------------------------- |
| `--pui-color-primary`              | Primary action color         |
| `--pui-color-on-primary`           | Text/icon on primary         |
| `--pui-color-primary-container`    | Container variant of primary |
| `--pui-color-on-primary-container` | Text on primary container    |
| `--pui-color-secondary`            | Secondary accent             |
| `--pui-color-tertiary`             | Tertiary accent              |
| `--pui-color-error`                | Error color                  |
| `--pui-color-on-error`             | Text on error                |
| `--pui-color-error-container`      | Error container              |

### Surface

| Token                     | Purpose                           |
| ------------------------- | --------------------------------- |
| `--pui-surface-base`      | Page background                   |
| `--pui-surface-raised`    | Elevated surface (cards, dialogs) |
| `--pui-surface-variant`   | Subtle variant surface            |
| `--pui-surface-container` | Container surface                 |

### Text

| Token                  | Purpose              |
| ---------------------- | -------------------- |
| `--pui-text-primary`   | Primary text color   |
| `--pui-text-secondary` | Secondary/muted text |
| `--pui-text-disabled`  | Disabled text        |

### Outline

| Token                  | Purpose                 |
| ---------------------- | ----------------------- |
| `--pui-outline`        | Standard border/divider |
| `--pui-outline-subtle` | Subtle border           |
| `--pui-outline-strong` | High-emphasis border    |

### Radius

| Token                    | Purpose                      |
| ------------------------ | ---------------------------- |
| `--pui-radius-control`   | Control/input border radius  |
| `--pui-radius-container` | Container/card border radius |
| `--pui-radius-full`      | Fully rounded (pill/circle)  |

### Elevation

| Token               | Purpose          |
| ------------------- | ---------------- |
| `--pui-elevation-0` | No shadow        |
| `--pui-elevation-1` | Low elevation    |
| `--pui-elevation-2` | Medium elevation |
| `--pui-elevation-3` | High elevation   |

### Motion & Duration

| Token                   | Purpose                  |
| ----------------------- | ------------------------ |
| `--pui-motion-spring`   | Spring easing curve      |
| `--pui-motion-ease-out` | Ease-out curve           |
| `--pui-duration-enter`  | Enter animation duration |
| `--pui-duration-leave`  | Leave animation duration |
| `--pui-duration-swap`   | State change duration    |

### Component Tokens

Each component exposes its own tokens. See individual component docs:

- [Button tokens](components/button)
- [Card tokens](components/card)
- [TextField tokens](components/text-field)
- [Switch tokens](components/switch)
