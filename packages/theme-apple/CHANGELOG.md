# @persona-ui/theme-apple

## 0.1.4-beta

### Patch Changes

- **fix(dark-mode): 修复暗色模式文本颜色映射** — 在 `[data-mode='dark']` 选择器中添加 `--pui-text-*` token 映射

### Minor Changes

- **feat(apple): 1:1 复刻 iOS 17 HIG 缺失的 4 类 token**（commit `1c232d2`）
  - System Fill（4 档 light + dark）
  - Semantic Icon（4 档）
  - Content Margins（3 档）
  - Dynamic Type Scale（11 档 size + line-height）
  - Motion Timings：sheet 400ms / alert 200ms / page 350ms / `cubic-bezier(0.32, 0.72, 0, 1)`
- **feat(design-system): P0/P1/P2 Apple 端新增**
  - **P0** Apple Squircle：`--pui-radius-control-continuous` / `--pui-radius-container-continuous` + 6 档圆角（0 / continuous / 6 / 10 / 14 / 20）+ `@supports (corner-shape: squircle)` 自动应用到 18 个组件
  - **P1** Apple Haptics：内部 `triggerHaptic()` 7 档（selection / light / medium / heavy / success / warning / error）+ `navigator.vibrate` + `prefers-reduced-motion` 守卫；已 wire 到 Button / IconButton / Switch / Chip / Snackbar / Fab
  - **P1** Apple Safe Area：4 档 `--pui-safe-area-{top,right,bottom,left}` 走 `env(safe-area-inset-*)`
  - **P1** Multi-Spring 3 档 timing（light / medium / heavy）
  - **P2** touch-callout：禁用 iOS 长按弹菜单 + tap 高亮 + tap-to-zoom；硬件加速滚动

### Patch Changes

- fix(docs): BottomNavigation 在 Apple HIG 主题下呈现 iOS 标志性视觉（commit `be7f426`）
  - `.pui-bnav-pill` 容器：颜色 tint（16% primary）+ saturate blur backdrop
  - 背景容器：translucent 70% + `saturate(180%) blur(20px)` 毛玻璃
  - iOS 风格 "scale-110" 活跃态缩放
- fix(docs): Specimen Card 在 Apple HIG 主题下消除"灰色椭圆底色"（commit `f7f8474`）
  - 圆角 22px squircle
  - 背景 `color-mix(in oklch, --pui-apple-system-background 88%, transparent)` + `backdrop-filter: blur(8px) saturate(180%)`
  - 边框 `color-mix(in oklch, --pui-apple-separator 40%, transparent)`（极轻半透明 separator）
- chore: 主题 CSS 拆为独立 npm 包（commit `0a80acb`，M12 PR3/4）
  - 入口暴露 `.` 与 `./apple.css`
  - `peerDependencies: @persona-ui/lib = workspace:*`

### Dependency Updates

- `@persona-ui/lib@0.1.4-beta`（由 changeset fixed 联动；主题 CSS 拆包后 lib 仍为唯一组件源）

## 0.1.0 (2026-06-04)

- 首版 Apple HIG 主题包，独立 npm 包分发
- 入口：`.`（JS 入口，提供 token shim）与 `./apple.css`（CSS 入口）
- light / dark 各 13 套 token，封装在 `data-theme="apple"` 选择器下
- 与 `@persona-ui/lib` 通过 `peerDependencies` 关联，发布时 `workspace:*` 改写为 `^<version>`

## Unreleased

> 当前 `package.json#version` 已为 `0.1.4-beta`。
> 在 `0.1.4-beta` 之后的下一次发布之前，所有新变更都将汇总在此节。
