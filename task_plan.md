# Persona UI v0.1.0 整改任务总览

## 目标
整改 `@persona-ui/lib@0.1.0`：
- 修复 30+ 缺陷
- Apple HIG / Material Design 3 严格 1:1 复刻
- 拆分 5 个 PR 提交到 main

## 关键决策
- **包版本保持 0.1.0**（CHANGELOG 1.0.0 → Unreleased + 0.1.0 段）
- **breaking change 接受**（0.1.0 早期，事件 prop onclick → onClick）
- **设计规范严格 1:1**（Apple/m3.material.io 官方数值为准）
- **CLAUDE.md 优先**：事件回调 prop 必须驼峰；Tailwind 简单 var() 简写 `(*)`，复杂表达式保留 `[...]`

## 里程碑总览（49 子项 → 12 commits 全部完成）

### M7 P0 修复（4 commits，0f→7f→100% 测试通过）
- **M7.3** `Math.random` → `crypto.randomUUID`（27 组件，commit `2295809`）
- **M7.2** Toast timer bug（误清除 + 闭包旧值泄漏，commit `d1ed987`）
- **M7.4-7.7** List inset 变体 + SectionHeading 文档 + 9 个小写 callback → onValueChange/onCheckedChange/onDismiss + CHANGELOG 同步（commit `7421c14`）
- **M7.8-7.11** docs 站：404 品牌化页 + skipToContent + hreflang BCP 47 + SearchModal 去重（commit `5821165`）

### M7 审计修复（3 commits）
- **$props.id() 重构**（28 组件，commit `3dea739`）— Svelte 5.20+ 内置，编译时位置 hash，SSR/CSR 稳定
- **store.svelte.ts setLocale 守卫**（commit `4a0621c`）— `if (browser)` 守卫防止 SSR 抛错
- **CLAUDE.md 扫尾**（commit `ee1fc6d`）— 6 处 `[var()]` 简写 `(*)`（Card/TextField 复杂表达式保留）

### M8 Apple HIG / MD3 1:1 复刻（2 commits）
- **M8.1 Apple HIG**（commit `1c232d2`）— 补 System Fill × 4 档、Semantic Icon × 4、Content Margins × 3、Dynamic Type Scale × 11、Sheet/Alert/Page Motion Timings
- **M8.2 MD3 2024**（commit `5e5f1a5`）— 补 5 条 motion easing、6 档 duration、Success/Warning/Info 扩展色板（light + dark 各 12 token）

### M9 API 命名 + 测试补全（2 commits）
- **M9.1 API 重命名**（commit `2bef48f`）— 12 个小写事件 prop → 驼峰（Button/Card/Chip/IconButton/ListItem/Textarea/TextField）
- **M9.2 测试补全**（commit `d078479`）— 9 个 9 行占位测试 → 33 个真实功能覆盖（413→446）

### M10 文档站同步（1 commit）
- **M10** 12 个组件 API 表 prop 名同步驼峰（commit `d1a07ef`）

## 当前状态（2026-06-05）
- **测试**：472/472 passed
- **类型检查**：lib 0 errors / docs 0 errors
- **构建**：lib + docs build 成功
- **审计**：100% 修复 P0/P1（30+ 缺陷全清）
- **设计规范**：Apple HIG + MD3 双轨，0 偏差
- **视觉**：Apple InputGroup 修复合一字段（待 commit）

## 分支
- 工作分支：`refactor/v0.1.0-fixes`（从 main 切出）
- 领先 main：12 commits
- 工作区：含 InputGroup Apple 修复（未提交）

### M11 视觉一致性增量（in progress）
- **M11.1 Apple InputGroup 合一字段**（待 commit）— apple.css 追加 theme-scoped 覆盖：容器接管 field chrome，leading/trailing 退化为内联文字，嵌套 TextField 去 field chrome。Material 主题零回归。

### M12 主题扩展性重构（4 PR，进行中）
- **M12 PR1 主题注册中心骨架**（待 commit）— 新增 `packages/lib/src/lib/themes/{types,registry,index,README}.ts`，提供 `ThemeDef` 类型契约 + 空 `THEMES` 数组 + 扩展规范。**零现有代码修改**。
- M12 PR2 组件硬编码解耦（计划）
- M12 PR3 主题独立分发包（计划）
- M12 PR4 消费方接入 registry（计划）
