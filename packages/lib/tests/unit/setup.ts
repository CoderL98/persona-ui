// jsdom doesn't support Web Animations API — mock it for svelte/transitions
if (typeof Element !== 'undefined' && !Element.prototype.animate) {
  Element.prototype.animate = function () {
    return {
      play: () => {},
      pause: () => {},
      reverse: () => {},
      cancel: () => {},
      finish: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      finished: Promise.resolve(),
      currentTime: 0,
      playbackRate: 1,
    } as unknown as Animation;
  };
}
