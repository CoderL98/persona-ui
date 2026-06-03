import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import ConfirmDialog from "$lib/components/confirm-dialog/ConfirmDialog.svelte";

describe("ConfirmDialog", () => {
  it("renders nothing when closed", () => {
    const { container } = render(ConfirmDialog, { props: { open: false, title: "Test" } });
    expect(container.querySelector("[role='alertdialog']")).toBeFalsy();
  });

  it("renders when open", () => {
    render(ConfirmDialog, { props: { open: true, title: "Delete?" } });
    expect(document.querySelector("[role='alertdialog']")).toBeTruthy();
  });

  it("shows title", () => {
    render(ConfirmDialog, { props: { open: true, title: "Delete this item?" } });
    expect(document.body.textContent).toContain("Delete this item?");
  });

  it("shows description", () => {
    render(ConfirmDialog, {
      props: { open: true, title: "T", description: "This cannot be undone" },
    });
    expect(document.body.textContent).toContain("This cannot be undone");
  });

  it("uses default confirm/cancel text", () => {
    render(ConfirmDialog, { props: { open: true, title: "T" } });
    expect(document.body.textContent).toContain("Confirm");
    expect(document.body.textContent).toContain("Cancel");
  });

  it("uses custom confirm/cancel text", () => {
    render(ConfirmDialog, {
      props: { open: true, title: "T", confirmText: "Delete", cancelText: "Keep" },
    });
    expect(document.body.textContent).toContain("Delete");
    expect(document.body.textContent).toContain("Keep");
  });

  it("applies danger tone styling", () => {
    render(ConfirmDialog, {
      props: { open: true, title: "T", tone: "danger" },
    });
    const confirmBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Confirm",
    ) as HTMLButtonElement;
    expect(confirmBtn.className).toContain("error");
  });

  it("calls onConfirm when confirm clicked", async () => {
    const onConfirm = vi.fn();
    render(ConfirmDialog, { props: { open: true, title: "T", onConfirm } });
    const confirmBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Confirm",
    ) as HTMLButtonElement;
    await fireEvent.click(confirmBtn);
    expect(onConfirm).toHaveBeenCalled();
  });

  it("calls onCancel and closes on cancel click", async () => {
    const onCancel = vi.fn();
    const onOpenChange = vi.fn();
    render(ConfirmDialog, {
      props: { open: true, title: "T", onCancel, onOpenChange },
    });
    const cancelBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Cancel",
    ) as HTMLButtonElement;
    await fireEvent.click(cancelBtn);
    expect(onCancel).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("loading state disables buttons", () => {
    render(ConfirmDialog, { props: { open: true, title: "T", loading: true } });
    const buttons = document.querySelectorAll("button:not([aria-label])");
    buttons.forEach((b) => {
      expect((b as HTMLButtonElement).disabled).toBe(true);
    });
  });

  it("Escape closes the dialog", async () => {
    const onCancel = vi.fn();
    const onOpenChange = vi.fn();
    render(ConfirmDialog, {
      props: { open: true, title: "T", onCancel, onOpenChange },
    });
    await fireEvent.keyDown(document.body, { key: "Escape" });
    expect(onCancel).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("backdrop click closes the dialog", async () => {
    const onCancel = vi.fn();
    const onOpenChange = vi.fn();
    render(ConfirmDialog, {
      props: { open: true, title: "T", onCancel, onOpenChange, closeOnOutsideClick: true },
    });
    const backdrop = document.querySelector("[data-confirm-backdrop]") as HTMLElement;
    await fireEvent.click(backdrop);
    expect(onCancel).toHaveBeenCalled();
  });

  it("renders custom footer when provided", () => {
    render(ConfirmDialog, {
      props: {
        open: true,
        title: "T",
        footer: (() => null) as never,
      },
    });
    // Default buttons should be replaced
    expect(document.body.textContent).not.toContain("Confirm");
  });

  it("has aria-modal=true and aria-labelledby", () => {
    render(ConfirmDialog, { props: { open: true, title: "Delete?" } });
    const dialog = document.querySelector("[role='alertdialog']") as HTMLElement;
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.getAttribute("aria-labelledby")).toBeTruthy();
  });
});
