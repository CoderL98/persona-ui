---
"@persona-ui/docs": minor
---

主页 Specimen Card 视觉重构 — 消除"灰色椭圆底色"割裂感

**问题诊断**
之前 `.specimen-demo` 演示区有：
- 灰色 surface-variant 40% 背景（`color-mix(in oklch, var(--pui-surface-variant) 40%, var(--pui-surface-base))`）
- `border-radius: var(--pui-radius-control)` = 20px（MD3）/ 14px（Apple）→ 视觉上形成"椭圆药丸"
- 内嵌在卡片里像独立的"舞台盒"，与组件割裂

MD3 风格下尤为突兀 — 4 个 cards 都有可见的椭圆药丸，components 像浮在盒子上
Apple 风格下也存在但稍轻（squircle 14px control radius + 浅灰背景）

**修复方案（frontend-design 原则）**
- 卡片整体 = 一个连贯单元，不在内部分割"舞台"
- 演示区 = 不再独立的视觉容器，组件直接活在卡片 surface 上
- 用极轻的 `border-top` 替代"椭圆"作为 header / demo 分隔
- 用 `transparent` 背景 + 顶部 1px outline-subtle 营造层次

**主题专属 spec card 样式**
- **MD3**：
  - 圆角 16px（surface-container-low 静态层）
  - 背景 `var(--pui-md-sys-color-surface-container-low)`
  - 边框 `var(--pui-md-sys-color-outline-variant)`
- **Apple HIG**：
  - 圆角 22px squircle
  - 背景 `color-mix(in oklch, --pui-apple-system-background 88%, transparent)` + `backdrop-filter: blur(8px) saturate(180%)`
  - 边框 `color-mix(in oklch, --pui-apple-separator 40%, transparent)`（极轻半透明 separator）

**关键技术细节**
- Svelte 组件的 `<style>` 块有 `.svelte-c5vyf9` scope class（特异性高）
- 全局 `app.css` 的 `.specimen` / `.specimen-demo` 选择器被覆盖
- 必须把样式改到组件的 `<style>` 块内（`:global([data-theme='material']) .specimen` 用 :global() 绕过 scope）
- 修后用 `getComputedStyle()` 验证：`background: transparent` 真正生效

**附加改进**
- `.specimen-title` font-size 0.95rem → 1rem，weight 500 → 600（更明确层级）
- `.specimen-link` opacity 0.4 + 悬停时 color → primary（hover 反馈更明显）
- `.specimen-caption` margin: 0 + min-height: 2.2em（保持一致高度，spec card 高度对齐）
- `.specimen-demo` min-height 5rem → 110px（更宽松的呼吸空间）
- `.specimen-demo.p-0` 不再有 `overflow: hidden`（让 full-bleed demo 不被裁剪）

**验证**
- lib check 0 errors / lib test 472 pass / docs check 0 errors / docs build OK
- 视觉对比：MD3 主页 Foundation/Form/Navigation/Data/Advanced 5 个 section 全部消除椭圆药丸
- Apple 主页 Foundation/Form/Overlays 同步消除
