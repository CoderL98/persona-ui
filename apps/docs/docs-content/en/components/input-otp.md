---
title: InputOTP
group: components
---

# InputOTP

A one-time password input with separate slots, full keyboard navigation, and paste support.

## Import

```svelte
<script>
  import { InputOTP } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                          | Default      | Description                              |
| ---------------- | ----------------------------- | ------------ | ---------------------------------------- |
| `value`          | `string`                      | —            | Controlled value (concatenated digits)   |
| `defaultValue`   | `string`                      | `''`         | Uncontrolled default                     |
| `length`         | `number`                      | `6`          | Number of input slots                    |
| `pattern`        | `RegExp`                      | `/^[0-9]$/`  | Allowed character per slot               |
| `mask`           | `boolean`                     | `false`      | Mask entered characters with `•`         |
| `type`           | `'text' \| 'number' \| 'password'` | `'text'` | HTML input type                          |
| `disabled`       | `boolean`                     | `false`      | Disabled state                           |
| `readonly`       | `boolean`                     | `false`      | Read-only state                          |
| `autoFocus`      | `boolean`                     | `false`      | Focus the first slot on mount            |
| `placeholder`    | `string`                      | `'·'`        | Placeholder character                    |
| `aria-label`     | `string`                      | `'One-time password'` | Accessible label                |
| `onValueChange`  | `(value: string) => void`     | —            | Fired whenever the value changes         |
| `onComplete`     | `(value: string) => void`     | —            | Fired when all slots are filled          |

## Keyboard

- `←` / `→` — Navigate between slots
- `Backspace` — Clear current slot, focus previous
- `Home` / `End` — Jump to first / last slot
- `Ctrl+V` / `Cmd+V` / `Paste` — Fill multiple slots from clipboard
- Auto-advance to next slot after typing

## Usage

```svelte
<script>
  import { InputOTP, Button } from '@persona-ui/lib';

  let code = $state('');
  const handleComplete = (v) => console.log('Code:', v);
</script>

<InputOTP bind:value={code} length={6} onComplete={handleComplete} />
<Button disabled={code.length !== 6} onclick={() => submit(code)}>Verify</Button>
```

## Accessibility

- The container is `role="group"` with `aria-label`
- Each slot has a descriptive `aria-label` like "Digit 1 of 6"
- `inputmode="numeric"` on number type triggers numeric keyboard on mobile
- `autocomplete="one-time-code"` integrates with system OTP autofill
