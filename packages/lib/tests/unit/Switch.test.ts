import { describe, it, expect } from "vitest";
import { tick } from "svelte";
import { render, screen } from "@testing-library/svelte";
import Switch from "$lib/components/switch/Switch.svelte";

describe("Switch", () => {
  it("renders a switch input", () => {
    render(Switch);
    const sw = document.querySelector('input[role="switch"]');
    expect(sw).toBeTruthy();
  });

  it("renders label text", () => {
    render(Switch, { props: { label: "Wi-Fi" } });
    expect(screen.getByText("Wi-Fi")).toBeTruthy();
  });

  it("defaults to unchecked", () => {
    render(Switch);
    const sw = document.querySelector('input[role="switch"]') as HTMLInputElement;
    expect(sw.checked).toBe(false);
  });

  it("respects defaultChecked prop", () => {
    render(Switch, { props: { defaultChecked: true } });
    const sw = document.querySelector('input[role="switch"]') as HTMLInputElement;
    expect(sw.checked).toBe(true);
  });

  it("applies disabled state", () => {
    render(Switch, { props: { disabled: true } });
    const sw = document.querySelector('input[role="switch"]') as HTMLInputElement;
    expect(sw.disabled).toBe(true);
  });

  it("forwards class prop", () => {
    render(Switch, { props: { class: "my-switch" } });
    const container = document.querySelector(".pui-switch");
    expect(container?.className).toContain("my-switch");
  });

  it("forwards style prop", () => {
    render(Switch, { props: { style: "--pui-switch-track-checked-bg: red" } });
    const container = document.querySelector(".pui-switch");
    expect(container?.getAttribute("style")).toContain(
      "--pui-switch-track-checked-bg: red",
    );
  });

  it("forwards name/value/required for form integration", () => {
    const { container } = render(Switch, {
      props: { name: "wifi", value: "on", required: true, label: "Wi-Fi" },
    });
    const sw = container.querySelector('input[role="switch"]') as HTMLInputElement;
    expect(sw.name).toBe("wifi");
    expect(sw.value).toBe("on");
    expect(sw.required).toBe(true);
  });

  it("fires onchange with checked value on click", () => {
    let checked = false;
    render(Switch, {
      props: { onchange: (val: boolean) => { checked = val; } },
    });
    const sw = document.querySelector<HTMLInputElement>('input[role="switch"]')!;
    sw.click();
    expect(checked).toBe(true);
  });

  it("toggles checked on click", async () => {
    render(Switch);
    const sw = document.querySelector<HTMLInputElement>('input[role="switch"]')!;
    expect(sw.checked).toBe(false);
    sw.click();
    await tick();
    expect(sw.checked).toBe(true);
    sw.click();
    await tick();
    expect(sw.checked).toBe(false);
  });

  it("respects controlled checked prop", () => {
    render(Switch, { props: { checked: true } });
    const sw = document.querySelector<HTMLInputElement>('input[role="switch"]')!;
    expect(sw.checked).toBe(true);
  });
});
