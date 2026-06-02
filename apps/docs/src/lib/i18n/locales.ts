// 站点支持的所有语种
// 顺序：默认（en）在前，便于 locale-agnostic 路径（不加前缀）走默认
export const LOCALES = ['en', 'zh-CN', 'zh-TW'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

// 守卫：判断字符串是否为已知 locale
export function isLocale(s: string | undefined | null): s is Locale {
	return !!s && (LOCALES as readonly string[]).includes(s);
}

// 用于 URL：把 Locale 转换成路径段
// undefined/DEFAULT_LOCALE → ''（不带前缀）
// 其它 → '/<lang>' 形式的段（调用方负责拼接到路径）
export function localeToPath(locale: Locale): string {
	return locale === DEFAULT_LOCALE ? '' : `/${locale}`;
}

// 把 URL 路径段转换回 Locale，找不到则返回默认
export function pathToLocale(seg: string | undefined): Locale {
	if (!seg) return DEFAULT_LOCALE;
	const lower = seg.toLowerCase();
	// 兼容 /zh /zh-cn /zh_CN 等
	if (lower === 'zh' || lower === 'zh-cn' || lower === 'zh_cn') return 'zh-CN';
	if (lower === 'zh-tw' || lower === 'zh_tw' || lower === 'zh-hant') return 'zh-TW';
	if (isLocale(seg)) return seg;
	return DEFAULT_LOCALE;
}

// UI 串的键类型
export type MessageKey = keyof typeof import('./messages/en').messages;
