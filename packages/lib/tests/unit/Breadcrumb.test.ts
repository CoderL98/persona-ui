import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Breadcrumb from "$lib/components/breadcrumb/Breadcrumb.svelte";

describe("Breadcrumb", () => {
  it("renders items in order with default chevron separator", () => {
    render(Breadcrumb, {
      props: {
        items: [
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs" },
          { label: "Page", current: true },
        ],
      },
    });
    const nav = document.querySelector("nav[aria-label='Breadcrumb']") as HTMLElement;
    expect(nav).toBeTruthy();
    expect(nav.querySelectorAll("li").length).toBe(3);
    const current = nav.querySelector("[aria-current='page']");
    expect(current?.textContent).toContain("Page");
  });

  it("supports custom separator string", () => {
    render(Breadcrumb, {
      props: { separator: ">", items: [{ label: "A" }, { label: "B" }] },
    });
    const nav = document.querySelector("nav") as HTMLElement;
    expect(nav.textContent).toContain(">");
  });

  it("renders item icons when provided", () => {
    render(Breadcrumb, {
      props: {
        items: [
          { label: "Home", icon: (() => {}) as never },
          { label: "Docs" },
        ],
      },
    });
    const nav = document.querySelector("nav") as HTMLElement;
    // The icon snippet container has class "inline-flex items-center"
    const homeLi = Array.from(nav.querySelectorAll("li")).find((li) =>
      li.textContent?.includes("Home"),
    );
    const iconSpan = homeLi?.querySelector("span.inline-flex");
    expect(iconSpan).toBeTruthy();
  });
});
