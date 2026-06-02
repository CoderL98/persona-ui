import { redirect } from '@sveltejs/kit';
import { docs } from '../../../lib/docs';
import { pathToLocale, localeToPath } from '../../../lib/i18n/locales';

export const load = ({ url }: { url: URL }) => {
	const segments = url.pathname.split('/').filter(Boolean);
	// [[lang]]/docs → segments[0] 可能是 locale 或 'docs'
	const locale = pathToLocale(segments[0] === 'docs' ? undefined : segments[0]);
	const list = docs(locale);
	const first = list.find((d) => d.slug === 'getting-started') ?? list[0];
	throw redirect(302, `${localeToPath(locale)}/docs/${first.slug}`);
};
