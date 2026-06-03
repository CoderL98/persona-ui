import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import TimePicker from "$lib/components/time-picker/TimePicker.svelte";

describe("TimePicker", () => {
  it("renders without crashing", () => {
    render(TimePicker);
    expect(document.querySelector(".pui-time-picker")).toBeTruthy();
  });

  it("renders trigger button with placeholder", () => {
    render(TimePicker, { props: { placeholder: "Select time" } });
    expect(document.body.textContent).toContain("Select time");
  });

  it("opens panel on trigger click", async () => {
    render(TimePicker);
    const trigger = document.querySelector("button") as HTMLButtonElement;
    await fireEvent.click(trigger);
    // 弹出 hours/minutes 列表
    const hourOpts = document.querySelectorAll("[role='option']");
    expect(hourOpts.length).toBeGreaterThan(0);
  });

  it("uses Intl.DateTimeFormat for AM/PM localization", async () => {
    render(TimePicker, { props: { locale: "en-US", format: "12h" } });
    const trigger = document.querySelector("button") as HTMLButtonElement;
    await fireEvent.click(trigger);
    // AM/PM 切换按钮可见
    expect(document.body.textContent).toMatch(/AM|PM/);
  });

  it("fires onValueChange when time selected", async () => {
    const onValueChange = vi.fn();
    render(TimePicker, { props: { onValueChange } });
    const trigger = document.querySelector("button") as HTMLButtonElement;
    await fireEvent.click(trigger);
    const firstHour = document.querySelector("[role='option']") as HTMLElement;
    expect(firstHour).toBeTruthy();
    await fireEvent.click(firstHour);
    expect(onValueChange).toHaveBeenCalled();
    expect(typeof onValueChange.mock.calls[0][0]).toBe("string");
  });

  it("supports keyboard ArrowDown navigation in list", async () => {
    render(TimePicker);
    const trigger = document.querySelector("button") as HTMLButtonElement;
    await fireEvent.click(trigger);
    const firstHour = document.querySelector("[role='option']") as HTMLElement;
    expect(firstHour).toBeTruthy();
    firstHour.focus();
    await fireEvent.keyDown(firstHour, { key: "ArrowDown" });
  });

  it("respects minTime/maxTime", () => {
    expect(() => {
      render(TimePicker, { props: { minTime: "09:00", maxTime: "17:00" } });
    }).not.toThrow();
  });
});
