import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import TreeView from "$lib/components/tree-view/TreeView.svelte";
describe("TreeView", () => {
  it("renders", () => {
    render(TreeView, { props: { nodes: [{ id: "1", label: "Node" }] } });
    expect(document.querySelector(".pui-tree-view")).toBeTruthy();
  });
});
