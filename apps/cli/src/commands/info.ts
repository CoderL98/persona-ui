import { Command } from "commander";
import pc from "picocolors";
import { RegistryItemSchema } from "../schemas/registry-item.js";
import { RegistryIndexSchema, DEFAULT_REGISTRY_INDEX_URL } from "../schemas/registry-index.js";
import { fetchText, parseSource } from "../utils/fetch-source.js";

/**
 * `pui-cli info <name>` 命令
 *
 * 行为：
 *   1. 拉 registry index
 *   2. 找 name 匹配的 item
 *   3. 拉 item 详细 manifest
 *   4. 展示：name / type / title / description / dependencies / files
 *
 * 用法：
 *   pui-cli info theme-apple
 *   pui-cli info theme-apple --registry <url>
 */
export const infoCommand = new Command("info")
  .argument("<name>", "Theme name (e.g. theme-apple)")
  .option("-r, --registry <url>", "Registry index URL", DEFAULT_REGISTRY_INDEX_URL)
  .action(async (name: string, opts: { registry: string }) => {
    // 1. 拉 index
    const indexSrc = parseSource(opts.registry);
    const indexRel = opts.registry.split("/").pop() ?? "registry.json";
    const indexText = await fetchText(indexSrc, indexRel);
    const indexRaw = JSON.parse(indexText);
    const indexParse = RegistryIndexSchema.safeParse(indexRaw);
    if (!indexParse.success) {
      throw new Error(`${opts.registry} 不符合 RegistryIndex schema：\n${indexParse.error.message}`);
    }
    const index = indexParse.data;

    // 2. 找 item
    const entry = index.items.find((i) => i.name === name);
    if (!entry) {
      const available = index.items.map((i) => i.name).join(", ");
      throw new Error(
        `registry 中没有 "${name}"，可用：${available}`,
      );
    }

    // 3. 拉 item manifest
    // entry.url 形如 "/r/theme-apple.json" — 在 web 部署后是 persona-ui.dev/r/theme-apple.json
    // 相对 baseDir (registry.json 所在目录 apps/docs/static/r/)，"r/theme-apple.json" 实际在父级 apps/docs/static/
    // 统一处理：local 模式 entry.url 去前导 / 后用 ../ 跳出 baseDir
    //          remote 模式用 URL 拼接
    let itemText: string;
    let displayItemUrl: string;  // 给 install 行用
    if (indexSrc.kind === "remote") {
      displayItemUrl = entry.url.startsWith("http")
        ? entry.url
        : new URL(entry.url, opts.registry).toString();
      const itemSrc = parseSource(displayItemUrl);
      const itemRel = displayItemUrl.split("/").pop() ?? `${name}.json`;
      itemText = await fetchText(itemSrc, itemRel);
    } else {
      // local: entry.url "/r/theme-apple.json" → "../r/theme-apple.json" (相对 baseDir)
      const itemRel = `../${entry.url.replace(/^\//, "")}`;
      itemText = await fetchText(indexSrc, itemRel);
      // 简化：直接用 entry.url 作为显示（file:// 加绝对路径丑）
      displayItemUrl = entry.url;
    }
    const itemRaw = JSON.parse(itemText);
    const itemParse = RegistryItemSchema.safeParse(itemRaw);
    if (!itemParse.success) {
      throw new Error(`${displayItemUrl} 不符合 RegistryItem schema：\n${itemParse.error.message}`);
    }
    const item = itemParse.data;

    // 4. 展示
    console.log("");
    console.log(pc.bold(pc.blue(`  ${item.name}`)) + pc.gray(`  (${item.type})`));
    console.log("");
    console.log(`  ${pc.bold("title")}       ${item.title}`);
    console.log(`  ${pc.bold("description")} ${pc.gray(item.description)}`);
    console.log(`  ${pc.bold("schema")}      ${pc.gray(item.$schema)}`);
    console.log("");
    console.log(pc.bold("  registryDependencies:"));
    if (item.registryDependencies.length === 0) {
      console.log(pc.gray("    (none)"));
    } else {
      for (const dep of item.registryDependencies) {
        console.log(`    - ${pc.yellow(dep)}`);
      }
    }
    console.log("");
    console.log(pc.bold(`  files (${item.files.length}):`));
    for (const file of item.files) {
      const typeColor =
        file.type === "registry:style"
          ? pc.magenta
          : file.type === "registry:item"
          ? pc.cyan
          : pc.gray;
      console.log(`    ${typeColor(file.type.padEnd(16))} ${file.path}`);
    }
    console.log("");
    console.log(pc.bold("  install:"));
    console.log(
      pc.gray(
        `    pnpm dlx @persona-ui/cli add ${displayItemUrl}`,
      ),
    );
    console.log("");
  });
