import { z } from "zod";

/**
 * Registry index entry (registry.json 数组元素)
 */
export const RegistryIndexEntrySchema = z.object({
  name: z.string().min(1),
  type: z.literal("registry:theme"),
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.string().min(1), // e.g. "/r/theme-apple.json"
});

/**
 * Registry index (registry.json 顶层)
 */
export const RegistryIndexSchema = z.object({
  $schema: z.string().optional(),
  name: z.string().min(1),
  version: z.string().optional(),
  homepage: z.string().optional(),
  items: z.array(RegistryIndexEntrySchema).min(1),
});

export type RegistryIndex = z.infer<typeof RegistryIndexSchema>;
export type RegistryIndexEntry = z.infer<typeof RegistryIndexEntrySchema>;

/**
 * 公共 registry 索引 URL
 *
 * 部署状态：
 *   - persona-ui.dev 域名尚未部署（B.5 跳过）
 *   - 短期方案：用户跑 `pnpm dlx @persona-ui/cli list <path>` 显式传本地路径
 *   - 长期方案：等 persona-ui.dev 部署后，CLI 默认 URL 即可直连
 */
export const DEFAULT_REGISTRY_INDEX_URL =
  process.env.PUI_REGISTRY_INDEX_URL ?? "https://persona-ui.dev/r/registry.json";
