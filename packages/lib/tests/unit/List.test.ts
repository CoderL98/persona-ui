import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import List from "$lib/components/list/List.svelte";
import ListItem from "$lib/components/list/ListItem.svelte";
describe("List", () => {
  it("renders plain variant without wrapper", () => {
    const { container } = render(List, {
      props: { children: () => "item" },
    });
    expect(container.querySelector(".pui-list")).toBeTruthy();
  });
  it("renders grouped variant with rounded card and dividers", () => {
    const { container } = render(List, {
      props: { variant: "grouped", children: () => "item" },
    });
    const root = container.querySelector(".pui-list");
    expect(root?.className).toContain("rounded-");
    expect(root?.className).toContain("shadow-");
    expect(container.querySelector(".divide-y")).toBeTruthy();
  });
  it("renders inset variant with margins and rounded card", () => {
    // 修复前：'inset' 变体被静默忽略，无任何视觉差异
    const { container } = render(List, {
      props: { variant: "inset", children: () => "item" },
    });
    const root = container.querySelector(".pui-list");
    expect(root?.className).toContain("rounded-");
    expect(root?.className).toContain("mx-");
    expect(container.querySelector(".divide-y")).toBeTruthy();
  });
});