---
title: InputGroup
group: components
---

# InputGroup

将 TextField 与前置/后置附加项（图标、文字或按钮）组合，创建复合输入控件。

## Import

```svelte
<script>
  import { InputGroup, TextField, Button } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                | Default        | Description              |
| ---------------- | ------------------- | -------------- | ------------------------ |
| `leading`        | `Snippet`           | —              | 前置附加项（图标/文字）    |
| `trailing`       | `Snippet`           | —              | 后置附加项（图标/文字）    |
| `orientation`    | `'horizontal' \| 'vertical'` | `'horizontal'` | 布局方向          |
| `disabled`       | `boolean`           | `false`        | 禁用状态                  |
| `children`       | `Snippet`           | —              | 主输入元素                |
| `aria-label`     | `string`            | —              | 组合的无障碍标签           |

## Usage

### 带前置图标

```svelte
<script>
  import { InputGroup, TextField } from '@persona-ui/lib';
</script>

<InputGroup leading={() => '🔍'}>
  <TextField placeholder="搜索…" />
</InputGroup>
```

### 带后置按钮

```svelte
<InputGroup
  trailing={() => html`<Button>发送</Button>`}
>
  <TextField placeholder="输入消息…" />
</InputGroup>
```

### 货币输入

```svelte
<InputGroup leading={() => '$'}>
  <TextField type="number" placeholder="0.00" />
</InputGroup>
```

### URL 协议

```svelte
<InputGroup
  leading={() => 'https://'}
  trailing={() => html`<Button>访问</Button>`}
>
  <TextField placeholder="example.com" />
</InputGroup>
```

## Accessibility

- 根节点是 `role="group"` 表示关联控件
- `aria-disabled` 反映禁用状态
- 每个子输入保留自己的可聚焦性
