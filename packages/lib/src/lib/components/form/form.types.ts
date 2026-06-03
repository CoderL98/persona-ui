import type { Snippet } from "svelte";

export type FormLayout = "vertical" | "horizontal";

export type FormProps = {
  /** Form submit handler */
  onSubmit?: (e: SubmitEvent) => void;
  /** Layout: vertical (stacked) or horizontal (label left, control right) */
  layout?: FormLayout;
  /** Disable all child fields (using Fieldset disabled attribute) */
  disabled?: boolean;
  /** Form children (any form fields) */
  children?: Snippet;
  /** Actions area (buttons) - rendered in the footer */
  actions?: Snippet;
  /** Additional CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
};
