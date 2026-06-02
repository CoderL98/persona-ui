import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Tooltip from "$lib/components/tooltip/Tooltip.svelte";
describe("Tooltip", () => {
  it("renders wrapper", () => {
    render(Tooltip);
    expect(document.querySelector(".pui-tooltip-wrapper")).toBeTruthy();
  });
});
