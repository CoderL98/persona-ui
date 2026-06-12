---
name: persona-ui
description: persona-ui 组件库开发助手 — 新增组件、修复问题、添加文档、主题开发
tags: [svelte, component-library, design-system]
---

# persona-ui 组件库开发助手

专为 persona-ui Svelte 5 双人格组件库设计的开发助手。支持新增组件、修复规范问题、生成三语文档、开发主题包。

## 何时使用此 Skill

当用户在 `/home/rcc/GitHub/persona-ui` 仓库内执行以下操作时:
- 新增组件 (add/create component, 新建组件)
- 修复组件问题 (fix component, 组件bug, 规范检查)
- 添加/更新文档 (add/update docs, 文档, documentation)
- 开发新主题 (new theme, 添加主题, theme package)
- 组件重构 (refactor component)
- Design tokens 调整

## 核心功能

### 1. 新增组件 (完整流程)
1. 创建 `packages/lib/src/lib/components/{name}/` 目录
2. 生成三个文件:
   - `{ComponentName}.svelte` — Svelte 5 组件实现
   - `{name}.types.ts` — TypeScript 类型定义
   - `index.ts` — 导出文件
3. 在 `packages/lib/src/lib/index.ts` 添加公开导出
4. 创建单元测试 `packages/lib/tests/unit/{ComponentName}.test.ts`
5. 生成三语文档 `apps/docs/docs-content/{en,zh-CN,zh-TW}/components/{name}.md`

### 2. 修复组件 (规范检查)
自动检测并修复:
- ❌ `onopenchange` → ✅ `onOpenChange` (驼峰命名)
- ❌ `bg-[var(--token)]` → ✅ `bg-(--token)` (CSS 简写)
- ❌ `on:click` → ✅ `onclick` (Svelte 5 语法)
- ❌ 硬编码颜色 → ✅ design tokens

### 3. 文档管理
- 同步维护 `en` / `zh-CN` / `zh-TW` 三语文档
- frontmatter 必填: `title` + `group: 'components'`
- 标准结构: 导入 → API表格 → 变体说明 → 示例

### 4. 主题开发
创建新主题包完整流程:
1. 生成 `packages/theme-{name}/` 目录结构
2. 实现 `src/index.ts` (导出 `themeDef: ThemeDef`)
3. 编写 `src/{name}.css` (覆盖 core tokens)
4. 配置 `package.json` + `tsconfig.json`
5. 在 `apps/docs/src/lib/themes.ts` 注册
6. 添加 i18n 翻译 (`toggleTheme_{id}`)

## 强制规范 (CRITICAL)

### Svelte 5 语法
```svelte
<script lang="ts">
  import type { ComponentProps } from './types.js';
  
  let {
    variant = 'default',
    disabled = false,
    children,
    onClick,
    class: className,
    ...rest
  }: ComponentProps = $props();
  
  const isActive = $derived(!disabled);
</script>

<button
  {...rest}
  class={cn('base', className)}
  onclick={(e) => {
    if (disabled) return;
    triggerHaptic('light');
    onClick?.(e);
  }}
>
  {@render children?.()}
</button>
```

### CSS Tailwind 简写
```css
✅ bg-(--pui-button-bg,var(--pui-color-primary))
❌ bg-[var(--pui-button-bg,var(--pui-color-primary))]

✅ py-(--pui-space-2)
❌ py-[var(--pui-space-2)]
```

### 命名约定
- Props/事件: 驼峰 `onClick` `onOpenChange` `onValueChange`
- 文件/目录: kebab-case `input-otp/` `date-picker/`
- 类型: PascalCase `ButtonProps` `CardVariant`

### 必需导入
```ts
import { cn } from '../../internal/class.js';
import { dataAttrs } from '../../internal/attrs.js';
import { triggerHaptic } from '../../internal/haptics.js';
```

### Design Tokens (禁止硬编码)
```svelte
<!-- ✅ 正确 -->
<div class="bg-(--pui-color-primary) text-(--pui-text-md)">

<!-- ❌ 错误 -->
<div class="bg-blue-500 text-base">
```

## 工作流程

### 新增组件标准流程
```bash
# 1. 询问组件名称 (例: Breadcrumb)
# 2. 创建目录和文件
mkdir -p packages/lib/src/lib/components/breadcrumb
# 3. 生成三个核心文件
#    - Breadcrumb.svelte (组件实现)
#    - breadcrumb.types.ts (类型定义)
#    - index.ts (导出)
# 4. 导出到 packages/lib/src/lib/index.ts
# 5. 创建测试 packages/lib/tests/unit/Breadcrumb.test.ts
# 6. 生成三语文档
#    - apps/docs/docs-content/en/components/breadcrumb.md
#    - apps/docs/docs-content/zh-CN/components/breadcrumb.md
#    - apps/docs/docs-content/zh-TW/components/breadcrumb.md
# 7. 验证
pnpm check
pnpm test:unit Breadcrumb
```

### 修复组件标准流程
```bash
# 1. 读取组件源码
# 2. 运行规范检查器:
#    - Svelte 5 语法 (export let → $props)
#    - 事件命名 (on:click → onclick)
#    - CSS 变量 ([var()] → ())
#    - Design tokens (硬编码 → token)
# 3. 应用修复
# 4. 运行测试验证
pnpm test:unit {ComponentName}
# 5. 如有相关文档需同步更新
```

### 主题开发标准流程
```bash
# 1. 创建主题包目录
mkdir -p packages/theme-{name}/src
# 2. 生成 themeDef (src/index.ts)
# 3. 编写 CSS (src/{name}.css)
# 4. 配置 package.json + tsconfig.json
# 5. 注册到文档站 (apps/docs/src/lib/themes.ts)
# 6. 添加 i18n (apps/docs/src/lib/i18n/messages/)
# 7. 构建测试
pnpm --filter @persona-ui/theme-{name} build
pnpm dev  # 在文档站验证
```

## 关键路径

```
packages/lib/src/lib/
├── components/          # 组件源码
├── internal/            # 工具函数 (cn/dataAttrs/haptics)
├── styles/             # tokens.css + core.css
└── index.ts            # 公开导出

packages/lib/tests/unit/ # vitest 单元测试

apps/docs/docs-content/  # 三语文档
├── en/components/
├── zh-CN/components/
└── zh-TW/components/

apps/docs/src/lib/
├── themes.ts           # 主题聚合注册
└── i18n/messages/      # 三语翻译

packages/theme-*/       # 主题包
└── src/
    ├── index.ts        # themeDef
    └── *.css           # 主题 CSS
```

## 常用命令速查

```bash
pnpm dev                # 启动文档站
pnpm build:lib          # 构建组件库
pnpm check              # TypeScript 检查
pnpm test:unit          # 所有单元测试
pnpm test:unit Button   # 单个组件测试

# 单包操作
pnpm --filter @persona-ui/lib check
pnpm --filter @persona-ui/lib test:unit:watch
```

## 组件检查清单

提交前必查:
- [ ] Svelte 5 语法 (`$props` / `$derived` / `@render`)
- [ ] 驼峰事件命名 (`onClick`)
- [ ] CSS 简写 `bg-(--token)`
- [ ] 全部用 design tokens
- [ ] 导入 `cn` / `dataAttrs` / `triggerHaptic`
- [ ] 类型定义完整 (`*.types.ts`)
- [ ] 单元测试覆盖
- [ ] 三语文档齐全
- [ ] 在 `packages/lib/src/lib/index.ts` 导出
