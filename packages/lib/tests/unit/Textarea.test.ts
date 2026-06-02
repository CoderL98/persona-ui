import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Textarea from "$lib/components/textarea/Textarea.svelte";

describe("Textarea", () => {
  it("renders a textarea", () => {
    render(Textarea);
    expect(document.querySelector("textarea")).toBeTruthy();
  });
  it("renders label", () => {
    render(Textarea, { props: { label: "Bio" } });
    expect(document.querySelector("label")?.textContent?.trim()).toBe("Bio");
  });
  it("forwards class", () => {
    render(Textarea, { props: { class: "my-ta" } });
    expect(document.querySelector(".pui-textarea")?.className).toContain(
      "my-ta",
    );
  });
});
