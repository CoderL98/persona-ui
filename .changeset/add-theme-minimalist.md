---
'@persona-ui/theme-minimalist': minor
'@persona-ui/docs': minor
---

新增 `@persona-ui/theme-minimalist` 主题,作为 Apple HIG / Material 3 之外的第三套设计语言:

- **设计调性**:ink-on-paper 近全黑白 + 唯一克制点缀蓝(tertiary)
- **几何**:near-zero radius(`--pui-radius-control: 6px`, `--pui-radius-container: 14px`)
- **动效**:fastest motion(enter 80ms / leave 100ms / swap 120ms,移除 spring)
- **海拔**:hairline shadow(`0 1px 0 oklch(0% 0 0 / 4%)`)
- **完整支持 light / dark mode**
- cssVarPrefix: `pui-minimal`(与 `pui-apple` / `pui-md-sys` 命名空间隔离)

`@persona-ui/docs` 同步:

- 主题切换器、Home Hero Live Preview、BottomNavigation specimen 全部改为遍历 `THEMES` 数组动态生成,新增主题无需修改 `+page.svelte`
- i18n:en / zh-CN / zh-TW 新增 `toggleTheme_minimalist` / `previewLabelMinimalist` / `previewEssential`
- registry 索引:`apps/docs/static/r/registry.json` 与新文件 `theme-minimalist.json`
