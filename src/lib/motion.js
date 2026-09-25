// Large pointer-driven screens can afford the decorative scroll effects.
// Touch devices and reduced-motion users keep browser-native scrolling.
export const DESKTOP_MOTION_QUERY =
  '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
