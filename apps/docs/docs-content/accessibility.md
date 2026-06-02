# Accessibility

Persona UI aims for all components to be keyboard-accessible, screen-reader-friendly, and respect user preferences.

## Keyboard Policy

- All interactive components are focusable via Tab.
- Enter/Space activates buttons, toggles, links.
- Arrow keys navigate TabList, RadioGroup, Menu, Listbox, Combobox, Slider, TreeView.
- Escape closes overlays (Dialog, Sheet, Drawer, Popover, Menu, Select options, Combobox options).
- Focus is trapped within open modal dialogs; closing returns focus to the trigger.

## Focus-Visible

- All interactive elements show a 2px `--pui-color-primary` outline on `:focus-visible`.
- The outline respects `--pui-radius-control` for consistent rounding.
- Clicking with a mouse does not show the focus ring (native `:focus-visible` behavior).

## ARIA

Components use the following roles and attributes:

| Component  | Role                              | Key Attributes                                                |
| ---------- | --------------------------------- | ------------------------------------------------------------- |
| Button     | `<button>`                        | `aria-busy` (loading), `aria-label`                           |
| IconButton | `<button>`                        | `aria-label` (required)                                       |
| Switch     | `<button role="switch">`          | `aria-checked`                                                |
| Checkbox   | `<button role="checkbox">`        | `aria-checked` (supports `"mixed"`)                           |
| Listbox    | `role="listbox"`                  | `aria-selected` on options                                    |
| Select     | `role="combobox"`                 | `aria-expanded`, `aria-controls`, `aria-haspopup`             |
| Combobox   | `role="combobox"`                 | `aria-expanded`, `aria-autocomplete`, `aria-activedescendant` |
| Dialog     | `role="dialog"`                   | `aria-modal`, `aria-labelledby`, `aria-describedby`           |
| Menu       | `role="menu"`                     | `role="menuitem"` on items                                    |
| Tabs       | `role="tablist"`                  | `role="tab"`, `role="tabpanel"`, `aria-selected`              |
| Progress   | `role="progressbar"`              | `aria-valuenow`, `aria-valuemin`, `aria-valuemax`             |
| Alert      | `role="alert"` or `role="status"` | `aria-live="polite"`                                          |
| Spinner    | `role="status"` or `presentation` | `aria-hidden` (decorative)                                    |
| TreeView   | `role="tree"`                     | `role="treeitem"`, `aria-expanded`, `aria-selected`           |
| Breadcrumb | `<nav aria-label="Breadcrumb">`   | `aria-current="page"`                                         |
| Tooltip    | `role="tooltip"`                  | `aria-describedby` on trigger                                 |

## Reduced Motion

Persona UI respects `prefers-reduced-motion: reduce` by disabling animations, transitions, and scale transforms across all components. This is enforced via CSS in `shared.css`.

## Color Contrast

- All semantic color tokens are defined in OKLCH, ensuring predictable contrast.
- Text on primary/error surfaces uses `--pui-color-on-primary` / `--pui-color-on-error`.
- Increased contrast mode (`data-contrast="more"`) forces secondary text to match primary.
- Focus rings use the accent color with `2px` width and `2px` offset.

## Labels

- `IconButton` requires a `label` prop → `aria-label`.
- `TextField`, `Textarea`, `Select`, `Combobox`, `SearchField` support `label` + `aria-label`.
- `Switch`, `Checkbox`, `Radio` support `label` prop; `RadioGroup` supports `label` → `<legend>`.
- Error messages use `role="alert"` and are linked via `aria-describedby`.

## Disabled State

Disabled components:

- Are not focusable (native `disabled` attribute or `pointer-events: none`).
- Have 38% opacity via `--pui-opacity-disabled`.
- Do not respond to click or keyboard events.
