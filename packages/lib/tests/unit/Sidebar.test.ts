import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
describe("Sidebar", () => {
  it("renders", () => {
    render(Sidebar);
    expect(document.querySelector(".pui-sidebar")).toBeTruthy();
  });
});
