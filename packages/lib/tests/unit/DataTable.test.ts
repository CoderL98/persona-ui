import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/svelte";
import DataTable from "$lib/components/data-table/DataTable.svelte";
describe("DataTable", () => {
  const data = [
    { id: "1", name: "Alice", age: 30 },
    { id: "2", name: "Bob", age: 25 },
    { id: "3", name: "Charlie", age: 35 },
  ];
  const columns = [
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
  ];

  it("renders", () => {
    render(DataTable, { props: { data, columns } });
    expect(document.querySelector("table")).toBeTruthy();
  });
  it("renders all rows", () => {
    render(DataTable, { props: { data, columns } });
    expect(document.querySelectorAll("tbody tr").length).toBe(3);
  });
  it("renders column headers", () => {
    render(DataTable, { props: { data, columns } });
    const headers = document.querySelectorAll("th");
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toBe("Name");
    expect(headers[1].textContent).toBe("Age");
  });
  it("renders cells from data", () => {
    render(DataTable, { props: { data, columns } });
    const rows = document.querySelectorAll("tbody tr");
    expect(rows[0].textContent).toContain("Alice");
    expect(rows[1].textContent).toContain("Bob");
  });
  it("renders sort button when column.sortable", () => {
    const sortCols = [
      { key: "name", header: "Name", sortable: true },
      { key: "age", header: "Age" },
    ];
    render(DataTable, { props: { data, columns: sortCols } });
    expect(document.querySelectorAll("th button").length).toBe(1);
  });
  it("fires onSort when clicking sortable header", () => {
    const onSort = vi.fn();
    const sortCols = [
      { key: "name", header: "Name", sortable: true },
    ];
    render(DataTable, { props: { data, columns: sortCols, onSort } });
    (document.querySelector<HTMLElement>("th button"))?.click();
    expect(onSort).toHaveBeenCalledWith("name", "asc");
  });
  it("renders selectable checkboxes", () => {
    render(DataTable, { props: { data, columns, selectable: true } });
    expect(document.querySelectorAll('thead input[type="checkbox"]').length).toBe(1);
    expect(document.querySelectorAll('tbody input[type="checkbox"]').length).toBe(3);
  });
  it("renders cell with default string conversion", () => {
    // When no render snippet provided, it uses String(row[key])
    render(DataTable, { props: { data, columns } });
    expect(document.querySelector("td")?.textContent).toBe("Alice");
  });
});
