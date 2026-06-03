---
"@persona-ui/docs": minor
---

docs: 文档站大改

- 集成 Shiki 语法高亮 + 代码块复制按钮
- 补全 23 个 md 文件的 Import 节
- 每个组件 doc 加 A11y / See also 标准化章节
- 实现真全站搜索（基于 CommandPalette + 预生成 page index）；删除/实装 "Press ⌘K to search" 假提示
- 移动端 sidebar 抽屉化（汉堡按钮）
- 文档站首次访问根据 `prefers-color-scheme` 自动切换暗色
- docs 站的 Calendar/DatePicker 演示根据 `currentLocale` 传 `locale` prop
