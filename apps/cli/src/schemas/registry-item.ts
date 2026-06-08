import { z } from "zod";
import { URLS } from "../config.js";

/**
 * Registry item file descriptor
 * 约定 path 是 monorepo 相对路径（CLI 内部用 raw.githubusercontent.com 或本地拼接）
 */
export const RegistryFileSchema = z.object({
  path: z.string().min(1),
  type: z.enum(["registry:style", "registry:item", "registry:doc"]),
});

/**
 * 单个 registry item manifest（一个主题 = 一个 item）
 */
export const RegistryItemSchema = z.object({
  $schema: z.literal(URLS.SCHEMA_ITEM),
  name: z
    .string()
    .regex(/^theme-[a-z0-9-]+$/, "name must match /^theme-[a-z0-9-]+$/"),
  type: z.literal("registry:theme"),
  title: z.string().min(1),
  description: z.string().min(1),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(RegistryFileSchema).min(1),
});

export type RegistryItem = z.infer<typeof RegistryItemSchema>;
export type RegistryFile = z.infer<typeof RegistryFileSchema>;
