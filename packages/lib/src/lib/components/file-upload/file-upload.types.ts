import type { Snippet } from "svelte";

export type FileUploadStatus = "idle" | "uploading" | "success" | "error";

export type FileUploadFile = {
  name: string;
  size: number;
  type: string;
  url?: string;
};

export type FileUploadProps = {
  /** Controlled list of files (managed externally) */
  value?: FileUploadFile[];
  /** Default value for uncontrolled mode */
  defaultValue?: FileUploadFile[];
  /** Accepted MIME types / extensions, e.g. "image/*,.pdf" */
  accept?: string;
  /** Allow selecting multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Allow only one file (overrides multiple) */
  disabled?: boolean;
  /** Placeholder/empty state */
  placeholder?: string;
  /** Helper text below the dropzone */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Custom leading icon/snippet */
  leading?: Snippet;
  /** Triggered when files are selected (before upload) */
  onValueChange?: (files: FileUploadFile[]) => void;
  /** Triggered when a file is removed */
  onRemove?: (index: number) => void;
  /** CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
  /** Drag-over state callback */
  ondragover?: (e: DragEvent) => void;
  /** Drop event */
  ondrop?: (e: DragEvent) => void;
};
