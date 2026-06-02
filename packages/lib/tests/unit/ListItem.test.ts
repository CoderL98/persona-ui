import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import ListItem from "$lib/components/list/ListItem.svelte";
describe("ListItem", () => {
  it("renders", () => {
    render(ListItem);
    expect(document.querySelector(".pui-list-item")).toBeTruthy();
  });
});
