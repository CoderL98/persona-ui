---
title: Stepper
group: components
---

# Stepper

A multi-step progress indicator with horizontal/vertical layout, optional descriptions, and error states.

## Import

```svelte
<script>
  import { Stepper } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                     | Default        | Description                              |
| ---------------- | ---------------------------------------- | -------------- | ---------------------------------------- |
| `steps`          | `StepperStep[]`                          | —              | Array of step definitions                |
| `value`          | `number`                                 | —              | Controlled current step index (0-based)  |
| `defaultValue`   | `number`                                 | `0`            | Uncontrolled default step                |
| `orientation`    | `'horizontal' \| 'vertical'`             | `'horizontal'` | Layout direction                         |
| `clickable`      | `boolean`                                | `true`         | Allow clicking to navigate between steps |
| `showIndicators` | `boolean`                                | `true`         | Show step number / checkmark / X icon    |
| `errorSteps`     | `number[]`                               | `[]`           | Indices of steps in error state          |
| `aria-label`     | `string`                                 | `'Progress'`   | Accessible label                         |
| `onValueChange`  | `(index: number) => void`                | —              | Fired when active step changes           |

### `StepperStep`

```ts
type StepperStep = {
  id?: string;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: Snippet;
};
```

## Keyboard

- `Tab` — Move between step buttons
- `Enter` / `Space` — Activate the focused step
- `←` / `→` / `↑` / `↓` — Move focus between steps
- `Home` / `End` — Jump to first / last step

## Usage

```svelte
<script>
  import { Stepper, Button } from '@persona-ui/lib';

  const steps = [
    { label: 'Account', description: 'Create your account' },
    { label: 'Profile', description: 'Personal information' },
    { label: 'Review', description: 'Confirm details' },
    { label: 'Done' },
  ];

  let current = $state(0);
</script>

<Stepper {steps} bind:value={current} />

<div class="mt-4 flex justify-between">
  <Button disabled={current === 0} onClick={() => current--}>Back</Button>
  <Button onClick={() => current++}>Next</Button>
</div>
```

## States

- **complete** — Step is before the current step (filled checkmark)
- **current** — Active step (filled with ring)
- **upcoming** — Step after current (gray)
- **error** — Step in `errorSteps` (red X)

## Accessibility

- Container is `<ol>` for ordered step list semantics
- Each step is a `<button>` with `aria-current="step"` on the active one
- Disabled steps have `aria-disabled` and `tabindex=-1`
