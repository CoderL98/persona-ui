import { Command } from "commander";
import pc from "picocolors";
import { RegistryIndexSchema, DEFAULT_REGISTRY_INDEX_URL } from "../schemas/registry-index.js";
import { fetchText, parseSource } from "../utils/fetch-source.js";

/**
 * `pui-cli list` 命令
 *
 * 行为：从 registry.json 拉所有主题，打印表格
 *
 * 用法：
 *   pui-cli list                              # 默认从 persona-ui.dev/r/registry.json
 *   pui-cli list <path-or-url>               # 自定义 registry
 */
export const listCommand = new Command("list")
  .argument("[source]", "Registry index URL or local path", DEFAULT_REGISTRY_INDEX_URL)
  .option("-j, --json", "Output raw JSON instead of table", false)
  .action(async (source: string, opts: { json: boolean }) => {
    const src = parseSource(source);
    const indexRel = source.split("/").pop() ?? "registry.json"; // basename
    let text: string;
    try {
      text = await fetchText(src, indexRel);
    } catch (err) {
      throw new Error(
        `无法读取 registry 索引 ${source}：${(err as Error).message}\n` +
          `  提示：persona-ui.dev 域名尚未部署，请显式传本地路径：\n` +
          `    pui-cli list apps/docs/static/r/registry.json`,
      );
    }

    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch (err) {
      throw new Error(`${source} 不是合法 JSON：${(err as Error).message}`);
    }
    const parsed = RegistryIndexSchema.safeParse(raw);
    if (!parsed.success) {
      throw new Error(`${source} 不符合 RegistryIndex schema：\n${parsed.error.message}`);
    }
    const index = parsed.data;

    if (opts.json) {
      console.log(JSON.stringify(index, null, 2));
      return;
    }

    // 表格输出
    console.log(pc.bold(pc.blue(`\n  ${index.name}`)));
    if (index.version) console.log(pc.gray(`  version: ${index.version}`));
    if (index.homepage) console.log(pc.gray(`  homepage: ${index.homepage}`));
    console.log("");
    console.log(
      pc.gray("  ") +
        pc.bold("NAME".padEnd(24)) +
        pc.bold("TITLE".padEnd(36)) +
        pc.bold("DESCRIPTION"),
    );
    console.log(pc.gray("  " + "─".repeat(110)));
    for (const item of index.items) {
      const name = pc.cyan(item.name.padEnd(24));
      const title = pc.white(item.title.padEnd(36));
      const desc = pc.gray(
        item.description.length > 50
          ? item.description.slice(0, 47) + "..."
          : item.description,
      );
      console.log(`  ${name}${title}${desc}`);
    }
    console.log("");
    console.log(
      pc.gray(
        `  ${index.items.length} themes. Run \`pui-cli info <name>\` for details.`,
      ),
    );
    console.log("");
  });
