---
"@persona-ui/lib": patch
---

docs: build config 修复 + SSG 静态化

- 修复 `@persona-ui/docs` 站点 `ssr=false` + `adapter-static` 的配置矛盾（之前会导致 build 失败）
- 改为完整 SSG：每个路由 `prerender = true` + `entries()` 显式枚举（[[lang]] + [...slug]）
- 新增静态资源：favicon (16/32/180)、apple-touch-icon、og-image、robots.txt、site.webmanifest、sitemap.xml
- 每个组件 doc 页加 OG/Twitter/canonical/hreflang SEO meta
- 内联脚本在 hydration 前同步 `<html lang>`，避免 en→zh-CN 闪烁
- 修复 `apps/docs/src/routes/+layout.svelte` 的 `data-theme`/`data-mode` 同步逻辑

影响 `@persona-ui/docs` 站点的可访问性、SEO、构建产物。lib 包本身无 API 变化。
