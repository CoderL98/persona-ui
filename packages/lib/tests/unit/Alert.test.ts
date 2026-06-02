import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Alert from "$lib/components/alert/Alert.svelte";
describe("Alert", () => {
  it("renders", () => {
    render(Alert);
    expect(document.querySelector(".pui-alert")).toBeTruthy();
  });
  it("forwards class", () => {
    render(Alert, { props: { class: "my-alert" } });
    expect(document.querySelector(".pui-alert")?.className).toContain(
      "my-alert",
    );
  });
});
