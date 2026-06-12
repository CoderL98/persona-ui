import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import CodeBlock from "$lib/components/code-block/CodeBlock.svelte";

describe("CodeBlock", () => {
  it("renders without crashing", () => {
    render(CodeBlock, { props: { code: "const x = 1;" } });
    expect(document.querySelector(".pui-code-block")).toBeTruthy();
  });

  it("renders the code", () => {
    render(CodeBlock, { props: { code: "const x = 1;" } });
    expect(document.body.textContent).toContain("const x = 1;");
  });

  it("renders filename when provided", () => {
    render(CodeBlock, { props: { code: "x", filename: "App.svelte" } });
    expect(document.body.textContent).toContain("App.svelte");
  });

  it("hides language when filename is set", () => {
    render(CodeBlock, { props: { code: "x", filename: "App.svelte", language: "svelte" } });
    expect(document.body.textContent).not.toContain("SVELTE");
  });

  it("shows language label when no filename", () => {
    render(CodeBlock, { props: { code: "x", language: "ts" } });
    expect(document.body.textContent).toContain("ts");
  });

  it("renders copy button by default", () => {
    render(CodeBlock, { props: { code: "x" } });
    expect(document.querySelector("button[aria-label='Copy code']")).toBeTruthy();
  });

  it("hides copy button when showCopy=false", () => {
    render(CodeBlock, { props: { code: "x", showCopy: false } });
    expect(document.querySelector("button[aria-label='Copy code']")).toBeFalsy();
  });

  it("clicking copy writes to clipboard and shows check", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
      configurable: true,
    });
    render(CodeBlock, { props: { code: "x = 1" } });
    const copyBtn = document.querySelector("button[aria-label='Copy code']") as HTMLButtonElement;
    await fireEvent.click(copyBtn);
    expect(writeText).toHaveBeenCalledWith("x = 1");
  });

  it("calls onCopy callback", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
      configurable: true,
    });
    const onCopy = vi.fn();
    render(CodeBlock, { props: { code: "x", onCopy } });
    const copyBtn = document.querySelector("button[aria-label='Copy code']") as HTMLButtonElement;
    await fireEvent.click(copyBtn);
    expect(onCopy).toHaveBeenCalled();
  });

  it("renders line numbers when showLineNumbers=true", () => {
    const code = "a\nb\nc";
    render(CodeBlock, { props: { code, showLineNumbers: true } });
    expect(document.body.textContent).toContain("1");
    expect(document.body.textContent).toContain("2");
    expect(document.body.textContent).toContain("3");
  });

  it("applies maxHeight style", () => {
    render(CodeBlock, { props: { code: "x", maxHeight: 200 } });
    const inner = document.querySelector(".pui-code-block .overflow-auto") as HTMLElement;
    expect(inner.getAttribute("style")).toContain("200px");
  });

  it("highlights keywords and strings", () => {
    render(CodeBlock, { props: { code: 'const x = "hello";', language: "ts" } });
    const spans = document.querySelectorAll("code span");
    const styles = Array.from(spans).map((s) => s.getAttribute("style") || "");
    // Should have at least one keyword style and one string style
    const hasKeyword = styles.some((s) => s.includes("--pui-code-token-keyword"));
    const hasString = styles.some((s) => s.includes("--pui-code-token-string"));
    expect(hasKeyword).toBe(true);
    expect(hasString).toBe(true);
  });

  it("highlights comments", () => {
    render(CodeBlock, { props: { code: "// comment\nconst x = 1;", language: "ts" } });
    const spans = document.querySelectorAll("code span");
    const hasComment = Array.from(spans).some((s) => {
      const style = s.getAttribute("style") || "";
      return style.includes("--pui-code-token-comment") && style.includes("italic");
    });
    expect(hasComment).toBe(true);
  });
});
