---
title: Skeleton
group: components
---

# Skeleton

Placeholder loading shapes.

## API

| Prop             | Type                       | Default  | Description            |
| ---------------- | -------------------------- | -------- | ---------------------- |
| `shape`          | `'text'\|'rect'\|'circle'` | `'text'` | Shape                  |
| `width`/`height` | `string`                   | —        | Custom dimensions      |
| `animated`       | `boolean`                  | `true`   | Enable pulse animation |

## Usage

```svelte
<Skeleton shape="text" />
<Skeleton shape="circle" width="48px" height="48px" />
```
