#!/usr/bin/env node
/**
 * @persona-ui/cli 入口
 *
 * 用法（仅在 monorepo 内）：
 *   pnpm --filter @persona-ui/cli start add <url-or-path>
 *   node apps/cli/src/index.ts add apps/docs/static/r/theme-apple.json
 *
 * 命令：
 *   add   从 registry item 拉文件到目标目录
 *   list  列出 registry 索引里所有主题
 *   info  显示某个主题的详细 manifest
 */
import { Command } from "commander";
import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";
import { infoCommand } from "./commands/info.js";

const program = new Command();

program
  .name("pui-cli")
  .description("Persona UI CLI — install themes from the central registry")
  .version("0.1.3");

program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(infoCommand);

program.parseAsync(process.argv).catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
