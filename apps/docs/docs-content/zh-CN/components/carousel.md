---
title: 轮播图
group: components
---

# Carousel

可滑动、键盘导航的内容轮播，支持自动播放、点指示器和循环。

## Import

```svelte
<script>
  import { Carousel } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                            | Default       | Description                |
| ---------------- | ----------------------------------------------- | ------------- | -------------------------- |
| `slides`         | `CarouselSlide[]`                               | —             | 幻灯片列表                  |
| `value`          | `number`                                        | —             | 受控当前索引                |
| `defaultValue`   | `number`                                        | `0`           | 非受控默认索引              |
| `interval`       | `number`                                        | `0`           | 自动播放间隔（ms，0=关闭）   |
| `showArrows`     | `boolean`                                       | `true`        | 显示上/下按钮               |
| `showDots`       | `boolean`                                       | `true`        | 显示点指示器                |
| `loop`           | `boolean`                                       | `true`        | 在边缘循环                  |
| `pauseOnHover`   | `boolean`                                       | `true`        | 悬停时暂停自动播放          |
| `aria-label`     | `string`                                        | `'轮播'`     | 无障碍标签                  |
| `onValueChange`  | `(index: number) => void`                       | —             | 当前幻灯片变化时触发        |

### `CarouselSlide`

```ts
type CarouselSlide = {
  id?: string;
  content?: Snippet;
  alt?: string;
};
```

## 键盘

- `←` / `→` — 上一张 / 下一张
- `Home` — 跳到第一张
- `End` — 跳到最后一张
- 移动端触摸滑动（左/右）

## Usage

```svelte
<script>
  import { Carousel } from '@persona-ui/lib';

  const slides = [
    { id: '1', content: () => `<img src="banner-1.jpg" alt="Banner 1" class="w-full" />` as never },
    { id: '2', content: () => `<img src="banner-2.jpg" alt="Banner 2" class="w-full" />` as never },
    { id: '3', content: () => `<img src="banner-3.jpg" alt="Banner 3" class="w-full" />` as never },
  ];
</script>

<Carousel {slides} interval={5000} />
```

### 手动模式

```svelte
<Carousel {slides} interval={0} showArrows showDots />
```

## 行为

- 自动播放会在悬停（如果 `pauseOnHover`）和聚焦时暂停
- 滑动阈值 50px
- `loop: false` 在边缘处夹紧而不是循环
- 活动点更宽（40px → 8px 过渡）

## Accessibility

- 根节点是 `aria-roledescription="carousel"`
- 每张幻灯片是 `role="group"`，`aria-roledescription="slide"`，`aria-label="Slide N of M"`
- 非活动幻灯片有 `aria-hidden="true"`
- 点是 `role="tablist"` 内的 `role="tab"`
- 容器可键盘聚焦以使用方向键
