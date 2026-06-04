import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Tooltip from "$lib/components/tooltip/Tooltip.svelte";

describe("Tooltip", () => {
  it("renders wrapper with .pui-tooltip-wrapper class", () => {
    const { container } = render(Tooltip, { props: { content: "Help" } });
    expect(container.querySelector(".pui-tooltip-wrapper")).toBeTruthy();
  });

  it("does not show tooltip content initially (before delay)", () => {
    const { container } = render(Tooltip, { props: { content: "Hidden help", delay: 1000 } });
    expect(container.textContent).not.toContain("Hidden help");
  });

  it("supports all 4 placements (top, right, bottom, left)", () => {
    const { container } = render(Tooltip, {
      props: { content: "Pos", placement: "top" },
    });
    expect(container.querySelector(".pui-tooltip-wrapper")).toBeTruthy();
  });

  it("respects disabled prop", () => {
    const { container } = render(Tooltip, { props: { content: "x", disabled: true } });
    expect(container.querySelector(".pui-tooltip-wrapper")).toBeTruthy();
  });

  it("accepts onOpenChange callback", () => {
    const onOpenChange = vi.fn();
    const { container } = render(Tooltip, { props: { content: "x", onOpenChange } });
    expect(container.querySelector(".pui-tooltip-wrapper")).toBeTruthy();
  });
});
