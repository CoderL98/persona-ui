import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Drawer from "$lib/components/drawer/Drawer.svelte";
describe("Drawer", () => {
  it("renders when open", () => {
    render(Drawer, { props: { defaultOpen: true } });
    expect(document.querySelector('[role="dialog"]')).toBeTruthy();
  });
});
