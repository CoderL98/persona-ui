# Persona UI

Svelte 5 dual-personality component library — **Apple HIG** × **Material Design 3** in one API.

Switch the entire visual grammar with a single `data-theme` attribute. Same component, two rigorously different design languages.

[中文文档](./README_CN.md)

## Packages

- [`@persona-ui/lib`](./packages/lib) — Component library (publishable)
- [`@persona-ui/docs`](./apps/docs) — Documentation site (this monorepo's demo)

## Quick start (using the library)

```bash
pnpm add @persona-ui/lib
```

```svelte
<script>
  import '@persona-ui/lib/styles.css';
  import { Button } from '@persona-ui/lib';
</script>

<html data-theme="apple" data-mode="light">
  <Button variant="filled">Hello</Button>
</html>
```

## Monorepo development

```bash
pnpm install
pnpm dev                # Start docs site on http://localhost:5173
pnpm build              # Build lib + docs
pnpm check              # svelte-check in all packages
pnpm test:unit          # 138 unit tests
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

```
persona-ui/
├── packages/
│   └── lib/                 # @persona-ui/lib — self-contained, no SvelteKit dep
│       ├── src/lib/         # components, internal helpers, styles
│       ├── tests/unit/      # vitest (138 tests, 44 files)
│       └── dist/            # build output (svelte-package)
├── apps/
│   └── docs/                # @persona-ui/docs — SvelteKit demo
│       ├── src/routes/      # /docs/* markdown-rendered pages
│       ├── src/lib/         # docs-only helpers (markdown registry)
│       ├── static/fonts/    # 5 woff2 self-hosted
│       └── tests/           # playwright a11y/css/visual specs
└── .changeset/              # version bumps & changelog entries
```

The library resolves through pnpm workspace — `apps/docs` imports `@persona-ui/lib` directly from `packages/lib/src/lib` (no build step needed during development).

## License

MIT
