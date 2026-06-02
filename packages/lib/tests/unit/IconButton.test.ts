import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import IconButton from "$lib/components/icon-button/IconButton.svelte";

describe("IconButton", () => {
  it("renders a button with aria-label", () => {
    render(IconButton, { props: { label: "Search" } });
    const btn = document.querySelector("button")!;
    expect(btn).toBeTruthy();
    expect(btn.getAttribute("aria-label")).toBe("Search");
  });

  it("applies variant attribute", () => {
    render(IconButton, { props: { label: "X", variant: "outlined" } });
    expect(document.querySelector("button")!.getAttribute("data-variant")).toBe(
      "outlined",
    );
  });

  it("applies size attribute", () => {
    render(IconButton, { props: { label: "X", size: "lg" } });
    expect(document.querySelector("button")!.getAttribute("data-size")).toBe(
      "lg",
    );
  });

  it("applies disabled", () => {
    render(IconButton, { props: { label: "X", disabled: true } });
    expect(document.querySelector("button")!.hasAttribute("disabled")).toBe(
      true,
    );
  });

  it("applies loading", () => {
    render(IconButton, { props: { label: "X", loading: true } });
    expect(document.querySelector("button")!.getAttribute("aria-busy")).toBe(
      "true",
    );
  });

  it("forwards class", () => {
    render(IconButton, { props: { label: "X", class: "custom" } });
    expect(document.querySelector("button")!.className).toContain("custom");
  });

  it("forwards style", () => {
    render(IconButton, {
      props: { label: "X", style: "--pui-icon-button-size: 20px" },
    });
    expect(
      document.querySelector("button")!.getAttribute("style") || "",
    ).toContain("20px");
  });
});
