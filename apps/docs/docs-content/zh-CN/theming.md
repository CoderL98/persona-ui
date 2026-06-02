---
title: 主题指南
group: guide
---

# 主题指南

Persona UI 使用 **基于 CSS 变量的令牌引擎** 来切换不同的设计人格。无需任何 JavaScript 主题提供者。

## 标准对齐

Persona UI 独立开发，与 Apple 或 Google **没有官方关联**。它提供：

- **Apple HIG 对齐的视觉轨** — 颜色角色、材质/模糊、字体与交互模式均受 Apple Human Interface Guidelines 启发。
- **Material Design 3 对齐的视觉轨** — 颜色角色、色调色板、层级、形状尺度、字体尺度、状态层均与 Material Design 3 保持一致。

对齐工作通过语义令牌、组件状态行为、可访问性约束与视觉回归测试落地。Persona UI 并未实现 HIG/Material 的全部指南，请勿将其声称为「官方」或「完美复刻」。

## 优先级体系

```
inline style (instance override)
  > component default tokens
    > [data-theme] track tokens
      > :root semantic tokens
        > component fallback values
```

## 选择主题

### 全局主题

```html
<html data-theme="apple">
  <html data-theme="material"></html>
</html>
```

### 浅色/深色模式

```html
<html data-theme="apple" data-mode="light">
  <html data-theme="apple" data-mode="dark"></html>
</html>
```

### 容器级主题

任意元素都可以成为主题根：

```html
<div data-theme="material">
  <!-- 该范围内的所有 Persona UI 组件使用 Material 风格 -->
</div>
```

这种方式可以实现 **混合主题孤岛** ——例如一个 Apple 页面中嵌入 Material 风格的侧边栏。

## 实例级覆盖

每个组件都接收一个 `style` 属性，会被透传到根 DOM 元素：

```svelte
<Button style="--pui-button-radius: 20px; --pui-button-bg: deeppink;">
  自定义样式
</Button>
```

所有组件令牌都遵循 `var(--pui-<component>-<property>, <fallback>)` 的写法，因此实例级变量始终会胜出。

## 设计轨道

### Apple HIG（`data-theme="apple"`）

- **表面**：半透明、背景模糊、细边框
- **圆角**：较大（控件 `14px`，容器 `22px`）
- **层级**：柔和的环境光阴影
- **动效**：基于弹簧的缓动，较短的时长
- **状态变化**：缩放 + 透明度，细腻克制

### Material 3（`data-theme="material"`）

- **表面**：不透明，基于颜色角色（surface、surface-container 等）
- **圆角**：药丸状控件（`999px`），容器 `12px`
- **层级**：定义明确的层级（0–5），深色模式下使用色调叠加
- **动效**：可预测的缓动，强调状态过渡
- **状态层**：悬停 `0.08`，按下 `0.12`，聚焦 `0.12`

## 视觉对比

| Property        | Apple           | Material                |
| --------------- | --------------- | ----------------------- |
| 按钮圆角         | `14px`          | `999px`（药丸）          |
| 卡片圆角         | `22px`          | `12px`                  |
| 表面处理         | 半透明 + 模糊   | 不透明、基于颜色角色     |
| 阴影风格         | 柔和的环境光    | 层级分明                |
| 焦点环           | 主色描边        | 主色描边                |
| 深色模式表面     | 变暗的半透明    | MD3 深色表面色           |

## 最佳实践

- **不要使用 `!important`** ——CSS 变量级联已经处理了优先级。
- **使用语义令牌** 来构建你自己的组件：`var(--pui-color-primary)`、`var(--pui-surface-base)`。
- **通过 `style` 覆盖组件令牌**，而不是去写冲突的 CSS 类。
- **减少动效** 通过 `prefers-reduced-motion` 自动生效。
