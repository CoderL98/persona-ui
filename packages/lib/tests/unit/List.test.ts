import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import List from "$lib/components/list/List.svelte";
describe("List", () => {
  it("renders", () => {
    render(List);
    expect(document.querySelector(".pui-list")).toBeTruthy();
  });
});
