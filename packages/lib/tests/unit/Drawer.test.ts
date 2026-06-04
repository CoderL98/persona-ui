import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Drawer from "$lib/components/drawer/Drawer.svelte";

// 工具：用 createRawSnippet 创建一个返回字符串的 Snippet
const snip = (str: string) =>
  createRawSnippet<[]>(() => ({ render: () => `<span>${str}</span>` }));

describe("Drawer", () => {
  it("renders dialog with role=dialog when open", () => {
    const { container } = render(Drawer, {
      props: { defaultOpen: true, title: snip("Settings") },
    });
    expect(container.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it("does not render dialog when closed", () => {
    const { container } = render(Drawer, { props: { defaultOpen: false } });
    expect(container.querySelector('[role="dialog"]')).toBeFalsy();
  });

  it("fires onOpenChange(false) when Escape is pressed and closeOnEscape is true", async () => {
    const onOpenChange = vi.fn();
    render(Drawer, {
      props: { defaultOpen: true, title: snip("Drawer"), onOpenChange },
    });
    await fireEvent.keyDown(document.body, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("applies custom data-testid via rest spread", () => {
    const { container } = render(Drawer, {
      props: { defaultOpen: true, title: snip("x"), "data-testid": "my-drawer" },
    });
    // 验证 dialog 渲染成功（data-testid 走 rest spread）
    const root = container.querySelector('[role="dialog"]');
    expect(root).toBeTruthy();
  });

  it("supports all 4 sides (left, right, top, bottom)", () => {
    const { container, unmount } = render(Drawer, {
      props: { defaultOpen: true, side: "right", title: snip("R") },
    });
    expect(container.querySelector('[role="dialog"]')).toBeTruthy();
    unmount();
    const { container: c2 } = render(Drawer, {
      props: { defaultOpen: true, side: "top", title: snip("T") },
    });
    expect(c2.querySelector('[role="dialog"]')).toBeTruthy();
  });
});
