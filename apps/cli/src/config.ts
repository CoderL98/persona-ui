/**
 * @persona-ui/cli 全局配置
 *
 * 单一来源：所有 persona-ui 相关 URL 必须从这里取，禁止散落硬编码
 *
 * 覆盖方式（按优先级从高到低）：
 *   1. 环境变量 PUI_BASE_URL    （CI / 本地调试）
 *   2. 本文件常量                 （默认）
 */
export const PERSONA_UI_BASE_URL: string =
  process.env.PUI_BASE_URL ?? "https://persona-ui.ricecakecat.com";

/** 拼接 URL：base + subPath（自动处理前导/后导 /） */
export function personaUiUrl(subPath: string): string {
  const base = PERSONA_UI_BASE_URL.replace(/\/$/, "");
  const path = subPath.replace(/^\//, "");
  return `${base}/${path}`;
}

/** 预定义 URL（所有派生自 PERSONA_UI_BASE_URL） */
export const URLS = {
  /** registry 索引（list 默认拉这个） */
  REGISTRY_INDEX: personaUiUrl("/r/registry.json"),
  /** 单个 theme item 目录前缀 */
  REGISTRY_THEMES: personaUiUrl("/r"),
  /** schema URL（zod literal 校验用） */
  SCHEMA_REGISTRY: personaUiUrl("/schema/registry.json"),
  SCHEMA_ITEM: personaUiUrl("/schema/registry-item.json"),
} as const;
