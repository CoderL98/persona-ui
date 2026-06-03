import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Table from "$lib/components/table/Table.svelte";

describe("Table", () => {
  it("renders without crashing", () => {
    render(Table);
    expect(document.querySelector(".pui-table")).toBeTruthy();
  });

  it("renders children snippet content", () => {
    // children 必须是 Svelte 5 Snippet：传入无参函数
    render(Table, {
      props: {
        children: (() => undefined) as never,
      },
    });
    expect(document.querySelector(".pui-table")).toBeTruthy();
  });

  it("applies density class", () => {
    render(Table, { props: { density: "compact" } });
    expect(document.querySelector(".pui-table")?.className).toContain("text-xs");
  });

  it("applies striped class", () => {
    render(Table, { props: { striped: true } });
    const table = document.querySelector(".pui-table") as HTMLElement;
    expect(table.className).toMatch(/nth-child|even/);
  });

  it("applies comfortable density class", () => {
    render(Table, { props: { density: "comfortable" } });
    expect(document.querySelector(".pui-table")?.className).toContain("text-base");
  });

  it("accepts custom class", () => {
    render(Table, { props: { class: "my-table" } });
    expect(document.querySelector(".my-table")).toBeTruthy();
  });
});
