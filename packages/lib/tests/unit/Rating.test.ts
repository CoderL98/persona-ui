import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Rating from "$lib/components/rating/Rating.svelte";

describe("Rating", () => {
  it("renders without crashing", () => {
    render(Rating);
    expect(document.querySelector(".pui-rating")).toBeTruthy();
  });

  it("renders 5 stars by default", () => {
    render(Rating);
    const buttons = document.querySelectorAll(".pui-rating button");
    expect(buttons.length).toBe(5);
  });

  it("respects max prop", () => {
    render(Rating, { props: { max: 10 } });
    const buttons = document.querySelectorAll(".pui-rating button");
    expect(buttons.length).toBe(10);
  });

  it("has role=slider with aria-valuenow", () => {
    render(Rating, { props: { value: 3 } });
    const root = document.querySelector("[role='slider']") as HTMLElement;
    expect(root.getAttribute("aria-valuenow")).toBe("3");
    expect(root.getAttribute("aria-valuemax")).toBe("5");
  });

  it("clicking a star sets value", async () => {
    const onValueChange = vi.fn();
    render(Rating, { props: { onValueChange } });
    const stars = document.querySelectorAll(".pui-rating button");
    await fireEvent.click(stars[2] as HTMLElement);
    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  it("readonly disables click", async () => {
    const onValueChange = vi.fn();
    render(Rating, { props: { readonly: true, onValueChange } });
    const stars = document.querySelectorAll(".pui-rating button");
    await fireEvent.click(stars[2] as HTMLElement);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("disabled disables click", async () => {
    const onValueChange = vi.fn();
    render(Rating, { props: { disabled: true, onValueChange } });
    const stars = document.querySelectorAll(".pui-rating button");
    await fireEvent.click(stars[2] as HTMLElement);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("keyboard ArrowRight increments by 1", async () => {
    const onValueChange = vi.fn();
    render(Rating, { props: { value: 2, onValueChange } });
    const root = document.querySelector("[role='slider']") as HTMLElement;
    root.focus();
    await fireEvent.keyDown(root, { key: "ArrowRight" });
    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  it("keyboard ArrowLeft decrements", async () => {
    const onValueChange = vi.fn();
    render(Rating, { props: { value: 3, onValueChange } });
    const root = document.querySelector("[role='slider']") as HTMLElement;
    root.focus();
    await fireEvent.keyDown(root, { key: "ArrowLeft" });
    expect(onValueChange).toHaveBeenCalledWith(2);
  });

  it("Home sets value to 0", async () => {
    const onValueChange = vi.fn();
    render(Rating, { props: { value: 3, onValueChange } });
    const root = document.querySelector("[role='slider']") as HTMLElement;
    root.focus();
    await fireEvent.keyDown(root, { key: "Home" });
    expect(onValueChange).toHaveBeenCalledWith(0);
  });

  it("End sets value to max", async () => {
    const onValueChange = vi.fn();
    render(Rating, { props: { value: 2, onValueChange } });
    const root = document.querySelector("[role='slider']") as HTMLElement;
    root.focus();
    await fireEvent.keyDown(root, { key: "End" });
    expect(onValueChange).toHaveBeenCalledWith(5);
  });

  it("allowHalf with mouse at left half sets 0.5", async () => {
    const onValueChange = vi.fn();
    render(Rating, { props: { allowHalf: true, onValueChange } });
    const stars = document.querySelectorAll(".pui-rating button");
    // Mock getBoundingClientRect to simulate left half click
    (stars[1] as HTMLElement).getBoundingClientRect = () => ({
      left: 0, top: 0, right: 20, bottom: 20, width: 20, height: 20, x: 0, y: 0, toJSON: () => "",
    });
    await fireEvent.click(stars[1] as HTMLElement, { clientX: 5 });
    expect(onValueChange).toHaveBeenCalledWith(1.5);
  });

  it("fires onHoverChange on mouse move", async () => {
    const onHoverChange = vi.fn();
    render(Rating, { props: { allowHalf: true, onHoverChange } });
    const stars = document.querySelectorAll(".pui-rating button");
    (stars[1] as HTMLElement).getBoundingClientRect = () => ({
      left: 0, top: 0, right: 20, bottom: 20, width: 20, height: 20, x: 0, y: 0, toJSON: () => "",
    });
    await fireEvent.mouseMove(stars[1] as HTMLElement, { clientX: 15 });
    expect(onHoverChange).toHaveBeenCalledWith(2);
  });

  it("has aria-readonly when readonly", () => {
    render(Rating, { props: { readonly: true } });
    const root = document.querySelector("[role='slider']") as HTMLElement;
    expect(root.getAttribute("aria-readonly")).toBe("true");
  });
});
