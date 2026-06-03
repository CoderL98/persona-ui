// 根 layout：声明整站 prerender（nginx 静态部署需要 SSG）
// ssr 默认开启 → 通过 prerender 产出静态 HTML
export const prerender = true;
// 不需要服务端 fallback（nginx 静态托管）
export const trailingSlash = 'never';



