import { Command } from "commander";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, join, relative } from "node:path";
import pc from "picocolors";
import { RegistryItemSchema } from "../schemas/registry-item.js";
import { fetchText, parseSource } from "../utils/fetch-source.js";

/**
 * `pui-cli add <source>` 命令
 *
 * 行为：
 *   1. fetch 顶层 manifest（source 指向的 JSON 文件）
 *   2. zod 校验符合 RegistryItemSchema
 *   3. 提示 registryDependencies（含 @persona-ui/lib 时提醒用户装包）
 *   4. 逐个拷贝 files[] 到 <out>/<item.name>/<basename(file.path)>
 *   5. 打印后续注册提示
 */
export const addCommand = new Command("add")
  .argument(
    "<source>",
    "Registry item URL or local path (e.g. apps/docs/static/r/theme-apple.json)",
  )
  .option("-o, --out <dir>", "Target directory", "./src/lib/pui-themes")
  .option("-y, --yes", "Skip overwrite confirmation", false)
  .action(async (source: string, opts: { out: string; yes: boolean }) => {
    const src = parseSource(source);
    const manifestRelPath = basename(source); // e.g. "theme-apple.json"

    // 1. fetch + zod 校验
    const manifestText = await fetchText(src, manifestRelPath);
    let rawJson: unknown;
    try {
      rawJson = JSON.parse(manifestText);
    } catch (err) {
      throw new Error(
        `${source} 不是合法 JSON：${(err as Error).message}`,
      );
    }
    const parseResult = RegistryItemSchema.safeParse(rawJson);
    if (!parseResult.success) {
      throw new Error(
        `${source} 不符合 RegistryItem schema：\n${parseResult.error.message}`,
      );
    }
    const item = parseResult.data;

    // 2. 提示依赖
    if (item.registryDependencies.includes("@persona-ui/lib")) {
      console.log(
        pc.yellow(
          `! 提醒：确保 @persona-ui/lib 已安装 (pnpm add @persona-ui/lib)`,
        ),
      );
    }

    // 3. 拷贝 files
    const targetDir = join(opts.out, item.name);
    await mkdir(targetDir, { recursive: true });

    for (const file of item.files) {
      // 安全：用 basename 强制写到目标目录下，防止 path 含 ../ 越界
      const safeName = basename(file.path);
      const content = await fetchText(src, file.path);
      await writeFile(join(targetDir, safeName), content, "utf-8");
      console.log(pc.green(`✓ wrote ${safeName}  (${file.type})`));
    }

    // 4. 提示注册
    const relTarget = relative(process.cwd(), targetDir) || targetDir;
    const camelName = item.name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
    console.log("");
    console.log(pc.blue("Next:"));
    console.log(
      `  1. 把 ${camelName} 加到你的 THEMES 数组：`,
    );
    console.log(
      pc.gray(
        `     import { themeDef as ${camelName} } from "./${relTarget}/index.ts";`,
      ),
    );
    console.log(
      `  2. 在 app.css 注入：`,
    );
    console.log(
      pc.gray(`     @import "@persona-ui/${item.name.replace(/^theme-/, "theme-")}/${item.name.replace(/^theme-/, "")}.css";`),
    );
  });
