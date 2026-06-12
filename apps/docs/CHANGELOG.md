# @persona-ui/docs

## 0.1.4-beta

> docs 与 lib / theme-apple / theme-material 同属 changeset fixed 组，版本号随 lib 同步 bump。

### Minor Changes

- **feat(docs+lib): BottomNavigation 演示 + 主题专属视觉样式**（commit `008f472` / `be7f426`）
  - 主页 BottomNavigation specimen 重做：左右并排手机外壳对比
    - 左：Apple HIG 主题（动态岛 + 9:41 时间 + 完整状态栏 SVG + 底部 home indicator）
    - 右：MD3 主题（无 notch + 状态栏简化）
  - 移动组件用 `phone-frame` 包裹，body 内有 mock 应用内容（"Sample / Tab content"）
  - 项目命名改为 Feed / Explore / Inbox（带 badge 3），明显是移动 App Tab
  - 嵌套 `data-theme="apple"` / `data-theme="material"` 让子树继承对应主题
  - `.pui-bnav-pill` 容器根据主题呈现 iOS 毛玻璃 vs Android 12+ 实心 pill
  - `.specimen` / `.specimen-head` / `.specimen-title` / `.specimen-caption` / `.specimen-demo` 完整 spec card 样式
  - `.phone-frame` 手机外壳（9/19 aspect-ratio + 圆角 + 阴影 + 顶 notch + 状态栏 SVG + home indicator）
  - `.phone-frame .pui-bottom-navigation` 覆盖 `fixed → static`
  - Message specimen 改为 button-trigger 模式（`open` + `onOpenChange` 双向绑定）

- **feat(docs): 主页重写为 Specimen Card 模式 + Theme Switcher 交互卡**（commit `57e8ae4` / `bcf954e`）
  - 完整重写 `apps/docs/src/routes/[[lang]]/+page.svelte` 为 Specimen Card 模式
  - 每个组件一个 `<article class="specimen">` 含标题、描述、演示区、链接
  - 7 个分组（Foundation / Form / Feedback / Overlays / Navigation / Data / Advanced）按 2-3 列响应式网格
  - 补全 12 个缺失组件：Listbox / Toast / ToastViewport / DatePicker / CommandPalette / Form / FormField / Tour / BottomNavigation / Message / ContextMenu / Fab / Snackbar
  - 统一 `.specimen` / `.specimen-head` / `.specimen-title` / `.specimen-caption` / `.specimen-demo` CSS 样式
  - Theme Switcher 交互卡：Apple ⇄ MD3 切换演示
  - i18n keys 新增 65 个 `spec*` + `themeSwitcherTitle/Desc`
  - 三语（en / zh-CN / zh-TW）i18n + types.ts 同步扩展

- **feat: 新增高级组件部分并中文化组件标题**（commit `83fbfb2`）

### Patch Changes

- fix: 主页 Specimen Card 消除"灰色椭圆底色"（commit `c7a9d94` / `f7f8474`）
  - 卡片整体 = 一个连贯单元，不在内部分割"舞台"
  - 演示区不再独立视觉容器，组件直接活在卡片 surface 上
  - 用极轻 `border-top` 替代"椭圆"作为 header / demo 分隔
  - 主题专属 spec card 样式（MD3 16px / Apple 22px squircle + 主题色背景）
  - 必须把主题专属样式改到组件 `<style>` 块内用 `:global([data-theme='...'])` 绕过 scope
  - 附加改进：specimen-title 0.95rem→1rem / 500→600；specimen-link hover 反馈；specimen-demo min-height 110px

- fix(docs): 主页 BottomNavigation 演示修复（commit `be7f426`）
  - 之前是单卡片固定底部条，看起来像站点实际导航 → 改为 phone-frame 内嵌
  - 项目命名改为移动 App 风格（Feed/Explore/Inbox）

- fix(docs): BottomNavigation 演示 prop 名同步驼峰 — `value` → `id` + 添加 `icon` snippet（navIconHome / navIconSearch / navIconUser）

- fix(docs): `apple.css:606` 孤立 `}` 修复（之前导致 docs build 失败）

- fix(docs): `shared.css:79` 孤立 `}` 修复

- fix(docs): Stepper 演示 `value` 改 `$bindable()` 支持 `bind:value`

- fix(docs): `form/index.ts` 导出 `FormField`（之前漏掉）

- fix(docs): FileUpload 演示改用 `placeholder` prop（没有 `label`）

- fix(docs): Message 演示改用 `title` prop（没有 `author`）

- fix(docs): ContextMenu 演示 — `<ContextMenu>{children}</ContextMenu>` → items 数组驱动

- fix(docs): Calendar / DatePicker 演示根据 `currentLocale` 传 `locale` prop

- fix(docs): SearchModal input 重复 `onkeydown` 双绑修复

- fix(docs): skipToContent 链接上移到 layout 第一个 focusable 元素

- fix(docs): hreflang 改 BCP 47 标准 `zh-CN` / `zh-TW`

- fix(docs): 新增品牌化 404 错误页（75 行，三语 i18n 齐全）

- fix(build): 拆分 docs chunk + 消除 lib hot 警告（commit `704f437` / `d01ff9b` / `9156296`）
  - `manualChunks` 真正按文件名首字母分流（9 桶：locale × 字母段）
  - `docs.ts` 还原同步 API（避免循环依赖）

- chore: 抽取 `PERSONA_UI_BASE_URL` 统一域名管控（commit `ecf6ab6`）

- chore: 消费方接入主题注册中心，消除硬编码（commit `8ca1df0`，M12 PR4/4）

- chore: homepage 字段去掉 `/r` 后缀（commit `94ef8c8`）

- docs: 12 个组件 API 表 prop 名同步驼峰（button / icon-button / text-field / textarea × 3 语）

- docs: 补 SectionHeading 三语言文档

- docs: 修正 checkbox / switch / alert 文档中 `onValueChange` / `ondismiss` 为 `onCheckedChange` / `onDismiss`（驼峰）

### Dependency Updates

- `@persona-ui/lib@0.1.4-beta`
- `@persona-ui/theme-apple@0.1.4-beta`
- `@persona-ui/theme-material@0.1.4-beta`

## 1.0.0

### Minor Changes

- 417ccb7: Initial monorepo release of Persona UI — a Svelte 5 dual-personality component library.
  - 40+ components (Foundation, Form, Feedback, Overlay, Navigation, Data)
  - Dual-personality theming: Apple HIG × Material Design 3
  - Single `data-theme` / `data-mode` attribute switch
  - Per-component CSS variable tokens for local override
  - TypeScript types, Svelte 5 runes, full a11y
  - Unit tests (138 vitest) + a11y / css-contract / visual specs (playwright)

- 181c3aa: docs: 文档站大改
  - 集成 Shiki 语法高亮 + 代码块复制按钮
  - 补全 23 个 md 文件的 Import 节
  - 每个组件 doc 加 A11y / See also 标准化章节
  - 实现真全站搜索（基于 CommandPalette + 预生成 page index）；删除/实装 "Press ⌘K to search" 假提示
  - 移动端 sidebar 抽屉化（汉堡按钮）
  - 文档站首次访问根据 `prefers-color-scheme` 自动切换暗色
  - docs 站的 Calendar / DatePicker 演示根据 `currentLocale` 传 `locale` prop

### Patch Changes

- 74d44d7: fix: M6.1 axe-core 无障碍修复
  - Avatar: status 指示器加 `role="img"` 修复 `aria-prohibited-attr`
  - Chip: 条件化 `role="button"`（仅 removable 时），移除无交互时的 button role
  - docs 代码块: `<pre>` 加 `tabindex="0"` 修复 `scrollable-region-focusable`
  - docs 首页: Switch 组件加 `aria-label"`
  - docs 代码块样式: 加 `focus-visible outline`

- 181c3aa: chore: 验证 + 发布就绪
  - `pnpm check` 通过 / `pnpm test:unit` 218 测试通过
  - `pnpm test:a11y` axe 0 critical
  - `pnpm test:visual` 视觉零回归 / `pnpm test:css` css contract 通过
  - `pnpm build` lib + docs 都成功
  - Lighthouse Performance > 90、A11y = 100
  - 三语 md 67 个完整对齐
  - OG / Twitter meta 在每页正确渲染
  - `prefers-color-scheme` 自动生效
  - ⌘K 搜索能搜到所有组件
  - favicon / robots / sitemap 全部 200
  - nginx 静态部署（`pnpm build:docs` 产物可直接 nginx serve）

## 0.1.0 (2026-06-04)

首个 monorepo 发布。SvelteKit 静态文档站。

- 70 个组件（Foundation / Form / Feedback / Overlay / Navigation / Data / Advanced）
- 每个组件含：三语 markdown 文档（en / zh-CN / zh-TW）
- ⌘K 全站搜索，`prefers-color-scheme` 自动
- SSG 文档站（adapter-static）：favicon / og-image / robots / sitemap.xml 齐全
- 三语 SEO：hreflang / canonical / OG / Twitter / og:locale 全部对齐

## Unreleased

> 当前 `package.json#version` 已为 `0.1.4-beta`。
> 在 `0.1.4-beta` 之后的下一次发布之前，所有新变更都将汇总在此节。
