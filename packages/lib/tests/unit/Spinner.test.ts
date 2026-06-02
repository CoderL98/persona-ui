import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Spinner from "$lib/components/spinner/Spinner.svelte";
describe("Spinner", () => {
  it("renders", () => {
    render(Spinner);
    expect(document.querySelector(".pui-spinner")).toBeTruthy();
  });
  it("forwards class", () => {
    render(Spinner, { props: { class: "my-spin" } });
    expect(document.querySelector(".pui-spinner")?.className).toContain(
      "my-spin",
    );
  });
});
