import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Progress from "$lib/components/progress/Progress.svelte";
describe("Progress", () => {
  it("renders", () => {
    render(Progress);
    expect(document.querySelector(".pui-progress")).toBeTruthy();
  });
  it("forwards class", () => {
    render(Progress, { props: { class: "my-prog" } });
    expect(document.querySelector(".pui-progress")?.className).toContain(
      "my-prog",
    );
  });
});
