import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Popover from "$lib/components/popover/Popover.svelte";
describe("Popover", () => {
  it("renders", () => {
    render(Popover);
    expect(document.querySelector(".pui-popover")).toBeTruthy();
  });
});
