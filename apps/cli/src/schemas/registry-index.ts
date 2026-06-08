import { z } from "zod";
import { URLS } from "../config.js";

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
 *   - 默认指向 URLS.REGISTRY_INDEX（从 PERSONA_UI_BASE_URL 派生）
 *   - 短期覆盖：用户跑 `pnpm dlx @persona-ui/cli list <path>` 显式传本地路径
 *   - 环境变量覆盖：PUI_REGISTRY_INDEX_URL
 */
export const DEFAULT_REGISTRY_INDEX_URL =
  process.env.PUI_REGISTRY_INDEX_URL ?? URLS.REGISTRY_INDEX;
