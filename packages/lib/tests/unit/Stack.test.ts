import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Stack from "$lib/components/stack/Stack.svelte";

describe("Stack", () => {
  it("renders without crashing", () => {
    render(Stack);
    expect(document.querySelector("div.flex")).toBeTruthy();
  });

  it("uses flex-col by default", () => {
    render(Stack);
    expect(document.querySelector(".flex-col")).toBeTruthy();
  });

  it("applies row direction", () => {
    render(Stack, { props: { direction: "row" } });
    expect(document.querySelector(".flex-row")).toBeTruthy();
  });

  it("applies gap", () => {
    render(Stack, { props: { gap: 4 } });
    expect(document.querySelector(".gap-4")).toBeTruthy();
  });

  it("applies align-items", () => {
    render(Stack, { props: { align: "center" } });
    expect(document.querySelector(".items-center")).toBeTruthy();
  });

  it("applies justify-content", () => {
    render(Stack, { props: { justify: "between" } });
    expect(document.querySelector(".justify-between")).toBeTruthy();
  });

  it("applies flex-wrap", () => {
    render(Stack, { props: { wrap: "wrap" } });
    expect(document.querySelector(".flex-wrap")).toBeTruthy();
  });

  it("inline-flex when inline=true", () => {
    render(Stack, { props: { inline: true } });
    expect(document.querySelector(".inline-flex")).toBeTruthy();
  });

  it("accepts custom class", () => {
    render(Stack, { props: { class: "my-stack" } });
    expect(document.querySelector(".my-stack")).toBeTruthy();
  });

  it("accepts custom style", () => {
    render(Stack, { props: { style: "background: red;" } });
    const el = document.querySelector("div.flex") as HTMLElement;
    expect(el.getAttribute("style")).toContain("background");
  });

  it("supports reverse directions", () => {
    render(Stack, { props: { direction: "column-reverse" } });
    expect(document.querySelector(".flex-col-reverse")).toBeTruthy();
  });

  it("supports all gap values", () => {
    const { unmount } = render(Stack, { props: { gap: 12 } });
    expect(document.querySelector(".gap-12")).toBeTruthy();
    unmount();
    render(Stack, { props: { gap: 1 } });
    expect(document.querySelector(".gap-1")).toBeTruthy();
  });
});
