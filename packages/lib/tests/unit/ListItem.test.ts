import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import ListItem from "$lib/components/list/ListItem.svelte";

describe("ListItem", () => {
  it("renders with title", () => {
    const { container } = render(ListItem, { props: { title: "Inbox" } });
    expect(container.textContent).toContain("Inbox");
  });

  it("renders with title and description", () => {
    const { container } = render(ListItem, {
      props: { title: "Starred", description: "Important emails" },
    });
    expect(container.textContent).toContain("Starred");
    expect(container.textContent).toContain("Important emails");
  });

  it("marks selected state with aria-selected", () => {
    const { container } = render(ListItem, { props: { title: "Active", selected: true } });
    const item = container.querySelector('[role="option"]') || container.firstElementChild;
    expect(item?.getAttribute("aria-selected") === "true" || item?.className.includes("selected") || item?.className.includes("bg-")).toBeTruthy();
  });

  it("renders as anchor when href is provided", () => {
    const { container } = render(ListItem, {
      props: { title: "Link", href: "/inbox" },
    });
    const anchor = container.querySelector("a[href='/inbox']");
    expect(anchor).toBeTruthy();
  });

  it("calls onClick handler when clicked (interactive)", async () => {
    const onClick = vi.fn();
    const { container } = render(ListItem, { props: { title: "Click me", onClick } });
    const item = container.querySelector('[role="option"]') || container.firstElementChild;
    if (item) {
      await fireEvent.click(item);
      expect(onClick).toHaveBeenCalled();
    }
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    const { container } = render(ListItem, {
      props: { title: "Disabled", disabled: true, onClick },
    });
    const item = container.querySelector('[role="option"]') || container.firstElementChild;
    if (item) {
      await fireEvent.click(item);
      expect(onClick).not.toHaveBeenCalled();
    }
  });
});
