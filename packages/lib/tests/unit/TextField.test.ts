import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import TextField from "$lib/components/text-field/TextField.svelte";

describe("TextField", () => {
  it("renders an input", () => {
    render(TextField);
    const input = document.querySelector("input");
    expect(input).toBeTruthy();
  });

  it("renders label when provided", () => {
    render(TextField, { props: { label: "Username" } });
    expect(screen.getByText("Username")).toBeTruthy();
  });

  it("displays helper text", () => {
    render(TextField, { props: { helperText: "Choose wisely" } });
    expect(screen.getByText("Choose wisely")).toBeTruthy();
  });

  it("displays error message", () => {
    render(TextField, { props: { error: "This field is required" } });
    const errorText = screen.getByText("This field is required");
    expect(errorText).toBeTruthy();
    expect(errorText.getAttribute("role")).toBe("alert");
  });

  it("applies disabled state", () => {
    render(TextField, { props: { disabled: true } });
    const input = document.querySelector("input");
    expect(input?.hasAttribute("disabled")).toBe(true);
  });

  it("sets aria-invalid when error exists", () => {
    render(TextField, { props: { error: "Invalid" } });
    const input = document.querySelector("input");
    expect(input?.getAttribute("aria-invalid")).toBe("true");
  });

  it("forwards class prop", () => {
    render(TextField, { props: { class: "my-field" } });
    const container = document.querySelector(".pui-text-field");
    expect(container?.className).toContain("my-field");
  });
});
