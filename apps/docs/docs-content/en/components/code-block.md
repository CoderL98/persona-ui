---
title: CodeBlock
group: components
---

# CodeBlock

A syntax-highlighted code display component with a built-in copy button, line numbers, and 12 supported languages.

## Import

```svelte
<script>
  import { CodeBlock } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                                    | Default      | Description                              |
| ---------------- | ------------------------------------------------------- | ------------ | ---------------------------------------- |
| `code`           | `string`                                                | —            | Code content                             |
| `language`       | `CodeBlockLanguage`                                     | `'ts'`       | Syntax language                          |
| `showLanguage`   | `boolean`                                               | `true`       | Show the language label                  |
| `showCopy`       | `boolean`                                               | `true`       | Show the copy button                     |
| `filename`       | `string`                                                | —            | File name shown in header                |
| `showLineNumbers` | `boolean`                                              | `false`      | Show line numbers                        |
| `maxHeight`      | `number`                                                | —            | Max height in px before scroll           |
| `onCopy`         | `() => void`                                            | —            | Fired when copy succeeds                 |

### `CodeBlockLanguage`

```ts
type CodeBlockLanguage = 'svelte' | 'ts' | 'tsx' | 'js' | 'jsx' | 'html' | 'css' | 'json' | 'bash' | 'sh' | 'md' | 'yaml';
```

## Usage

### Basic

```svelte
<CodeBlock code="const x = 1;" language="ts" />
```

### With filename (hides language label)

```svelte
<CodeBlock
  code={`<script>
  let count = $state(0);
</script>`}
  language="svelte"
  filename="Counter.svelte"
/>
```

### With line numbers and max height

```svelte
<CodeBlock
  code={longCode}
  showLineNumbers
  maxHeight={400}
/>
```

### Without copy button

```svelte
<CodeBlock code="x = 1" showCopy={false} />
```

## Behavior

- Copy uses the Clipboard API with a fallback to `document.execCommand('copy')` for non-secure contexts
- After copy, the icon swaps to a checkmark for 1.5 seconds
- The header (filename/language) is hidden when no filename/language/copy options are set
- Syntax highlighting is lightweight regex-based (no external library)

## Accessibility

- The container has `aria-label`
- The copy button has a clear `aria-label`
- Line numbers are `aria-hidden="true"` (decorative)
