import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import NavigationRail from "$lib/components/navigation-rail/NavigationRail.svelte";
describe("NavigationRail", () => {
  it("renders", () => {
    render(NavigationRail, { props: { items: [{ value: "a", label: "A" }] } });
    expect(document.querySelector(".pui-navigation-rail")).toBeTruthy();
  });
});
