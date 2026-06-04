---
"@persona-ui/lib": minor
---

设计系统 1:1 复刻补全（P0 + P1 + P2 共 11 项）：

**P0（3 项关键缺口）**
- Apple Squircle：`--pui-radius-control-continuous` / `--pui-radius-container-continuous` + 6 档圆角（0/continuous/6/10/14/20）+ `@supports (corner-shape: squircle)` 自动应用 squircle 到 18 组件
- MD3 Density Tokens：4 档（0/-1/-2/-3 = Standard/Medium/Compact/Extra Compact）通过 `[data-density]` 属性切换，影响 button/list/table/form 高度与 padding/gap
- MD3 IconButton 4 variants：standard（默认 toolbar）/ filled（primary）/ filled-tonal / outlined + 新增 `shape: round | square` prop

**P1（4 项高价值）**
- Apple Haptics：新增 `internal/haptics.ts`，7 档触感（selection/light/medium/heavy/success/warning/error）+ `navigator.vibrate` + `prefers-reduced-motion` 守卫；已 wire 到 Button/IconButton/Switch/Chip/Snackbar/Fab
- Apple Safe Area + Multi-Spring：4 档 `--pui-safe-area-{top,right,bottom,left}`（`env(safe-area-inset-*)`）+ 3 档 spring timing（light/medium/heavy）
- MD3 FAB 组件：3 尺寸（small 40 / regular 56 / large 96dp）+ 4 变体（surface/primary/secondary/tertiary）
- MD3 Snackbar 组件：4 tones（info/success/warning/error）+ kind=default/action + safe-area 底部定位

**P2（4 项收尾）**
- MD3 Expressive Motion：4 档 spring easing（fast/default/slow/bouncy）
- State Layer Size：40/48/56dp 触控目标尺寸 token
- MD3 Fixed Colors：5 个语义化定值（red/green/blue/yellow/grey，不随主题变色）
- Apple touch-callout：禁用 iOS 长按弹菜单 + tap 高亮 + tap-to-zoom；硬件加速滚动

**Card 5 variants**：elevated（默认）/ filled / outlined / **tonal**（新增，secondary-container）/ **flat**（新增，透明 + outline）

**测试**：+16（Fab 6 + Snackbar 6 + haptics 4）— 456 → 472 passing

导出 API 新增：
- `triggerHaptic(type)` / `supportsHaptics()` 公开工具
- `HapticType` 类型
- `Fab` / `FabProps` / `FabSize` / `FabVariant`
- `Snackbar` / `SnackbarProps` / `SnackbarTone` / `SnackbarKind` / `SnackbarItem`

破坏性变化（CardVariant）：新增 `tonal` 和 `flat`，属于扩展，老的 3 种变体（elevated/filled/outlined）行为不变

验证：lib check 0 errors / lib test 472 pass / docs check 0 errors / docs build OK
