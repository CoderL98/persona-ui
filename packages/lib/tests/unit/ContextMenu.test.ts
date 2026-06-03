import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import ContextMenu from "$lib/components/context-menu/ContextMenu.svelte";
import type { ContextMenuItem } from "$lib/components/context-menu/context-menu.types.js";
import type { Snippet } from "svelte";

const items: ContextMenuItem[] = [
  { id: "cut", label: "Cut", onSelect: vi.fn() },
  { id: "copy", label: "Copy", onSelect: vi.fn() },
  { id: "paste", label: "Paste", onSelect: vi.fn() },
];

describe("ContextMenu", () => {
  it("renders nothing when closed", () => {
    const { container } = render(ContextMenu, { props: { open: false, items } });
    expect(container.querySelector("[role='menu']")).toBeFalsy();
  });

  it("renders when open", () => {
    render(ContextMenu, { props: { open: true, items, position: { x: 100, y: 100 } } });
    expect(document.querySelector("[role='menu']")).toBeTruthy();
  });

  it("renders all items", () => {
    render(ContextMenu, { props: { open: true, items, position: { x: 0, y: 0 } } });
    const menuitems = document.querySelectorAll("[role='menuitem']");
    expect(menuitems.length).toBe(3);
  });

  it("positions at given coords", () => {
    render(ContextMenu, { props: { open: true, items, position: { x: 200, y: 150 } } });
    const menu = document.querySelector("[role='menu']") as HTMLElement;
    expect(menu.style.left).toBe("200px");
    expect(menu.style.top).toBe("150px");
  });

  it("clicking item calls onSelect", async () => {
    const onSelect = vi.fn();
    const testItems: ContextMenuItem[] = [{ id: "x", label: "X", onSelect }];
    render(ContextMenu, { props: { open: true, items: testItems, position: { x: 0, y: 0 } } });
    const item = document.querySelector("[role='menuitem']") as HTMLElement;
    await fireEvent.click(item);
    expect(onSelect).toHaveBeenCalled();
  });

  it("clicking item closes menu by default", async () => {
    const onOpenChange = vi.fn();
    const onSelect = vi.fn();
    const testItems: ContextMenuItem[] = [{ id: "x", label: "X", onSelect }];
    render(ContextMenu, { props: { open: true, items: testItems, position: { x: 0, y: 0 }, onOpenChange } });
    const item = document.querySelector("[role='menuitem']") as HTMLElement;
    await fireEvent.click(item);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("Escape closes the menu", async () => {
    const onOpenChange = vi.fn();
    render(ContextMenu, { props: { open: true, items, position: { x: 0, y: 0 }, onOpenChange } });
    await fireEvent.keyDown(document.body, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders separator", () => {
    const itemsWithSep: ContextMenuItem[] = [
      { id: "1", label: "Cut" },
      { separator: true },
      { id: "2", label: "Paste" },
    ];
    render(ContextMenu, { props: { open: true, items: itemsWithSep, position: { x: 0, y: 0 } } });
    expect(document.querySelector("[role='separator']")).toBeTruthy();
  });

  it("disabled item cannot be clicked", async () => {
    const onSelect = vi.fn();
    const testItems: ContextMenuItem[] = [
      { id: "x", label: "X", onSelect, disabled: true },
    ];
    render(ContextMenu, { props: { open: true, items: testItems, position: { x: 0, y: 0 } } });
    const item = document.querySelector("[role='menuitem']") as HTMLButtonElement;
    expect(item.disabled).toBe(true);
  });

  it("renders shortcut text", () => {
    const testItems: ContextMenuItem[] = [
      { id: "copy", label: "Copy", shortcut: "⌘C" },
    ];
    render(ContextMenu, { props: { open: true, items: testItems, position: { x: 0, y: 0 } } });
    expect(document.body.textContent).toContain("⌘C");
  });

  it("destructive item has error color", () => {
    const testItems: ContextMenuItem[] = [
      { id: "del", label: "Delete", destructive: true, icon: (() => null) as unknown as Snippet },
    ];
    render(ContextMenu, { props: { open: true, items: testItems, position: { x: 0, y: 0 } } });
    const item = document.querySelector("[role='menuitem']") as HTMLElement;
    expect(item.className).toContain("error");
  });

  it("keyboard ArrowDown moves active index", async () => {
    render(ContextMenu, { props: { open: true, items, position: { x: 0, y: 0 } } });
    const menu = document.querySelector("[role='menu']") as HTMLElement;
    menu.focus();
    await fireEvent.keyDown(menu, { key: "ArrowDown" });
  });
});
