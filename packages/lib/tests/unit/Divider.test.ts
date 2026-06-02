import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Divider from "$lib/components/divider/Divider.svelte";

describe("Divider", () => {
  it("renders with role separator", () => {
    render(Divider);
    const el = document.querySelector('[role="separator"]');
    expect(el).toBeTruthy();
  });

  it("applies data-orientation", () => {
    render(Divider, { props: { orientation: "vertical" } });
    expect(
      document
        .querySelector('[role="separator"]')!
        .getAttribute("aria-orientation"),
    ).toBe("vertical");
  });

  it("forwards class", () => {
    render(Divider, { props: { class: "my-divider" } });
    expect(document.querySelector('[role="separator"]')!.className).toContain(
      "my-divider",
    );
  });
});
