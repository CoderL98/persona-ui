# @persona-ui/theme-minimalist

## 0.1.3-beta

### Minor Changes

- **feat(minimalist): 新增素色极简主题(ink-on-paper,near-zero radius,fastest motion)**
  - 第三套主题,搭配 Apple HIG / Material 3 共存
  - 设计调性:近全黑白 + 唯一克制点缀蓝(tertiary)
  - 圆角:`--pui-radius-control: 6px`,`--pui-radius-container: 14px`
  - 动效:enter 80ms / leave 100ms / swap 120ms,移除 spring
  - 海拔:hairline shadow(`0 1px 0 oklch(0% 0 0 / 4%)`)
  - 完整支持 light / dark mode
  - cssVarPrefix: `pui-minimal`(`pui-apple` / `pui-md-sys` 之外的新命名空间)
