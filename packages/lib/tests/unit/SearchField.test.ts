import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import SearchField from "$lib/components/search-field/SearchField.svelte";

describe("SearchField", () => {
  it("renders search input", () => {
    render(SearchField);
    expect(document.querySelector('input[type="search"]')).toBeTruthy();
  });
  it("forwards class", () => {
    render(SearchField, { props: { class: "my-sf" } });
    expect(document.querySelector(".pui-search-field")?.className).toContain(
      "my-sf",
    );
  });
});
