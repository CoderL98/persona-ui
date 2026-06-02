import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Avatar from "$lib/components/avatar/Avatar.svelte";

describe("Avatar", () => {
  it("renders a span", () => {
    render(Avatar);
    expect(document.querySelector(".pui-avatar")).toBeTruthy();
  });

  it("renders image when src provided", () => {
    render(Avatar, { props: { src: "test.jpg", alt: "User" } });
    const img = document.querySelector("img");
    expect(img).toBeTruthy();
    expect(img!.getAttribute("src")).toBe("test.jpg");
    expect(img!.getAttribute("alt")).toBe("User");
  });

  it("renders initials from name", () => {
    render(Avatar, { props: { name: "John Doe" } });
    expect(document.querySelector(".pui-avatar")!.textContent!.trim()).toBe(
      "JD",
    );
  });

  it("forwards class", () => {
    render(Avatar, { props: { class: "custom" } });
    expect(document.querySelector(".pui-avatar")!.className).toContain(
      "custom",
    );
  });
});
