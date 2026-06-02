import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Menu from "$lib/components/menu/Menu.svelte";
describe("Menu", () => {
  it("renders", () => {
    render(Menu);
    expect(document.querySelector(".pui-menu")).toBeTruthy();
  });
});
