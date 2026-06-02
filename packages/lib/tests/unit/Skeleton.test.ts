import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Skeleton from "$lib/components/skeleton/Skeleton.svelte";
describe("Skeleton", () => {
  it("renders", () => {
    render(Skeleton);
    expect(document.querySelector(".pui-skeleton")).toBeTruthy();
  });
  it("forwards class", () => {
    render(Skeleton, { props: { class: "my-skel" } });
    expect(document.querySelector(".pui-skeleton")?.className).toContain(
      "my-skel",
    );
  });
});
