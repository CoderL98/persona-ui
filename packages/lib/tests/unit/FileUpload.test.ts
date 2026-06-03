import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import FileUpload from "$lib/components/file-upload/FileUpload.svelte";

describe("FileUpload", () => {
  it("renders without crashing", () => {
    render(FileUpload);
    expect(document.querySelector(".pui-file-upload")).toBeTruthy();
  });

  it("renders placeholder text", () => {
    render(FileUpload, { props: { placeholder: "Drop your file here" } });
    expect(document.body.textContent).toContain("Drop your file here");
  });

  it("renders hidden file input with accept", () => {
    render(FileUpload, { props: { accept: "image/*" } });
    const input = document.querySelector("input[type='file']") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.accept).toBe("image/*");
  });

  it("supports multiple file selection", () => {
    render(FileUpload, { props: { multiple: true } });
    const input = document.querySelector("input[type='file']") as HTMLInputElement;
    expect(input.multiple).toBe(true);
  });

  it("shows helper text when provided", () => {
    render(FileUpload, { props: { helperText: "Up to 10MB" } });
    expect(document.body.textContent).toContain("Up to 10MB");
  });

  it("shows error with alert role", () => {
    render(FileUpload, { props: { error: "File too large" } });
    const err = document.querySelector("[role='alert']");
    expect(err?.textContent).toContain("File too large");
  });

  it("renders file list when defaultValue has files", () => {
    const files = [
      { name: "test.txt", size: 1024, type: "text/plain" },
      { name: "image.png", size: 2048, type: "image/png" },
    ];
    render(FileUpload, { props: { defaultValue: files } });
    expect(document.body.textContent).toContain("test.txt");
    expect(document.body.textContent).toContain("image.png");
  });

  it("triggers onValueChange when files are added", async () => {
    const onValueChange = vi.fn();
    render(FileUpload, { props: { onValueChange } });
    const input = document.querySelector("input[type='file']") as HTMLInputElement;
    const file = new File(["hello"], "hello.txt", { type: "text/plain" });
    Object.defineProperty(input, "files", { value: [file], writable: false });
    await fireEvent.change(input);
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange.mock.calls[0][0][0].name).toBe("hello.txt");
  });

  it("filters by maxSize", async () => {
    const onValueChange = vi.fn();
    render(FileUpload, { props: { maxSize: 100, onValueChange } });
    const input = document.querySelector("input[type='file']") as HTMLInputElement;
    const file = new File(["x".repeat(200)], "big.txt", { type: "text/plain" });
    Object.defineProperty(input, "files", { value: [file], writable: false });
    await fireEvent.change(input);
    expect(onValueChange.mock.calls[0][0].length).toBe(0);
  });

  it("removes file from list", async () => {
    const files = [{ name: "test.txt", size: 1024, type: "text/plain" }];
    const onRemove = vi.fn();
    render(FileUpload, { props: { defaultValue: files, onRemove } });
    const removeBtn = document.querySelector("button[aria-label='Remove']") as HTMLButtonElement;
    await fireEvent.click(removeBtn);
    expect(onRemove).toHaveBeenCalledWith(0);
    expect(document.body.textContent).not.toContain("test.txt");
  });

  it("disabled state prevents click", () => {
    render(FileUpload, { props: { disabled: true } });
    const dropzone = document.querySelector("[role='button']") as HTMLElement;
    expect(dropzone.getAttribute("aria-disabled")).toBe("true");
  });
});
