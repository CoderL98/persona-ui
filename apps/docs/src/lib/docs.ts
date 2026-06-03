// 自动收集 apps/docs/docs-content/{en,zh-CN,zh-TW}/**/*.md
// 通过 Vite build-time glob + ?raw 加载所有文本
// 在客户端解析 frontmatter（不引第三方 md 解析器）
import { marked } from 'marked';
import type { Locale } from './i18n/locales';

export interface DocEntry {
	slug: string; // 例如 'components/button'（不含 locale）
	group: 'guide' | 'components';
}

export interface DocFrontmatter {
	title: string;
	group: 'guide' | 'components';
}

// raw 文件对象：<locale>/<slug> → md 文本
// 例如 rawFiles['en/components/button']
const rawFiles = import.meta.glob<string>('../../docs-content/*/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true,
});

const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/;

function parseFrontmatter(md: string): { fm: DocFrontmatter; body: string } {
	const m = md.match(FRONTMATTER_RE);
	if (!m) {
		// 没 frontmatter：尝试从 H1 抓 title
		const h1 = md.match(/^#\s+(.+)$/m);
		const title = h1?.[1]?.trim() ?? 'Untitled';
		return {
			fm: { title, group: 'components' },
			body: md,
		};
	}
	const [, fmRaw, body] = m;
	const titleLine = fmRaw.split('\n').find((l) => l.startsWith('title:'));
	const groupLine = fmRaw.split('\n').find((l) => l.startsWith('group:'));
	const title = titleLine?.replace(/^title:\s*/, '').replace(/^['"]|['"]$/g, '').trim() ?? 'Untitled';
	const group = (groupLine?.replace(/^group:\s*/, '').trim() ?? 'components') as DocFrontmatter['group'];
	return {
		fm: { title, group },
		body,
	};
}

// 索引：<locale>/<slug> → { fm, body }
const INDEX: Record<string, { fm: DocFrontmatter; body: string }> = {};
// 每个 locale 的 entries 列表
const ENTRIES: Record<Locale, DocEntry[]> = {
	en: [],
	'zh-CN': [],
	'zh-TW': [],
};
// 每条 slug 的 title（按 locale）
const TITLES: Record<string, Partial<Record<Locale, string>>> = {};

for (const [path, raw] of Object.entries(rawFiles)) {
	// path 形如 '../../docs-content/en/components/button.md' 或 en/getting-started.md
	const parts = path.split('/docs-content/')[1]?.replace(/\.md$/, '').split('/');
	if (!parts || parts.length < 2) continue;
	const [localeSeg, ...rest] = parts;
	const locale = localeSeg as Locale;
	if (locale !== 'en' && locale !== 'zh-CN' && locale !== 'zh-TW') continue;
	const slug = rest.join('/');
	const key = `${locale}/${slug}`;
	const { fm, body } = parseFrontmatter(raw);
	INDEX[key] = { fm, body };
	ENTRIES[locale].push({ slug, group: fm.group });
	TITLES[slug] ??= {};
	TITLES[slug][locale] = fm.title;
}

// 暴露
export function getRaw(slug: string, locale: Locale): string | undefined {
	return INDEX[`${locale}/${slug}`]?.body;
}

export function getTitle(slug: string, locale: Locale): string | undefined {
	return TITLES[slug]?.[locale] ?? TITLES[slug]?.en ?? slug;
}

export function getGroup(slug: string): 'guide' | 'components' | undefined {
	// 从任一 locale 都能取到（group 不随 locale 变）
	for (const locale of ['en', 'zh-CN', 'zh-TW'] as Locale[]) {
		const entry = ENTRIES[locale].find((e) => e.slug === slug);
		if (entry) return entry.group;
	}
	return undefined;
}

export interface SearchResult {
	slug: string;
	title: string;
	group: 'guide' | 'components';
	locale: Locale;
	excerpt: string;
	score: number;
}

/**
 * 全文搜索：对所有 locale 的标题和正文做大小写不敏感的子串匹配。
 * 标题命中得分高于正文，slug 完全匹配得分最高。
 */
export function searchDocs(query: string, locale: Locale, limit = 12): SearchResult[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	const results: SearchResult[] = [];
	for (const [key, { fm, body }] of Object.entries(INDEX)) {
		const [kLocale, ...rest] = key.split('/');
		if (kLocale !== locale) continue;
		const slug = rest.join('/');
		const titleLower = fm.title.toLowerCase();
		const bodyLower = body.toLowerCase();
		const slugLower = slug.toLowerCase();
		let score = 0;
		if (slugLower === q) score += 1000;
		if (titleLower === q) score += 500;
		if (titleLower.includes(q)) score += 100;
		if (bodyLower.includes(q)) score += 1;
		// 计算匹配位置用于 excerpt
		const idx = bodyLower.indexOf(q);
		const start = Math.max(0, idx > 0 ? idx - 30 : 0);
		const end = Math.min(body.length, start + 120);
		const excerpt = idx >= 0 ? '…' + body.slice(start, end).replace(/\n/g, ' ') + '…' : '';
		if (score > 0) {
			results.push({ slug, title: fm.title, group: fm.group, locale, excerpt, score });
		}
	}
	results.sort((a, b) => b.score - a.score);
	return results.slice(0, limit);
}

export function docs(locale: Locale): DocEntry[] {
	return ENTRIES[locale];
}

export function renderHtml(md: string): string {
	return marked.parse(md, { async: false }) as string;
}

// 旧 API 兼容（重载接受 locale）
export function getRawLegacy(slug: string): string | undefined {
	return getRaw(slug, 'en');
}
