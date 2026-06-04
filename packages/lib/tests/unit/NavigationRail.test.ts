import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import NavigationRail from "$lib/components/navigation-rail/NavigationRail.svelte";

describe("NavigationRail", () => {
  const items = [
    { value: "home", label: "Home" },
    { value: "inbox", label: "Inbox" },
    { value: "settings", label: "Settings" },
  ];

  it("renders with .pui-navigation-rail class", () => {
    const { container } = render(NavigationRail, { props: { items } });
    expect(container.querySelector(".pui-navigation-rail")).toBeTruthy();
  });

  it("renders all items as buttons", () => {
    const { container } = render(NavigationRail, { props: { items } });
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(3);
    expect(container.textContent).toContain("Home");
    expect(container.textContent).toContain("Inbox");
    expect(container.textContent).toContain("Settings");
  });

  it("uses first item as default value when no defaultValue", () => {
    const { container } = render(NavigationRail, { props: { items } });
    // active item 应有 text-(--pui-color-primary) class
    const homeButton = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("Home"),
    );
    expect(homeButton?.className).toContain("text-(--pui-color-primary)");
  });

  it("calls onValueChange when an item is clicked", async () => {
    const onValueChange = vi.fn();
    const { container } = render(NavigationRail, { props: { items, onValueChange } });
    const inboxButton = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("Inbox"),
    );
    if (inboxButton) {
      await fireEvent.click(inboxButton);
      expect(onValueChange).toHaveBeenCalledWith("inbox");
    }
  });

  it("does not fire onValueChange for disabled items", async () => {
    const onValueChange = vi.fn();
    const itemsWithDisabled = [
      { value: "a", label: "A" },
      { value: "b", label: "B", disabled: true },
    ];
    const { container } = render(NavigationRail, {
      props: { items: itemsWithDisabled, onValueChange },
    });
    const disabledButton = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("B"),
    );
    if (disabledButton) {
      await fireEvent.click(disabledButton);
      expect(onValueChange).not.toHaveBeenCalled();
    }
  });

  it("applies custom data-testid via rest spread", () => {
    const { container } = render(NavigationRail, {
      props: { items, "data-testid": "my-rail" },
    });
    expect(container.querySelector('[data-testid]')).toBeTruthy();
  });
});
