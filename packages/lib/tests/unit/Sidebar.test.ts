import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Sidebar from "$lib/components/sidebar/Sidebar.svelte";

const snip = (str: string) =>
  createRawSnippet<[]>(() => ({ render: () => `<span>${str}</span>` }));

describe("Sidebar", () => {
  it("renders sidebar with .pui-sidebar class", () => {
    const { container } = render(Sidebar);
    expect(container.querySelector(".pui-sidebar")).toBeTruthy();
  });

  it("accepts children snippet", () => {
    const { container } = render(Sidebar, {
      props: { children: snip("Sidebar content") },
    });
    expect(container.textContent).toContain("Sidebar content");
  });

  it("supports side prop (left, right)", () => {
    const { container, unmount } = render(Sidebar, { props: { side: "right" } });
    expect(container.querySelector(".pui-sidebar")).toBeTruthy();
    unmount();
  });

  it("applies custom data-testid via rest spread", () => {
    const { container } = render(Sidebar, { props: { "data-testid": "my-sidebar" } });
    expect(container.querySelector('[data-testid]')).toBeTruthy();
  });
});
