import { describe, expect, it } from "vitest";
import { RegistryIndexSchema, RegistryIndexEntrySchema } from "../schemas/registry-index.js";
import { URLS } from "../config.js";

const validIndex = {
  $schema: URLS.SCHEMA_REGISTRY,
  name: "persona-ui-themes",
  version: "0.1.0",
  homepage: URLS.REGISTRY_THEMES,
  items: [
    {
      name: "theme-apple",
      type: "registry:theme" as const,
      title: "Apple HIG Theme",
      description: "Apple Human Interface Guidelines",
      url: "/r/theme-apple.json",
    },
    {
      name: "theme-material",
      type: "registry:theme" as const,
      title: "Material Design 3 Theme",
      description: "Material You tokens",
      url: "/r/theme-material.json",
    },
  ],
};

describe("RegistryIndexEntrySchema", () => {
  it("accepts a valid entry", () => {
    const r = RegistryIndexEntrySchema.safeParse(validIndex.items[0]);
    expect(r.success).toBe(true);
  });
  it("rejects wrong type", () => {
    const r = RegistryIndexEntrySchema.safeParse({ ...validIndex.items[0], type: "registry:component" });
    expect(r.success).toBe(false);
  });
});

describe("RegistryIndexSchema", () => {
  it("accepts a valid index", () => {
    const r = RegistryIndexSchema.safeParse(validIndex);
    expect(r.success).toBe(true);
  });
  it("rejects empty items", () => {
    const r = RegistryIndexSchema.safeParse({ ...validIndex, items: [] });
    expect(r.success).toBe(false);
  });
  it("rejects invalid item in items", () => {
    const r = RegistryIndexSchema.safeParse({
      ...validIndex,
      items: [{ ...validIndex.items[0], type: "wrong" }],
    });
    expect(r.success).toBe(false);
  });
});
