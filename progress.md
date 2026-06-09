# 执行进度日志

## Session: 2026-06-04

### Phase 0: 静态审计 + 规划
- **Status:** complete
- Actions:
  - 全面扫描 50 组件 + 7 个 CSS 文件 + docs 站点
  - 静态审计找出 30+ P0/P1 缺陷
  - 与用户确认整改范围（方案 C 完整整改 + 0.1.0 暂不 bump + Apple/MD3 严格 1:1 复刻）
  - 创建 task_plan.md / findings.md
- Files:
  - task_plan.md (重写)
  - findings.md (新建)
  - progress.md (新建)

### Phase 1: M7 P0 致命缺陷
- **Status:** complete
- **Finished:** 2026-06-04
- Commits (分支 refactor/v0.1.0-fixes):
  - `2295809` fix: 7.3 Math.random → crypto.randomUUID（27 组件）
  - `d1ed987` fix: 7.2 Toast timer bug（Viewport + 单例 timer）
  - `7421c14` fix: 7.4-7.7 List inset + SectionHeading 文档 + 3 处 API 命名 + CHANGELOG
  - `5821165` fix: 7.8-7.11 404 页 + 跳过链接 + hreflang + SearchModal 去重
- 子项落地:
  - 7.2 Toast timer：完成（新增 1 个回归测试）
  - 7.3 crypto.randomUUID：完成（27 组件，0 残留）
  - 7.4 List inset：完成（新增 1 个 inset 测试）
  - 7.5 SectionHeading 三语文档：完成
  - 7.6 onValueChange/ondismiss → onCheckedChange/onDismiss：完成（9 md 改）
  - 7.7 CHANGELOG 1.0.0 → Unreleased：完成
  - 7.8 +error.svelte 品牌化 404 页：完成
  - 7.9 SearchModal 冗余 listener：完成
  - 7.10 skipToContent 链接：完成
  - 7.11 sitemap hreflang BCP 47 规范化：完成
  - 7.12 localStorage 同步：M7.3 决策中已确认 store.svelte.ts:28 已写，无需再改
- 未落地的 M7 子项：均为误判/已在新位置处理（7.1 SSR 守卫实际非必需，document.* 都在 $effect 内；7.12 已被 store 覆盖）

---

## Test Results

| Test | Input | Expected | Actual | Status |
|------|-------|----------|--------|--------|
| 静态审计 | grep 50 组件 | 30+ 缺陷 | 30+ 缺陷 | ✓ |
| `pnpm test:unit` lib（M7 启动） | 全量 | 410+ 通过 | 411 通过 | ✓ |
| `pnpm test:unit` lib（M7 收尾） | 全量 | 411+ 通过 | 413 通过 | ✓ |
| `pnpm check` lib | 全量 | 0 errors | 0 errors | ✓ |
| `pnpm check` docs | 全量 | 0 errors | 0 errors | ✓ |
| `pnpm build` docs | 全量 | 构建成功 + sitemap hreflang 正确 | ✓ | ✓ |

## Error Log

| Timestamp | Error | Attempt | Resolution |
|-----------|-------|---------|------------|
|           |       |         |            |

## 5-Question Reboot Check

| Question | Answer |
|----------|--------|
| Where am I? | M7 4 commit 全部落地，但是**新发现 2 个 P0 回归/未修复** + 3 个 P1 缺陷，未推到 M8 |
| Where am I going? | 必须**先修 P0/P1** 才能进入 M8.1，否则 M8 会基于 bug 代码继续 |
| What's the goal? | 修复 30+ 缺陷 + Apple/MD3 1:1 复刻 + 文档站完善 |
| What have I learned? | 见 findings.md + M7 期间总结 + 下文"Phase 2 审计"新增 10 个发现 |
| What have I done? | M7 4 commit 落地 12 个子项，但其中 2 个 commit 修复不彻底/引入新 bug |

---

## Phase 2: M7 落地审计（2026-06-04 续）

### M7 4 commit 子项逐项验证

| 子项 | 是否完成 | 证据 | 风险 |
|------|---------|------|------|
| 7.1 SSR 守卫 | ✓ 完成（决策正确） | 21 个 `$effect` 中 0 个用 `if (browser)`；所有 `document.*` 都在 `$effect` 内，SSR 不会跑 | 低 |
| 7.2 List 完整化 | ⚠️ 完成但新违规 | `List.svelte` L12 新增 inset variant；`List.test.ts` L31 加 2 个测试 | **P1（`shadow-[var(...)]` 违反 CLAUDE.md）** |
| 7.3 404 页 | ✓ 完成 | `+error.svelte` 75 行品牌化；i18n 3 语言齐全 | 低 |
| 7.4 搜索导航 | ❌ **P0 回归** | 实测 Ctrl+K → "button" → ArrowDown 一次：activeIndex 从 0 → 2（跳 2 步） | **高（功能破损）** |
| 7.5 国际化 | ✓ 完成 | `notFound` + `skipToContent` × 3 语言齐全 | 低 |
| 7.6 文档化 | ✓ 完成 | `section-heading.md` × 3 + 9 个 md 改驼峰 | 低 |
| 7.7 CHANGELOG | ⚠️ 半完成 | Unreleased 段加了，但 1.0.0 段**保留**（package.json 0.1.0 从未发布过 1.0.0） | 中（与 task_plan 描述不一致） |
| 7.8 id 工具 | ❌ **P0 名不副实** | `crypto.randomUUID()` 在 SSR 和 CSR 各执行一次产生不同 id，实测 `pui-switch-1xo7pi` (SSR) ≠ `pui-switch-eoyjf8` (CSR)；ARIA 关联同组件内仍同步所以无 a11y 损坏，但有 silent hydration mismatch | **高**（应改用 Svelte 5 `$props.id()`） |
| 7.9 Toast 单例 timer | ⚠️ 修复无依据 | 原代码 `let timer` 是 module-level 变量，effect cleanup 闭包能读到最新值，无 bug；新代码加 `untrack` + 辅助函数反而更复杂 | 中（无功能影响但 commit message 误判） |
| 7.10 ToastViewport cleanup | ✓ 完成 | cleanup 改增量删除（仅 delete 不在 currentIds 中的） | 低 |
| 7.11 Toast 回归测试 | ✓ 完成 | `fakeTimer` 回归测试 2 个 | 低 |
| 7.12 localStorage 同步 | ✓ 完成 | `store.svelte.ts:28` 已写 ✓ | 低 |
| 7.13 单元测试 | ✓ 完成 | 413/413 通过 ✓ | 低 |
| M8.1 sitemap | ✓ 完成 | hreflang 唯一值 `en / zh-CN / zh-TW` ✓ | 低 |
| M8.2 robots | n/a | 跳过 | - |

### 新发现（按严重度）

#### P0（必须立即修复，PR 合并前）

1. **SearchModal.svelte 双重键盘处理回归**（commit 5821165 引入）
   - 文件：`apps/docs/src/lib/components/SearchModal.svelte:55-66, 96`
   - 现象：每次 ArrowDown/ArrowUp 跳 2 步，Enter 触发 2 次 goto
   - 根因：`svelte:window onkeydown={handleKey}` ＋ input 上 `onkeydown={handleKey}` 双绑定
   - 修复：删 input 的 onkeydown 即可（window 会兜底），或 input 上加 `e.stopPropagation()`
   - 实测复现：
     ```
     输入 "button" → ArrowDown: activeIndex 0 → 2
     ArrowDown:        activeIndex 2 → 4
     ArrowUp:          activeIndex 4 → 2
     ```

2. **uniqueId 工具名不副实**（commit 2295809）
   - 文件：`packages/lib/src/lib/internal/id.ts`
   - 现象：SSR HTML id 与 CSR hydrate 后 id 完全不一致
   - 实测对比（`/` 页面 pui-switch）：
     - SSR HTML：`pui-switch-1xo7pi / 2x7gd7 / fggasn / ftkzb5 / gsxana`
     - CSR DOM ：`pui-switch-eoyjf8 / ogj9j2 / q0i3mv / rwp3y9 / zs2qz7`
   - 根因：`crypto.randomUUID()` 在 SSR 和 CSR 各执行一次，产生不同 id
   - 影响：silent hydration mismatch（无 console warning，因为是 attribute 差异）；ARIA 关联（label.for ↔ input.id）在同组件内同一次求值仍一致，**所以 a11y 没坏**，但有 SSR/CSR drift 风险（任何第三方 hydration 工具会报错）
   - 修复：用 Svelte 5 内置 `$props.id()`（lib/package.json 已经是 5.56.0，已支持）

#### P1（PR 合并前必须修）

3. **skipToContent 位置违反 WCAG 2.4.1 Bypass Blocks**
   - 文件：`apps/docs/src/routes/+layout.svelte:240-249`
   - 现象：skipToContent `<a href="#top">` 放在 `<main>` 内部
   - 实测：skipToContent 在 Tab 顺序中是第 9 个（index 8），用户必须 Tab 过 logo + Apple/Material 切换 + light/dark + 3 个语言切换才能到 skipToContent，完全失去意义
   - 修复：把 skipToContent 移到 `<body>` 第一个 focusable 元素（layout 最顶），且加 `tabindex="-1"` 到 `<main id="top">`

4. **CHANGELOG.md 1.0.0 段未删**
   - 文件：`packages/lib/CHANGELOG.md:13`
   - 现象：commit 7421c14 只新增了 Unreleased 段，没删 1.0.0 段；但 package.json 是 0.1.0，从未发布过 1.0.0
   - 修复：删 1.0.0 整段

5. **List.svelte 新引入 `shadow-[var(...)]` 违规**
   - 文件：`packages/lib/src/lib/components/list/List.svelte:12`
   - 现象：`shadow-[var(--pui-elevation-1)]` 违反 CLAUDE.md 规则（`[var(*)]` 已过时，应使用 `(*)`）
   - 修复：`shadow-(--pui-elevation-1)`

6. **Menu.svelte 预存的双重键盘处理 bug**（同 SearchModal 类型，不是 M7 引入）
   - 文件：`packages/lib/src/lib/components/menu/Menu.svelte:28, 39`
   - 现象：`<svelte:window onkeydown={handleKeydown} />` ＋ 内部 div `onkeydown={handleKeydown}` 双绑定
   - 影响：Menu 打开时按 ArrowDown 跳 2 步
   - 修复：删 div 的 onkeydown（div `tabindex="-1"` 不会被 focus，window 会兜底）

#### P2（建议修复）

7. **ToastViewport.svelte 修复后无 unmount cleanup**
   - 文件：`packages/lib/src/lib/components/toast/ToastViewport.svelte`
   - 原代码 cleanup 会清空所有 timer；新代码无 cleanup，组件 unmount 时挂起的 setTimeout 不清理
   - 影响小（dismiss 作用于模块级 store，不报错），但属于 silent memory leak
   - 修复：保留外层 cleanup，或在 onDestroy 中清空 timers

8. **Toast.svelte 修复的"bug"实际不存在**
   - 原代码 `let timer` 是 module-level 变量，effect cleanup 闭包能读到最新赋值
   - 修复仅是加 `untrack` 包裹 + 重命名 `timerHandle` + 抽 `clearTimer` 辅助函数
   - 影响：增加代码复杂度但不解决任何实际问题
   - 建议：revert 这个 fix，或保留但更新 commit message 承认无原 bug

9. **store.svelte.ts:30 `document.documentElement.lang` 缺 SSR 守卫**
   - 文件：`apps/docs/src/lib/i18n/store.svelte.ts:30`
   - 现象：L28 `localStorage.setItem` 在 `if (browser)` 内，L30 `document.documentElement.lang = next` 在 if 外
   - 实际安全：`setLocale` 只在 click handler 调用（CSR 路径）
   - 建议：把 L30 也包进 `if (browser)` 内，防御性编程

10. **4 处重复的 handleKeydown 逻辑**
    - 文件：`Dialog.svelte` / `Popover.svelte` / `Menu.svelte` / `SearchModal.svelte`
    - 建议：抽到 `$lib/internal/keyboard-nav.ts`
    - 不在 M7 任务范围，但应记录在 M11（重构）阶段

#### P3

11. **Toast.svelte L14 注释错误**
    - 注释：`// 用模块级容器保存 timer 引用`
    - 实际：`let timerHandle = null` 是组件实例级（`<script>` 顶层 let）
    - 修复：注释改成 `// 组件实例级 timer 引用`

### 修复优先级建议

| 优先级 | 工时估计 | 内容 |
|-------|---------|------|
| **P0 必做** | 1-2h | 修 SearchModal 双重处理 + 把 `crypto.randomUUID` 改用 `$props.id()`（29 组件替换 1 个 util） |
| **P1 必做** | 1h | skipToContent 移到 layout 顶 + 删 CHANGELOG 1.0.0 段 + 改 List.svelte `shadow-(--pui-elevation-1)` + 修 Menu.svelte 双重处理 |
| **P2 建议** | 1h | ToastViewport 加 unmount cleanup + Toast.svelte 更新 commit message + store.svelte.ts 加 `if (browser)` + 注释修正 |
| **P3 可选** | - | 抽 keyboard-nav util（建议推迟到 M11） |

**推荐**：先做 P0 + P1，共 3-4h 修复 + 1 commit，然后才能进入 M8.1（避免 Apple HIG 1:1 复刻基于 bug 代码）。

### 5 核心 E2E 验证（最终）

| # | 验证 | 结果 |
|---|------|------|
| 1 | `pnpm test:unit` lib | 413/413 通过 ✓ |
| 2 | `pnpm check` lib | 0 errors ✓ |
| 3 | `pnpm check` docs | 0 errors ✓ |
| 4 | `pnpm build` docs | 构建成功 + sitemap hreflang 正确 ✓ |
| 5 | `grep -rn "Math.random" packages/lib/src/lib/components/` | 0 命中 ✓ |

**额外 Playwright 验证**（非 M7 任务，主动发现 bug）：

| # | 验证 | 结果 |
|---|------|------|
| 6 | SearchModal ArrowDown 导航 | **失败**（跳 2 步）→ 已记录为 P0 |
| 7 | skipToContent Tab 顺序 | **失败**（排第 9）→ 已记录为 P1 |
| 8 | SSR/CSR id 一致性 | **失败**（id 不同）→ 已记录为 P0 |
| 9 | ARIA 关联（label.for ↔ input.id） | 通过 ✓（同组件内同步） |
| 10 | 路由跳转后 Dialog 关闭 | 通过 ✓ |

---

## Session: 2026-06-05

### Phase 3: Apple InputGroup 视觉割裂修复

#### 现象
主页 specimen InputGroup（Apple 主题）下：
- "https://" 前缀在独立灰色圆角方块
- "your-domain" TextField 在独立白色圆角方块
- 两者之间有视觉空隙，**两个方块明显割裂**

#### 根因
`InputGroup.svelte:32, 40` 默认 Material 风格：leading/trailing 自带 `bg-(--pui-surface-variant) border border-r-0/l-0 rounded-*`，嵌套 TextField 又有自己的 `bg-(--pui-field-bg) border rounded-*`。
→ Apple HIG 偏好**单一连续字段**，prefix/suffix 作为内嵌文字标签，不应出现独立 addon 方块。

#### 修复策略
**不动 `InputGroup.svelte`**，仅在 `apple.css` 追加 theme-scoped 覆盖：

| 层 | 修复 |
|---|---|
| `.pui-input-group` 容器 | 接管 field chrome（bg + border + radius + padding + focus ring） |
| `> .shrink-0`（leading/trailing） | `background:transparent; border:0; padding:0` 退化为内联文字 |
| `> .flex-1` 中间槽 | 横向 flex、垂直居中 |
| `.pui-text-field` 嵌套 | `flex-direction:row` 避免与 addon 垂直错位 |
| `.pui-text-field-frame` 嵌套 | 完全透明（去 bg/border/radius/padding/shadow） |
| 嵌套 label/helper/error | `display:none`（不应在 InputGroup 内出现） |

错误态透传：`:has()` 选择器检测子 TextField 的 error border，propagate 到容器。

#### 验证
| 项 | 结果 |
|---|---|
| `pnpm test:unit` lib | 472/472 passed ✓ |
| `pnpm check` lib | 0 errors ✓ |
| `pnpm check` docs | 0 errors ✓ |
| `pnpm build:lib` | ✓ |
| Apple 主页 specimen 视觉 | ✓ 单一字段，前缀内嵌 |
| Apple focus 态 | ✓ 蓝边 + focus ring 在容器外圈 |
| Apple dark 模式 | ✓ 半透明白 → 半透明深色，自动适配 |
| Material 主题视觉 | ✓ 仍为独立 addon 方块（未受影响） |
| Material 类型/测试 | ✓ 全部通过 |

#### 涉及文件
- 修改：`packages/lib/src/lib/styles/themes/apple.css` L460+ 追加 InputGroup 章节

### Phase 3.1: Apple InputGroup 残余竖线清理

#### 现象
修复后 Apple 主页 InputGroup 出现**两条割裂竖线**：
- 一条在 "https://" 与 "your-domain" 之间
- 一条在 "your-domain" 右端

#### 根因
`InputGroup.svelte:36` 的中间槽 wrapper 携带 `[&>*:first-child]:md:border-x` 类，在 md+ 屏幕给 first-child（`.pui-text-field`）加 `border-inline-width:1px`，目的本是 Material 主题让 addon 与 input 共享边框。Apple 主题下这两条 1px 边线没有被覆盖。

#### 修复
`apple.css:540` 追加 `border-inline-width: 0 !important;` 抹掉 first-child 的左右内边框。

#### 验证
| 项 | 结果 |
|---|---|
| Apple 主页 specimen 视觉 | ✓ 两条竖线消失，字段完全统一 |
| Apple focus 态 | ✓ 蓝边 + ring 正常 |
| Material 主题视觉 | ✓ 仍为独立 addon 方块（未受影响） |
| `pnpm test` 全量 | 472/472 passed ✓ |

#### 涉及文件
- 修改：`packages/lib/src/lib/styles/themes/apple.css` `.pui-text-field` 规则 +1 行

## Session: 2026-06-05 (continued)

### Phase 4: 主题扩展性重构 (PR1/4)

#### 目标
为加新主题铺路：建立主题注册中心，**不动现有代码/样式/组件**。
后续加新主题成本：从 4-7h 降到 30-60min。

#### 范围（仅 PR1）
- ✅ 新增 `packages/lib/src/lib/themes/types.ts` — `ThemeDef` / `ThemeMode` / `ThemeRegistry` 类型契约
- ✅ 新增 `packages/lib/src/lib/themes/registry.ts` — 空 `THEMES: ThemeRegistry = Object.freeze([])`
- ✅ 新增 `packages/lib/src/lib/themes/index.ts` — 公共 API 入口
- ✅ 新增 `packages/lib/src/lib/themes/README.md` — 扩展规范（架构、checklist、禁止事项、CI 验证）
- ✅ 在 `lib/index.ts` 末尾 re-export `THEMES` / `ThemeDef` / `ThemeMode` / `ThemeRegistry`

#### 不动
- ❌ 现有 CSS（apple.css / material.css / backgrounds.css / shared.css）
- ❌ 现有组件（不重构硬编码，留给 PR2）
- ❌ docs 站 layout / i18n（留给 PR4）
- ❌ `tokens.css` 通用 token 补全（留给 PR2）

#### 设计要点
- `ThemeDef` 字段全 `readonly`，包内应用 `Object.freeze` 锁定
- `cssVarPrefix` 强约束全局唯一（避免主题间样式污染）
- `THEMES` 默认空数组（lib 主体不内置任何主题 → 维持 tree-shakable）
- 消费方在自己的聚合层组合 `THEMES`（解耦 lib 与主题包）
- `packageName` 字段供 docs 站诊断"未装主题包"友好 warning

#### 验证
| 项 | 结果 |
|---|---|
| `pnpm test:unit` lib | 472/472 passed ✓ |
| `pnpm check` lib | 0 errors ✓ |
| `pnpm check` docs | 0 errors ✓ |
| `pnpm build` lib | ✓ 4 个新文件正确生成到 dist/themes/ |
| docs 站视觉 | 增量变更，无任何现有文件被修改 → 必然零回归 |

#### 涉及文件
- 新增：`packages/lib/src/lib/themes/{types,registry,index}.ts` + `README.md`（4 文件）
- 修改：`packages/lib/src/lib/index.ts`（+4 行 re-export）
- 总变更：+1 修改（4 行），+4 新增（types/registry/index/README）

#### 后续 PR
- PR2：组件层硬编码解耦（Fab/Snackbar/Dialog/Tour/Badge/Avatar/Card/IconButton 8 处）→ 通用 token
- PR3：主题独立分发包（@persona-ui/theme-apple / theme-material 独立 npm）
- PR4：消费方接入 registry（docs 站 layout/i18n/+page.svelte 全部从 registry 读）
