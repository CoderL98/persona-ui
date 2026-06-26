# persona-ui Skill

第三方项目使用 persona-ui 的 Claude Code skill，用于安装、配置主题、接入组件和排查常见使用问题。

## 适用场景

- 在 Svelte/SvelteKit 项目中安装 `@persona-ui/lib`
- 配置 Apple、Material、Minimalist 主题
- 导入 `@persona-ui/lib/core.css` 和主题 CSS
- 设置 `data-theme` / `data-mode`
- 使用 persona-ui 组件构建业务页面
- 排查样式不生效、主题不切换、dark mode 异常

如果你是在维护 persona-ui 组件库源码，请使用 `/persona-ui-dev`。

## 安装

### 项目级安装

把整个 `persona-ui` 目录复制到目标项目的 `.claude/skills/` 目录下:

```bash
mkdir -p .claude/skills
cp -R /path/to/persona-ui/.claude/skills/persona-ui .claude/skills/persona-ui
```

目标结构应为:

```text
.claude/skills/persona-ui/SKILL.md
.claude/skills/persona-ui/README.md
```

然后在目标项目中打开或重启 Claude Code，运行:

```text
/persona-ui
```

### 用户级全局安装

如果希望在所有项目里都能使用，复制到用户级 skills 目录:

```bash
mkdir -p ~/.claude/skills
cp -R /path/to/persona-ui/.claude/skills/persona-ui ~/.claude/skills/persona-ui
```

之后可在任意 Claude Code 会话中运行 `/persona-ui`。

> 如果 `skills` 目录是在 Claude Code 会话启动后新建的，请重启 Claude Code 一次，让它重新发现 skill。

## 使用示例

```text
/persona-ui
```

然后告诉 Claude Code 你的目标，例如:

- "帮我在这个 SvelteKit 项目里接入 persona-ui"
- "配置 Apple 和 Material 主题切换"
- "为什么 Button 没有样式"
- "用 persona-ui 做一个登录表单"

## 维护者 Skill

本仓库还提供维护者版 skill:

```text
/persona-ui-dev
```

用于开发 persona-ui 组件库本身，包括新增组件、修复组件、开发主题包、同步三语文档等。
