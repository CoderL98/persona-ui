---
title: Carousel
group: components
---

# Carousel

A swipeable, keyboard-navigable content carousel with optional auto-advance, dot indicators, and loop support.

## Import

```svelte
<script>
  import { Carousel } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                                            | Default       | Description                              |
| ---------------- | ----------------------------------------------- | ------------- | ---------------------------------------- |
| `slides`         | `CarouselSlide[]`                               | —             | Slides to display                        |
| `value`          | `number`                                        | —             | Controlled current index                 |
| `defaultValue`   | `number`                                        | `0`           | Uncontrolled default index               |
| `interval`       | `number`                                        | `0`           | Auto-advance interval (ms; 0 = off)      |
| `showArrows`     | `boolean`                                       | `true`        | Show prev/next buttons                   |
| `showDots`       | `boolean`                                       | `true`        | Show dot indicators                      |
| `loop`           | `boolean`                                       | `true`        | Wrap around at edges                     |
| `pauseOnHover`   | `boolean`                                       | `true`        | Pause auto-advance on hover              |
| `aria-label`     | `string`                                        | `'Carousel'`  | Accessible label                         |
| `onValueChange`  | `(index: number) => void`                       | —             | Fired when active slide changes          |

### `CarouselSlide`

```ts
type CarouselSlide = {
  id?: string;
  content?: Snippet;
  alt?: string;
};
```

## Keyboard

- `←` / `→` — Previous / next slide
- `Home` — Jump to first
- `End` — Jump to last
- Touch swipe (left/right) on mobile

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

### Manual mode

```svelte
<Carousel {slides} interval={0} showArrows showDots />
```

## Behavior

- Auto-advance pauses on hover (if `pauseOnHover`) and focus
- Swipe threshold is 50px
- `loop: false` clamps at edges instead of wrapping
- Active dot is wider (40px → 8px transition)

## Accessibility

- Root has `aria-roledescription="carousel"`
- Each slide is `role="group"` with `aria-roledescription="slide"` and `aria-label="Slide N of M"`
- Inactive slides have `aria-hidden="true"`
- Dots are `role="tab"` in a `role="tablist"`
- Container is keyboard-focusable for arrow keys
