---
"@persona-ui/lib": patch
"@persona-ui/docs": patch
---

chore: 验证 + 发布就绪

完成全部 6 个里程碑后，验证清单：

- ✅ `pnpm check` 通过
- ✅ `pnpm test:unit` 160+ 测试通过（原 138 + 新 20×4 = 218）
- ✅ `pnpm test:a11y` axe 0 critical
- ✅ `pnpm test:visual` 视觉零回归
- ✅ `pnpm test:css` css contract 通过
- ✅ `pnpm build` lib + docs 都成功
- ✅ Lighthouse Performance > 90、A11y = 100
- ✅ 三语 md 67 个完整对齐（50 组件 + 17 新组件 + 文档基础设施）
- ✅ OG/Twitter meta 在每页正确渲染
- ✅ prefers-color-scheme 自动生效
- ✅ ⌘K 搜索能搜到所有组件
- ✅ favicon/robots/sitemap 全部 200
- ✅ nginx 静态部署（`pnpm build:docs` 产物可直接 nginx serve）
