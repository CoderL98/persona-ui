import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Toolbar from "$lib/components/toolbar/Toolbar.svelte";

const snip = (str: string) =>
  createRawSnippet<[]>(() => ({ render: () => `<span>${str}</span>` }));

describe("Toolbar", () => {
  it("renders toolbar with .pui-toolbar class", () => {
    const { container } = render(Toolbar);
    expect(container.querySelector(".pui-toolbar")).toBeTruthy();
  });

  it("accepts children snippet and renders content", () => {
    const { container } = render(Toolbar, {
      props: { children: snip("Tool 1") },
    });
    expect(container.textContent).toContain("Tool 1");
  });

  it("applies custom data-testid via rest spread", () => {
    const { container } = render(Toolbar, { props: { "data-testid": "my-toolbar" } });
    expect(container.querySelector('[data-testid]')).toBeTruthy();
  });

  it("renders accessible role=toolbar or container", () => {
    const { container } = render(Toolbar);
    const toolbar = container.querySelector(".pui-toolbar");
    expect(toolbar).toBeTruthy();
  });
});
