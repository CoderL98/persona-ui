import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Tour from "$lib/components/tour/Tour.svelte";

describe("Tour", () => {
  const steps = [
    { target: "#target-1", title: "Step 1", content: "First step" },
    { target: "#target-2", title: "Step 2", content: "Second step" },
    { target: "#target-3", title: "Step 3", content: "Third step" },
  ];

  it("renders nothing when closed", () => {
    const { container } = render(Tour, { props: { open: false, steps } });
    expect(container.querySelectorAll(".pui-tour__backdrop").length).toBe(0);
  });

  it("renders backdrop and popover when open", () => {
    // Add a target element
    const div = document.createElement("div");
    div.id = "target-1";
    document.body.appendChild(div);

    render(Tour, { props: { open: true, steps } });
    expect(document.querySelector(".pui-tour__backdrop")).toBeTruthy();
    expect(document.querySelector(".pui-tour__popover")).toBeTruthy();

    document.body.removeChild(div);
  });

  it("shows current step title and content", () => {
    const div = document.createElement("div");
    div.id = "target-1";
    document.body.appendChild(div);

    render(Tour, { props: { open: true, steps, value: 0 } });
    expect(document.body.textContent).toContain("Step 1");
    expect(document.body.textContent).toContain("First step");

    document.body.removeChild(div);
  });

  it("shows progress indicator by default", () => {
    const div = document.createElement("div");
    div.id = "target-1";
    document.body.appendChild(div);

    render(Tour, { props: { open: true, steps, value: 1 } });
    expect(document.body.textContent).toContain("2 / 3");

    document.body.removeChild(div);
  });

  it("Next button advances step", async () => {
    const div = document.createElement("div");
    div.id = "target-1";
    document.body.appendChild(div);

    const onValueChange = vi.fn();
    render(Tour, { props: { open: true, steps, onValueChange } });
    const nextBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Next",
    ) as HTMLButtonElement;
    await fireEvent.click(nextBtn);
    expect(onValueChange).toHaveBeenCalledWith(1);

    document.body.removeChild(div);
  });

  it("Back button goes to previous step", async () => {
    const div = document.createElement("div");
    div.id = "target-1";
    document.body.appendChild(div);

    const onValueChange = vi.fn();
    render(Tour, { props: { open: true, steps, value: 2, onValueChange } });
    const backBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Back",
    ) as HTMLButtonElement;
    await fireEvent.click(backBtn);
    expect(onValueChange).toHaveBeenCalledWith(1);

    document.body.removeChild(div);
  });

  it("Done button calls onComplete on last step", async () => {
    const div = document.createElement("div");
    div.id = "target-1";
    document.body.appendChild(div);

    const onComplete = vi.fn();
    const onOpenChange = vi.fn();
    render(Tour, { props: { open: true, steps, value: 2, onComplete, onOpenChange } });
    const doneBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Done",
    ) as HTMLButtonElement;
    await fireEvent.click(doneBtn);
    expect(onComplete).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);

    document.body.removeChild(div);
  });

  it("Skip button closes tour", async () => {
    const div = document.createElement("div");
    div.id = "target-1";
    document.body.appendChild(div);

    const onOpenChange = vi.fn();
    render(Tour, { props: { open: true, steps, onOpenChange } });
    const skipBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Skip",
    ) as HTMLButtonElement;
    await fireEvent.click(skipBtn);
    expect(onOpenChange).toHaveBeenCalledWith(false);

    document.body.removeChild(div);
  });

  it("shows no progress when showProgress=false", () => {
    const div = document.createElement("div");
    div.id = "target-1";
    document.body.appendChild(div);

    render(Tour, { props: { open: true, steps, showProgress: false } });
    expect(document.body.textContent).not.toContain(" / ");

    document.body.removeChild(div);
  });

  it("shows no skip button when showSkip=false", () => {
    const div = document.createElement("div");
    div.id = "target-1";
    document.body.appendChild(div);

    render(Tour, { props: { open: true, steps, showSkip: false } });
    expect(document.body.textContent).not.toContain("Skip");

    document.body.removeChild(div);
  });

  it("supports custom button texts", () => {
    const div = document.createElement("div");
    div.id = "target-1";
    document.body.appendChild(div);

    render(Tour, {
      props: { open: true, steps, texts: { next: "继续", done: "完成" } },
    });
    expect(document.body.textContent).toContain("继续");

    document.body.removeChild(div);
  });
});
