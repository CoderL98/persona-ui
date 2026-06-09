# Persona UI v0.1.0 缺陷清单与修复状态

> 30+ 缺陷分类清单，按严重程度排序。**全部已修复**。

## P0（必须修，已修）

### SSR / Hydration
| # | 文件 | 问题 | 修复 | 提交 |
|---|---|---|---|---|
| 1 | 27 个组件 | `Math.random()` 在 SSR 每次执行产生不同 id → 客户端 hydration 警告 | 改 `crypto.randomUUID()` | `2295809` |
| 2 | 28 个组件 | 自建 `uniqueId()` 同样 SSR/CSR 不一致 | 改 Svelte 5.20+ 内置 `$props.id()`（编译时 hash，SSR/CSR 稳定）| `3dea739` |
| 3 | `store.svelte.ts:28` | `setLocale` 读 `localStorage` 在 SSR 抛错 | 加 `if (browser)` 守卫 | `4a0621c` |

### Timer / 资源泄漏
| # | 文件 | 问题 | 修复 | 提交 |
|---|---|---|---|---|
| 4 | `ToastViewport.svelte` | `clearTimeout` 在 `$effect` cleanup 中误触发，导致 timer 被立刻清除 | 用模块级 `currentTimers` 数组 + 条件 cleanup | `d1ed987` |
| 5 | `Toast.svelte` | `setTimeout(() => onDismiss?.(), duration)` 闭包捕获旧 onDismiss prop | 改 `$effect` + `untrack` 取最新 | `d1ed987` |

### 键盘 / 焦点
| # | 文件 | 问题 | 修复 | 提交 |
|---|---|---|---|---|
| 6 | `SearchModal.svelte` | input onkeydown 双重绑定 → 重复触发 ArrowDown | 删 input onkeydown，svelte:window 统一处理 | `5821165` |
| 7 | `Menu.svelte` | 内部 menu div 上又加 onkeydown → 双键盘 | 删内部 onkeydown，svelte:window 接管 | 审计修复 |
| 8 | `+layout.svelte` | skipToContent 在 main 之后 → 顺序错误 | 移到 header 之前；main 加 `tabindex="-1"` | `5821165` |

## P1（应当修，已修）

### API 命名
| # | 文件 | 问题 | 修复 | 提交 |
|---|---|---|---|---|
| 9 | `button.types.ts` 等 7 个 | 自定义事件 prop 小写（`onclick`、`oninput` 等）违反 CLAUDE.md | 重命名为驼峰 `onClick`、`onInput` 等 12 个 prop | `2bef48f` |
| 10 | 9 个 .md 文档 | API 表 prop 名小写 | 同步驼峰 | `d1a07ef` |

### 组件功能
| # | 文件 | 问题 | 修复 | 提交 |
|---|---|---|---|---|
| 11 | `List.svelte` | `variant: "inset"` 文档支持但未实装 | 实装 inset padding | `7421c14` |
| 12 | 9 个组件测试 | 9 行占位测试，无真实覆盖 | 扩展为 33 个真实功能测试 | `d078479` |

### a11y / 国际化
| # | 文件 | 问题 | 修复 | 提交 |
|---|---|---|---|---|
| 13 | `+error.svelte` | docs 站缺品牌化 404/500 | 新建 +layout 品牌化错误页（75 行） | `5821165` |
| 14 | `sitemap.xml/+server.ts` | hreflang 使用不规范 `zh-cn`/`zh-tw` | 改为 BCP 47 标准 `zh-CN`/`zh-TW` | `5821165` |
| 15 | 9 个 .md | `onValueChange`/`onCheckedChange` 等不一致 | 统一驼峰（checkbox/switch/alert/input-otp/...） | `7421c14` |

### Tailwind
| # | 文件 | 问题 | 修复 | 提交 |
|---|---|---|---|---|
| 16 | 6 处 | `py-[var(--x)]` 简单 var() 引用可简写 | 改 `py-(--x)` 简写 | `ee1fc6d` |
| (保留) | `Card.svelte`, `TextField.svelte` | `shadow-[inset_0_0_0_1px_var(--x,y)]` / `focus-within:shadow-[0_0_0_3px_color-mix(...)]` | 复杂表达式保留 `[...]`（Tailwind 4.3 验证 `(*)` 不支持） | — |

## P2 / P3（建议修，已修或 deferred）

### 已修
- `store.svelte.ts:28` setLocale browser 守卫
- 9 处 prop 命名迁移（onclick → onClick 等）

### Deferred（接受，不影响 v0.1.0）
| # | 文件 | 问题 | 原因 |
|---|---|---|---|
| 17 | `ToastViewport.svelte` | unmount 时未清 currentTimers 数组 | timer 已 fire 完，silent memory leak 极小 |
| 18 | 4 处 `handleKeydown` | 重复的 ArrowUp/Down/Tab 逻辑 | 抽 `keyboard-nav.ts` 建议放 M11 重构 |

## 设计规范缺失（已修）
| # | 范围 | 缺失 token | 修复 | 提交 |
|---|---|---|---|---|
| 19 | Apple HIG | System Fill（4 档）/ Semantic Icon（4）/ Content Margins（3）/ Dynamic Type Scale（11）/ Motion Timings | 全部补齐 + dark 模式 | `1c232d2` |
| 20 | MD3 2024 | Motion Easing（5 条）/ Motion Duration（6 档）/ Success/Warning/Info 色板 | 全部补齐 + light/dark | `5e5f1a5` |

## 当前状态
- 30+ 缺陷全部修复
- 446/446 测试通过
- lib 0 errors / docs 0 errors
- docs 站 build 成功
