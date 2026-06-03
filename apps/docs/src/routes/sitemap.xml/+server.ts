// 动态生成 sitemap.xml（nginx 静态托管下，prerender 时构建一次）
// 三语 × 每种语言的每个 doc slug + 首页
import { LOCALES } from '../../lib/i18n/locales';
import { docs } from '../../lib/docs';

export const prerender = true;

const SITE = 'https://persona-ui.dev';

function urlEntry(loc: string, lastmod?: string, alternates?: string[]) {
	const alt = alternates
		?.map((href) => `    <xhtml:link rel="alternate" hreflang="${href.split('/')[3] || 'en'}" href="${href}" />`)
		.join('\n');
	return `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}${alt ? `\n${alt}` : ''}
  </url>`;
}

export function GET() {
	const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
	const urls: string[] = [];

	// 首页：三语
	for (const locale of LOCALES) {
		const prefix = locale === 'en' ? '' : `/${locale.toLowerCase()}`;
		urls.push(
			urlEntry(
				`${SITE}${prefix}/`,
				now,
				LOCALES.map((l) => `${SITE}${l === 'en' ? '' : '/' + l.toLowerCase()}/`),
			),
		);
	}

	// 文档页：三语 × 每个 doc
	for (const locale of LOCALES) {
		const list = docs(locale);
		for (const entry of list) {
			const prefix = locale === 'en' ? '' : `/${locale.toLowerCase()}`;
			const alts = LOCALES.map(
				(l) => `${SITE}${l === 'en' ? '' : '/' + l.toLowerCase()}/docs/${entry.slug}`,
			);
			urls.push(urlEntry(`${SITE}${prefix}/docs/${entry.slug}`, now, alts));
		}
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
}
