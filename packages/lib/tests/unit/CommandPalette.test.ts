import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import CommandPalette from "$lib/components/command-palette/CommandPalette.svelte";
describe("CommandPalette", () => {
  it("renders when open", () => {
    render(CommandPalette, { props: { defaultOpen: true, items: [] } });
    expect(
      document.querySelector(".pui-command-palette") ||
        document.querySelector("input"),
    ).toBeTruthy();
  });
});
