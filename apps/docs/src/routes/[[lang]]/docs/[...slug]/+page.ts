// catch-all doc 路由的 prerender 枚举
// 三种语言 × 每种语言的每个 doc slug
// URL 段统一小写（与 i18n.localeToPath 保持一致）
// en 默认走无前缀路径（`lang: undefined`），避免与 `lang: 'en'` 重复
import type { EntryGenerator } from './$types.js';
import { LOCALES } from '../../../../lib/i18n/locales';
import { docs } from '../../../../lib/docs';

export const prerender = true;

export const entries: EntryGenerator = () => {
	const out: Array<{ lang?: string; slug: string }> = [];
	for (const locale of LOCALES) {
		const list = docs(locale);
		for (const entry of list) {
			if (locale === 'en') {
				out.push({ lang: undefined, slug: entry.slug });
			} else {
				out.push({ lang: locale.toLowerCase(), slug: entry.slug });
			}
		}
	}
	return out;
};
