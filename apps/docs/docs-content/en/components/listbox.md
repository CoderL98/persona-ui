---
title: Listbox
group: components
---

# Listbox

A standalone, accessible list of selectable options — single or multiple selection, with full keyboard navigation.

## Import

```ts
import { Listbox } from '@persona-ui/lib/components/listbox';
```

## API

| Prop            | Type                                            | Default | Description                                                  |
| --------------- | ----------------------------------------------- | ------- | ------------------------------------------------------------ |
| `value`         | `string \| string[]`                            | —       | Controlled value (string for single, array for multiple)     |
| `defaultValue`  | `string \| string[]`                            | —       | Uncontrolled initial value                                   |
| `multiple`      | `boolean`                                       | `false` | Enable multi-select mode                                     |
| `options`       | `{ value: string, label: string, disabled?: boolean }[]` | `[]` | Option list                       |
| `disabled`      | `boolean`                                       | `false` | Disable the whole listbox                                    |
| `texts`         | `{ options: string }`                           | —       | Text overrides                                               |
| `onValueChange`      | `(value, e: Event) => void`                     | —       | Selection change callback                                    |

## States

| State      | Trigger               | Result                                            |
| ---------- | --------------------- | ------------------------------------------------- |
| Default    | Render                | First item highlighted only if keyboard-navigated |
| Hover      | `:hover`              | Background tint on the row                        |
| Selected   | Click / Enter / Space | Primary container background                      |
| Disabled   | `disabled` / per-row  | Reduced opacity, pointer-events disabled          |
| Active     | Arrow keys            | Surface variant background (focus indicator)      |

## Usage

### Single-select

```svelte
<script>
  import { Listbox } from '@persona-ui/lib/components/listbox';
  let value = $state('apple');
</script>

<Listbox
  bind:value
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'orange', label: 'Orange' },
    { value: 'banana', label: 'Banana' },
  ]}
/>
```

### Multi-select

```svelte
<script>
  import { Listbox } from '@persona-ui/lib/components/listbox';
  let value = $state(['react', 'svelte']);
</script>

<Listbox
  multiple
  bind:value
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid', disabled: true },
  ]}
/>
```

## Accessibility

- Container has `role="listbox"` and is keyboard-focusable (tabindex=0)
- Each option has `role="option"` with `aria-selected` reflecting current value
- `aria-multiselectable="true"` when `multiple`
- Per-option `aria-disabled` for disabled rows
- Keyboard:
  - <kbd>↓</kbd> / <kbd>↑</kbd> — move active option
  - <kbd>Home</kbd> / <kbd>End</kbd> — jump to first / last
  - <kbd>Enter</kbd> / <kbd>Space</kbd> — select active option

## Related Components

- [Select](./select) — listbox with a popover trigger (form-friendly)
- [Combobox](./combobox) — listbox + text input for filtering
- [Menu](./menu) — listbox with menu semantics (action items)
