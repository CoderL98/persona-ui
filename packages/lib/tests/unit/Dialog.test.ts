import { describe, it, expect } from "vitest";
import { tick } from "svelte";
import { render } from "@testing-library/svelte";
import Dialog from "$lib/components/dialog/Dialog.svelte";
describe("Dialog", () => {
  it("renders when open", () => {
    render(Dialog, { props: { defaultOpen: true } });
    expect(document.querySelector('[role="dialog"]')).toBeTruthy();
  });
  it("does not render when closed", () => {
    render(Dialog);
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });
  it("renders close button when open", () => {
    render(Dialog, { props: { defaultOpen: true } });
    expect(document.querySelector('button[aria-label="Close"]')).toBeTruthy();
  });
  it("closes when clicking close button", async () => {
    let open = true;
    render(Dialog, {
      props: { defaultOpen: true, onOpenChange: (v: boolean) => { open = v; } },
    });
    (document.querySelector<HTMLElement>('button[aria-label="Close"]'))?.click();
    await tick();
    expect(open).toBe(false);
  });
  it("has proper aria attributes when modal", () => {
    render(Dialog, { props: { defaultOpen: true, modal: true } });
    const dlg = document.querySelector('[role="dialog"]');
    expect(dlg?.getAttribute("aria-modal")).toBe("true");
  });
});
