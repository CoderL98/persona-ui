# @persona-ui/cli

Persona UI CLI — install themes from the central registry (federated shadcn-svelte model).

- Source: [`apps/cli/`](https://github.com/CoderL98/persona-ui/tree/main/apps/cli)
- Docs site: [persona-ui.ricecakecat.com](https://persona-ui.ricecakecat.com)
- 中文版: [README_CN.md](https://github.com/CoderL98/persona-ui/blob/main/apps/cli/README_CN.md)

## Usage

```bash
# Install a theme to your project
pnpm dlx @persona-ui/cli add https://persona-ui.ricecakecat.com/r/theme-apple.json

# Or from local path (dev/debug)
pnpm dlx @persona-ui/cli add ./path/to/theme-apple.json
```

## Commands

### `add <source>`

Fetch a registry item manifest and copy its files to your project.

**Arguments:**

- `<source>` — Registry item URL (`https://`) or local path (`./` or absolute)

**Options:**

- `-o, --out <dir>` — Target directory (default: `./src/lib/pui-themes`)
- `-y, --yes` — Skip confirmation prompt

## Source

[`apps/cli/`](https://github.com/CoderL98/persona-ui/tree/main/apps/cli)

## License

MIT

[中文版](https://github.com/CoderL98/persona-ui/blob/main/apps/cli/README_CN.md)
