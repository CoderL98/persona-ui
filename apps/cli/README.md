# @persona-ui/cli

Persona UI CLI — install themes from the central registry (federated shadcn-svelte model).

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

https://github.com/rcc/persona-ui/tree/main/apps/cli

## License

MIT
