import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/package').Config} */
const config = {
	preprocess: vitePreprocess(),
	// esbuild 处理 import 时通过 vite 别名解析 $lib
	// 实际生效依赖 vite.config.ts 的 resolve.alias
};

export default config;
