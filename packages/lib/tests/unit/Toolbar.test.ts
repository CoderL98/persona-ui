import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Toolbar from "$lib/components/toolbar/Toolbar.svelte";
describe("Toolbar", () => {
  it("renders", () => {
    render(Toolbar);
    expect(document.querySelector(".pui-toolbar")).toBeTruthy();
  });
});
