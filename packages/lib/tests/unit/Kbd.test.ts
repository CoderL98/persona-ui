import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Kbd from "$lib/components/kbd/Kbd.svelte";

describe("Kbd", () => {
  it("renders a kbd element", () => {
    render(Kbd);
    expect(document.querySelector("kbd")).toBeTruthy();
  });

  it("forwards class", () => {
    render(Kbd, { props: { class: "custom" } });
    expect(document.querySelector("kbd")!.className).toContain("custom");
  });
});
