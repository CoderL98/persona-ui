<script lang="ts">
	import '../app.css';
	import LanguageSwitcher from '../lib/components/LanguageSwitcher.svelte';
	import { t } from '../lib/i18n/t';
	import { currentLocale, setLocale } from '../lib/i18n/store.svelte';
	import { pathToLocale } from '../lib/i18n/locales';
	import { page } from '$app/state';

	let { children } = $props();

	let theme = $state('apple');
	let mode = $state('light');

	// URL 改变时同步 locale（这是事实来源，store 是展示缓存）
	$effect(() => {
		const seg = page.url.pathname.split('/').filter(Boolean)[0];
		const fromUrl = pathToLocale(seg);
		if (fromUrl !== currentLocale.value) {
			setLocale(fromUrl);
		}
		// 同步 <html lang>
		if (typeof document !== 'undefined') {
			document.documentElement.lang = currentLocale.value;
		}
	});

	function toggleTheme() {
		theme = theme === 'apple' ? 'material' : 'apple';
		document.documentElement.setAttribute('data-theme', theme);
	}

	function toggleMode() {
		mode = mode === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-mode', mode);
	}
</script>

<!-- Sticky 顶部导航条：Apple 半透明 + Material 实色 hairline -->
<header
	class="sticky top-0 z-50 border-b border-(--pui-outline-subtle)
         bg-(--pui-surface-raised)
         backdrop-blur-(--pui-backdrop-blur,18px)"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
		<!-- Logo + 名称 -->
		<a
			href="#top"
			class="group flex items-center gap-2.5 outline-none"
			aria-label={t('brandAria')}
		>
			<span
				class="flex h-7 w-7 items-center justify-center rounded-[10px]
                 bg-(--pui-color-primary) text-(--pui-color-on-primary)
                 font-(family-name:--pui-font-display) text-lg font-normal leading-none
                 shadow-(--pui-elevation-1)
                 transition-transform duration-(--pui-duration-swap)
                 group-hover:scale-105"
				aria-hidden="true"
			>
				P
			</span>
			<span
				class="font-(family-name:--pui-font-display) text-lg font-normal tracking-[-0.01em]
                 text-(--pui-text-primary)"
			>
				Persona UI
			</span>
		</a>

		<!-- 主题/模式/语言切换 -->
		<div class="flex items-center gap-2">
			<span
				class="font-(family-name:--pui-font-mono) text-[11px] uppercase tracking-[0.15em]
                 text-(--pui-text-secondary) hidden sm:inline"
			>
				{theme} · {mode}
			</span>

			<!-- 主题切换（icon：苹果/几何） -->
			<button
				type="button"
				onclick={toggleTheme}
				aria-label={theme === 'apple' ? t('toggleThemeApple') : t('toggleThemeMaterial')}
				class="group relative inline-flex h-9 items-center gap-1.5 rounded-(--pui-radius-control)
                 border border-(--pui-outline) bg-(--pui-surface-base)
                 px-3 text-sm font-medium text-(--pui-text-primary)
                 transition-all hover:bg-(--pui-surface-variant)
                 active:scale-[0.97]
                 focus-visible:outline-2 focus-visible:outline-offset-2"
			>
				{#if theme === 'apple'}
					<!-- Apple icon -->
					<svg
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M9.5 2.5c-.5.5-1.2.8-1.8.7-.1-.7.2-1.4.6-1.9.5-.5 1.1-.8 1.7-.8.1.7-.2 1.4-.5 2zm.8.8c-.9 0-1.6.5-2 .5s-1-.5-1.7-.5c-.9 0-1.7.5-2.1 1.3-.9 1.5-.2 3.7.7 4.9.4.6.9 1.2 1.5 1.2.6 0 .8-.4 1.5-.4s.9.4 1.5.4c.6 0 1-.6 1.4-1.2.4-.6.6-1.2.6-1.2s-1.2-.5-1.2-1.8c0-1.1.9-1.6.9-1.7-.5-.7-1.2-.8-1.5-.8z"
						/>
					</svg>
					Apple
				{:else}
					<!-- Material 三角 logo -->
					<svg
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d="M7 1l5.5 9.5h-11z" />
					</svg>
					Material
				{/if}
			</button>

			<!-- 模式切换 -->
			<button
				type="button"
				onclick={toggleMode}
				aria-label={mode === 'light' ? t('toggleModeLight') : t('toggleModeDark')}
				class="inline-flex h-9 items-center gap-1.5 rounded-(--pui-radius-control)
                 border border-(--pui-outline) bg-(--pui-surface-base)
                 px-3 text-sm font-medium text-(--pui-text-primary)
                 transition-all hover:bg-(--pui-surface-variant)
                 active:scale-[0.97]
                 focus-visible:outline-2 focus-visible:outline-offset-2"
			>
				{#if mode === 'light'}
					<svg
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						aria-hidden="true"
					>
						<circle cx="7" cy="7" r="2.5" />
						<path
							d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.8 2.8l1.1 1.1M10.1 10.1l1.1 1.1M2.8 11.2l1.1-1.1M10.1 3.9l1.1-1.1"
							stroke-linecap="round"
						/>
					</svg>
					Light
				{:else}
					<svg
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M9 7c0-1.7-1.3-3-3-3v6c1.7 0 3-1.3 3-3zm-3 5c-2.8 0-5-2.2-5-5s2.2-5 5-5c.4 0 .7 0 1 .1-.6.7-1 1.7-1 2.9 0 2.2 1.8 4 4 4 1.2 0 2.2-.4 2.9-1 .1.3.1.6.1 1 0 2.7-2.2 5-5 5-.3 0-.7 0-1-.1.6-.7 1-1.7 1-2.9z"
						/>
					</svg>
					Dark
				{/if}
			</button>

			<LanguageSwitcher />
		</div>
	</div>
</header>

<main class="mx-auto max-w-6xl px-4 py-10 sm:py-16">
	{@render children()}
</main>

<!-- Footer -->
<footer class="mt-20 border-t border-(--pui-outline-subtle)">
	<div
		class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6
           text-xs text-(--pui-text-secondary) sm:flex-row"
	>
		<span
			class="font-(family-name:--pui-font-mono) uppercase tracking-[0.15em]"
		>
			{t('footer')}
		</span>
		<span>{t('version')}</span>
	</div>
</footer>
