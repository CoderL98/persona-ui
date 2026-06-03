export type ColorPickerFormat = "hex" | "rgb" | "hsl";

export type ColorPickerProps = {
  /** Controlled color value (hex string) */
  value?: string;
  /** Default color for uncontrolled mode */
  defaultValue?: string;
  /** Show a palette of preset colors */
  showPalette?: boolean;
  /** Custom palette (hex strings) */
  palette?: string[];
  /** Show hex input field */
  showInput?: boolean;
  /** Format for the input */
  format?: ColorPickerFormat;
  /** Disabled state */
  disabled?: boolean;
  /** Aria label */
  "aria-label"?: string;
  /** Called whenever the color changes */
  onValueChange?: (color: string) => void;
  /** CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
