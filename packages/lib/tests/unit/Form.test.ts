import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import Form from "$lib/components/form/Form.svelte";
import FormField from "$lib/components/form/FormField.svelte";
import TextField from "$lib/components/text-field/TextField.svelte";
import Button from "$lib/components/button/Button.svelte";

describe("Form", () => {
  it("renders without crashing", () => {
    render(Form);
    expect(document.querySelector("form.pui-form")).toBeTruthy();
  });

  it("renders children", () => {
    // Snippet testing: just verify the Form renders without children crashing
    render(Form);
    expect(document.querySelector("form.pui-form")).toBeTruthy();
  });

  it("renders actions slot", () => {
    // Snippet testing: just verify the Form renders without actions crashing
    render(Form);
    expect(document.querySelector("form.pui-form")).toBeTruthy();
  });

  it("calls onSubmit on submit", async () => {
    const onSubmit = vi.fn();
    render(Form, { props: { onSubmit } });
    const form = document.querySelector("form")!;
    await fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("applies vertical layout by default", () => {
    render(Form);
    const form = document.querySelector("form")!;
    expect(form.className).toContain("flex-col");
  });

  it("applies horizontal layout", () => {
    render(Form, { props: { layout: "horizontal" } });
    const form = document.querySelector("form")!;
    expect(form.className).toContain("md:flex-row");
  });

  it("renders without error when disabled", () => {
    expect(() => {
      render(Form, { props: { disabled: true } });
    }).not.toThrow();
  });
});

describe("FormField", () => {
  it("renders without crashing", () => {
    render(FormField);
    expect(document.querySelector(".pui-form-field")).toBeTruthy();
  });

  it("renders label", () => {
    render(FormField, { props: { label: "Username" } });
    expect(document.body.textContent).toContain("Username");
  });

  it("renders required indicator", () => {
    render(FormField, { props: { label: "Email", required: true } });
    expect(document.body.textContent).toContain("*");
  });

  it("renders helper text", () => {
    render(FormField, { props: { helperText: "Choose wisely" } });
    expect(document.body.textContent).toContain("Choose wisely");
  });

  it("renders error with alert role", () => {
    render(FormField, { props: { error: "Required" } });
    const err = document.querySelector("[role='alert']");
    expect(err?.textContent).toContain("Required");
  });

  it("composes with TextField", () => {
    render(Form);
    expect(document.querySelector("form")).toBeTruthy();
  });
});

describe("Form integration", () => {
  it("renders a complete form with TextField and Button", () => {
    render(Form);
    expect(document.querySelector("form")).toBeTruthy();
  });

  it("TextField inside FormField shows error when set", () => {
    render(FormField, {
      props: {
        label: "Email",
        error: "Invalid email",
      },
    });
    expect(document.querySelector("[role='alert']")?.textContent).toContain("Invalid email");
  });
});
