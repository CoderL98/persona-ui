import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Pagination from "$lib/components/pagination/Pagination.svelte";

describe("Pagination", () => {
  it("renders without crashing", () => {
    render(Pagination, { props: { total: 5 } });
    expect(document.querySelector("nav.pui-pagination")).toBeTruthy();
  });

  it("renders page buttons for total pages", () => {
    render(Pagination, { props: { total: 5, defaultValue: 1 } });
    const buttons = document.querySelectorAll("button[aria-label^='Page']");
    expect(buttons.length).toBe(5);
  });

  it("highlights current page with aria-current=page", () => {
    render(Pagination, { props: { total: 5, defaultValue: 3 } });
    const current = document.querySelector("[aria-current='page']");
    expect(current?.textContent?.trim()).toBe("3");
  });

  it("uses defaultValue=1 by default", () => {
    render(Pagination, { props: { total: 5 } });
    const current = document.querySelector("[aria-current='page']");
    expect(current?.textContent?.trim()).toBe("1");
  });

  it("renders ellipsis for many pages", () => {
    render(Pagination, { props: { total: 20, defaultValue: 10, siblingCount: 1 } });
    expect(document.body.textContent).toContain("…");
  });

  it("clicking page button changes page", async () => {
    const onValueChange = vi.fn();
    render(Pagination, { props: { total: 5, onValueChange } });
    const page3 = document.querySelector("button[aria-label='Page 3']") as HTMLButtonElement;
    await fireEvent.click(page3);
    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  it("Previous button calls onValueChange with page-1", async () => {
    const onValueChange = vi.fn();
    render(Pagination, { props: { total: 5, defaultValue: 3, onValueChange } });
    const prev = document.querySelector("button[aria-label='Previous page']") as HTMLButtonElement;
    await fireEvent.click(prev);
    expect(onValueChange).toHaveBeenCalledWith(2);
  });

  it("Next button calls onValueChange with page+1", async () => {
    const onValueChange = vi.fn();
    render(Pagination, { props: { total: 5, defaultValue: 2, onValueChange } });
    const next = document.querySelector("button[aria-label='Next page']") as HTMLButtonElement;
    await fireEvent.click(next);
    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  it("disables Previous on first page", () => {
    render(Pagination, { props: { total: 5, defaultValue: 1 } });
    const prev = document.querySelector("button[aria-label='Previous page']") as HTMLButtonElement;
    expect(prev.disabled).toBe(true);
  });

  it("disables Next on last page", () => {
    render(Pagination, { props: { total: 5, defaultValue: 5 } });
    const next = document.querySelector("button[aria-label='Next page']") as HTMLButtonElement;
    expect(next.disabled).toBe(true);
  });

  it("keyboard ArrowLeft/Right navigates", async () => {
    const onValueChange = vi.fn();
    render(Pagination, { props: { total: 5, defaultValue: 3, onValueChange } });
    const inner = document.querySelector("nav.pui-pagination > div")!;
    await fireEvent.keyDown(inner, { key: "ArrowLeft" });
    expect(onValueChange).toHaveBeenLastCalledWith(2);
    await fireEvent.keyDown(inner, { key: "ArrowRight" });
    expect(onValueChange).toHaveBeenLastCalledWith(3);
  });

  it("Home/End jumps to first/last", async () => {
    const onValueChange = vi.fn();
    render(Pagination, { props: { total: 10, defaultValue: 5, onValueChange } });
    const inner = document.querySelector("nav.pui-pagination > div")!;
    await fireEvent.keyDown(inner, { key: "Home" });
    expect(onValueChange).toHaveBeenLastCalledWith(1);
    await fireEvent.keyDown(inner, { key: "End" });
    expect(onValueChange).toHaveBeenLastCalledWith(10);
  });

  it("showJumpTo renders jump input", () => {
    render(Pagination, { props: { total: 10, showJumpTo: true } });
    const input = document.querySelector("input[type='number']") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.max).toBe("10");
  });

  it("jump input submits to set page", async () => {
    const onValueChange = vi.fn();
    render(Pagination, { props: { total: 10, showJumpTo: true, onValueChange } });
    const form = document.querySelector("form")!;
    const input = form.querySelector<HTMLInputElement>("input[type='number']")!;
    input.value = "7";
    await fireEvent.submit(form);
    expect(onValueChange).toHaveBeenCalledWith(7);
  });

  it("disabled state disables all buttons", () => {
    render(Pagination, { props: { total: 5, disabled: true } });
    const buttons = document.querySelectorAll("button");
    buttons.forEach((b) => {
      expect((b as HTMLButtonElement).disabled).toBe(true);
    });
  });

  it("hides first/last edges when showEdges=false", () => {
    render(Pagination, { props: { total: 10, showEdges: false } });
    // 1 and 10 should not be in the list
    const page1 = document.querySelector("button[aria-label='Page 1']");
    const page10 = document.querySelector("button[aria-label='Page 10']");
    expect(page1).toBeFalsy();
    expect(page10).toBeFalsy();
  });
});
