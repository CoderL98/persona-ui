
export type DatePickerProps = {
  value?: Date;
  defaultValue?: Date;
  min?: Date;
  max?: Date;
  locale?: string;
  /** Dates the user cannot pick */
  disabledDates?: Date[];
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  /** Override display texts for this instance */
  texts?: Record<string, string>;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onchange?: (date: Date) => void;
};
