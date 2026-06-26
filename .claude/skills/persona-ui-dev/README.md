# persona-ui-dev Skill

persona-ui 组件库维护者专用 Claude Code skill，用于开发组件库源码、主题包、文档和测试。

## 适用场景

- 新增或修复 `packages/lib/src/lib/components/` 组件
- 同步 `apps/docs/docs-content/{en,zh-CN,zh-TW}/` 三语文档
- 开发或调整 `packages/theme-*` 主题包
- 修改 design tokens、主题注册表、i18n 文案
- 检查 Svelte 5、Tailwind v4、persona-ui API 规范

如果你是在第三方项目里使用 persona-ui，请使用 `/persona-ui`。

## 安装

### 项目级安装

把整个 `persona-ui-dev` 目录复制到目标项目的 `.claude/skills/` 目录下:

```bash
mkdir -p .claude/skills
cp -R /path/to/persona-ui/.claude/skills/persona-ui-dev .claude/skills/persona-ui-dev
```

目标结构应为:

```text
.claude/skills/persona-ui-dev/SKILL.md
.claude/skills/persona-ui-dev/README.md
```

然后在目标项目中打开或重启 Claude Code，运行:

```text
/persona-ui-dev
```

### 用户级全局安装

```bash
mkdir -p ~/.claude/skills
cp -R /path/to/persona-ui/.claude/skills/persona-ui-dev ~/.claude/skills/persona-ui-dev
```

之后可在任意 Claude Code 会话中运行 `/persona-ui-dev`。

> 如果 `skills` 目录是在 Claude Code 会话启动后新建的，请重启 Claude Code 一次，让它重新发现 skill。

## 使用示例

```text
/persona-ui-dev
```

然后告诉 Claude Code 你的维护任务，例如:

- "新增一个 Breadcrumb 组件"
- "修复 Button 的事件命名问题"
- "为 Toast 组件补三语文档"
- "开发一个新的主题包"

## 使用者 Skill

本仓库还提供第三方使用者版 skill:

```text
/persona-ui
```

用于在业务项目中安装、配置、使用 persona-ui 和排查接入问题。
