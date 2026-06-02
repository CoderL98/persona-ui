/**
 * Persona UI — Data attribute generator
 * Creates attribute entries for data-* attributes based on component state.
 */

type DataAttrRecord = Record<string, string | boolean | undefined | null>;

/**
 * Generates a flat record of data attributes for component state tracking.
 * Keys prefixed with 'data-' automatically.
 */
export function dataAttrs(attrs: DataAttrRecord): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(attrs)) {
    if (value === true) {
      result[`data-${key}`] = "";
    } else if (value !== false && value !== null && value !== undefined) {
      result[`data-${key}`] = String(value);
    }
  }
  return result;
}
