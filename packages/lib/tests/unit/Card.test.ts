import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Card from "$lib/components/card/Card.svelte";

describe("Card", () => {
  it("renders a card element", () => {
    render(Card);
    expect(document.querySelector(".pui-card")).toBeTruthy();
  });

  it("applies variant data attribute", () => {
    render(Card, { props: { variant: "outlined" } });
    expect(
      document.querySelector(".pui-card")!.getAttribute("data-variant"),
    ).toBe("outlined");
  });

  it("forwards class prop", () => {
    render(Card, { props: { class: "extra-class" } });
    expect(document.querySelector(".pui-card")!.className).toContain(
      "extra-class",
    );
  });

  it("forwards style prop", () => {
    render(Card, { props: { style: "--pui-card-radius: 4px" } });
    expect(
      document.querySelector(".pui-card")!.getAttribute("style"),
    ).toContain("--pui-card-radius: 4px");
  });
});
