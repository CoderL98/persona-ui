---
title: SectionHeading
group: components
---

# SectionHeading

A unified section heading primitive that composes an eyebrow label, a large display title, and an optional description. The font family and size follow the active theme — Instrument Serif on Apple track, Bricolage Grotesque on Material track.

## Import

```svelte
<script>
  import { SectionHeading } from '@persona-ui/lib';
</script>
```

## API

| Prop          | Type                  | Default | Description                                |
| ------------- | --------------------- | ------- | ------------------------------------------ |
| `id`          | `string`              | —       | Section id (used for anchor links)         |
| `eyebrow`     | `string`              | —       | Small label above the title                |
| `title`       | `string`              | —       | Main heading text                          |
| `description` | `string`              | —       | Optional supporting paragraph              |
| `level`       | `1 \| 2 \| 3`         | `2`     | Heading level rendered as `h1` / `h2` / `h3` |
| `class`       | `string`              | —       | Extra CSS classes                          |
| `style`       | `string`              | —       | Inline style override                      |

## Usage

```svelte
<SectionHeading
  eyebrow="Components"
  title="Build faster with a dual-personality system"
  description="One API, two rigorously different design languages — Apple HIG and Material Design 3."
  level={1}
/>
```

### With anchor link target

```svelte
<SectionHeading id="getting-started" title="Getting started" level={2} />
<a href="#getting-started">Jump to section</a>
```

### Lower-level subheading

```svelte
<SectionHeading eyebrow="Forms" title="Text input" level={3} />
```

## Theme behavior

- **Apple track**: title renders in Instrument Serif with negative tracking
- **Material track**: title renders in Bricolage Grotesque

Both themes inherit the text color and surface tokens from the active `[data-mode="light"|"dark"]` and `[data-theme="apple"|"material"]` attributes.
