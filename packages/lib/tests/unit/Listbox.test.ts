import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Listbox from "$lib/components/listbox/Listbox.svelte";

describe("Listbox", () => {
  it("renders single-select listbox", () => {
    render(Listbox, {
      props: { options: [{ value: "a", label: "A" }, { value: "b", label: "B" }] },
    });
    const box = document.querySelector('[role="listbox"]') as HTMLElement;
    expect(box).toBeTruthy();
    expect(box.getAttribute("aria-multiselectable")).toBeNull();
    const options = box.querySelectorAll('[role="option"]');
    expect(options.length).toBe(2);
  });

  it("marks selected option with aria-selected=true", () => {
    render(Listbox, {
      props: {
        defaultValue: "b",
        options: [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ],
      },
    });
    const opts = document.querySelectorAll('[role="option"]');
    expect(opts[0].getAttribute("aria-selected")).toBe("false");
    expect(opts[1].getAttribute("aria-selected")).toBe("true");
  });

  it("supports multi-select", () => {
    render(Listbox, {
      props: {
        multiple: true,
        defaultValue: ["a", "c"],
        options: [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
        ],
      },
    });
    const box = document.querySelector('[role="listbox"]') as HTMLElement;
    expect(box.getAttribute("aria-multiselectable")).toBe("true");
    const selected = box.querySelectorAll('[aria-selected="true"]');
    expect(selected.length).toBe(2);
  });

  it("toggles multi-select value on click", async () => {
    let lastValue: string | string[] = "";
    render(Listbox, {
      props: {
        multiple: true,
        defaultValue: [],
        options: [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ],
        onchange: (v: string | string[]) => { lastValue = v; },
      },
    });
    const opts = document.querySelectorAll('[role="option"]');
    (opts[0] as HTMLElement).click();
    (opts[1] as HTMLElement).click();
    expect(lastValue).toEqual(["a", "b"]);
  });
});
