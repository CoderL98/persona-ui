import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Chip from "$lib/components/chip/Chip.svelte";

describe("Chip", () => {
  it("renders with role button", () => {
    render(Chip);
    expect(document.querySelector('[role="button"]')).toBeTruthy();
  });

  it("applies variant", () => {
    render(Chip, { props: { variant: "outlined" } });
    expect(
      document.querySelector('[role="button"]')!.getAttribute("data-variant"),
    ).toBe("outlined");
  });

  it("applies selected state", () => {
    render(Chip, { props: { selected: true } });
    // data-selected is set as empty string for boolean true attributes
    expect(
      document.querySelector('[role="button"]')!.hasAttribute("data-selected"),
    ).toBe(true);
  });

  it("forwards class", () => {
    render(Chip, { props: { class: "custom" } });
    expect(document.querySelector('[role="button"]')!.className).toContain(
      "custom",
    );
  });
});
