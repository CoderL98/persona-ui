---
"@persona-ui/lib": patch
"@persona-ui/docs": patch
"@persona-ui/theme-apple": patch
"@persona-ui/theme-material": patch
"@persona-ui/cli": patch
---

Docs & metadata sync pass:

- All publishable packages: fix `repository.directory` in `package.json`
  (was incorrectly pointing to `apps/cli` for the three non-CLI packages)
  so the npm "Repository" link resolves to the actual source directory.
- Add `README_CN.md` (Chinese mirror) to every publishable package, with
  GitHub-absolute cross-file links instead of relative paths.
- English READMEs (`README.md`): switch cross-language/cross-package
  links to `https://github.com/CoderL98/persona-ui/blob/main/...`.
- `apps/docs` getting-started: update install + stylesheet snippets
  to the post-v0.2.0 two-step pattern (`@persona-ui/lib/core.css` plus
  a theme package) across all three locales.
- Misc: fix `rcc/` → `CoderL98/` typos in `apps/docs/docs-content/en/registry.md`
  and `apps/cli/CHANGELOG.md`.
