import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build', 
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			// 主页内的 demo 链接（/products、/blog 等占位 URL）会触发 SvelteKit 爬取并生成 404 页面
			// 静默忽略这些未匹配的 crawl，不让它们污染 build/ 输出
			handleHttpError: 'ignore',
			// 链接里的 `id="..."` 锚点找不到对应元素不报错
			handleMissingId: 'ignore',
		},
	},
};

export default config;
