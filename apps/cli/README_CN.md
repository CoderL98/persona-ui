# @persona-ui/cli

Persona UI CLI —— 从中心 registry 安装主题(联邦式 shadcn-svelte 模型)。

- 源码:[`apps/cli/`](https://github.com/CoderL98/persona-ui/tree/main/apps/cli)
- 文档站:[persona-ui.ricecakecat.com](https://persona-ui.ricecakecat.com)
- English: [README.md](https://github.com/CoderL98/persona-ui/blob/main/apps/cli/README.md)

## 使用

```bash
# 给你的项目安装一个主题
pnpm dlx @persona-ui/cli add https://persona-ui.ricecakecat.com/r/theme-apple.json

# 或从本地路径(开发 / 调试)
pnpm dlx @persona-ui/cli add ./path/to/theme-apple.json
```

## 命令

### `add <source>`

拉取 registry item manifest 并将其文件复制到你的项目。

**Arguments:**

- `<source>` —— Registry item URL(`https://`)或本地路径(`./` 或绝对路径)

**Options:**

- `-o, --out <dir>` —— 目标目录(默认:`./src/lib/pui-themes`)
- `-y, --yes` —— 跳过确认提示

## 源码

[`apps/cli/`](https://github.com/CoderL98/persona-ui/tree/main/apps/cli)

## 协议

MIT

[English](https://github.com/CoderL98/persona-ui/blob/main/apps/cli/README.md)
