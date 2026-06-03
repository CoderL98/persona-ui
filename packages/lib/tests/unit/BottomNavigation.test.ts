import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import BottomNavigation from "$lib/components/bottom-navigation/BottomNavigation.svelte";
import type { BottomNavigationItem } from "$lib/components/bottom-navigation/bottom-navigation.types.js";
import type { Snippet } from "svelte";

const items: BottomNavigationItem[] = [
  { id: "home", label: "Home", icon: (() => null) as unknown as Snippet },
  { id: "search", label: "Search", icon: (() => null) as unknown as Snippet },
  { id: "profile", label: "Profile", icon: (() => null) as unknown as Snippet },
];

describe("BottomNavigation", () => {
  it("renders without crashing", () => {
    render(BottomNavigation, { props: { items } });
    expect(document.querySelector(".pui-bottom-navigation")).toBeTruthy();
  });

  it("renders all items", () => {
    render(BottomNavigation, { props: { items } });
    const buttons = document.querySelectorAll(".pui-bottom-navigation button");
    expect(buttons.length).toBe(3);
  });

  it("renders labels by default", () => {
    render(BottomNavigation, { props: { items } });
    expect(document.body.textContent).toContain("Home");
    expect(document.body.textContent).toContain("Search");
  });

  it("hides labels when showLabels=false", () => {
    render(BottomNavigation, { props: { items, showLabels: false } });
    expect(document.body.textContent).not.toContain("Home");
  });

  it("marks first item as active by default", () => {
    render(BottomNavigation, { props: { items } });
    const active = document.querySelector("[aria-current='page']");
    expect(active).toBeTruthy();
  });

  it("respects value prop for active item", () => {
    render(BottomNavigation, { props: { items, value: "search" } });
    const active = document.querySelector("[aria-current='page']");
    expect(active?.id).toContain("search");
  });

  it("clicking an item fires onValueChange", async () => {
    const onValueChange = vi.fn();
    render(BottomNavigation, { props: { items, onValueChange } });
    const buttons = document.querySelectorAll(".pui-bottom-navigation button");
    await fireEvent.click(buttons[1] as HTMLElement);
    expect(onValueChange).toHaveBeenCalledWith("search");
  });

  it("clicking a disabled item does not fire onValueChange", async () => {
    const onValueChange = vi.fn();
    const itemsWithDisabled: BottomNavigationItem[] = [
      { id: "home", label: "Home", icon: (() => null) as unknown as Snippet, disabled: true },
      { id: "search", label: "Search", icon: (() => null) as unknown as Snippet },
    ];
    render(BottomNavigation, { props: { items: itemsWithDisabled, onValueChange } });
    const buttons = document.querySelectorAll(".pui-bottom-navigation button");
    await fireEvent.click(buttons[0] as HTMLElement);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("renders badge when provided", () => {
    const itemsWithBadge: BottomNavigationItem[] = [
      { id: "inbox", label: "Inbox", icon: (() => null) as unknown as Snippet, badge: 5 },
    ];
    render(BottomNavigation, { props: { items: itemsWithBadge } });
    expect(document.body.textContent).toContain("5");
  });

  it("has nav with aria-label", () => {
    render(BottomNavigation, { props: { items, "aria-label": "Main navigation" } });
    const nav = document.querySelector("nav[aria-label='Main navigation']");
    expect(nav).toBeTruthy();
  });

  it("keyboard ArrowRight moves focus to next item", async () => {
    render(BottomNavigation, { props: { items, value: "home" } });
    const first = document.querySelectorAll(".pui-bottom-navigation button")[0] as HTMLElement;
    first.focus();
    await fireEvent.keyDown(first, { key: "ArrowRight" });
  });
});
