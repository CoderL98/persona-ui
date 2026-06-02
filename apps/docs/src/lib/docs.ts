// 自动收集 apps/docs/docs-content/ 下的所有 .md 文件
// 顶层文件（accessibility/getting-started/theming/tokens）作为独立 slug
// components/<name>.md 注册为 /docs/components/<name>
import { marked } from 'marked';

export interface DocEntry {
	slug: string;
	title: string;
	group: 'guide' | 'components';
}

// 一次性加载所有 md 原始文本（Vite build-time 静态 import）
const rawFiles = import.meta.glob<string>('../../docs-content/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true,
});

function titleFromSlug(slug: string): string {
	return slug
		.split('/')
		.pop()!
		.replace(/-/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

export const docs: DocEntry[] = [];
const contentBySlug: Record<string, string> = {};

for (const [path, raw] of Object.entries(rawFiles)) {
	const rel = path.replace(/^.*\/docs-content\//, '').replace(/\.md$/, '');
	const group: DocEntry['group'] = rel.startsWith('components/')
		? 'components'
		: 'guide';
	docs.push({ slug: rel, title: titleFromSlug(rel), group });
	contentBySlug[rel] = raw;
}

export function getRaw(slug: string): string | undefined {
	return contentBySlug[slug];
}

export function renderHtml(md: string): string {
	return marked.parse(md, { async: false }) as string;
}
