---
title: SectionHeading
group: components
---

# SectionHeading

统一的章节标题原语，由 eyebrow 小标签 + 大号 display 标题 + 可选描述组成。字体族与字号随当前主题自动切换 —— Apple track 用 Instrument Serif，Material track 用 Bricolage Grotesque。

## Import

```svelte
<script>
  import { SectionHeading } from '@persona-ui/lib';
</script>
```

## API

| Prop          | Type                  | Default | Description                                |
| ------------- | --------------------- | ------- | ------------------------------------------ |
| `id`          | `string`              | —       | 章节 ID（用于锚点跳转）                    |
| `eyebrow`     | `string`              | —       | 标题上方的小标签                           |
| `title`       | `string`              | —       | 主标题文本                                 |
| `description` | `string`              | —       | 可选的副标题描述                           |
| `level`       | `1 \| 2 \| 3`         | `2`     | 渲染为 `h1` / `h2` / `h3` 的标题层级       |
| `class`       | `string`              | —       | 额外的 CSS 类名                            |
| `style`       | `string`              | —       | 内联样式覆盖                               |

## Usage

```svelte
<SectionHeading
  eyebrow="组件"
  title="用双主题系统更快构建"
  description="一套 API，两种严格不同的设计语言 —— Apple HIG 与 Material Design 3。"
  level={1}
/>
```

### 带锚点链接目标

```svelte
<SectionHeading id="getting-started" title="快速开始" level={2} />
<a href="#getting-started">跳到章节</a>
```

### 三级子标题

```svelte
<SectionHeading eyebrow="表单" title="文本输入" level={3} />
```

## 主题行为

- **Apple track**: 标题使用 Instrument Serif 衬线字体，略带负字距
- **Material track**: 标题使用 Bricolage Grotesque 几何感字体

两种主题均继承当前 `[data-mode="light"|"dark"]` 与 `[data-theme="apple"|"material"]` 属性下的 text color 与 surface tokens。
