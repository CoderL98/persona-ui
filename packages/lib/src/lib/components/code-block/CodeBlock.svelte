<script lang="ts">
  import { cn } from "../../internal/class.js";
  import type { CodeBlockProps } from "./code-block.types.js";

  let {
    code,
    language = "ts",
    showLanguage = true,
    showCopy = true,
    filename,
    showLineNumbers = false,
    maxHeight,
    "aria-label": ariaLabel = "Code block",
    onCopy,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: CodeBlockProps = $props();

  let copied = $state(false);

  // 极简语法高亮（基于正则的轻量 token 分组）
  type Token = { type: string; value: string };
  const tokenPatterns: Array<{ type: string; re: RegExp }> = [
    { type: "comment", re: /\/\/[^\n]*|\/\*[\s\S]*?\*\/|#.*$/gm },
    { type: "string", re: /(["'`])(?:\\.|(?!\1)[^\\])*\1/g },
    { type: "keyword", re: /\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|extends|new|this|super|import|export|from|as|default|null|undefined|true|false|async|await|yield|throw|try|catch|finally|typeof|instanceof|void|in|of|interface|type|enum|public|private|protected|static|readonly|using|namespace|module|declare|abstract|implements|with|package)\b/g },
    { type: "number", re: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g },
    { type: "tag", re: /<\/?[a-zA-Z][^>\s]*|>/g },
    { type: "attr", re: /\b([a-zA-Z_-][\w-]*)(=)/g },
    { type: "punct", re: /[{}[\]();,.]/g },
  ];

  function tokenize(src: string): Token[] {
    // 用一个 mask 把已匹配的区间标记为已占用，再按模式顺序扫描
    const mask = new Array(src.length).fill(false);
    const found: Array<{ start: number; end: number; type: string; value: string }> = [];
    for (const { type, re } of tokenPatterns) {
      re.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(src)) !== null) {
        const start = m.index;
        const end = start + m[0].length;
        let overlap = false;
        for (let i = start; i < end; i++) {
          if (mask[i]) { overlap = true; break; }
        }
        if (!overlap) {
          for (let i = start; i < end; i++) mask[i] = true;
          found.push({ start, end, type, value: m[0] });
        }
      }
    }
    found.sort((a, b) => a.start - b.start);
    const tokens: Token[] = [];
    let cursor = 0;
    for (const f of found) {
      if (f.start > cursor) {
        tokens.push({ type: "text", value: src.slice(cursor, f.start) });
      }
      tokens.push({ type: f.type, value: f.value });
      cursor = f.end;
    }
    if (cursor < src.length) {
      tokens.push({ type: "text", value: src.slice(cursor) });
    }
    return tokens;
  }

  const tokens = $derived(tokenize(code));
  const lineCount = $derived(code.split("\n").length);
  let _autoId = $props.id();
  const codeId = $derived(id ?? _autoId);

  // 将 tokens 序列化为单一 HTML 字符串，避免 Svelte 在 pre 标签内插入空白
  const highlightedHtml = $derived(
    tokens.map((t) => {
      const style = styleMap[t.type] ?? '';
      return `<span style="${style}">${escapeHtml(t.value)}</span>`;
    }).join(""),
  );

  function escapeHtml(s: string): string {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      onCopy?.();
      setTimeout(() => { copied = false; }, 1500);
    } catch {
      // Fallback for non-secure context
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        copied = true;
        onCopy?.();
        setTimeout(() => { copied = false; }, 1500);
      } catch {
        // ignore
      } finally {
        document.body.removeChild(ta);
      }
    }
  }

  const styleMap: Record<string, string> = {
    comment: "color:var(--pui-code-token-comment);font-style:italic",
    string: "color:var(--pui-code-token-string)",
    keyword: "color:var(--pui-code-token-keyword);font-weight:600",
    number: "color:var(--pui-code-token-number)",
    tag: "color:var(--pui-code-token-tag);font-weight:600",
    attr: "color:var(--pui-code-token-attr)",
    punct: "color:var(--pui-code-token-punct)",
    text: "color:var(--pui-code-token-text)",
  };
</script>

<div
  {id}
  class={cn(
    "pui-code-block relative rounded-(--pui-radius-container) border border-(--pui-outline-subtle) bg-(--pui-surface-base) overflow-hidden",
    className,
  )}
  {style}
  data-testid={dataTestId}
  aria-label={ariaLabel}
>
  {#if filename || showLanguage || showCopy}
    <div class="flex items-center justify-between gap-2 px-3 py-1.5 border-b border-(--pui-outline-subtle) bg-(--pui-surface-variant)">
      <div class="flex items-center gap-2 min-w-0">
        {#if filename}
          <span class="text-xs font-mono text-(--pui-text-secondary) truncate">{filename}</span>
        {/if}
        {#if showLanguage && !filename}
          <span class="text-xs font-mono text-(--pui-text-disabled) uppercase">{language}</span>
        {/if}
      </div>
      {#if showCopy}
        <button
          type="button"
          aria-label="Copy code"
          onclick={handleCopy}
          class="shrink-0 p-1 rounded-(--pui-radius-control) text-(--pui-text-secondary) hover:bg-(--pui-surface-base) hover:text-(--pui-text-primary) transition-colors"
        >
          {#if copied}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7l3 3 5-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          {:else}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2" fill="none"/>
              <path d="M5 3V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1" stroke="currentColor" stroke-width="1.2" fill="none"/>
            </svg>
          {/if}
        </button>
      {/if}
    </div>
  {/if}
  <div
    class="overflow-auto"
    style={maxHeight ? `max-height:${maxHeight}px;` : ""}
  >
    <div class={cn("relative", showLineNumbers && "pl-10")}>
      {#if showLineNumbers}
        <span class="absolute left-0 top-3 bottom-3 w-9 pr-2 text-right text-(--pui-text-disabled) select-none border-r border-(--pui-outline-subtle) text-xs font-mono leading-relaxed" aria-hidden="true">{#each Array(lineCount) as _, i}<span class="block">{i + 1}</span>{/each}</span>
      {/if}
      <pre class="p-3 text-xs font-mono leading-relaxed"><code id={codeId} class="block whitespace-pre">{@html highlightedHtml}</code></pre>
    </div>
  </div>
</div>
