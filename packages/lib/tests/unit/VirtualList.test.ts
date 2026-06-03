import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import VirtualList from "$lib/components/virtual-list/VirtualList.svelte";
import type { Snippet } from "svelte";

describe("VirtualList", () => {
  const items = (idx: number) => `Item ${idx}`;

  it("renders without crashing", () => {
    const itemSnippet: Snippet<[{ index: number; style: string }]> = (props) => {
      const div = document.createElement("div");
      div.textContent = `Item ${props.index}`;
      return div as unknown as import("svelte").SnippetReturn;
    };
    render(VirtualList, {
      props: {
        itemCount: 1000,
        itemHeight: 40,
        height: 400,
        item: itemSnippet,
      },
    });
    expect(document.querySelector(".pui-virtual-list")).toBeTruthy();
  });

  it("only renders visible items, not all of them", () => {
    let renderedCount = 0;
    const itemSnippet: Snippet<[{ index: number; style: string }]> = ((props: { index: number; style: string }) => {
      renderedCount++;
      const div = document.createElement("div");
      div.textContent = items(props.index);
      return div as unknown as import("svelte").SnippetReturn;
    }) as unknown as Snippet<[{ index: number; style: string }]>;
    render(VirtualList, {
      props: {
        itemCount: 1000,
        itemHeight: 40,
        height: 400,
        item: itemSnippet,
      },
    });
    // height 400 / itemHeight 40 = 10 items + overscan 3*2 = 16 items max
    expect(renderedCount).toBeLessThan(50);
    expect(renderedCount).toBeGreaterThan(5);
  });

  it("sets total height for scrollbar", () => {
    const itemSnippet: Snippet<[{ index: number; style: string }]> = (() => {
      const div = document.createElement("div");
      return div as unknown as import("svelte").SnippetReturn;
    }) as unknown as Snippet<[{ index: number; style: string }]>;
    render(VirtualList, {
      props: {
        itemCount: 1000,
        itemHeight: 40,
        height: 400,
        item: itemSnippet,
      },
    });
    const inner = document.querySelector(".pui-virtual-list > div") as HTMLElement;
    expect(inner.style.height).toBe("40000px");
  });

  it("fires onRangeChange on mount", () => {
    const onRangeChange = vi.fn();
    const itemSnippet: Snippet<[{ index: number; style: string }]> = (() => {
      const div = document.createElement("div");
      return div as unknown as import("svelte").SnippetReturn;
    }) as unknown as Snippet<[{ index: number; style: string }]>;
    render(VirtualList, {
      props: {
        itemCount: 1000,
        itemHeight: 40,
        height: 400,
        item: itemSnippet,
        onRangeChange,
      },
    });
    expect(onRangeChange).toHaveBeenCalled();
  });

  it("updates visible range on scroll", async () => {
    const onRangeChange = vi.fn();
    const itemSnippet: Snippet<[{ index: number; style: string }]> = (() => {
      const div = document.createElement("div");
      return div as unknown as import("svelte").SnippetReturn;
    }) as unknown as Snippet<[{ index: number; style: string }]>;
    render(VirtualList, {
      props: {
        itemCount: 1000,
        itemHeight: 40,
        height: 400,
        item: itemSnippet,
        onRangeChange,
      },
    });
    const viewport = document.querySelector(".pui-virtual-list") as HTMLElement;
    viewport.scrollTop = 4000;
    await fireEvent.scroll(viewport);
    // Should have been called again
    expect(onRangeChange.mock.calls.length).toBeGreaterThan(1);
  });
});
