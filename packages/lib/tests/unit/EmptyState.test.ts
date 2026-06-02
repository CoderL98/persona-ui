import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import EmptyState from "$lib/components/empty-state/EmptyState.svelte";
describe("EmptyState", () => {
  it("renders", () => {
    render(EmptyState);
    expect(document.querySelector(".pui-empty-state")).toBeTruthy();
  });
  it("forwards class", () => {
    render(EmptyState, { props: { class: "my-es" } });
    expect(document.querySelector(".pui-empty-state")?.className).toContain(
      "my-es",
    );
  });
});
