import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Sheet from "$lib/components/sheet/Sheet.svelte";
describe("Sheet", () => {
  it("renders when open", () => {
    render(Sheet, { props: { defaultOpen: true } });
    expect(document.querySelector('[role="dialog"]')).toBeTruthy();
  });
});
