import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Timeline from "$lib/components/timeline/Timeline.svelte";

describe("Timeline", () => {
  const items = [
    { id: "1", title: "Account created", timestamp: "Jan 1" },
    { id: "2", title: "Profile updated", timestamp: "Jan 5" },
    { id: "3", title: "Email verified", timestamp: "Jan 10", status: "success" as const },
  ];

  it("renders without crashing", () => {
    render(Timeline, { props: { items } });
    expect(document.querySelector(".pui-timeline")).toBeTruthy();
  });

  it("renders all items", () => {
    render(Timeline, { props: { items } });
    const lis = document.querySelectorAll("ol li");
    expect(lis.length).toBe(3);
  });

  it("renders titles and timestamps", () => {
    render(Timeline, { props: { items } });
    expect(document.body.textContent).toContain("Account created");
    expect(document.body.textContent).toContain("Jan 1");
  });

  it("uses vertical orientation by default", () => {
    render(Timeline, { props: { items } });
    expect(document.querySelector(".pui-timeline")?.className).toContain("flex-col");
  });

  it("supports horizontal orientation", () => {
    render(Timeline, { props: { items, orientation: "horizontal" } });
    expect(document.querySelector(".pui-timeline-horizontal")?.className).toContain("flex-row");
  });

  it("highlights active item", () => {
    render(Timeline, { props: { items, activeIndex: 1 } });
    // The second item's title should have text-primary class
    const titles = document.querySelectorAll("li p.text-sm");
    expect(titles[1]?.className).toContain("text-primary");
  });

  it("renders status dots in different colors", () => {
    render(Timeline, { props: { items } });
    const dots = document.querySelectorAll("li > div > div.rounded-full");
    expect(dots[2]?.className).toContain("success");
  });

  it("renders pending animation on last item", () => {
    render(Timeline, { props: { items, pending: true } });
    const lastLine = document.querySelectorAll("li > div > div.animate-pulse");
    expect(lastLine.length).toBe(1);
  });

  it("has aria-label on root", () => {
    render(Timeline, { props: { items, "aria-label": "Order history" } });
    const root = document.querySelector("ol[aria-label='Order history']");
    expect(root).toBeTruthy();
  });
});
