# @persona-ui/lib

> 主题无关的 Svelte 5 组件库 —— 一套 API 在 Apple HIG 与 Material 3 间切换。

`@persona-ui/lib` 是 Persona UI monorepo 的组件主体,**不**内置任何主题实现。
所有视觉决策走 design token(以 CSS 变量形式暴露),主题由配套的
`@persona-ui/theme-apple` / `@persona-ui/theme-material`(或第三方
`@persona-ui/theme-*` 包)按需注入。

- 源码:[`packages/lib/`](https://github.com/CoderL98/persona-ui/tree/main/packages/lib)
- 文档站:[persona-ui.ricecakecat.com](https://persona-ui.ricecakecat.com)
- English: [README.md](https://github.com/CoderL98/persona-ui/blob/main/packages/lib/README.md)

---

## 安装

```bash
pnpm add @persona-ui/lib
# 至少选择一个主题包
pnpm add @persona-ui/theme-apple
# 或
pnpm add @persona-ui/theme-material
```

### Peer dependencies

| 依赖 | 版本 |
| --- | --- |
| `svelte` | `^5.0.0` |

主题包以 `workspace:*` 形式互相依赖,消费方需同时安装。

---

## 快速开始

### 1. 引入样式

主题 CSS 已拆分到独立包,需手动按顺序 `@import`。顺序很重要:`core.css` 提供
tokens / 字体 / 动效 / 工具类,主题包覆盖这些 token 的具体值。

```css
/* src/app.css */
@import "@persona-ui/lib/core.css";
@import "@persona-ui/theme-apple/apple.css";
/* 或:@import "@persona-ui/theme-material/material.css"; */
```

> `@persona-ui/lib/styles.css` 仍可作为向后兼容别名(v0.2.0 起标记 deprecated),
> 新代码请直接用 `core.css` + 主题包入口。

### 2. 切换主题 / 模式

通过 `<html>`(或任意容器)上的 `data-theme` / `data-mode` 属性切换:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css";
  let { children } = $props();
</script>

<html lang="zh-CN" data-theme="apple" data-mode="light">
  {@render children?.()}
</html>
```

两个属性控制视觉:

- **`data-theme`** —— 视觉语法,内置取值为 `apple` / `material`。只要某
  `@persona-ui/theme-*` 包在其 `themeDef` 中声明了对应 `id`,其他取值也合法。
- **`data-mode`** —— 色彩方案,`light` 或 `dark`。

主题可作用域到任意子树,便于在 demo 页内做局部对比:

```svelte
<div data-theme="material" data-mode="dark">
  <Button variant="filled">深色 Material 按钮</Button>
</div>
```

### 3. 使用组件

```svelte
<script>
  import { Button } from "@persona-ui/lib";
</script>

<Button variant="filled" size="md" onclick={() => console.log("clicked")}>
  Click me
</Button>
```

---

## 主题系统

### 三层架构

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. 组件层(本包,主题无关)                                     │
│    - 70+ 组件,只引用 --pui-* CSS 变量                          │
│    - 暴露 ThemeDef / ThemeRegistry 类型契约                     │
├─────────────────────────────────────────────────────────────┤
│ 2. 主题契约层(本包 themes/)                                   │
│    - 定义 ThemeDef 接口:id / label / cssVarPrefix / darkSupport│
│    - 默认 THEMES 注册表为空,消费方自行聚合                      │
├─────────────────────────────────────────────────────────────┤
│ 3. 主题实现层(@persona-ui/theme-*)                            │
│    - theme-apple   : pui-apple 前缀,HIG 语法                  │
│    - theme-material: pui-md-sys 前缀,M3 / Material You 语法    │
│    - 第三方可发布 theme-fluent / theme-cupertino 等            │
└─────────────────────────────────────────────────────────────┘
```

### 消费方聚合(主题切换器)

主题包各自导出 `themeDef: ThemeDef`(冻结对象)。消费方在自己的应用层聚合:

```ts
// src/lib/themes.ts
import { themeDef as apple } from "@persona-ui/theme-apple";
import { themeDef as material } from "@persona-ui/theme-material";
import type { ThemeRegistry } from "@persona-ui/lib";

export const THEMES: ThemeRegistry = Object.freeze([apple, material]);
```

> **重要约束**:`cssVarPrefix` 在所有主题间必须全局唯一(对应 `[data-theme={id}]`
> 的样式隔离)。新建主题时务必确认不与现有前缀冲突。

### 新增第三方主题

1. 发布 npm 包 `@persona-ui/theme-xxx`,导出 `themeDef: ThemeDef` + `xxx.css`
2. 消费方在 `THEMES` 数组追加该 `themeDef`
3. 第三方主题包应通过 `peerDependency` 声明对 `@persona-ui/lib` 的依赖

---

## 组件清单

共 **70+ 组件**,按场景分组:

**Foundation(基础)**
Button · IconButton · Fab · Card · Divider · Badge · Chip · Avatar · Kbd · Spinner · Skeleton · Progress

**Form(表单)**
TextField · Textarea · InputGroup · InputOTP · Checkbox · Radio / RadioGroup · Switch · Slider · Select · Listbox · Combobox · SearchField · DatePicker · DateRangePicker · TimePicker · ColorPicker · Rating · FileUpload · Form / FormField

**Feedback(反馈)**
Alert · Banner · Toast / ToastViewport · Snackbar · Message · EmptyState · ConfirmDialog

**Overlay(浮层)**
Tooltip · Popover · HoverCard · Menu · ContextMenu · Dialog · Sheet · Drawer · CommandPalette

**Navigation(导航)**
Tabs · SegmentedControl · Breadcrumb · Pagination · Stepper · Toolbar · Sidebar · NavigationRail · BottomNavigation · Tour

**Data(数据)**
List / ListItem · Accordion · Table · DataTable · Calendar · Timeline · TreeView · VirtualList · Carousel

**Display(展示)**
CodeBlock · Chart · SectionHeading · Stack

所有组件遵循统一约定:

- Props 用 Svelte 5 runes `let { ... } = $props()` 声明
- 事件回调用驼峰属性(`onclick` / `onOpenChange` / `onValueChange`,而非 Svelte 4 的 `on:click`)
- 透传属性到根元素,子内容走 Svelte 5 snippet(`children` + `{@render children?.()}`)
- 视觉全部走 design token,组件内部不写死颜色 / 字号 / 间距

完整 API 参见 [文档站组件索引](https://persona-ui.ricecakecat.com/en/components)。

---

## 本地覆盖(Design Token)

每个组件都暴露 `--pui-*-*` CSS 变量,支持 per-instance 覆盖:

```svelte
<Button
  variant="filled"
  style="
    --pui-button-radius: 2px;
    --pui-button-bg: oklch(0.5 0.18 145);
  "
>
  Custom
</Button>
```

fallback 链遵循 `var(--pui-button-bg, var(--pui-color-primary))` 形式 ——
组件级 token 缺失时回退到全局 token。每个组件的可用 token 列表见
[文档站](https://persona-ui.ricecakecat.com)对应页面。

---

## 树摇(Tree-shaking)

本包在 `package.json` 中声明 `sideEffects: ["**/*.css"]`,意味着除 CSS 文件外
的所有 JS / Svelte 输出都可被安全摇掉。建议:

```ts
// 推荐:从子路径导入,避免触发 index.ts 的全量副作用
import Button from "@persona-ui/lib/components/button/Button.svelte";
```

```ts
// 也可以从根入口导入(配合现代打包器也能 tree-shake)
import { Button } from "@persona-ui/lib";
```

`exports` 字段同时暴露了 `components/*` 子路径与 `styles.css` / `core.css` /
`tokens-manifest` 三个独立入口,便于精细化控制。

---

## TypeScript

`tsconfig.base.json` 启用 `strict` + `verbatimModuleSyntax` + `isolatedModules`。
所有类型导出都以 `export type` 显式标注,推荐消费方:

```ts
import { Button } from "@persona-ui/lib";
import type { ButtonProps, ButtonVariant, ButtonSize } from "@persona-ui/lib";
```

---

## 开发与测试

在 monorepo 根目录:

```bash
pnpm install
pnpm --filter @persona-ui/lib build         # svelte-package + 生成 tokens-manifest.json
pnpm --filter @persona-ui/lib check         # svelte-check
pnpm --filter @persona-ui/lib test:unit     # 140+ vitest 用例
pnpm --filter @persona-ui/lib test:unit:watch
pnpm --filter @persona-ui/lib test:unit Button   # 单文件
```

发布流程与 changesets 集成,见
[仓库根 README § Release](https://github.com/CoderL98/persona-ui/blob/main/README_CN.md#发布流程)。

---

## 协议

MIT © [CoderL98](https://github.com/CoderL98)

[English](https://github.com/CoderL98/persona-ui/blob/main/packages/lib/README.md)
