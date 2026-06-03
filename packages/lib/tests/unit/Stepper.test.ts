import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Stepper from "$lib/components/stepper/Stepper.svelte";

describe("Stepper", () => {
  const steps = [
    { label: "Account" },
    { label: "Profile" },
    { label: "Review" },
    { label: "Done" },
  ];

  it("renders without crashing", () => {
    render(Stepper, { props: { steps } });
    expect(document.querySelector(".pui-stepper")).toBeTruthy();
  });

  it("renders all steps", () => {
    render(Stepper, { props: { steps } });
    const items = document.querySelectorAll("li.pui-stepper__step");
    expect(items.length).toBe(4);
  });

  it("renders step labels", () => {
    render(Stepper, { props: { steps } });
    expect(document.body.textContent).toContain("Account");
    expect(document.body.textContent).toContain("Profile");
  });

  it("highlights current step with aria-current=step", () => {
    render(Stepper, { props: { steps, value: 1 } });
    const current = document.querySelector("[aria-current='step']");
    expect(current?.textContent?.trim()).toBe("2");
  });

  it("uses defaultValue=0 by default", () => {
    render(Stepper, { props: { steps } });
    const current = document.querySelector("[aria-current='step']");
    expect(current?.textContent?.trim()).toBe("1");
  });

  it("clicking previous step goes back", async () => {
    const onValueChange = vi.fn();
    render(Stepper, { props: { steps, value: 2, onValueChange } });
    const step1 = document.querySelector("#pui-stepper-test-step-0, [id$='-step-0']") as HTMLElement;
    expect(step1).toBeTruthy();
    await fireEvent.click(step1);
    expect(onValueChange).toHaveBeenCalledWith(0);
  });

  it("disallows forward click when clickable=false", async () => {
    const onValueChange = vi.fn();
    render(Stepper, { props: { steps, value: 0, clickable: false, onValueChange } });
    const step3 = document.querySelectorAll("li button")[2] as HTMLElement;
    await fireEvent.click(step3);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("keyboard ArrowDown moves focus to next step", async () => {
    render(Stepper, { props: { steps, value: 0 } });
    const first = document.querySelectorAll("li button")[0] as HTMLElement;
    first.focus();
    await fireEvent.keyDown(first, { key: "ArrowDown" });
  });

  it("renders descriptions", () => {
    const stepsWithDesc = [
      { label: "A", description: "First step" },
      { label: "B", description: "Second step" },
    ];
    render(Stepper, { props: { steps: stepsWithDesc } });
    expect(document.body.textContent).toContain("First step");
    expect(document.body.textContent).toContain("Second step");
  });

  it("marks error steps with error state", () => {
    render(Stepper, { props: { steps, value: 2, errorSteps: [1] } });
    // The step 1 button should have error class (bg-error)
    const step2 = document.querySelectorAll("li button")[1] as HTMLElement;
    expect(step2.className).toContain("error");
  });

  it("renders checkmark for complete steps", () => {
    render(Stepper, { props: { steps, value: 2 } });
    // Step 0 and 1 should be complete (have checkmark svg)
    const checks = document.querySelectorAll("li button svg path[d*='3 7l3 3']");
    expect(checks.length).toBe(2);
  });

  it("vertical orientation", () => {
    render(Stepper, { props: { steps, orientation: "vertical" } });
    expect(document.querySelector(".pui-stepper")?.className).toContain("flex-col");
  });

  it("respects disabled step", () => {
    const stepsWithDisabled = [
      { label: "A" },
      { label: "B", disabled: true },
      { label: "C" },
    ];
    render(Stepper, { props: { steps: stepsWithDisabled, value: 0 } });
    const step2Btn = document.querySelectorAll("li button")[1] as HTMLElement;
    expect(step2Btn.getAttribute("aria-disabled")).toBe("true");
  });
});
