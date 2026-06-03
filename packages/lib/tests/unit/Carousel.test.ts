import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Carousel from "$lib/components/carousel/Carousel.svelte";
import type { CarouselSlide } from "$lib/components/carousel/carousel.types.js";

const slides: CarouselSlide[] = [
  { id: "1", alt: "First" },
  { id: "2", alt: "Second" },
  { id: "3", alt: "Third" },
];

describe("Carousel", () => {
  it("renders without crashing", () => {
    render(Carousel, { props: { slides } });
    expect(document.querySelector(".pui-carousel")).toBeTruthy();
  });

  it("renders all slides", () => {
    render(Carousel, { props: { slides } });
    const slideEls = document.querySelectorAll("[role='group']");
    expect(slideEls.length).toBe(3);
  });

  it("shows arrows by default", () => {
    render(Carousel, { props: { slides } });
    expect(document.querySelector("button[aria-label='Previous slide']")).toBeTruthy();
    expect(document.querySelector("button[aria-label='Next slide']")).toBeTruthy();
  });

  it("hides arrows when showArrows=false", () => {
    render(Carousel, { props: { slides, showArrows: false } });
    expect(document.querySelector("button[aria-label='Previous slide']")).toBeFalsy();
  });

  it("shows dots by default", () => {
    render(Carousel, { props: { slides } });
    expect(document.querySelectorAll("[role='tab']").length).toBe(3);
  });

  it("hides dots when showDots=false", () => {
    render(Carousel, { props: { slides, showDots: false } });
    expect(document.querySelector("[role='tablist']")).toBeFalsy();
  });

  it("Next button calls onValueChange(1)", async () => {
    const onValueChange = vi.fn();
    render(Carousel, { props: { slides, onValueChange } });
    const nextBtn = document.querySelector("button[aria-label='Next slide']") as HTMLButtonElement;
    await fireEvent.click(nextBtn);
    expect(onValueChange).toHaveBeenCalledWith(1);
  });

  it("Previous button from 0 does not advance (no loop)", async () => {
    const onValueChange = vi.fn();
    render(Carousel, { props: { slides, value: 0, loop: false, onValueChange } });
    const prevBtn = document.querySelector("button[aria-label='Previous slide']") as HTMLButtonElement;
    await fireEvent.click(prevBtn);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("Loop mode wraps from last to first", async () => {
    const onValueChange = vi.fn();
    render(Carousel, { props: { slides, value: 2, loop: true, onValueChange } });
    const nextBtn = document.querySelector("button[aria-label='Next slide']") as HTMLButtonElement;
    await fireEvent.click(nextBtn);
    expect(onValueChange).toHaveBeenCalledWith(0);
  });

  it("Loop mode wraps from first to last with prev", async () => {
    const onValueChange = vi.fn();
    render(Carousel, { props: { slides, value: 0, loop: true, onValueChange } });
    const prevBtn = document.querySelector("button[aria-label='Previous slide']") as HTMLButtonElement;
    await fireEvent.click(prevBtn);
    expect(onValueChange).toHaveBeenCalledWith(2);
  });

  it("clicking a dot goes to that slide", async () => {
    const onValueChange = vi.fn();
    render(Carousel, { props: { slides, onValueChange } });
    const dots = document.querySelectorAll("[role='tab']");
    await fireEvent.click(dots[2] as HTMLElement);
    expect(onValueChange).toHaveBeenCalledWith(2);
  });

  it("current dot has aria-selected=true", () => {
    render(Carousel, { props: { slides, value: 1 } });
    const dots = document.querySelectorAll("[role='tab']");
    expect((dots[1] as HTMLElement).getAttribute("aria-selected")).toBe("true");
  });

  it("keyboard ArrowRight advances", async () => {
    const onValueChange = vi.fn();
    render(Carousel, { props: { slides, onValueChange } });
    const root = document.querySelector(".pui-carousel") as HTMLElement;
    root.focus();
    await fireEvent.keyDown(root, { key: "ArrowRight" });
    expect(onValueChange).toHaveBeenCalledWith(1);
  });

  it("keyboard ArrowLeft goes back", async () => {
    const onValueChange = vi.fn();
    render(Carousel, { props: { slides, value: 2, onValueChange } });
    const root = document.querySelector(".pui-carousel") as HTMLElement;
    root.focus();
    await fireEvent.keyDown(root, { key: "ArrowLeft" });
    expect(onValueChange).toHaveBeenCalledWith(1);
  });

  it("keyboard Home goes to first", async () => {
    const onValueChange = vi.fn();
    render(Carousel, { props: { slides, value: 2, onValueChange } });
    const root = document.querySelector(".pui-carousel") as HTMLElement;
    root.focus();
    await fireEvent.keyDown(root, { key: "Home" });
    expect(onValueChange).toHaveBeenCalledWith(0);
  });

  it("keyboard End goes to last", async () => {
    const onValueChange = vi.fn();
    render(Carousel, { props: { slides, onValueChange } });
    const root = document.querySelector(".pui-carousel") as HTMLElement;
    root.focus();
    await fireEvent.keyDown(root, { key: "End" });
    expect(onValueChange).toHaveBeenCalledWith(2);
  });

  it("has aria-roledescription=carousel", () => {
    render(Carousel, { props: { slides } });
    const root = document.querySelector("[aria-roledescription='carousel']");
    expect(root).toBeTruthy();
  });

  it("renders empty when no slides", () => {
    const { container } = render(Carousel, { props: { slides: [] } });
    expect(container.querySelector(".pui-carousel")).toBeTruthy();
    expect(container.querySelectorAll("[role='group']").length).toBe(0);
  });
});
