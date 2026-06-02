# Sheet

Bottom/left/right/top sheet overlay.

## API

| Prop   | Type                               | Default    | Description     |
| ------ | ---------------------------------- | ---------- | --------------- |
| `side` | `'top'\|'right'\|'bottom'\|'left'` | `'bottom'` | Entry direction |
| `texts` | `{ close: string }` | — | Text overrides (see below) |

## Usage

```svelte
<Sheet side="bottom">
  {#snippet title()}Sheet Title{/snippet}
  <p>Sheet content.</p>
</Sheet>
```
