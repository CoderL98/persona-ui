/**
 * 主题注册表（消费方聚合层）
 *
 * 本文件是 docs 站对 lib 主题系统的"主题清单"。
 * 新增主题时，只需：
 * 1. 装入对应 `@persona-ui/theme-xxx` 包
 * 2. 在 THEME_IDS 数组追加新 id
 * 3. 在 THEMES 数组的 switch 中追加 case 返回对应 themeDef
 * 4. 在 i18n messages 中追加 `toggleTheme_xxx` / `previewLabel_xxx` 翻译键
 *
 * 不需要改任何 +layout.svelte / +page.svelte 的 UI 代码 ——
 * 它们通过遍历 THEMES 数组自动渲染新增主题的切换按钮和预览卡片。
 */
import { themeDef as apple } from "@persona-ui/theme-apple";
import { themeDef as material } from "@persona-ui/theme-material";
import type { ThemeDef, ThemeRegistry } from "@persona-ui/lib";

/** 主题 ID 清单（注册顺序，UI 按此顺序渲染切换器） */
export const THEME_IDS = ["apple", "material"] as const;

/** 主题 ID 字面量联合类型（用于 $state 强类型） */
export type ThemeId = (typeof THEME_IDS)[number];

/** ThemeDef 元数据数组（按 THEME_IDS 顺序拼装） */
export const THEMES: ThemeRegistry = Object.freeze(
  THEME_IDS.map((id): ThemeDef => {
    switch (id) {
      case "apple":
        return apple;
      case "material":
        return material;
      default: {
        // TypeScript exhaustiveness check：未来加 id 但忘了 case 时编译报错
        const _exhaustive: never = id;
        throw new Error(`[themes] 未注册的主题 id：${_exhaustive}`);
      }
    }
  }),
);

/** 默认主题（注册表第一项，作为 SSR/CSR 初始 fallback） */
export const DEFAULT_THEME: ThemeId = THEME_IDS[0];

/** ID → ThemeDef 查找（线性扫，主题数 < 10 时比 Map 快） */
export function getTheme(id: ThemeId): ThemeDef {
  const found = THEMES.find((t) => t.id === id);
  if (!found) throw new Error(`[themes] 找不到主题：${id}`);
  return found;
}
