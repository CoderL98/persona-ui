---
title: 令牌参考
group: guide
---

# 令牌参考

Persona UI 采用四层 CSS 变量架构：

1. **基础令牌**（`--pui-ref-*`） — 原始的颜色、间距、时长值
2. **语义令牌**（`--pui-color-*`、`--pui-surface-*` 等） — 跨组件的语义角色
3. **组件令牌**（`--pui-button-*`、`--pui-card-*` 等） — 每个组件的默认值
4. **实例覆盖** — 用户通过 `style="--pui-...: ..."` 设定

## 前缀约定

所有令牌都使用 `--pui-` 前缀以避免命名冲突。

### 颜色

| Token                              | Purpose          |
| ---------------------------------- | ---------------- |
| `--pui-color-primary`              | 主要操作色       |
| `--pui-color-on-primary`           | 主色上的文字/图标 |
| `--pui-color-primary-container`    | 主色的容器变体   |
| `--pui-color-on-primary-container` | 主色容器上的文字 |
| `--pui-color-secondary`            | 次级强调色       |
| `--pui-color-tertiary`             | 第三级强调色     |
| `--pui-color-error`                | 错误色           |
| `--pui-color-on-error`             | 错误色上的文字   |
| `--pui-color-error-container`      | 错误色容器       |

### 表面

| Token                     | Purpose                       |
| ------------------------- | ----------------------------- |
| `--pui-surface-base`      | 页面背景                      |
| `--pui-surface-raised`    | 抬升表面（卡片、对话框）      |
| `--pui-surface-variant`   | 细微差别的表面变体            |
| `--pui-surface-container` | 容器表面                      |

### 文字

| Token                  | Purpose          |
| ---------------------- | ---------------- |
| `--pui-text-primary`   | 主级文字颜色     |
| `--pui-text-secondary` | 次级/弱化文字    |
| `--pui-text-disabled`  | 禁用文字         |

### 描边

| Token                  | Purpose          |
| ---------------------- | ---------------- |
| `--pui-outline`        | 标准边框/分割线  |
| `--pui-outline-subtle` | 细边框           |
| `--pui-outline-strong` | 高强调边框       |

### 圆角

| Token                    | Purpose            |
| ------------------------ | ------------------ |
| `--pui-radius-control`   | 控件/输入框圆角    |
| `--pui-radius-container` | 容器/卡片圆角      |
| `--pui-radius-full`      | 完全圆角（药丸/圆形） |

### 层级

| Token               | Purpose  |
| ------------------- | -------- |
| `--pui-elevation-0` | 无阴影   |
| `--pui-elevation-1` | 低层级   |
| `--pui-elevation-2` | 中层级   |
| `--pui-elevation-3` | 高层级   |

### 动效与时长

| Token                   | Purpose        |
| ----------------------- | -------------- |
| `--pui-motion-spring`   | 弹簧缓动曲线   |
| `--pui-motion-ease-out` | 缓出曲线       |
| `--pui-duration-enter`  | 进入动画时长   |
| `--pui-duration-leave`  | 离开动画时长   |
| `--pui-duration-swap`   | 状态变更时长   |

### 组件令牌

每个组件都暴露各自的令牌。详见各组件文档：

- [Button 令牌](components/button.md)
- [Card 令牌](components/card.md)
- [TextField 令牌](components/text-field.md)
- [Switch 令牌](components/switch.md)
