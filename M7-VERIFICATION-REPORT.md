# M7 Verification Report (v0.1.0 Final)

**Generated**: 2026-06-04
**Target**: persona-ui v0.1.0
**Scope**: 30+ 缺陷修复 + Apple HIG/MD3 1:1 复刻 + API 命名规范化 + 测试补全
**Branch**: `refactor/v0.1.0-fixes` (12 commits ahead of main)

---

## Executive Summary

v0.1.0 整改完成。所有 P0/P1 缺陷（30+）已修复，Apple HIG + MD3 设计 token 1:1 补齐，API 命名规范化（驼峰），测试覆盖从 413 增至 446。

| 指标 | 状态 | 数值 |
|---|---|---|
| 单元测试 | ✅ | 446 / 446 (+33 新增) |
| Lib 类型检查 | ✅ | 0 errors, 0 warnings |
| Docs 类型检查 | ✅ | 0 errors, 0 warnings |
| Docs 站 build | ✅ | 成功（>200 HTML） |
| 缺陷修复 | ✅ | 30+ / 30+ (100%) |
| 设计规范 | ✅ | Apple HIG + MD3 1:1 |
| API 命名 | ✅ | 12 个 prop 驼峰化 |
| 提交数 | ✅ | 12 commits 全部干净 |
| 破坏性变更 | ⚠️ | 1 个（事件 prop 重命名，已记录） |

---

## 1. 缺陷修复（30+ 全清）

详见 `findings.md`。摘要：
- **SSR hydration mismatch**（3 类）：Math.random、uniqueId、setLocale — 全修
- **Timer / 资源泄漏**（2 类）：ToastViewport、Toast — 全修
- **键盘 / 焦点**（3 类）：SearchModal、Menu、skipToContent — 全修
- **API 命名**（3 类）：7 types、9 docs、5 组件小写 prop — 全修
- **组件功能**（2 类）：List inset、9 占位测试 — 全修
- **a11y / i18n**（3 类）：404 品牌化、hreflang BCP 47、9 md 命名 — 全修

Deferred（接受）：
- ToastViewport 数组 leak 极小（timer 已 fire）
- 4 处 handleKeydown 重复（M11 重构建议）

---

## 2. Apple HIG / MD3 1:1 复刻

### Apple HIG（commit `1c232d2`）
- System Fill：4 档（tertiary/quaternary/secondary/quinary）light+dark
- Semantic Icon：4 档（primary/secondary/tertiary/quaternary）
- Content Margins：3 档（compact/regular/expanded）
- Dynamic Type Scale：11 档 size + line-height（xSmall → AX5）
- Motion Timings：sheet 400ms / alert 200ms / page 350ms / `cubic-bezier(0.32, 0.72, 0, 1)`

### Material Design 3（commit `5e5f1a5`）
- Motion Easing：5 条标准曲线（standard / emphasized / emphasized-decelerate / emphasized-accelerate / linear）
- Motion Duration：6 档（short1 50ms / short2 100ms / medium1 250ms / medium2 300ms / long1 450ms / long2 500ms）
- Success / Warning / Info 色板：light + dark 各 12 token
- 复用现有 tonal palette（tertiary → success，error → warning，tertiary → info）

---

## 3. API 规范化（commit `2bef48f`）

按 CLAUDE.md 第 2 条要求，事件回调 prop 必须驼峰：

| 组件 | 旧 | 新 |
|---|---|---|
| Button | `onclick` | `onClick` |
| Card | `onclick` | `onClick` |
| Chip | `onclick` | `onClick` |
| IconButton | `onclick` | `onClick` |
| ListItem | `onclick` | `onClick` |
| Textarea | `oninput`/`onchange`/`onfocus`/`onblur` | `onInput`/`onChange`/`onFocus`/`onBlur` |
| TextField | `oninput`/`onchange`/`onfocus`/`onblur` | `onInput`/`onChange`/`onFocus`/`onBlur` |

> **BREAKING CHANGE**：v0.1.0 早期版本可接受。Svelte 5 DOM 元素 `onclick` 属性保持小写不变（仅为组件 prop 重命名）。

迁移示例：
```svelte
<!-- 之前 -->
<Button onclick={handleClick}>
<TextField oninput={(e) => ...}>

<!-- 之后 -->
<Button onClick={handleClick}>
<TextField onInput={(e) => ...}>
```

---

## 4. 测试补全（commit `d078479`）

9 个 9 行占位测试扩展为真实功能覆盖：

| 组件 | 之前 | 之后 |
|---|---|---|
| Drawer | 1 测试 | 5 测试（开/关、Escape、4 side） |
| Menu | 1 测试 | 4 测试（容器、trigger、键盘、select） |
| Popover | 1 测试 | 5 测试（容器、开/关内容、testid、callback） |
| Sheet | 1 测试 | 5 测试（开/关、4 side、closeOnEscape、title） |
| Sidebar | 1 测试 | 4 测试（容器、children、side、testid） |
| Tabs | 1 测试 | 4 测试（tablist、所有 tab、aria-selected、onValueChange） |
| Tooltip | 1 测试 | 5 测试（wrapper、初始、4 placement、disabled） |
| Toolbar | 1 测试 | 4 测试（容器、children、testid、role） |
| ListItem | 1 测试 | 6 测试（title、desc、selected、href、onClick、disabled） |

**技术细节**：Svelte 5 Snippet 在测试中需用 `createRawSnippet<[]>(() => ({ render: () => '<span>x</span>' }))`，简单的 `() => 'x'` 不会触发 `{@render snippet()}`。

---

## 5. 提交列表

```
d1a07ef docs: 12 个组件 API 文档表 prop 名同步驼峰
d078479 test(lib): 9 个占位测试扩展为真实功能覆盖（413→446）
2bef48f refactor(lib)!: 12 个小写事件 prop 重命名为驼峰
5e5f1a5 feat(material): 1:1 复刻 MD3 2024 缺失的 motion + 扩展色板
1c232d2 feat(apple): 1:1 复刻 iOS 17 HIG 缺失的 4 类 token
ee1fc6d fix: 6 处预存 CLAUDE.md Tailwind 违规
4a0621c fix: store.svelte.ts setLocale 加 browser 守卫
3dea739 refactor(lib): 28 个组件改用 $props.id() 消除 SSR hydration mismatch
5821165 fix: 7.8-7.11 docs 站 404 品牌化页 + 跳过链接 + hreflang 规范化 + SearchModal 去重
7421c14 fix: 7.4-7.7 List inset 变体 + SectionHeading 文档 + 3 处 API 命名 + CHANGELOG 同步
d1ed987 fix(toast): 修复 timer 误清除 + 闭包旧值泄漏
2295809 fix(lib): 27 个组件改用 crypto.randomUUID 避免 SSR hydration mismatch
```

---

## 6. 最终验证（2026-06-04）

| 命令 | 结果 |
|---|---|
| `pnpm --filter @persona-ui/lib check` | ✅ 0 errors, 0 warnings |
| `pnpm --filter @persona-ui/docs check` | ✅ 0 errors, 0 warnings |
| `pnpm --filter @persona-ui/docs build` | ✅ 成功 |
| `pnpm --filter @persona-ui/lib test:unit` | ✅ 446/446 passed |
| `grep -r "Math.random\|uniqueId" packages/lib/src` | ✅ 0 命中 |
| `grep -rEn "onclick=" packages/lib/src/lib/components/ + types` | ✅ 0 命中（除 DOM `<button>`） |

---

## 7. PR 系列拆分（5 个 PR）

| PR | Commits | 主题 |
|---|---|---|
| PR-1 | `2295809` `d1ed987` `7421c14` `5821165` `3dea739` `4a0621c` `ee1fc6d` | M7 P0/P1 修复 + 审计 + Tailwind |
| PR-2 | `1c232d2` | M8.1 Apple HIG 1:1 |
| PR-3 | `5e5f1a5` | M8.2 MD3 2024 1:1 |
| PR-4 | `2bef48f` `d078479` | M9 API 重命名 + 测试补全（BREAKING） |
| PR-5 | `d1a07ef` | M10 文档站同步 |

---

## 8. 已知限制 / Deferred

1. **ToastViewport 数组 leak**：timer 已 fire，silent memory 极小
2. **4 处 handleKeydown 重复**：抽 `keyboard-nav.ts` 建议放 v0.2.0
3. **BREAKING CHANGE**：事件 prop 重命名（v0.1.0 早期版本可接受，文档已同步）
4. **Tailwind 复杂表达式保留 `[...]`**：Card/TextField 的 `shadow-[inset_0_0_0_1px_var(--x,y)]` 和 `focus-within:shadow-[0_0_0_3px_color-mix(...)]`（Tailwind 4.3 验证 `(*)` 不支持函数调用）
