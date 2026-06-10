# Persona UI

Svelte 5 dual-personality component library — **Apple HIG** × **Material Design 3** in one API.

Switch the entire visual grammar with a single `data-theme` attribute. Same component, two rigorously different design languages.

[中文文档](https://github.com/CoderL98/persona-ui/blob/main/README_CN.md) · [Docs site](https://persona-ui.ricecakecat.com)

## Packages

| Package | Source | Description |
| --- | --- | --- |
| [`@persona-ui/lib`](https://github.com/CoderL98/persona-ui/blob/main/packages/lib/README.md) | [`packages/lib`](https://github.com/CoderL98/persona-ui/tree/main/packages/lib) | Component library (publishable) |
| [`@persona-ui/theme-apple`](https://github.com/CoderL98/persona-ui/blob/main/packages/theme-apple/README.md) | [`packages/theme-apple`](https://github.com/CoderL98/persona-ui/tree/main/packages/theme-apple) | Apple HIG theme |
| [`@persona-ui/theme-material`](https://github.com/CoderL98/persona-ui/blob/main/packages/theme-material/README.md) | [`packages/theme-material`](https://github.com/CoderL98/persona-ui/tree/main/packages/theme-material) | Material 3 theme |
| [`@persona-ui/cli`](https://github.com/CoderL98/persona-ui/blob/main/apps/cli/README.md) | [`apps/cli`](https://github.com/CoderL98/persona-ui/tree/main/apps/cli) | Install themes from the central registry |
| [`@persona-ui/docs`](https://github.com/CoderL98/persona-ui/tree/main/apps/docs) | [`apps/docs`](https://github.com/CoderL98/persona-ui/tree/main/apps/docs) | Documentation site (this monorepo's demo) |

## Quick start (using the library)

```bash
pnpm add @persona-ui/lib
pnpm add @persona-ui/theme-apple   # or @persona-ui/theme-material
```

```css
/* src/app.css */
@import "@persona-ui/lib/core.css";
@import "@persona-ui/theme-apple/apple.css";
```

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css";
  let { children } = $props();
</script>

<html lang="en" data-theme="apple" data-mode="light">
  {@render children?.()}
</html>
```

```svelte
<!-- any component -->
<script>
  import { Button } from "@persona-ui/lib";
</script>

<Button variant="filled">Hello</Button>
```

Theme CSS lives in separate packages and is injected as a `data-theme` /
`data-mode` switch on `<html>` (or any subtree). See the full guide in
[`packages/lib/README.md`](https://github.com/CoderL98/persona-ui/blob/main/packages/lib/README.md).

## Monorepo development

```bash
pnpm install
pnpm dev                # Start docs site on http://localhost:5173
pnpm build              # Build lib + themes + docs
pnpm check              # svelte-check in all packages
pnpm test:unit          # 140+ unit tests (vitest)
pnpm test:a11y          # a11y playwright specs
pnpm test:visual        # visual regression specs
pnpm test:css           # css contract specs
pnpm test               # check + unit
```

## Release flow

Uses [changesets](https://github.com/changesets/changesets):

```bash
pnpm changeset              # add a changeset entry
pnpm changeset:version      # bump versions + write CHANGELOG
pnpm release                # version + build lib + publish
```

## Architecture

```text
persona-ui/
├── packages/
│   ├── lib/                 # @persona-ui/lib — self-contained, no SvelteKit dep
│   │   ├── src/lib/         # components, internal helpers, styles
│   │   ├── tests/unit/      # vitest (140+ specs)
│   │   └── dist/            # build output (svelte-package)
│   ├── theme-apple/         # @persona-ui/theme-apple — Apple HIG tokens
│   └── theme-material/      # @persona-ui/theme-material — Material 3 tokens
├── apps/
│   ├── docs/                # @persona-ui/docs — SvelteKit demo
│   │   ├── src/routes/      # /[[lang]]/* markdown-rendered pages
│   │   ├── src/lib/         # docs-only helpers (markdown registry, theme aggregator)
│   │   ├── static/fonts/    # woff2 self-hosted
│   │   └── tests/           # playwright a11y/css/visual specs
│   └── cli/                 # @persona-ui/cli — install themes from registry
└── .changeset/              # version bumps & changelog entries
```

The library resolves through the pnpm workspace — `apps/docs` imports
`@persona-ui/lib` directly from `packages/lib/src/lib` (no build step
needed during development).

## License

MIT
