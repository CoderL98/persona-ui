import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Badge from "$lib/components/badge/Badge.svelte";

describe("Badge", () => {
  it("renders a span", () => {
    render(Badge);
    expect(document.querySelector(".pui-badge")).toBeTruthy();
  });

  it("displays count", () => {
    render(Badge, { props: { count: 5 } });
    expect(document.querySelector(".pui-badge")!.textContent).toBe("5");
  });

  it("shows max+ for overflow", () => {
    render(Badge, { props: { count: 100, max: 99 } });
    expect(document.querySelector(".pui-badge")!.textContent).toBe("99+");
  });

  it("applies tone data attribute", () => {
    render(Badge, { props: { tone: "error" } });
    expect(
      document.querySelector(".pui-badge")!.getAttribute("data-tone"),
    ).toBe("error");
  });

  it("forwards class", () => {
    render(Badge, { props: { class: "custom" } });
    expect(document.querySelector(".pui-badge")!.className).toContain("custom");
  });
});
