<!--
  全局错误页（404 / 500）
  - 品牌化：错误也保持与正常页一致的视觉
  - i18n：从当前 URL 段提取 locale，未识别则回退到默认
  - SSR 友好：纯静态，不依赖 document/window
-->
<script lang="ts">
	import { page } from '$app/state';
	import { t } from '$lib/i18n/t';
	import { currentLocale } from '$lib/i18n/store.svelte';
	import { localeToPath } from '$lib/i18n/locales';

	// 取 URL 第一段作为 locale，未识别则用 store 当前值
	const seg = $derived(page.url.pathname.split('/').filter(Boolean)[0]);
	const locale = $derived(currentLocale.value);
	const homeHref = $derived(localeToPath(locale) || '/');

	// 状态码：404 / 500 / 其它
	const status = $derived(page.status ?? 404);
	const isNotFound = $derived(status === 404);
</script>

<svelte:head>
	<title>{isNotFound ? t('notFoundTitle') : `Error ${status}`} · Persona UI</title>
</svelte:head>

<div class="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
	<!-- 大字状态码（仅装饰，aria-hidden） -->
	<span
		class="font-(family-name:--pui-font-display) text-7xl font-normal leading-none
               text-(--pui-text-disabled) sm:text-8xl"
		aria-hidden="true"
	>
		{status}
	</span>

	<h1
		class="mt-6 font-(family-name:--pui-font-display) text-3xl font-normal
               tracking-[-0.01em] text-(--pui-text-primary) sm:text-4xl"
	>
		{isNotFound ? t('notFoundTitle') : `Error ${status}`}
	</h1>

	<p class="mt-3 text-base text-(--pui-text-secondary)">
		{isNotFound ? t('notFoundBody') : (page.error?.message ?? t('notFoundBody'))}
	</p>

	<!-- 当前 URL（调试用，code 等宽字体） -->
	<p
		class="mt-4 inline-block max-w-full truncate rounded-(--pui-radius-control)
               border border-(--pui-outline-subtle) bg-(--pui-surface-base)
               px-3 py-1.5 font-(family-name:--pui-font-mono) text-xs
               text-(--pui-text-tertiary)"
		title={page.url.pathname}
	>
		{page.url.pathname}
	</p>

	<a
		href={homeHref}
		class="mt-8 inline-flex items-center gap-2 rounded-(--pui-radius-container)
               bg-(--pui-color-primary) px-5 py-2.5
               font-medium text-(--pui-color-on-primary)
               shadow-(--pui-elevation-1)
               transition-transform duration-(--pui-duration-enter)
               hover:scale-[1.02] active:scale-[0.98]
               focus-visible:outline-2 focus-visible:outline-offset-2
               focus-visible:outline-(--pui-color-primary)"
	>
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
			<path d="M9 2.5L4.5 7 9 11.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		{t('notFoundHome')}
	</a>
</div>
