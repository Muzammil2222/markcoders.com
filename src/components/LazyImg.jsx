import { forwardRef } from 'react';
import Img from 'react-cool-img';
import { COOL_IMG_DEFAULTS } from '../lib/coolImg';

/**
 * Project wrapper around react-cool-img: loads when scrolled near the viewport.
 * Below-the-fold only — it renders a placeholder first and swaps the src from JS,
 * so above-the-fold / LCP images must stay plain <img>.
 */
const LazyImg = forwardRef(function LazyImg({ decode = true, ...props }, ref) {
  return <Img ref={ref} decode={decode} {...COOL_IMG_DEFAULTS} {...props} />;
});

export default LazyImg;
