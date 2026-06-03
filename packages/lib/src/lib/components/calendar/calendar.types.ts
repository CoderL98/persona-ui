
export type CalendarProps = {
  value?: Date;
  defaultValue?: Date;
  min?: Date;
  max?: Date;
  locale?: string;
  disabledDates?: Date[];
  /** Override display texts for this instance */
  texts?: Record<string, string>;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onValueChange?: (date: Date) => void;
};
