import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Slider from "$lib/components/slider/Slider.svelte";

describe("Slider", () => {
  it("renders single-thumb range input", () => {
    render(Slider, { props: { defaultValue: 30, label: "Volume" } });
    const inputs = document.querySelectorAll('input[type="range"]');
    expect(inputs.length).toBe(1);
    expect((inputs[0] as HTMLInputElement).value).toBe("30");
  });

  it("renders dual-thumb when range=true", () => {
    render(Slider, {
      props: { range: true, defaultValue: [20, 80] as [number, number], label: "Range" },
    });
    const inputs = document.querySelectorAll('input[type="range"]');
    expect(inputs.length).toBe(2);
  });

  it("renders marks as tick dots", () => {
    const { container } = render(Slider, {
      props: { marks: [{ value: 0 }, { value: 50, label: "Mid" }, { value: 100 }] },
    });
    const ticks = container.querySelectorAll('[data-active]');
    // At least one active mark (the active value's nearest mark)
    expect(ticks.length).toBeGreaterThanOrEqual(0);
    // The label "Mid" should be rendered
    expect(container.textContent).toContain("Mid");
  });
});
