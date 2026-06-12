# persona-ui Skill

persona-ui 组件库开发专用 skill，为 Svelte 5 双人格组件库提供全流程开发支持。

## 功能

- ✅ 新增组件 (完整流程: 源码 + 测试 + 三语文档)
- ✅ 修复组件 (自动检测规范问题)
- ✅ 文档管理 (同步维护 en/zh-CN/zh-TW)
- ✅ 主题开发 (创建新主题包)

## 使用

在 `/home/rcc/GitHub/persona-ui` 仓库内:

```bash
/persona-ui
```

然后告诉我你要做什么，例如:
- "新增一个 Breadcrumb 组件"
- "修复 Button 的事件命名问题"
- "为 Toast 组件添加文档"
- "创建 theme-minimalist 主题"

## 核心规范

### Svelte 5 语法
- 使用 `$props()` 替代 `export let`
- 使用 `$derived` 替代 `$:`
- 使用 `{@render children?.()}` 替代 `<slot>`
- 事件属性驼峰命名: `onclick` / `onClick`

### CSS 约定
- Tailwind 简写: `bg-(--token)` 而非 `bg-[var(--token)]`
- 禁止硬编码，全部用 design tokens
- Token 前缀: `--pui-color-*` / `--pui-space-*` / `--pui-text-*`

### 命名约定
- Props/事件: 驼峰 `onClick` `onOpenChange`
- 文件/目录: kebab-case `input-otp/`
- 类型: PascalCase `ButtonProps`

## 目录结构

```
persona-ui/
├── packages/lib/            # 组件库主体
│   ├── src/lib/components/  # 组件源码
│   ├── tests/unit/          # 单元测试
│   └── src/lib/styles/      # Design tokens
├── packages/theme-*/        # 主题包
├── apps/docs/               # 文档站
│   └── docs-content/        # 三语 markdown
```

## 参考

- 仓库: `/home/rcc/GitHub/persona-ui`
- 主 skill: `skill.md`
