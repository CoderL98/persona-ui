import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import Select from "$lib/components/select/Select.svelte";

describe("Select", () => {
  it("renders custom dropdown by default", () => {
    render(Select, {
      props: { options: [{ value: "a", label: "A" }] },
    });
    // custom mode uses a button[role=combobox] trigger
    expect(document.querySelector('button[role="combobox"]')).toBeTruthy();
  });

  it("renders native select when native=true", () => {
    render(Select, {
      props: {
        native: true,
        name: "fav",
        defaultValue: "a",
        options: [
          { value: "a", label: "Apple" },
          { value: "b", label: "Banana" },
        ],
      },
    });
    const native = document.querySelector('select') as HTMLSelectElement;
    expect(native).toBeTruthy();
    expect(native.name).toBe("fav");
    // The non-native button[role=combobox] should NOT be rendered
    expect(document.querySelector('button[role="combobox"]')).toBeNull();
    const opts = native.querySelectorAll("option");
    expect(opts.length).toBe(2);
  });
});
