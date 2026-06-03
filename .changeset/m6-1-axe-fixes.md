---
'@persona-ui/lib': patch
'@persona-ui/docs': patch
---

fix: M6.1 axe-core 无障碍修复

- Avatar: status 指示器加 `role="img"` 修复 `aria-prohibited-attr`
- Chip: 条件化 `role="button"`（仅 removable 时），移除无交互时的 button role
- docs 代码块: `<pre>` 加 `tabindex="0"` 修复 `scrollable-region-focusable`
- docs 首页: Switch 组件加 `aria-label`
- docs 代码块样式: 加 `focus-visible outline`
