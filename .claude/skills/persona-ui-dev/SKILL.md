---
name: persona-ui-dev
description: persona-ui 组件库维护者开发助手 — 新增组件、修复问题、添加文档、主题开发
tags: [svelte, component-library, design-system]
---

# persona-ui-dev 组件库开发助手

这是 persona-ui 仓库维护者使用的 Claude Code skill。它面向 Svelte 5 双人格组件库开发，帮助完成组件、文档、主题和 design token 相关任务。

如果用户是在第三方项目里安装、配置或使用 persona-ui，请改用 `/persona-ui`。

## 使用边界

当用户在 persona-ui 仓库或复制了本 skill 的派生组件库中提出以下需求时使用：

- 新增、修复、重构 `packages/lib/src/lib/components/` 下的组件
- 补充或同步 `apps/docs/docs-content/{en,zh-CN,zh-TW}/` 文档
- 新增或调整 `packages/theme-*` 主题包
- 调整 design tokens、CSS 主题契约、主题注册表
- 检查组件是否符合 Svelte 5、Tailwind v4、persona-ui API 规范

如果当前仓库不是 persona-ui，先确认是否存在 `packages/lib/src/lib/components/`、`apps/docs/docs-content/`、`packages/theme-*` 这些结构；不存在时不要套用本 skill 的路径。

## 执行原则

- 先读现有实现，再动手：新增组件前至少查看 2 个相近组件的 `.svelte`、`.types.ts`、`index.ts`、单元测试和文档。
- 保持主题无关：组件层不得写死 Apple、Material、Minimalist 的视觉逻辑；视觉差异必须走 CSS tokens 或主题包。
- 保持 API 稳定：新增 prop 前先确认是否能复用已有命名；事件回调使用 `onClick`、`onOpenChange`、`onValueChange` 这类驼峰命名。
- 最小改动：只改与任务相关的组件、测试、文档、主题注册和 i18n，不做顺手大重构。
- 面向发布：用户可见的组件、主题、文档行为变化通常需要 changeset；如果用户明确只是本地实验，可说明未添加 changeset。

## 必守规范

### Svelte 5

必须使用 Svelte 5 runes 和现代事件写法：

```svelte
<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import { triggerHaptic } from '../../internal/haptics.js';
  import type { ComponentProps } from './component.types.js';

  let {
    variant = 'default',
    disabled = false,
    children,
    class: className,
    onClick,
    ...rest
  }: ComponentProps = $props();

  const attrs = $derived(dataAttrs({ variant }));
</script>

<button
  {...rest}
  {...attrs}
  class={cn('pui-component', className)}
  {disabled}
  onclick={(event) => {
    if (disabled) return;
    triggerHaptic('light');
    onClick?.(event);
  }}
>
  {@render children?.()}
</button>
```

不要使用：

- `export let`
- `$:`
- `on:click`
- `<slot>`
- 全小写回调名，例如 `onopenchange`

### TypeScript

- 类型文件命名为 `{component}.types.ts`，导出 `ComponentProps`、必要的 variant/size/tone 联合类型。
- 类型导入必须使用 `import type`。
- Svelte children 使用 `import type { Snippet } from 'svelte';`。
- 原生属性透传时保留 `class`、`style`、`id`、`aria-*`、`data-testid` 等常用入口，并谨慎使用 `[key: string]: unknown`。

### Tailwind v4 与 CSS tokens

使用 Tailwind v4 的 CSS 变量简写，不使用旧的 arbitrary value 包裹 `var()` 写法：

```svelte
<!-- 正确 -->
<div class="bg-(--pui-button-bg,var(--pui-color-primary)) py-(--pui-space-2)">

<!-- 错误 -->
<div class="bg-[var(--pui-button-bg,var(--pui-color-primary))] py-[var(--pui-space-2)]">
```

组件视觉必须优先使用：

- 全局 token：`--pui-color-*`、`--pui-text-*`、`--pui-space-*`、`--pui-radius-*`、`--pui-elevation-*`、`--pui-duration-*`
- 组件 token：`--pui-{component}-*`
- 命中区 token：`--pui-hit-target-min`

禁止在组件层硬编码品牌色、主题色、字号体系和主题分支。确有必要的纯结构值，例如 `border`、`inline-flex`、`w-full`、`h-4`，应与现有组件风格一致。

### 可访问性与交互

- 交互组件必须处理 disabled/loading/readonly 状态，避免禁用状态仍触发回调。
- 需要键盘操作的组件必须支持合理的 Arrow、Home/End、Enter/Space、Escape 行为。
- 弹层类组件要检查 focus、aria、scroll lock、click outside、Escape 关闭。
- 可见 focus 使用 token 化样式，不移除焦点轮廓。
- 图标按钮和无文本控件必须支持 `aria-label`。

## 新增组件流程

1. 确认组件名、用途、受控/非受控模式、核心 props、可访问性需求。
2. 搜索相近组件，复用既有模式：
   - 基础控件参考 `button`、`icon-button`、`text-field`
   - 选择类参考 `tabs`、`radio`、`combobox`
   - 弹层类参考 `popover`、`tooltip`、`sheet`、`drawer`
   - 复杂组件参考 `data-table`、`calendar`、`command-palette`
3. 创建组件目录：`packages/lib/src/lib/components/{kebab-name}/`。
4. 创建三个组件文件：
   - `{ComponentName}.svelte`
   - `{kebab-name}.types.ts`
   - `index.ts`
5. 在 `packages/lib/src/lib/index.ts` 添加组件和类型导出，保持现有导出风格。
6. 添加单元测试：`packages/lib/tests/unit/{ComponentName}.test.ts`。
7. 添加三语文档：
   - `apps/docs/docs-content/en/components/{kebab-name}.md`
   - `apps/docs/docs-content/zh-CN/components/{kebab-name}.md`
   - `apps/docs/docs-content/zh-TW/components/{kebab-name}.md`
8. 如果是用户可见新增功能，添加 changeset。
9. 运行验证命令。

### 新组件测试最低要求

- 默认渲染成功
- 关键 props 写入 data attributes 或 DOM 状态
- `class`、`style`、`aria-label`、`data-testid` 透传
- disabled/loading 时不触发交互回调
- 受控状态和 `onValueChange` / `onOpenChange` 回调
- 键盘行为和 aria 属性，适用于复合组件

## 修复组件流程

1. 读目标组件、类型、测试、文档，不只改报错行。
2. 判断问题属于 API、交互、样式 token、主题契约、文档还是测试。
3. 修复时保持兼容；破坏性 API 改动必须明确说明，并通常需要 changeset。
4. 同步更新测试和三语文档；如果只修内部 bug，可只补测试。
5. 运行与影响范围匹配的验证命令。

常见自动检查点：

- `on:click`、`export let`、`$:`、`<slot>` 是否残留
- `onopenchange`、`onvaluechange` 这类非驼峰命名是否存在
- `bg-[var(...)]`、`py-[var(...)]` 旧语法是否存在
- 是否新增硬编码颜色、字体、圆角、阴影
- 是否只在某个主题下可用，破坏主题无关性

## 文档流程

文档源位于 `apps/docs/docs-content/{locale}/`。组件文档必须三语同步，frontmatter 至少包含：

```md
---
title: Button
group: components
---
```

文档内容建议包含：

- Import / 导入
- 基础用法
- API 表格，类型和默认值必须和 `.types.ts` 一致
- 变体、尺寸、状态说明
- 可访问性说明，尤其是键盘和 aria 行为
- 主题差异只描述表现，不把主题逻辑写进组件 API

修改英文文档时同步更新 `zh-CN` 和 `zh-TW`；若暂时无法完整翻译，至少保持结构一致并标明需要补译。

## 主题开发流程

主题包位于 `packages/theme-{id}/`，参考 `theme-apple`、`theme-material`、`theme-minimalist` 的现有结构。

新增主题时检查并更新：

1. `packages/theme-{id}/src/index.ts`：导出冻结的 `themeDef: ThemeDef`。
2. `packages/theme-{id}/src/{id}.css`：用 `[data-theme='{id}']` 和 `[data-mode='light|dark']` 覆盖 tokens。
3. `packages/theme-{id}/package.json`：确认 `exports`、`files`、`sideEffects`、`build`、`check`。
4. 根目录 `package.json`：确认 `build:themes` 是否需要包含新主题。
5. `apps/docs/src/lib/themes.ts`：追加 import、`THEME_IDS`、switch case。
6. `apps/docs/src/lib/i18n/messages/{en,zh-CN,zh-TW}.ts`：追加 `toggleTheme_{id}` 和 `previewLabel_{id}`。
7. 文档和 README：按现有主题包风格补充。

主题 CSS 必须先依赖 `@persona-ui/lib/styles.css` 或 `core.css` 提供的基础 tokens，不要把组件结构样式复制到主题包。

## 验证命令

按任务影响范围选择最小但足够的验证：

```bash
# 组件改动
pnpm --filter @persona-ui/lib check
pnpm --filter @persona-ui/lib test:unit {ComponentName}

# lib 范围较大
pnpm test:unit
pnpm check

# 主题改动
pnpm --filter @persona-ui/theme-{id} check
pnpm --filter @persona-ui/theme-{id} build
pnpm --filter @persona-ui/docs build

# 文档站或主题注册改动
pnpm --filter @persona-ui/docs build

# 全量信心检查
pnpm test
```

如果验证命令因环境、依赖或既有问题失败，保留失败输出的关键行并说明失败原因，不要说“已通过”。

## 关键路径

```text
packages/lib/src/lib/components/      # 组件源码
packages/lib/src/lib/internal/        # cn / dataAttrs / haptics / click-outside / scroll-lock
packages/lib/src/lib/styles/          # core.css / tokens.css
packages/lib/src/lib/themes/          # ThemeDef 契约
packages/lib/tests/unit/              # vitest 单元测试
packages/theme-*/src/                 # 主题定义与主题 CSS
apps/docs/docs-content/{locale}/      # 三语文档
apps/docs/src/lib/themes.ts           # docs 站主题聚合
apps/docs/src/lib/i18n/messages/      # 三语 UI 文案
```

## 完成前检查清单

- [ ] 改动符合 Svelte 5 语法
- [ ] 事件回调和变量名使用驼峰命名
- [ ] CSS 使用 Tailwind v4 变量简写
- [ ] 视觉值通过 design tokens 表达
- [ ] 类型导入使用 `import type`
- [ ] 组件导出、类型导出、测试、文档已同步
- [ ] 三语文档和 i18n 键保持一致
- [ ] 主题注册、构建脚本、package exports 已同步
- [ ] 已运行匹配范围的验证命令，或明确说明未运行原因
