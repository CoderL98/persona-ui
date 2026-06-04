---
"@persona-ui/lib": patch
"@persona-ui/docs": minor
---

主页重写：Specimen Card 模式展示 73 个组件 + Theme Switcher 交互卡

**主页改造**
- 完整重写 `apps/docs/src/routes/[[lang]]/+page.svelte` 为 Specimen Card 模式
- 每个组件一个 `<article class="specimen">` 含标题、描述、演示区、链接
- 7 个分组（Foundation / Form / Feedback / Overlays / Navigation / Data / Advanced）按 2-3 列响应式网格
- 补全 12 个缺失组件：Listbox / Toast / ToastViewport / DatePicker / CommandPalette / Form / FormField / Tour / BottomNavigation / Message / ContextMenu / Fab / Snackbar
- 统一 `.specimen` / `.specimen-head` / `.specimen-title` / `.specimen-caption` / `.specimen-demo` CSS 样式
- 视觉一致：标题用 `--pui-font-display` 字体家族 + `text-(--pui-text-primary)`；描述 `text-xs text-(--pui-text-secondary)`；演示区用 `bg-(--pui-surface-variant)` 半透明 + `border-(--pui-outline-subtle)`

**Theme Switcher 交互卡**
- 新增 Apple ⇄ MD3 切换演示
- 展示同一组件（Card/Button/Chip）如何换肤
- 支持点击切换 `data-theme` 属性并保留 hero 视觉
- i18n keys 新增 65 个 `spec*`（specButton / specIconButton / specCard / ...） + `themeSwitcherTitle/Desc`
- 三语（en / zh-CN / zh-TW）i18n + types.ts 同步扩展

**Bug 修复**
- `apple.css:606` 孤立 `}` 修复（之前导致 docs build 失败）
- `shared.css:79` 孤立 `}` 修复
- `Stepper.svelte` value 改 `$bindable()` 支持 `bind:value`
- `form/index.ts` 导出 `FormField`（之前漏掉）
- `FileUpload` 演示改用 `placeholder` prop（没有 `label`）
- `Message` 演示改用 `title` prop（没有 `author`）
- `ContextMenu` 演示：`<ContextMenu>{children}</ContextMenu>` → items 数组驱动
- `BottomNavigation` 演示：`value` → `id` + 添加 `icon` snippet（navIconHome/navIconSearch/navIconUser）

**验证**
- lib check 0 errors / lib test 472 pass
- docs check 0 errors / docs build OK（成功生成静态站点）
- 主页现在正确展示 68 specimen card，覆盖 73 个组件（FormField 与 Form 同卡 / ToastViewport 与 Toast 同卡 / SectionHeading 是 layout helper 不展示）
