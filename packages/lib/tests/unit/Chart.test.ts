import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Chart from "$lib/components/chart/Chart.svelte";

describe("Chart", () => {
  it("renders without crashing", () => {
    render(Chart, { props: { kind: "bar", data: [{ label: "A", value: 10 }] } });
    expect(document.querySelector(".pui-chart")).toBeTruthy();
  });

  it("renders bar chart with rect elements", () => {
    render(Chart, {
      props: {
        kind: "bar",
        data: [
          { label: "Jan", value: 10 },
          { label: "Feb", value: 20 },
        ],
      },
    });
    const rects = document.querySelectorAll("svg rect");
    expect(rects.length).toBeGreaterThan(0);
  });

  it("renders line chart with polyline", () => {
    render(Chart, {
      props: {
        kind: "line",
        data: [
          { label: "Jan", value: 10 },
          { label: "Feb", value: 20 },
          { label: "Mar", value: 15 },
        ],
      },
    });
    expect(document.querySelector("polyline")).toBeTruthy();
    const circles = document.querySelectorAll("circle");
    expect(circles.length).toBe(3);
  });

  it("renders pie chart with paths", () => {
    render(Chart, {
      props: {
        kind: "pie",
        data: [
          { label: "A", value: 30 },
          { label: "B", value: 70 },
        ],
      },
    });
    const paths = document.querySelectorAll("svg path");
    expect(paths.length).toBe(2);
  });

  it("shows legend by default", () => {
    render(Chart, {
      props: {
        data: [
          { label: "A", value: 30 },
          { label: "B", value: 70 },
        ],
      },
    });
    expect(document.body.textContent).toContain("A");
    expect(document.body.textContent).toContain("B");
  });

  it("hides legend when showLegend=false", () => {
    render(Chart, {
      props: {
        data: [{ label: "A", value: 30 }],
        showLegend: false,
      },
    });
    const ul = document.querySelector("ul");
    expect(ul).toBeFalsy();
  });

  it("renders bar values when showValues=true", () => {
    render(Chart, {
      props: {
        kind: "bar",
        data: [{ label: "A", value: 50 }],
        showValues: true,
      },
    });
    const texts = Array.from(document.querySelectorAll("text"));
    const has50 = texts.some((t) => t.textContent === "50");
    expect(has50).toBe(true);
  });

  it("renders pie percentage values when showValues=true", () => {
    render(Chart, {
      props: {
        kind: "pie",
        data: [
          { label: "A", value: 50 },
          { label: "B", value: 50 },
        ],
        showValues: true,
      },
    });
    const texts = Array.from(document.querySelectorAll("text"));
    const has50 = texts.some((t) => t.textContent === "50%");
    expect(has50).toBe(true);
  });

  it("fires onPointClick on bar click", async () => {
    const onPointClick = vi.fn();
    render(Chart, {
      props: {
        kind: "bar",
        data: [{ label: "A", value: 30 }],
        onPointClick,
      },
    });
    const rect = document.querySelector("rect[role='button']") as SVGRectElement;
    expect(rect).toBeTruthy();
    await fireEvent.click(rect);
    expect(onPointClick).toHaveBeenCalledWith(0, 0);
  });

  it("supports multiple series", () => {
    render(Chart, {
      props: {
        kind: "bar",
        series: [
          { name: "S1", data: [10, 20] },
          { name: "S2", data: [15, 25] },
        ],
        labels: ["Q1", "Q2"],
      },
    });
    // 2 series * 2 points = 4 rects
    const rects = document.querySelectorAll("rect[role='button']");
    expect(rects.length).toBe(4);
  });

  it("has role=img and aria-label", () => {
    render(Chart, { props: { "aria-label": "Sales chart", data: [{ label: "A", value: 1 }] } });
    const root = document.querySelector("[role='img']");
    expect(root?.getAttribute("aria-label")).toBe("Sales chart");
  });
});
