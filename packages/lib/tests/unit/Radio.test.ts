import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Radio from "$lib/components/radio/Radio.svelte";

describe("Radio", () => {
  it("renders radio input", () => {
    render(Radio, { props: { value: "a" } });
    expect(document.querySelector('input[type="radio"]')).toBeTruthy();
  });
  it("forwards class", () => {
    render(Radio, { props: { value: "a", class: "my-radio" } });
    expect(document.querySelector(".pui-radio")?.className).toContain(
      "my-radio",
    );
  });
});
