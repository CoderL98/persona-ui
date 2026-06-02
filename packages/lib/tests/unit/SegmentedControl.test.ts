import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import SegmentedControl from "$lib/components/segmented-control/SegmentedControl.svelte";
describe("SegmentedControl", () => {
  it("renders", () => {
    render(SegmentedControl, {
      props: { items: [{ value: "a", label: "A" }] },
    });
    expect(document.querySelector(".pui-segmented-control")).toBeTruthy();
  });
});
