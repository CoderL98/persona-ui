/**
 * SectionHeading — 统一的章节标题组件
 * eyebrow 标签 + display 标题 + 副标题
 * 受 token 驱动，Apple/Material 自动适配
 */

export type SectionHeadingLevel = 1 | 2 | 3;

export interface SectionHeadingProps {
  /** 章节 ID（用于锚点跳转） */
  id?: string;
  /** 小标签（eyebrow），通常为分类名 */
  eyebrow?: string;
  /** 主标题 */
  title: string;
  /** 副标题/描述 */
  description?: string;
  /** 标题层级（默认 2） */
  level?: SectionHeadingLevel;
  /** 额外类名 */
  class?: string;
  /** 自定义样式 */
  style?: string;
}
