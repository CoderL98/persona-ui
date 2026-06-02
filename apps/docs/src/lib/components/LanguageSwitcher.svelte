<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { LOCALES, localeToPath, type Locale } from '../i18n/locales';
	import { currentLocale, setLocale, isActiveLocale } from '../i18n/store.svelte';
	import { t } from '../i18n/t';

	// 大小写不敏感的 locale 段判断
	function isLocaleSeg(s: string): boolean {
		const l = s.toLowerCase();
		return l === 'zh' || l === 'zh-cn' || l === 'zh-tw';
	}

	// 剥离路径**开头**所有 locale 段（不限个数，防止历史污染 URL 导致无限拼接）
	// 例：/zh-cn/zh-TW/docs/button → /docs/button
	//     /zh-TW                       → /
	//     /docs/button                  → /docs/button（不变）
	function stripLocaleFromPath(pathname: string): string {
		const segments = pathname.split('/').filter(Boolean);
		let i = 0;
		while (i < segments.length && isLocaleSeg(segments[i])) i++;
		const rest = segments.slice(i).join('/');
		return rest ? `/${rest}` : '/';
	}

	// 当前路由对应的"裸路径"
	const barePath = $derived(stripLocaleFromPath(page.url.pathname));

	function pickLocale(l: Locale): void {
		if (isActiveLocale(l)) return;
		setLocale(l);
		const prefix = localeToPath(l);
		const target = `${prefix}${barePath}${page.url.search}`;
		void goto(target, { replaceState: true, noScroll: true, keepFocus: true });
	}
</script>

<!-- 嵌套在父级玻璃面板中：去除外层 border/bg，仅保留分段控件本体 -->
<div
	class="flex items-center divide-x divide-(--pui-outline-subtle)"
	role="group"
	aria-label={t('langSwitcherAria')}
>
	{#each LOCALES as l (l)}
		<button
			type="button"
			onclick={() => pickLocale(l)}
			aria-pressed={currentLocale.value === l}
			class="inline-flex h-7 min-w-7 items-center justify-center
               px-2 font-(family-name:--pui-font-mono) text-[11px] font-medium uppercase tracking-wider
               transition-colors duration-(--pui-duration-enter)
               focus-visible:outline-2 focus-visible:outline-offset-2
               {currentLocale.value === l
				? 'rounded-(--pui-radius-control) bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)'
				: 'text-(--pui-text-secondary) hover:text-(--pui-text-primary)'}"
		>
			{l === 'en' ? t('langEn') : l === 'zh-CN' ? t('langZhCN') : t('langZhTW')}
		</button>
	{/each}
</div>
