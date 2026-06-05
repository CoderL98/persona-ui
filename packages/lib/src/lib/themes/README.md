# 主题扩展规范

> 目标：让新增一个主题（Apple / Material / Fluent / Ant / ...）**只动一个 npm 包**，不改 lib 主体。

---

## 一、架构总览

```
@persona-ui/lib                  ← 主题无关（types + registry 占位 + 组件）
@persona-ui/theme-apple          ← 主题实现（CSS + themeDef + i18n）
@persona-ui/theme-material       ← 同上
@persona-ui/theme-fluent         ← 新增（按此规范）
```

**peerDependencies**：主题包 ↔ lib 互为 peer，消费者必须同时装两者。

---

## 二、新增主题清单（Checklist）

### 1. 创建 monorepo 包
```
packages/theme-{id}/
├── package.json
├── README.md
├── tsconfig.json
├── src/
│   ├── index.ts            # 导出 themeDef + 可选 i18n 键
│   ├── index.css           # 主题 CSS 入口（[data-theme={id}] { ... }）
│   ├── tokens.css          # 主题专属 token（仅自家使用）
│   ├── light.css           # [data-theme={id}] light 模式
│   ├── dark.css            # [data-theme={id}][data-mode='dark'] dark 模式
│   └── backgrounds.css     # body 背景装饰（mesh / hairline / ...）
```

### 2. `package.json` 模板
```json
{
  "name": "@persona-ui/theme-{id}",
  "version": "0.1.0",
  "type": "module",
  "sideEffects": ["**/*.css"],
  "peerDependencies": {
    "@persona-ui/lib": ">=0.1.0 <1.0.0"
  },
  "exports": {
    ".": "./src/index.ts",
    "./styles": "./src/index.css"
  },
  "publishConfig": { "access": "public" }
}
```

### 3. `src/index.ts` 模板
```ts
import type { ThemeDef } from "@persona-ui/lib/themes";

/**
 * {Theme Name} 主题定义
 * - 设计规范来源：{URL or 文档}
 * - 关键决策：{1-3 句说明此主题与 Apple/Material 的核心差异}
 */
export const themeDef: ThemeDef = Object.freeze({
  id: "{id}",
  label: "{Display Name}",
  labelKey: "toggleTheme_{id}",
  iconSvg: "<path d=\"...\" />",
  cssVarPrefix: "--pui-{id}",
  isDefault: false,
  darkSupport: true,
  packageName: "@persona-ui/theme-{id}",
});

export default themeDef;
```

### 4. `src/index.css` 模板
```css
/* ==========================================================
   {Theme Name} 主题入口
   使用：[data-theme="{id}"] 时激活
   ========================================================== */
@import "./tokens.css";
@import "./light.css";
@import "./dark.css";
@import "./backgrounds.css";
```

### 5. 通用 token 映射（必填，不允许 fallback 到 undefined）
主题 CSS 必须显式覆盖以下通用 token（定义在 lib `tokens.css`）：

```css
[data-theme="{id}"] {
  /* Overlay scrim（modal/dialog 遮罩） */
  --pui-overlay-scrim: {oklch or rgb};

  /* FAB variants */
  --pui-fab-bg-surface: {color};
  --pui-fab-bg-primary: {color};
  --pui-fab-bg-secondary: {color};
  --pui-fab-bg-tertiary: {color};
  --pui-fab-radius-sm: {px};
  --pui-fab-radius-lg: {px};

  /* Snackbar */
  --pui-snackbar-radius: {px};
  --pui-snackbar-bg-info: {color};
  --pui-snackbar-bg-error: {color};

  /* Card inset highlight（squircle 等装饰，无装饰则 transparent） */
  --pui-card-inset-highlight: {shadow or transparent};
}
```

### 6. 主题包测试（必填）
- `src/__tests__/tokens.test.ts`：所有通用 token 都被显式覆盖（非 `var(--undefined)`）
- `src/__tests__/dark.test.ts`：dark 模式下 token 改变（不能与 light 完全相同）
- `src/__tests__/css.test.ts`：CSS 文件可被 css-parser 解析，无语法错误

---

## 三、禁止事项

| ❌ 禁止 | 原因 |
|---|---|
| 在 lib 组件里写 `pui-{id}-*` 字面量 | 组件应只读通用 token |
| 在 lib 主体 `@import` 主题 CSS | lib 应保持主题无关 |
| 在 `tokens.css` 里写主题专属值 | `tokens.css` 只放 primitive + 默认 semantic |
| 主题包互相依赖（如 theme-fluent 引用 theme-apple） | 主题应正交 |
| 主题 cssVarPrefix 重复 | 会导致选择器污染 |

---

## 四、消费方集成（docs 站 / 第三方应用）

```ts
// 1. 装包
pnpm add @persona-ui/lib @persona-ui/theme-apple @persona-ui/theme-fluent

// 2. app.css
@import "@persona-ui/lib/styles";
@import "@persona-ui/theme-apple/styles";
@import "@persona-ui/theme-fluent/styles";

// 3. 主题聚合
import { themeDef as apple } from "@persona-ui/theme-apple";
import { themeDef as fluent } from "@persona-ui/theme-fluent";
import type { ThemeRegistry } from "@persona-ui/lib/themes";

export const ALL_THEMES: ThemeRegistry = Object.freeze([apple, fluent]);

// 4. 切换器循环
{#each ALL_THEMES as t (t.id)}
  <button onclick={() => setTheme(t.id)} aria-pressed={theme === t.id}>
    {@html t.iconSvg}
    <span>{t.label}</span>
  </button>
{/each}
```

---

## 五、版本与 changelog

- 主题包**独立发版**，与 lib 解耦（遵循 semver）
- 主版本号必须与 lib 同步（breaking change 同步升级）
- 每次发版需 `.changeset/*.md` 写明：
  - 新增 token
  - 视觉变化（截图）
  - 与 Apple/Material 的对比

---

## 六、CI 检查

`.github/workflows/theme-pr.yml` 自动验证：
1. ESLint 规则：`packages/lib/src/lib/components/**` 禁止 `pui-{id}-*` 字面量
2. 主题包 package.json 必须声明 `peerDependencies: @persona-ui/lib`
3. 通用 token 全覆盖（不全覆盖 → fail）
4. 视觉契约测试 `tests/visual/` 必须新增 `{id}-*.visual.ts` 套件
