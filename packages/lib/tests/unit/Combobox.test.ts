import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Combobox from "$lib/components/combobox/Combobox.svelte";

describe("Combobox", () => {
  it("renders input with combobox role", () => {
    render(Combobox, {
      props: { options: [{ value: "a", label: "A" }] },
    });
    const input = document.querySelector('input[role="combobox"]') as HTMLInputElement;
    expect(input).toBeTruthy();
  });

  it("filters options by input", async () => {
    render(Combobox, {
      props: {
        options: [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ],
      },
    });
    const input = document.querySelector<HTMLInputElement>('input[role="combobox"]')!;
    input.focus();
    input.value = "an";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    await Promise.resolve();
    const list = document.querySelector('[role="listbox"]') as HTMLElement;
    expect(list).toBeTruthy();
    const items = list.querySelectorAll('[role="option"]');
    expect(items.length).toBe(1);
  });

  it("renders multi-select tags", () => {
    render(Combobox, {
      props: {
        multiple: true,
        defaultValue: ["apple", "banana"],
        options: [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ],
      },
    });
    const tags = document.querySelectorAll('span.inline-flex.items-center.gap-1');
    // find tag chips containing labels
    const hasApple = Array.from(tags).some((n) => n.textContent?.includes("Apple"));
    const hasBanana = Array.from(tags).some((n) => n.textContent?.includes("Banana"));
    expect(hasApple).toBe(true);
    expect(hasBanana).toBe(true);
  });

  it("clicking a tag remove button removes the value", async () => {
    render(Combobox, {
      props: {
        multiple: true,
        defaultValue: ["apple", "banana"],
        options: [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
        ],
      },
    });
    const removeButtons = document.querySelectorAll('button[aria-label^="Remove "]');
    expect(removeButtons.length).toBe(2);
    (removeButtons[0] as HTMLElement).click();
    await Promise.resolve();
    const remaining = document.querySelectorAll('button[aria-label^="Remove "]');
    expect(remaining.length).toBe(1);
  });
});
