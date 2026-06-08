#!/usr/bin/env node
/**
 * @persona-ui/cli 入口
 *
 * 用法（仅在 monorepo 内）：
 *   pnpm --filter @persona-ui/cli start add <url-or-path> [--out <dir>]
 *   node apps/cli/src/index.ts add apps/docs/static/r/theme-apple.json
 *
 * 当前支持命令：
 *   add  从 registry item 拉文件到目标目录
 */
import { Command } from "commander";
import { addCommand } from "./commands/add.js";

const program = new Command();

program
  .name("pui-cli")
  .description("Persona UI CLI — install themes from the central registry")
  .version("0.1.0");

program.addCommand(addCommand);

program.parseAsync(process.argv).catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
