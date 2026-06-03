---
title: 列表框
group: components
---

# 列表框 (Listbox)

## Import

```svelte
<script>
  import { 列表框 } from '@persona-ui/lib';
</script>
```

独立的、可访问的选项列表 — 支持单选或多选，完整的键盘导航。

## 导入

```ts
import { Listbox } from '@persona-ui/lib/components/listbox';
```

## API

| 属性            | 类型                                            | 默认值 | 说明                                                  |
| --------------- | ----------------------------------------------- | ------ | ----------------------------------------------------- |
| `value`         | `string \| string[]`                            | —      | 受控值（单选为 string，多选为数组）                   |
| `defaultValue`  | `string \| string[]`                            | —      | 非受控初始值                                           |
| `multiple`      | `boolean`                                       | `false`| 启用多选模式                                          |
| `options`       | `{ value: string, label: string, disabled?: boolean }[]` | `[]` | 选项列表                       |
| `disabled`      | `boolean`                                       | `false`| 禁用整个列表框                                        |
| `texts`         | `{ options: string }`                           | —      | 文案覆盖                                              |
| `onValueChange`      | `(value, e: Event) => void`                     | —      | 选择变化回调                                          |

## 状态

| 状态      | 触发                | 结果                                              |
| --------- | ------------------- | ------------------------------------------------- |
| 默认      | 渲染                | 仅键盘聚焦时高亮第一项                            |
| 悬停      | `:hover`            | 行底色微变                                        |
| 选中      | 点击 / Enter / 空格 | primary container 背景                            |
| 禁用      | `disabled` / 单行   | 透明度降低，禁用 pointer-events                   |
| 活动      | 方向键              | surface variant 背景（焦点指示）                  |

## 用法

### 单选

```svelte
<script>
  import { Listbox } from '@persona-ui/lib/components/listbox';
  let value = $state('apple');
</script>

<Listbox
  bind:value
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'orange', label: '橘子' },
    { value: 'banana', label: '香蕉' },
  ]}
/>
```

### 多选

```svelte
<script>
  import { Listbox } from '@persona-ui/lib/components/listbox';
  let value = $state(['react', 'svelte']);
</script>

<Listbox
  multiple
  bind:value
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid', disabled: true },
  ]}
/>
```

## 可访问性

- 容器具有 `role="listbox"`，可键盘聚焦（tabindex=0）
- 每个选项具有 `role="option"` 和 `aria-selected` 反映当前值
- `multiple` 模式下具有 `aria-multiselectable="true"`
- 禁用行具有 `aria-disabled`
- 键盘：
  - <kbd>↓</kbd> / <kbd>↑</kbd> — 移动活动选项
  - <kbd>Home</kbd> / <kbd>End</kbd> — 跳到首项 / 末项
  - <kbd>Enter</kbd> / <kbd>Space</kbd> — 选择活动项

## 相关组件

- [Select](./select) — 带弹层触发器的列表框（适合表单）
- [Combobox](./combobox) — 列表框 + 文本输入（可过滤）
- [Menu](./menu) — 列表框的菜单语义（动作项）
