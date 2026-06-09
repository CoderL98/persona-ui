---
title: SectionHeading
group: components
---

# SectionHeading

統一的章節標題原語，由 eyebrow 小標籤 + 大號 display 標題 + 可選描述組成。字型與字級隨當前主題自動切換 —— Apple track 用 Instrument Serif，Material track 用 Bricolage Grotesque。

## Import

```svelte
<script>
  import { SectionHeading } from '@persona-ui/lib';
</script>
```

## API

| Prop          | Type                  | Default | Description                                |
| ------------- | --------------------- | ------- | ------------------------------------------ |
| `id`          | `string`              | —       | 章節 ID（用於錨點跳轉）                    |
| `eyebrow`     | `string`              | —       | 標題上方的小標籤                           |
| `title`       | `string`              | —       | 主標題文字                                 |
| `description` | `string`              | —       | 可選的副標題描述                           |
| `level`       | `1 \| 2 \| 3`         | `2`     | 渲染為 `h1` / `h2` / `h3` 的標題層級       |
| `class`       | `string`              | —       | 額外的 CSS 類名                            |
| `style`       | `string`              | —       | 內聯樣式覆寫                               |

## Usage

```svelte
<SectionHeading
  eyebrow="元件"
  title="用雙主題系統更快構建"
  description="一套 API，兩種嚴格不同的設計語言 —— Apple HIG 與 Material Design 3。"
  level={1}
/>
```

### 帶錨點連結目標

```svelte
<SectionHeading id="getting-started" title="快速開始" level={2} />
<a href="#getting-started">跳到章節</a>
```

### 三級子標題

```svelte
<SectionHeading eyebrow="表單" title="文字輸入" level={3} />
```

## 主題行為

- **Apple track**: 標題使用 Instrument Serif 襯線字型，略帶負字距
- **Material track**: 標題使用 Bricolage Grotesque 幾何感字型

兩種主題均繼承當前 `[data-mode="light"|"dark"]` 與 `[data-theme="apple"|"material"]` 屬性下的 text color 與 surface tokens。
