// 当前 locale 的响应式 store
// 用 Svelte 5 rune 模式 + .svelte.ts 标识（编译时注入 $state）
import { browser } from '$app/environment';
import { DEFAULT_LOCALE, isLocale, type Locale } from './locales';

const STORAGE_KEY = 'pui-locale';

function readInitial(): Locale {
	if (!browser) return DEFAULT_LOCALE;
	const stored = localStorage.getItem(STORAGE_KEY);
	if (isLocale(stored)) return stored;
	const nav = navigator.language;
	if (nav.startsWith('zh')) {
		// zh-TW, zh-HK, zh-Hant → zh-TW；其它 → zh-CN
		if (nav.includes('TW') || nav.includes('Hant') || nav.includes('HK')) {
			return 'zh-TW';
		}
		return 'zh-CN';
	}
	return DEFAULT_LOCALE;
}

// 暴露给模板的响应式变量
export const currentLocale = $state<{ value: Locale }>({ value: readInitial() });

export function setLocale(next: Locale) {
	currentLocale.value = next;
	if (browser) {
		localStorage.setItem(STORAGE_KEY, next);
		// 同步 <html lang> 便于 a11y / 浏览器翻译
		document.documentElement.lang = next;
	}
}

export function isActiveLocale(l: Locale): boolean {
	return currentLocale.value === l;
}
