import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Checkbox from "$lib/components/checkbox/Checkbox.svelte";

describe("Checkbox", () => {
  it("renders a native checkbox input", () => {
    render(Checkbox);
    expect(document.querySelector('input[type="checkbox"]')).toBeTruthy();
  });
  it("renders label", () => {
    render(Checkbox, { props: { label: "Agree" } });
    expect(document.querySelector(".pui-checkbox")?.textContent).toContain(
      "Agree",
    );
  });
  it("forwards class", () => {
    render(Checkbox, { props: { class: "my-cb" } });
    expect(document.querySelector(".pui-checkbox")?.className).toContain(
      "my-cb",
    );
  });
});
