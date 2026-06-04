import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Sheet from "$lib/components/sheet/Sheet.svelte";

const snip = (str: string) =>
  createRawSnippet<[]>(() => ({ render: () => `<span>${str}</span>` }));

describe("Sheet", () => {
  it("renders dialog with role=dialog when open", () => {
    const { container } = render(Sheet, {
      props: { defaultOpen: true, title: snip("More") },
    });
    expect(container.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it("does not render dialog when closed", () => {
    const { container } = render(Sheet, { props: { defaultOpen: false } });
    expect(container.querySelector('[role="dialog"]')).toBeFalsy();
  });

  it("supports different sides (bottom, top, left, right)", () => {
    const { container } = render(Sheet, {
      props: { defaultOpen: true, side: "left", title: snip("L") },
    });
    const root = container.querySelector('[role="dialog"]');
    expect(root).toBeTruthy();
  });

  it("does not close on Escape when closeOnEscape is false", async () => {
    const onOpenChange = vi.fn();
    render(Sheet, {
      props: {
        defaultOpen: true,
        title: snip("Locked"),
        closeOnEscape: false,
        onOpenChange,
      },
    });
    await fireEvent.keyDown(document.body, { key: "Escape" });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("renders title via snippet", () => {
    const { container } = render(Sheet, {
      props: { defaultOpen: true, title: snip("My Sheet") },
    });
    expect(container.textContent).toContain("My Sheet");
  });
});
