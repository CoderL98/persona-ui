import { describe, it, expect, vi } from "vitest";
import { tick } from "svelte";
import { render } from "@testing-library/svelte";
import Toast from "$lib/components/toast/Toast.svelte";
describe("Toast", () => {
  it("renders when open", () => {
    render(Toast, { props: { defaultOpen: true } });
    expect(document.querySelector(".pui-toast")).toBeTruthy();
  });
  it("does not render when closed", () => {
    render(Toast);
    expect(document.querySelector(".pui-toast")).toBeNull();
  });
  it("has role and aria-live attributes", () => {
    render(Toast, { props: { defaultOpen: true } });
    const el = document.querySelector('[role="status"]');
    expect(el).toBeTruthy();
    expect(el?.getAttribute("aria-live")).toBe("polite");
  });
  it("fires onOpenChange on dismiss", async () => {
    let val = true;
    render(Toast, {
      props: { defaultOpen: true, onOpenChange: (v: boolean) => { val = v; } },
    });
    (document.querySelector<HTMLElement>('button[aria-label="Dismiss"]'))?.click();
    await tick();
    expect(val).toBe(false);
  });
  it("has dismiss button when dismissible", () => {
    render(Toast, { props: { defaultOpen: true, dismissible: true } });
    expect(document.querySelector('button[aria-label="Dismiss"]')).toBeTruthy();
  });
  it("does not show dismiss button when not dismissible", () => {
    render(Toast, { props: { defaultOpen: true, dismissible: false } });
    expect(document.querySelector('button[aria-label="Dismiss"]')).toBeNull();
  });
  it("auto-dismisses after duration via setTimeout", async () => {
    vi.useFakeTimers();
    let val = true;
    render(Toast, {
      props: { defaultOpen: true, duration: 1000, onOpenChange: (v: boolean) => { val = v; } },
    });
    expect(document.querySelector(".pui-toast")).toBeTruthy();
    vi.advanceTimersByTime(1100);
    await tick();
    expect(val).toBe(false);
    vi.useRealTimers();
  });
});
