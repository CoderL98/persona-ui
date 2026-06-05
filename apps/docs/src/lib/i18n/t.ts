// 翻译函数：从当前 locale 的 messages 表中查 key
// - 简单键（string）：t('ctaGetStarted')
// - 函数键：t('heroDescription', brand('apple'), brand('material'))
// - 主题动态键：tAny(themeDef.labelKey) — 用 string 索引并安全回退到 key 本身
import { messages as en } from './messages/en';
import { messages as zhCN } from './messages/zh-CN';
import { messages as zhTW } from './messages/zh-TW';
import { currentLocale } from './store.svelte';
import type { Locale } from './locales';

const ALL: Record<Locale, typeof en> = {
	en,
	'zh-CN': zhCN,
	'zh-TW': zhTW,
};

// 品牌名：所有 locale 都用相同的英文（HIG / Material 3 不可译）
// 兼容旧调用方 brand('apple')，新代码请改用 themeDef.label
const BRAND = {
	apple: 'Apple HIG',
	material: 'Material 3',
} as const;

export function brand(name: 'apple' | 'material'): string {
	return BRAND[name];
}

type StringKey = {
	[K in keyof typeof en]: (typeof en)[K] extends string ? K : never;
}[keyof typeof en];

// 简单字符串
export function t(key: StringKey): string;
// 函数型键：调用方传参
export function t<K extends keyof typeof en>(
	key: K,
	...args: (typeof en)[K] extends (...a: infer A) => string ? A : never
): string;
// 实现
export function t(key: keyof typeof en, ...args: unknown[]): string {
	const msgs = ALL[currentLocale.value];
	const value = msgs[key];
	if (typeof value === 'function') {
		return (value as (...a: unknown[]) => string)(...args);
	}
	return value as string;
}

/**
 * 用任意字符串键查翻译，找不到时回退到 key 本身
 *
 * 用途：主题系统等动态键（themeDef.labelKey 不可枚举），未来新主题
 * 加了 i18n 键后只需 i18n 文件加键，UI 代码 0 改动。
 */
export function tAny(key: string): string {
	const msgs = ALL[currentLocale.value];
	const value = (msgs as unknown as Record<string, unknown>)[key];
	if (typeof value === 'string') return value;
	return key;
}
