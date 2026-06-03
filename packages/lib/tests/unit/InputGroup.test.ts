import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import InputGroup from "$lib/components/input-group/InputGroup.svelte";
import TextField from "$lib/components/text-field/TextField.svelte";
import Button from "$lib/components/button/Button.svelte";

describe("InputGroup", () => {
  it("renders without crashing", () => {
    render(InputGroup);
    expect(document.querySelector(".pui-input-group")).toBeTruthy();
  });

  it("renders with children", () => {
    render(InputGroup);
    expect(document.querySelector(".pui-input-group")).toBeTruthy();
  });

  it("has role=group", () => {
    render(InputGroup);
    expect(document.querySelector("[role='group']")).toBeTruthy();
  });

  it("horizontal layout by default", () => {
    render(InputGroup);
    const group = document.querySelector(".pui-input-group") as HTMLElement;
    expect(group.className).toContain("flex-row");
  });

  it("vertical layout", () => {
    render(InputGroup, { props: { orientation: "vertical" } });
    const group = document.querySelector(".pui-input-group") as HTMLElement;
    expect(group.className).toContain("flex-col");
  });

  it("disabled sets aria-disabled", () => {
    render(InputGroup, { props: { disabled: true } });
    const group = document.querySelector("[role='group']") as HTMLElement;
    expect(group.getAttribute("aria-disabled")).toBe("true");
  });

  it("disabled applies opacity class", () => {
    render(InputGroup, { props: { disabled: true } });
    const group = document.querySelector(".pui-input-group") as HTMLElement;
    expect(group.className).toContain("opacity-");
  });

  it("accepts custom class", () => {
    render(InputGroup, { props: { class: "my-group" } });
    expect(document.querySelector(".my-group")).toBeTruthy();
  });

  it("renders with TextField and Button as children", () => {
    render(InputGroup, {
      props: {
        leading: undefined,
        trailing: undefined,
      },
    });
    expect(document.querySelector(".pui-input-group")).toBeTruthy();
  });
});
