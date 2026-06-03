import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Message from "$lib/components/message/Message.svelte";

describe("Message", () => {
  it("renders without crashing", () => {
    render(Message, { props: { description: "Hello" } });
    expect(document.querySelector(".pui-message")).toBeTruthy();
  });

  it("shows description", () => {
    render(Message, { props: { description: "Item saved" } });
    expect(document.body.textContent).toContain("Item saved");
  });

  it("shows title when provided", () => {
    render(Message, { props: { title: "Success", description: "Saved" } });
    expect(document.body.textContent).toContain("Success");
  });

  it("has role=status for info tone", () => {
    render(Message, { props: { description: "X" } });
    expect(document.querySelector("[role='status']")).toBeTruthy();
  });

  it("has role=alert for error tone", () => {
    render(Message, { props: { tone: "error", description: "X" } });
    const el = document.querySelector("[role='alert']");
    expect(el).toBeTruthy();
  });

  it("applies tone color class", () => {
    render(Message, { props: { tone: "success", description: "X" } });
    const msg = document.querySelector(".pui-message") as HTMLElement;
    expect(msg.className).toContain("success");
  });

  it("renders close button by default", () => {
    render(Message, { props: { description: "X" } });
    expect(document.querySelector("button[aria-label='Close message']")).toBeTruthy();
  });

  it("hides close button when closable=false", () => {
    render(Message, { props: { description: "X", closable: false } });
    expect(document.querySelector("button[aria-label='Close message']")).toBeFalsy();
  });

  it("clicking close fires onOpenChange(false)", async () => {
    const onOpenChange = vi.fn();
    render(Message, { props: { description: "X", onOpenChange } });
    const closeBtn = document.querySelector("button[aria-label='Close message']") as HTMLButtonElement;
    await fireEvent.click(closeBtn);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("auto-closes after duration", async () => {
    vi.useFakeTimers();
    const onTimeout = vi.fn();
    const onOpenChange = vi.fn();
    render(Message, { props: { description: "X", duration: 1000, onTimeout, onOpenChange } });
    vi.advanceTimersByTime(1100);
    expect(onTimeout).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
    vi.useRealTimers();
  });

  it("respects placement", () => {
    render(Message, { props: { description: "X", placement: "bottom-left" } });
    const msg = document.querySelector(".pui-message") as HTMLElement;
    expect(msg.className).toContain("bottom-4");
    expect(msg.className).toContain("left-4");
  });

  it("does not render when open=false", () => {
    render(Message, { props: { open: false, description: "X" } });
    expect(document.querySelector(".pui-message")).toBeFalsy();
  });

  it("aria-live varies by tone", () => {
    const { unmount } = render(Message, { props: { description: "X" } });
    let el = document.querySelector(".pui-message") as HTMLElement;
    expect(el.getAttribute("aria-live")).toBe("polite");
    unmount();
    render(Message, { props: { tone: "error", description: "X" } });
    el = document.querySelector(".pui-message") as HTMLElement;
    expect(el.getAttribute("aria-live")).toBe("assertive");
  });
});
