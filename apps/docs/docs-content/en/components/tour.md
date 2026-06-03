---
title: Tour
group: components
---

# Tour

A guided product tour that spotlights target elements and shows step-by-step instructions.

## Import

```svelte
<script>
  import { Tour, Button } from '@persona-ui/lib';
</script>
```

## API

| Prop               | Type                                                  | Default     | Description                              |
| ------------------ | ----------------------------------------------------- | ----------- | ---------------------------------------- |
| `open`             | `boolean`                                             | `false`     | Whether the tour is open                 |
| `steps`            | `TourStep[]`                                          | —           | Tour steps in order                      |
| `value`            | `number`                                              | —           | Controlled current step index            |
| `spotlightPadding` | `number`                                              | `8`         | Padding around the spotlight (px)        |
| `closeOnEscape`    | `boolean`                                             | `true`      | Close the tour on Escape                 |
| `showProgress`     | `boolean`                                             | `true`      | Show "1 / N" progress indicator          |
| `showSkip`         | `boolean`                                             | `true`      | Show skip button                         |
| `texts`            | `{ next?, prev?, done?, skip? }`                      | English     | Custom button labels                     |
| `onOpenChange`     | `(open: boolean) => void`                             | —           | Fired when tour is opened/closed         |
| `onValueChange`    | `(index: number) => void`                             | —           | Fired when step changes                  |
| `onComplete`       | `() => void`                                          | —           | Fired on the last step's Done            |
| `popoverContent`   | `Snippet`                                             | —           | Custom popover body (overrides content)  |

### `TourStep`

```ts
type TourStep = {
  target: string;        // CSS selector for the element to spotlight
  title: string;         // Title shown in the popover
  content?: string;      // Description text
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  disableInteraction?: boolean;
};
```

## Keyboard

- `Escape` — Close the tour
- `←` / `→` — Previous / next step
- `Enter` / `Space` (on buttons) — Activate

## Usage

```svelte
<script>
  import { Tour, Button } from '@persona-ui/lib';

  let open = $state(false);

  const steps = [
    { target: '#step-1', title: 'Welcome', content: 'Click here to start' },
    { target: '#step-2', title: 'Your inbox', content: 'See new messages' },
    { target: '#step-3', title: 'Settings', content: 'Customize your preferences' },
  ];
</script>

<Button onclick={() => open = true}>Start tour</Button>

<button id="step-1">Get started</button>
<button id="step-2">Inbox</button>
<button id="step-3">Settings</button>

<Tour bind:open {steps} onComplete={() => console.log('Tour done!')} />
```

## Placement

When `placement: 'auto'` (default), the popover is positioned on the side with the most available space.

## Accessibility

- Popover is `role="dialog"` with `aria-label` matching the step title
- `Escape` closes the tour
- All buttons have proper `aria-label`s
- The target element is visually highlighted with a focus ring
