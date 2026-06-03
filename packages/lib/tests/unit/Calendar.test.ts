import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/svelte";
import Calendar from "$lib/components/calendar/Calendar.svelte";
describe("Calendar", () => {
  it("renders", () => {
    render(Calendar);
    expect(document.querySelector(".pui-calendar")).toBeTruthy();
  });
  it("renders month year header", () => {
    render(Calendar);
    const header = document.querySelector(".pui-calendar span.font-medium");
    expect(header).toBeTruthy();
  });
  it("fires onValueChange with selected date", () => {
    const onValueChange = vi.fn();
    render(Calendar, { props: { onValueChange } });
    const dayBtns = document.querySelectorAll('div.grid-cols-7 button');
    expect(dayBtns.length).toBeGreaterThan(0);
    (dayBtns[0] as HTMLButtonElement).click();
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange.mock.calls[0][0]).toBeInstanceOf(Date);
  });
  it("accepts defaultValue without error", () => {
    // Just verify no crash when passing defaultValue (visual highlight
    // depends on matching month, which is tied to current date)
    expect(() => {
      render(Calendar, { props: { defaultValue: new Date() } });
    }).not.toThrow();
  });
});
