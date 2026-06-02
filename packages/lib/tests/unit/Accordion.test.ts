import { describe, it, expect } from "vitest";
import { tick } from "svelte";
import { render } from "@testing-library/svelte";
import Accordion from "$lib/components/accordion/Accordion.svelte";
describe("Accordion", () => {
  it("renders with items", () => {
    render(Accordion, { props: { items: [{ value: "a", title: "A" }] } });
    expect(document.querySelector(".pui-accordion")).toBeTruthy();
  });
  it("toggles item on click", async () => {
    render(Accordion, { props: { items: [{ value: "a", title: "A" }] } });
    const btn = document.querySelector("button")!;
    btn.click();
    await tick();
    expect(btn.getAttribute("aria-expanded")).toBe("true");
    btn.click();
    await tick();
    expect(btn.getAttribute("aria-expanded")).toBe("false");
  });
  it("shows content region when expanded", async () => {
    render(Accordion, { props: { items: [{ value: "a", title: "A" }] } });
    document.querySelector("button")!.click();
    await tick();
    const region = document.querySelector('[role="region"]');
    expect(region).toBeTruthy();
  });
});
