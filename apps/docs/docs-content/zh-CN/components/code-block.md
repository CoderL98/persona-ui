---
title: CodeBlock
group: components
---

# CodeBlock

语法高亮代码展示组件，内置复制按钮、行号和 12 种支持语言。

## Import

```svelte
<script>
  import { CodeBlock } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                                    | Default      | Description                |
| ---------------- | ------------------------------------------------------- | ------------ | -------------------------- |
| `code`           | `string`                                                | —            | 代码内容                    |
| `language`       | `CodeBlockLanguage`                                     | `'ts'`       | 语法语言                    |
| `showLanguage`   | `boolean`                                               | `true`       | 显示语言标签                |
| `showCopy`       | `boolean`                                               | `true`       | 显示复制按钮                |
| `filename`       | `string`                                                | —            | 头部显示的文件名            |
| `showLineNumbers` | `boolean`                                              | `false`      | 显示行号                    |
| `maxHeight`      | `number`                                                | —            | 滚动前最大高度（px）         |
| `onCopy`         | `() => void`                                            | —            | 复制成功时触发              |

### `CodeBlockLanguage`

```ts
type CodeBlockLanguage = 'svelte' | 'ts' | 'tsx' | 'js' | 'jsx' | 'html' | 'css' | 'json' | 'bash' | 'sh' | 'md' | 'yaml';
```

## Usage

### 基础

```svelte
<CodeBlock code="const x = 1;" language="ts" />
```

### 带文件名（自动隐藏语言标签）

```svelte
<CodeBlock
  code={`<script>
  let count = $state(0);
</script>`}
  language="svelte"
  filename="Counter.svelte"
/>
```

### 带行号和最大高度

```svelte
<CodeBlock
  code={longCode}
  showLineNumbers
  maxHeight={400}
/>
```

### 不显示复制按钮

```svelte
<CodeBlock code="x = 1" showCopy={false} />
```

## 行为

- 复制使用 Clipboard API，非安全上下文回退到 `document.execCommand('copy')`
- 复制后图标切换为勾选 1.5 秒
- 没有 filename/language/copy 时不显示头部
- 语法高亮是轻量正则实现，无外部依赖

## Accessibility

- 容器有 `aria-label`
- 复制按钮有清晰的 `aria-label`
- 行号 `aria-hidden="true"`（装饰性）
