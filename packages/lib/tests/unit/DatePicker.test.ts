import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import DatePicker from "$lib/components/date-picker/DatePicker.svelte";

describe("DatePicker", () => {
  it("renders without crashing", () => {
    render(DatePicker);
    expect(document.querySelector(".pui-date-picker")).toBeTruthy();
  });

  it("renders trigger button with placeholder", () => {
    render(DatePicker, { props: { placeholder: "Pick a date" } });
    expect(document.body.textContent).toContain("Pick a date");
  });

  it("opens calendar on trigger click", async () => {
    render(DatePicker);
    const trigger = document.querySelector("button") as HTMLButtonElement;
    await fireEvent.click(trigger);
    expect(document.querySelector(".pui-calendar")).toBeTruthy();
  });

  it("fires onchange when day selected", async () => {
    const onchange = vi.fn();
    render(DatePicker, { props: { onchange } });
    const trigger = document.querySelector("button") as HTMLButtonElement;
    await fireEvent.click(trigger);
    const dayBtns = document.querySelectorAll(".pui-calendar button");
    const firstDay = Array.from(dayBtns).find((b) => /^\d+$/.test((b as HTMLButtonElement).textContent || ""));
    expect(firstDay).toBeTruthy();
    await fireEvent.click(firstDay as HTMLElement);
    expect(onchange).toHaveBeenCalled();
    expect(onchange.mock.calls[0][0]).toBeInstanceOf(Date);
  });

  it("respects min date without crash", () => {
    const min = new Date(2030, 0, 1);
    expect(() => {
      render(DatePicker, { props: { min } });
    }).not.toThrow();
  });

  it("renders label when provided", () => {
    render(DatePicker, { props: { label: "Birthday" } });
    expect(document.body.textContent).toContain("Birthday");
  });
});
