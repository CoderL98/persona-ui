---
title: HoverCard
group: components
---

# HoverCard

A hover-triggered tooltip-style card for showing rich content (profile previews, link previews, etc.) on hover/focus.

## Import

```svelte
<script>
  import { HoverCard } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                       | Default | Description                              |
| ---------------- | ------------------------------------------ | ------- | ---------------------------------------- |
| `children`       | `Snippet`                                  | —       | Trigger element                          |
| `content`        | `Snippet`                                  | —       | Card body content                        |
| `placement`      | `'top' \| 'bottom' \| 'left' \| 'right' \| 'auto'` | `'auto'` | Preferred position |
| `openDelay`      | `number`                                   | `300`   | Delay before showing (ms)                |
| `closeDelay`     | `number`                                   | `100`   | Delay before hiding (ms)                 |
| `maxWidth`       | `number`                                   | `320`   | Max width in px                          |
| `aria-label`     | `string`                                   | —       | Accessible label                         |

## Usage

```svelte
<script>
  import { HoverCard } from '@persona-ui/lib';
</script>

<HoverCard maxWidth={280}>
  <a href="https://svelte.dev" class="underline">Svelte</a>
  {#snippet content()}
    <p class="font-semibold">Svelte</p>
    <p class="text-xs opacity-80">Cybernetically enhanced web apps</p>
  {/snippet}
</HoverCard>
```

## Behavior

- Shows after `openDelay` ms on hover or focus
- Hides after `closeDelay` ms on leave
- Card itself has hover handling to prevent flicker
- `placement: 'auto'` picks the side with the most space

## Accessibility

- Card has `role="tooltip"`
- Trigger is keyboard-focusable (focusin / focusout)
- Both mouse and keyboard users get the same experience
