// 动态生成 sitemap.xml（nginx 静态托管下，prerender 时构建一次）
// 三语 × 每种语言的每个 doc slug + 首页
import { LOCALES, localeToPath } from '../../lib/i18n/locales';
import { docs } from '../../lib/docs';

export const prerender = true;

const SITE = 'https://persona-ui.dev';

// 单条 <url>：loc 必填，lastmod 可选；alternates 用 [{locale, href}] 而非字符串
// 因为 hreflang 必须用规范 BCP 47 形式（zh-CN / zh-TW），而 URL 段是小写（/zh-cn）
// 若从 URL 反推会得到小写，Google 虽能接受但不利于与其他 sitemap 工具保持一致
function urlEntry(
	loc: string,
	lastmod?: string,
	alternates?: { locale: string; href: string }[],
) {
	const alt = alternates
		?.map(
			(a) =>
				`    <xhtml:link rel="alternate" hreflang="${a.locale}" href="${a.href}" />`,
		)
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
		const href = `${SITE}${localeToPath(locale)}/`;
		urls.push(
			urlEntry(
				href,
				now,
				LOCALES.map((l) => ({ locale: l, href: `${SITE}${localeToPath(l)}/` })),
			),
		);
	}

	// 文档页：三语 × 每个 doc
	for (const locale of LOCALES) {
		const list = docs(locale);
		for (const entry of list) {
			const href = `${SITE}${localeToPath(locale)}/docs/${entry.slug}`;
			urls.push(
				urlEntry(
					href,
					now,
					LOCALES.map((l) => ({
						locale: l,
						href: `${SITE}${localeToPath(l)}/docs/${entry.slug}`,
					})),
				),
			);
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
