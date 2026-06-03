import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import SectionHeading from "$lib/components/section-heading/SectionHeading.svelte";

describe("SectionHeading", () => {
  it("renders without crashing", () => {
    render(SectionHeading, { props: { title: "Test" } });
    expect(document.querySelector("[data-pui-section-heading]")).toBeTruthy();
  });

  it("renders title", () => {
    render(SectionHeading, { props: { title: "My Section" } });
    expect(document.body.textContent).toContain("My Section");
  });

  it("renders eyebrow when provided", () => {
    render(SectionHeading, { props: { title: "T", eyebrow: "Category" } });
    expect(document.body.textContent).toContain("Category");
  });

  it("renders description when provided", () => {
    render(SectionHeading, { props: { title: "T", description: "D" } });
    expect(document.body.textContent).toContain("D");
  });

  it("uses h2 by default", () => {
    render(SectionHeading, { props: { title: "T" } });
    expect(document.querySelector("h2")).toBeTruthy();
  });

  it("respects level prop", () => {
    render(SectionHeading, { props: { title: "T", level: 1 } });
    expect(document.querySelector("h1")).toBeTruthy();
  });

  it("accepts custom class", () => {
    render(SectionHeading, { props: { title: "T", class: "custom-cls" } });
    expect(document.querySelector(".custom-cls")).toBeTruthy();
  });
});
