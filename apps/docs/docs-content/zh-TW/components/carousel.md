---
title: 輪播圖
group: components
---

# Carousel

可滑動、鍵盤導航的內容輪播，支援自動播放、點指示器和循環。

## Import

```svelte
<script>
  import { Carousel } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                            | Default       | Description                |
| ---------------- | ----------------------------------------------- | ------------- | -------------------------- |
| `slides`         | `CarouselSlide[]`                               | —             | 投影片列表                  |
| `value`          | `number`                                        | —             | 受控當前索引                |
| `defaultValue`   | `number`                                        | `0`           | 非受控預設索引              |
| `interval`       | `number`                                        | `0`           | 自動播放間隔（ms，0=關閉）   |
| `showArrows`     | `boolean`                                       | `true`        | 顯示上/下按鈕               |
| `showDots`       | `boolean`                                       | `true`        | 顯示點指示器                |
| `loop`           | `boolean`                                       | `true`        | 在邊緣循環                  |
| `pauseOnHover`   | `boolean`                                       | `true`        | 懸停時暫停自動播放          |
| `aria-label`     | `string`                                        | `'輪播'`     | 無障礙標籤                  |
| `onValueChange`  | `(index: number) => void`                       | —             | 當前投影片變化時觸發        |

### `CarouselSlide`

```ts
type CarouselSlide = {
  id?: string;
  content?: Snippet;
  alt?: string;
};
```

## 鍵盤

- `←` / `→` — 上一張 / 下一張
- `Home` — 跳到第一張
- `End` — 跳到最後一張
- 行動端觸控滑動（左/右）

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

### 手動模式

```svelte
<Carousel {slides} interval={0} showArrows showDots />
```

## 行為

- 自動播放會在懸停（如果 `pauseOnHover`）和聚焦時暫停
- 滑動閾值 50px
- `loop: false` 在邊緣處夾緊而不是循環
- 活動點更寬（40px → 8px 過渡）

## Accessibility

- 根節點是 `aria-roledescription="carousel"`
- 每張投影片是 `role="group"`，`aria-roledescription="slide"`，`aria-label="Slide N of M"`
- 非活動投影片有 `aria-hidden="true"`
- 點是 `role="tablist"` 內的 `role="tab"`
- 容器可鍵盤聚焦以使用方向鍵
