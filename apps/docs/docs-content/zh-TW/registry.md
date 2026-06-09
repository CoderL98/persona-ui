---
title: 主題註冊中心 — 社群主題
group: guide
---

# 主題註冊中心

Persona UI 的主題註冊中心——第三方作者可以基於 `@persona-ui/lib` 建立/分發主題，
使用者可以一條指令安裝到自己的專案。

> **翻譯狀態**：本頁面為英文版的繁體中文翻譯占位。完整內容請參考
> [English version](/docs/registry)。

## 簡介

註冊中心讓社群能複用 lib 的所有元件、token 系統，只貢獻「長什麼樣」（CSS + themeDef）。
CI 自動校驗 token 覆蓋、CSS 文法、視覺回歸、scope 命名。

## 快速開始（貢獻者）

1. fork 倉庫
2. 建立 `packages/theme-{id}/`
3. 撰寫 `themeDef` + CSS
4. 加入 `test:tokens` 測試（基於 `@persona-ui/lib/tokens-manifest`）
5. 發 PR

**CLI 指令：**

| 指令 | 用途 |
| ---- | ---- |
| `list [registry-url]` | 列出 registry 索引裡所有主題 |
| `info <theme-name>` | 顯示某個主題的詳細 manifest（依賴、檔案、安裝指令） |
| `add <source>` | 拉取主題檔案到專案目錄 |

## 安裝（使用者視角）

```bash
# 瀏覽可用主題
pnpm dlx @persona-ui/cli list

# 查看某個主題詳情
pnpm dlx @persona-ui/cli info theme-apple

# 官方主題
pnpm add @persona-ui/lib @persona-ui/theme-apple

# CLI 一鍵安裝
pnpm dlx @persona-ui/cli add https://persona-ui.ricecakecat.com/r/theme-apple.json
```

## 命名約定

| 命名 | 用途 | 誰可以發布 |
|------|------|----------|
| `@persona-ui/theme-{id}` | 官方主題 | 僅倉庫所有者 |
| `@<your-scope>/theme-{id}` | 第三方 fork | 任何 npm 使用者 |

## 詳見

- [English version](/docs/registry) — 完整內容
- [Theming Guide](/docs/theming)
- [shadcn-svelte registry](https://shadcn-svelte.com/registry) — 設計靈感
