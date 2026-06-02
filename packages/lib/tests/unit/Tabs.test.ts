import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Tabs from "$lib/components/tabs/Tabs.svelte";
describe("Tabs", () => {
  it("renders tablist", () => {
    render(Tabs, { props: { items: [{ value: "a", label: "A" }] } });
    expect(document.querySelector('[role="tablist"]')).toBeTruthy();
  });
});
