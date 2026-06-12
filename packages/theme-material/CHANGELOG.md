# @persona-ui/theme-material

## 0.1.4-beta

### Minor Changes

- **feat(material): 1:1 复刻 MD3 2024 缺失的 motion + 扩展色板**（commit `5e5f1a5`）
  - 5 条标准 motion easing
  - 6 档 motion duration
  - Success / Warning / Info 色板（light + dark 各 12 token）
- **feat(design-system): P0/P1/P2 MD3 端新增**
  - **P0** MD3 Density Tokens：4 档（0 / -1 / -2 / -3 = Standard / Medium / Compact / Extra Compact），通过 `[data-density]` 属性切换，影响 button / list / table / form 高度与 padding / gap
  - **P0** MD3 IconButton 4 variants：standard（默认 toolbar）/ filled（primary）/ filled-tonal / outlined；新增 `shape: round | square` prop
  - **P1** MD3 FAB 组件：3 尺寸（small 40 / regular 56 / large 96dp）+ 4 变体（surface / primary / secondary / tertiary）
  - **P1** MD3 Snackbar 组件：4 tones（info / success / warning / error）+ 2 kinds（default / action）+ safe-area 底部定位
  - **P2** MD3 Expressive Motion：4 档 spring easing（fast / default / slow / bouncy）
  - **P2** State Layer Size：40 / 48 / 56dp 触控目标尺寸 token
  - **P2** MD3 Fixed Colors：5 个语义化定值（red / green / blue / yellow / grey），不随主题变色

### Patch Changes

- fix(docs): BottomNavigation 在 MD3 主题下呈现 Android 12+ 标志性视觉（commit `be7f426`）
  - `.pui-bnav-pill` 容器：secondary-container 实心 pill 背景 + 1px 内描边
  - 背景容器：surface-container 纯色 + outline-variant 顶边
- fix(docs): Specimen Card 在 MD3 主题下消除"灰色椭圆底色"（commit `f7f8474`）
  - 圆角 16px（surface-container-low 静态层）
  - 背景 `var(--pui-md-sys-color-surface-container-low)`
  - 边框 `var(--pui-md-sys-color-outline-variant)`
- chore: 主题 CSS 拆为独立 npm 包（commit `0a80acb`，M12 PR3/4）
  - 入口暴露 `.` 与 `./material.css`
  - `peerDependencies: @persona-ui/lib = workspace:*`

### Dependency Updates

- `@persona-ui/lib@0.1.4-beta`（由 changeset fixed 联动）

## 0.1.0 (2026-06-04)

- 首版 Material 3 主题包，独立 npm 包分发
- 入口：`.`（JS 入口）与 `./material.css`（CSS 入口）
- light / dark 各 13 套 token，封装在 `data-theme="material"` 选择器下
- 与 `@persona-ui/lib` 通过 `peerDependencies` 关联

## Unreleased

> 当前 `package.json#version` 已为 `0.1.4-beta`。
> 在 `0.1.4-beta` 之后的下一次发布之前，所有新变更都将汇总在此节。
