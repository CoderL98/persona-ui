import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Tabs from "$lib/components/tabs/Tabs.svelte";

describe("Tabs", () => {
  const items = [
    { value: "a", label: "Tab A" },
    { value: "b", label: "Tab B" },
    { value: "c", label: "Tab C" },
  ];

  it("renders tablist with role=tablist", () => {
    const { container } = render(Tabs, { props: { items } });
    expect(container.querySelector('[role="tablist"]')).toBeTruthy();
  });

  it("renders all tab buttons", () => {
    const { container } = render(Tabs, { props: { items } });
    const tabs = container.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBe(3);
  });

  it("marks active tab with aria-selected", () => {
    const { container } = render(Tabs, { props: { items, value: "b" } });
    const tabs = Array.from(container.querySelectorAll('[role="tab"]'));
    const selected = tabs.find((t) => t.getAttribute("aria-selected") === "true");
    expect(selected?.textContent).toContain("Tab B");
  });

  it("calls onValueChange when a tab is clicked", async () => {
    const onValueChange = vi.fn();
    const { container } = render(Tabs, { props: { items, onValueChange } });
    const tabs = container.querySelectorAll('[role="tab"]');
    if (tabs[1]) {
      await fireEvent.click(tabs[1]);
      expect(onValueChange).toHaveBeenCalled();
    }
  });
});
