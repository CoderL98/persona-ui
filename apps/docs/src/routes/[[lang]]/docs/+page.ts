// 默认跳转：访问 /docs 时重定向到该 locale 的 getting-started
import { LOCALES } from '../../../lib/i18n/locales';
import { docs } from '../../../lib/docs';
import { redirect } from '@sveltejs/kit';

export const prerender = true;

export const load = ({ url }: { url: URL }) => {
	const segments = url.pathname.split('/').filter(Boolean);
	const locale = segments[0] && LOCALES.includes(segments[0] as (typeof LOCALES)[number])
		? (segments[0] as (typeof LOCALES)[number])
		: 'en';
	const list = docs(locale);
	const first = list.find((d) => d.slug === 'getting-started') ?? list[0];
	const prefix = locale === 'en' ? '' : `/${locale.toLowerCase()}`;
	throw redirect(302, `${prefix}/docs/${first.slug}`);
};
