---
"@persona-ui/lib": minor
"@persona-ui/docs": minor
---

BottomNavigation 演示改造 + 主题专属视觉

**BottomNavigation 主题专属样式（P0 修复）**
- 之前 BottomNavigation 在 Apple 和 MD3 主题下视觉完全相同，仅靠 token 颜色区分
- 新增 `.pui-bnav-pill` 容器，根据主题呈现不同活跃态：
  - Apple HIG：颜色 tint (16% primary) + saturate blur backdrop（macOS/iOS 标志性毛玻璃）
  - MD3：secondary-container 实心 pill 背景 + 1px 内描边（Android 12+ 标志性 indicator）
- 两个主题的 BottomNavigation 背景容器也差异化：
  - Apple：translucent 70% + saturate(180%) blur(20px) 毛玻璃
  - MD3：surface-container 纯色 + outline-variant 顶边
- iOS 风格的 "scale-110" 缩放仍保留
- 472 tests pass

**主页 BottomNavigation specimen 重做**
- 之前是单卡片固定底部条，看起来像站点实际导航
- 重做为左右并排手机外壳：
  - 左：Apple HIG 主题（动态岛 + 9:41 时间 + 完整状态栏 SVG 图标 + 底部 home indicator）
  - 右：Material 3 主题（无 notch + 状态栏简化）
- 移动组件用 phone-frame 包裹，body 内有 mock 应用内容（"Sample / Tab content"）
- BottomNavigation 在 phone-frame 内 `position: static`，不再是 fixed
- 项目命名改为 Feed/Explore/Inbox（带 badge 3），明显是移动 App Tab，不是网站导航
- 通过嵌套 `data-theme="apple"` / `data-theme="material"` 让子树继承对应主题

**新增 app.css 样式（主页专用）**
- `.specimen` / `.specimen-head` / `.specimen-title` / `.specimen-caption` / `.specimen-demo` 完整 spec card 样式
- `.phone-frame` 手机外壳（9/19 aspect-ratio + 圆角 + 阴影 + 顶 notch + 状态栏 SVG + home indicator）
- `.phone-frame .pui-bottom-navigation` 覆盖 fixed → static
- `.specimen-demo .pui-message` 覆盖 fixed → absolute（spec 内不浮在视口上）

**Message specimen 修复**
- 之前 Message 默认 open + fixed 定位 → 浮在整个视口右上角干扰其他组件
- 改成 button-trigger 模式（Show message / Hide message 切换）
- `open={messageOpen}` + `onOpenChange` 双向绑定
- i18n 描述更新为 "Chat and message-bubble surfaces"

**i18n 三语同步**
- specBottomNavigation: "MD3 底部导航栏" → "移动端 Tab Bar — 在手机外壳中并排对比 Apple 与 MD3"
- specMessage: 同步更新

验证：lib check 0 errors / lib test 472 pass / docs check 0 errors / docs build OK
