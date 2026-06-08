<script lang="ts">
	import { onMount } from 'svelte';
	import { getRaw, getTitle, renderHtml } from '../../../../lib/docs';
	import { t } from '../../../../lib/i18n/t';
	import { page } from '$app/state';
	import { localeToPath, LOCALES, pathToLocale } from '../../../../lib/i18n/locales';

	// URL 段是 locale 的唯一权威来源（避免 prerender 时 currentLocale 始终为 en）
	const locale = $derived(pathToLocale(page.params.lang));
	const slug = $derived(page.params.slug ?? '');
	const raw = $derived(getRaw(slug, locale));
	const html = $derived(raw ? enhanceCodeBlocks(renderHtml(raw)) : '');

	const notFound = $derived(!raw);

	// 当前 locale 的 frontmatter 标题（无 frontmatter 时回退到 slug 末段）
	const pageTitle = $derived(getTitle(slug, locale) ?? slug.split('/').pop() ?? '');

	// SEO 用的绝对 URL（SSR 时 fallback 到 production 域名）
	const origin =
		typeof window !== 'undefined' ? window.location.origin : 'https://persona-ui.ricecakecat.com';
	const pageUrl = $derived(`${origin}${localeToPath(locale)}/docs/${slug}`);

	// hreflang：三语互链相同 slug
	const alternates = LOCALES.map((l) => ({
		lang: l,
		href: `${origin}${localeToPath(l)}/docs/${slug}`,
	}));

	/**
	 * 给所有 <pre><code class="language-xxx"> 包装一层带复制按钮的 div。
	 * marked 输出的 HTML 不可信内容（这里来自本地 md），所以解析安全。
	 */
	function enhanceCodeBlocks(input: string): string {
		// 匹配 <pre><code class="language-xxx">...</code></pre>
		return input.replace(
			/<pre>\s*<code(?:\s+class="(?:language-([\w-]+))?")?>([\s\S]*?)<\/code>\s*<\/pre>/g,
			(_match, lang, code) => {
				const langLabel = lang ? lang.toUpperCase() : '';
				const codeText = decodeHtml(code);
			return `<div class="docs-code-block" data-lang="${lang || 'text'}">
				<div class="docs-code-block__bar">
					${langLabel ? `<span class="docs-code-block__lang">${langLabel}</span>` : '<span></span>'}
					<button type="button" class="docs-code-block__copy" aria-label="Copy code" data-copy="${encodeAttr(codeText)}">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
							<rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2" fill="none"/>
							<path d="M5 3V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1" stroke="currentColor" stroke-width="1.2" fill="none"/>
						</svg>
						<span>Copy</span>
					</button>
				</div>
				<pre tabindex="0"><code class="language-${lang || 'text'}">${code}</code></pre>
			</div>`;
			},
		);
	}

	function decodeHtml(s: string): string {
		return s
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")
			.replace(/&amp;/g, '&');
	}

	function encodeAttr(s: string): string {
		return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
	}

	onMount(() => {
		const handler = async (e: Event) => {
			const target = e.target as HTMLElement;
			const btn = target.closest('.docs-code-block__copy') as HTMLButtonElement | null;
			if (!btn) return;
			const code = btn.getAttribute('data-copy') || '';
			try {
				await navigator.clipboard.writeText(code);
				const span = btn.querySelector('span');
				if (span) {
					const original = span.textContent;
					span.textContent = 'Copied';
					setTimeout(() => {
						if (span.textContent === 'Copied') span.textContent = original;
					}, 1500);
				}
			} catch {
				const ta = document.createElement('textarea');
				ta.value = code;
				document.body.appendChild(ta);
				ta.select();
				document.execCommand('copy');
				document.body.removeChild(ta);
			}
		};
		document.addEventListener('click', handler);
		return () => document.removeEventListener('click', handler);
	});
</script>

<svelte:head>
	<title>{pageTitle} — Persona UI</title>
	<meta name="description" content="Persona UI component documentation: {pageTitle}." />

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{pageTitle} — Persona UI" />
	<meta property="og:description" content="Persona UI component documentation: {pageTitle}." />
	<meta property="og:image" content="{origin}/og-image.png" />
	<meta property="og:url" content={pageUrl} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{pageTitle} — Persona UI" />
	<meta name="twitter:description" content="Persona UI component documentation: {pageTitle}." />
	<meta name="twitter:image" content="{origin}/og-image.png" />

	<!-- Canonical + hreflang -->
	<link rel="canonical" href={pageUrl} />
	{#each alternates as alt}
		<link rel="alternate" hreflang={alt.lang} href={alt.href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={alternates[0].href} />
</svelte:head>

{#if notFound}
	<h1>{t('docNotFound')}</h1>
	<p>{@html t('docNotFoundBody', slug)}</p>
{:else}
	<!-- marked 输出的 HTML，受信任的本地 md，无 XSS 风险 -->
	{@html html}
{/if}
