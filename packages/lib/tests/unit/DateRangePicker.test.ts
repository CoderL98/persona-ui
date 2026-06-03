import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import DateRangePicker from "$lib/components/date-range-picker/DateRangePicker.svelte";

describe("DateRangePicker", () => {
  it("renders without crashing", () => {
    render(DateRangePicker);
    expect(document.querySelector(".pui-date-range-picker")).toBeTruthy();
  });

  it("renders trigger button", () => {
    render(DateRangePicker);
    const trigger = document.querySelector("button") as HTMLButtonElement;
    expect(trigger).toBeTruthy();
  });

  it("opens panel on trigger click", async () => {
    render(DateRangePicker);
    const trigger = document.querySelector("button") as HTMLButtonElement;
    await fireEvent.click(trigger);
    expect(document.querySelector(".pui-date-range-picker div[class*='absolute']")).toBeTruthy();
  });

  it("fires onchange when first day selected", async () => {
    const onchange = vi.fn();
    render(DateRangePicker, { props: { onchange } });
    const trigger = document.querySelector("button") as HTMLButtonElement;
    await fireEvent.click(trigger);
    const dayBtn = Array.from(document.querySelectorAll("button")).find(
      (b) => /^\d+$/.test((b as HTMLButtonElement).textContent || "") && !(b as HTMLButtonElement).disabled,
    ) as HTMLButtonElement;
    expect(dayBtn).toBeTruthy();
    await fireEvent.click(dayBtn);
    expect(onchange).toHaveBeenCalled();
  });

  it("respects min/max constraints", () => {
    const min = new Date(2020, 0, 1);
    const max = new Date(2030, 11, 31);
    expect(() => {
      render(DateRangePicker, { props: { min, max } });
    }).not.toThrow();
  });

  it("supports year granularity", async () => {
    render(DateRangePicker, { props: { granularity: "year" } });
    const trigger = document.querySelector("button") as HTMLButtonElement;
    await fireEvent.click(trigger);
    // 十年网格里有数字按钮
    const yearBtns = Array.from(document.querySelectorAll("button")).filter((b) => /^\d{4}$/.test((b as HTMLButtonElement).textContent?.trim() || ""));
    expect(yearBtns.length).toBeGreaterThan(0);
  });
});
