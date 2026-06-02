import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Banner from "$lib/components/banner/Banner.svelte";
describe("Banner", () => {
  it("renders", () => {
    render(Banner);
    expect(document.querySelector(".pui-banner")).toBeTruthy();
  });
  it("forwards class", () => {
    render(Banner, { props: { class: "my-banner" } });
    expect(document.querySelector(".pui-banner")?.className).toContain(
      "my-banner",
    );
  });
});
