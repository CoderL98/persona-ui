import { describe, expect, it } from "vitest";
import { RegistryItemSchema } from "../schemas/registry-item.js";

const validItem = {
  $schema: "https://persona-ui.dev/schema/registry-item.json",
  name: "theme-apple",
  type: "registry:theme" as const,
  title: "Apple HIG Theme",
  description: "Apple Human Interface Guidelines",
  registryDependencies: ["@persona-ui/lib"],
  files: [
    { path: "packages/theme-apple/dist/apple.css", type: "registry:style" as const },
    { path: "packages/theme-apple/src/index.ts", type: "registry:item" as const },
  ],
};

describe("RegistryItemSchema", () => {
  it("accepts a valid item", () => {
    const result = RegistryItemSchema.safeParse(validItem);
    expect(result.success).toBe(true);
  });

  it("rejects name not matching /^theme-[a-z0-9-]+$/", () => {
    const bad = { ...validItem, name: "AppleTheme" };
    const result = RegistryItemSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("rejects wrong $schema", () => {
    const bad = { ...validItem, $schema: "https://shadcn-svelte.com/schema/x.json" };
    const result = RegistryItemSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("rejects wrong type", () => {
    const bad = { ...validItem, type: "registry:component" };
    const result = RegistryItemSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("rejects empty files array", () => {
    const bad = { ...validItem, files: [] };
    const result = RegistryItemSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("applies default registryDependencies=[] when omitted", () => {
    const item = { ...validItem };
    delete (item as { registryDependencies?: string[] }).registryDependencies;
    const result = RegistryItemSchema.parse(item);
    expect(result.registryDependencies).toEqual([]);
  });
});
