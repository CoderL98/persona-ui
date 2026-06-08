import { describe, expect, it } from "vitest";
import { parseSource } from "../utils/fetch-source.js";
import { URLS } from "../config.js";

describe("parseSource", () => {
  it("treats https:// URL as remote and strips filename", () => {
    const src = parseSource(`${URLS.REGISTRY_THEMES}/theme-apple.json`);
    expect(src).toEqual({
      kind: "remote",
      baseUrl: URLS.REGISTRY_THEMES,
    });
  });

  it("treats http:// URL as remote (dev only)", () => {
    const src = parseSource("http://localhost:5173/r/theme-apple.json");
    expect(src).toEqual({
      kind: "remote",
      baseUrl: "http://localhost:5173/r",
    });
  });

  it("treats relative path as local with resolved baseDir", () => {
    const src = parseSource("apps/docs/static/r/theme-apple.json");
    expect(src.kind).toBe("local");
    if (src.kind === "local") {
      expect(src.baseDir.endsWith("apps/docs/static/r")).toBe(true);
    }
  });

  it("rejects path traversal: baseDir is always absolute, never contains ..", () => {
    const src = parseSource("../../etc/passwd");
    expect(src.kind).toBe("local");
    if (src.kind === "local") {
      // path.resolve 会规范化 ../ ，所以 baseDir 不会含 '..'
      expect(src.baseDir.includes("..")).toBe(false);
    }
  });
});
