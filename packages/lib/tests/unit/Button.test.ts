import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Button from "$lib/components/button/Button.svelte";

describe("Button", () => {
  it("renders a button element", () => {
    render(Button);
    const btn = document.querySelector("button");
    expect(btn).toBeTruthy();
  });

  it("has default variant and size attributes", () => {
    render(Button);
    const btn = document.querySelector("button")!;
    expect(btn.getAttribute("data-variant")).toBe("filled");
    expect(btn.getAttribute("data-size")).toBe("md");
  });

  it("applies variant prop (filled)", () => {
    render(Button, { props: { variant: "filled" } });
    expect(document.querySelector("button")!.getAttribute("data-variant")).toBe(
      "filled",
    );
  });

  it("applies variant prop (elevated)", () => {
    render(Button, { props: { variant: "elevated" } });
    expect(document.querySelector("button")!.getAttribute("data-variant")).toBe(
      "elevated",
    );
  });

  it("applies variant prop (tonal)", () => {
    render(Button, { props: { variant: "tonal" } });
    expect(document.querySelector("button")!.getAttribute("data-variant")).toBe(
      "tonal",
    );
  });

  it("applies variant prop (outlined)", () => {
    render(Button, { props: { variant: "outlined" } });
    expect(document.querySelector("button")!.getAttribute("data-variant")).toBe(
      "outlined",
    );
  });

  it("applies variant prop (text)", () => {
    render(Button, { props: { variant: "text" } });
    expect(document.querySelector("button")!.getAttribute("data-variant")).toBe(
      "text",
    );
  });

  it("applies size prop", () => {
    render(Button, { props: { size: "lg" } });
    expect(document.querySelector("button")!.getAttribute("data-size")).toBe(
      "lg",
    );
  });

  it("applies disabled prop", () => {
    render(Button, { props: { disabled: true } });
    expect(document.querySelector("button")!.hasAttribute("disabled")).toBe(
      true,
    );
  });

  it("applies loading prop (aria-busy)", () => {
    render(Button, { props: { loading: true } });
    expect(document.querySelector("button")!.getAttribute("aria-busy")).toBe(
      "true",
    );
  });

  it("forwards class prop", () => {
    render(Button, { props: { class: "my-custom-class" } });
    expect(document.querySelector("button")!.className).toContain(
      "my-custom-class",
    );
  });

  it("forwards style prop", () => {
    render(Button, { props: { style: "--pui-button-radius: 3px" } });
    expect(document.querySelector("button")!.getAttribute("style")).toContain(
      "--pui-button-radius: 3px",
    );
  });

  it("forwards additional attributes", () => {
    render(Button, {
      props: { "aria-label": "custom-label", "data-testid": "btn-1" },
    });
    const btn = document.querySelector("button")!;
    expect(btn.getAttribute("aria-label")).toBe("custom-label");
    expect(btn.getAttribute("data-testid")).toBe("btn-1");
  });
});
