export type CodeBlockLanguage = "svelte" | "ts" | "tsx" | "js" | "jsx" | "html" | "css" | "json" | "bash" | "sh" | "md" | "yaml";

export type CodeBlockProps = {
  /** Code content */
  code: string;
  /** Programming language for syntax highlighting */
  language?: CodeBlockLanguage;
  /** Show the language label */
  showLanguage?: boolean;
  /** Show the copy button */
  showCopy?: boolean;
  /** File name shown in the header */
  filename?: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Maximum height before scroll (px) */
  maxHeight?: number;
  /** Accessible label */
  "aria-label"?: string;
  /** Called when copy succeeds */
  onCopy?: () => void;
  /** CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
