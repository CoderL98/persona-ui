import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Popover from "$lib/components/popover/Popover.svelte";

const snip = (str: string) =>
  createRawSnippet<[]>(() => ({ render: () => `<span>${str}</span>` }));

describe("Popover", () => {
  it("renders popover container with .pui-popover class", () => {
    const { container } = render(Popover, { props: { children: snip("Hello") } });
    expect(container.querySelector(".pui-popover")).toBeTruthy();
  });

  it("does not show children content when closed", () => {
    const { container } = render(Popover, {
      props: { children: snip("Hidden text"), defaultOpen: false },
    });
    expect(container.textContent).not.toContain("Hidden text");
  });

  it("shows children content when open (defaultOpen=true)", () => {
    const { container } = render(Popover, {
      props: { children: snip("Visible text"), defaultOpen: true },
    });
    const popover = container.querySelector(".pui-popover");
    expect(popover).toBeTruthy();
    expect(container.textContent).toContain("Visible text");
  });

  it("applies custom data-testid via rest spread", () => {
    const { container } = render(Popover, {
      props: { "data-testid": "my-popover" },
    });
    expect(container.querySelector('[data-testid]')).toBeTruthy();
  });

  it("accepts onOpenChange callback without error", () => {
    const onOpenChange = vi.fn();
    const { container } = render(Popover, { props: { onOpenChange } });
    expect(container.querySelector(".pui-popover")).toBeTruthy();
  });
});
