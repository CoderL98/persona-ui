#!/usr/bin/env node
/**
 * inject-shebang.mjs
 *
 * 作用：tsc 编译后把 `#!/usr/bin/env node` shebang 注入到 dist/index.js
 *      并 chmod +x（npm 安装后 symlink 需要可执行）
 *
 * 为啥不用 tsc 直接编译：tsc 默认会**剥掉**首行非空语句前的注释
 * （shebang 被当 comment 处理），所以要 post-build 注入。
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chmodSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLI_ROOT = resolve(__dirname, "..");
const TARGET = resolve(CLI_ROOT, "dist/index.js");

if (!existsSync(TARGET)) {
  console.error(`✗ ${TARGET} 不存在，请先跑 tsc 编译`);
  process.exit(1);
}

let content = readFileSync(TARGET, "utf-8");
const SHEBANG = "#!/usr/bin/env node\n";

if (content.startsWith("#!")) {
  // 已经有 shebang（不会发生，但防御）
  console.log("✓ dist/index.js 已有 shebang，跳过");
} else {
  writeFileSync(TARGET, SHEBANG + content);
  console.log("✓ 注入 shebang 到 dist/index.js");
}

chmodSync(TARGET, 0o755);
console.log("✓ chmod +x dist/index.js");
