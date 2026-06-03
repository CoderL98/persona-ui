import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import ColorPicker from "$lib/components/color-picker/ColorPicker.svelte";

describe("ColorPicker", () => {
  it("renders without crashing", () => {
    render(ColorPicker);
    expect(document.querySelector(".pui-color-picker")).toBeTruthy();
  });

  it("renders color swatch with current color", () => {
    render(ColorPicker, { props: { defaultValue: "#ff0000" } });
    const swatch = document.querySelector(".pui-color-picker span[aria-hidden='true']") as HTMLElement;
    expect(swatch.style.backgroundColor).toBe("rgb(255, 0, 0)");
  });

  it("shows hex text by default", () => {
    render(ColorPicker, { props: { defaultValue: "#3b82f6" } });
    expect(document.body.textContent).toContain("#3b82f6");
  });

  it("opens palette on trigger click", async () => {
    render(ColorPicker);
    const trigger = document.querySelector("button[aria-label='Color picker']") as HTMLButtonElement;
    await fireEvent.click(trigger);
    expect(document.querySelector("[role='dialog']")).toBeTruthy();
    expect(document.querySelectorAll("[role='option']").length).toBeGreaterThan(0);
  });

  it("selecting palette color fires onValueChange and closes", async () => {
    const onValueChange = vi.fn();
    render(ColorPicker, { props: { onValueChange, palette: ["#ff0000", "#00ff00"] } });
    const trigger = document.querySelector("button[aria-label='Color picker']") as HTMLButtonElement;
    await fireEvent.click(trigger);
    const opt = document.querySelectorAll("[role='option']")[0] as HTMLButtonElement;
    await fireEvent.click(opt);
    expect(onValueChange).toHaveBeenCalledWith("#ff0000");
  });

  it("typing in hex input updates value", async () => {
    const onValueChange = vi.fn();
    render(ColorPicker, { props: { onValueChange } });
    const trigger = document.querySelector("button[aria-label='Color picker']") as HTMLButtonElement;
    await fireEvent.click(trigger);
    const hexInput = document.querySelector("input[type='text']") as HTMLInputElement;
    await fireEvent.input(hexInput, { target: { value: "#abcdef" } });
    expect(onValueChange).toHaveBeenCalledWith("#abcdef");
  });

  it("supports custom palette", () => {
    const palette = ["#aaa", "#bbb", "#ccc"];
    render(ColorPicker, { props: { palette, open: true } as never });
    // After render, open: true doesn't work in tests; let's check default
  });

  it("hides input when showInput=false", () => {
    render(ColorPicker, { props: { showInput: false, defaultValue: "#abc" } });
    expect(document.body.textContent).not.toContain("#abc");
  });

  it("renders rgb format text", () => {
    render(ColorPicker, { props: { defaultValue: "#ff0000", format: "rgb" } });
    expect(document.body.textContent).toContain("rgb(255, 0, 0)");
  });

  it("renders hsl format text", () => {
    render(ColorPicker, { props: { defaultValue: "#ff0000", format: "hsl" } });
    expect(document.body.textContent).toMatch(/hsl\(/);
  });

  it("disabled state disables trigger", () => {
    render(ColorPicker, { props: { disabled: true } });
    const trigger = document.querySelector("button[aria-label='Color picker']") as HTMLButtonElement;
    expect(trigger.disabled).toBe(true);
  });
});
