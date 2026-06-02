---
title: 權杖參考
group: guide
---

# 權杖參考

Persona UI 採用四層 CSS 變數架構：

1. **基礎權杖**（`--pui-ref-*`） — 原始的顏色、間距、時長值
2. **語意權杖**（`--pui-color-*`、`--pui-surface-*` 等） — 跨元件的語意角色
3. **元件權杖**（`--pui-button-*`、`--pui-card-*` 等） — 每個元件的預設值
4. **實例覆寫** — 使用者透過 `style="--pui-...: ..."` 設定

## 前綴慣例

所有權杖皆使用 `--pui-` 前綴以避免命名衝突。

### 顏色

| Token                              | Purpose          |
| ---------------------------------- | ---------------- |
| `--pui-color-primary`              | 主要操作色       |
| `--pui-color-on-primary`           | 主色上的文字/圖示 |
| `--pui-color-primary-container`    | 主色的容器變體   |
| `--pui-color-on-primary-container` | 主色容器上的文字 |
| `--pui-color-secondary`            | 次級強調色       |
| `--pui-color-tertiary`             | 第三級強調色     |
| `--pui-color-error`                | 錯誤色           |
| `--pui-color-on-error`             | 錯誤色上的文字   |
| `--pui-color-error-container`      | 錯誤色容器       |

### 表面

| Token                     | Purpose                       |
| ------------------------- | ----------------------------- |
| `--pui-surface-base`      | 頁面背景                      |
| `--pui-surface-raised`    | 抬升表面（卡片、對話框）      |
| `--pui-surface-variant`   | 細微差別的表面變體            |
| `--pui-surface-container` | 容器表面                      |

### 文字

| Token                  | Purpose          |
| ---------------------- | ---------------- |
| `--pui-text-primary`   | 主級文字顏色     |
| `--pui-text-secondary` | 次級/弱化文字    |
| `--pui-text-disabled`  | 停用文字         |

### 描邊

| Token                  | Purpose          |
| ---------------------- | ---------------- |
| `--pui-outline`        | 標準邊框/分隔線  |
| `--pui-outline-subtle` | 細邊框           |
| `--pui-outline-strong` | 高強調邊框       |

### 圓角

| Token                    | Purpose            |
| ------------------------ | ------------------ |
| `--pui-radius-control`   | 控制項/輸入框圓角  |
| `--pui-radius-container` | 容器/卡片圓角      |
| `--pui-radius-full`      | 完全圓角（藥丸/圓形） |

### 層級

| Token               | Purpose  |
| ------------------- | -------- |
| `--pui-elevation-0` | 無陰影   |
| `--pui-elevation-1` | 底層級   |
| `--pui-elevation-2` | 中層級   |
| `--pui-elevation-3` | 高層級   |

### 動效與時長

| Token                   | Purpose        |
| ----------------------- | -------------- |
| `--pui-motion-spring`   | 彈簧緩動曲線   |
| `--pui-motion-ease-out` | 緩出曲線       |
| `--pui-duration-enter`  | 進場動畫時長   |
| `--pui-duration-leave`  | 離場動畫時長   |
| `--pui-duration-swap`   | 狀態變更時長   |

### 元件權杖

每個元件都會暴露各自的權杖。詳見各元件文件：

- [Button 權杖](components/button.md)
- [Card 權杖](components/card.md)
- [TextField 權杖](components/text-field.md)
- [Switch 權杖](components/switch.md)
