// 首页 prerender 枚举：每个 locale 都有一个路径
// URL 段统一小写（与 i18n.localeToPath 保持一致），所以 entries 用小写
import { LOCALES } from '../../lib/i18n/locales';

export const prerender = true;

export function entries() {
	const out: Array<{ lang?: string }> = [];
	for (const locale of LOCALES) {
		out.push({ lang: locale === 'en' ? undefined : locale.toLowerCase() });
	}
	return out;
}
