import { DESKTOP_MOTION_QUERY } from './motion';

// Desktop marquees only animate while visible. Touch and reduced-motion users
// get an ordinary horizontal scroller with one copy of the content.
export const createMarquee = (track, { duration = 50, draggable = false } = {}) => {
  const viewport = track.parentElement;
  const duplicate = track.children[1];
  const desktopMotion = window.matchMedia(DESKTOP_MOTION_QUERY);
  const original = {
    overflowX: viewport.style.overflowX,
    touchAction: track.style.touchAction,
    duplicateDisplay: duplicate?.style.display || '',
  };
  let halfWidth = 0;
  let x = 0;
  let frame = 0;
  let lastTime = 0;
  let visible = false;
  let hovered = false;
  let pointer = null;
  let lastX = 0;

  const wrap = (value) => halfWidth ? ((value % halfWidth) - halfWidth) % halfWidth : 0;
  const apply = () => { track.style.transform = `translate3d(${x}px, 0, 0)`; };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    track.style.willChange = '';
  };
  const canAnimate = () => visible && !document.hidden && desktopMotion.matches && !hovered && pointer === null && halfWidth > 0;
  const tick = (time) => {
    frame = 0;
    if (!canAnimate()) return stop();
    const elapsed = lastTime ? Math.min(time - lastTime, 64) : 0;
    lastTime = time;
    x = wrap(x - halfWidth * elapsed / (duration * 1000));
    apply();
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    if (!canAnimate()) return stop();
    if (!frame) {
      track.style.willChange = 'transform';
      frame = requestAnimationFrame(tick);
    }
  };
  const measure = () => {
    halfWidth = !desktopMotion.matches ? 0 : track.scrollWidth / 2;
    x = wrap(x);
    if (desktopMotion.matches) apply();
    sync();
  };
  const configure = () => {
    stop();
    pointer = null;
    hovered = false;
    x = 0;
    track.style.transform = '';
    track.style.touchAction = !desktopMotion.matches ? 'pan-x pan-y' : original.touchAction;
    viewport.style.overflowX = !desktopMotion.matches ? 'auto' : original.overflowX;
    if (duplicate) duplicate.style.display = !desktopMotion.matches ? 'none' : original.duplicateDisplay;
    measure();
  };
  const onEnter = (event) => {
    if (event.pointerType === 'touch') return;
    hovered = true;
    sync();
  };
  const onLeave = () => { hovered = false; sync(); };
  const onDown = (event) => {
    if (!draggable || !desktopMotion.matches || event.button !== 0) return;
    pointer = event.pointerId;
    lastX = event.clientX;
    track.setPointerCapture?.(pointer);
    track.classList.add('cursor-grabbing');
    sync();
  };
  const onMove = (event) => {
    if (event.pointerId !== pointer) return;
    x = wrap(x + event.clientX - lastX);
    lastX = event.clientX;
    apply();
    event.preventDefault();
  };
  const onUp = (event) => {
    if (event.pointerId !== pointer) return;
    const captured = pointer;
    pointer = null;
    if (track.hasPointerCapture?.(captured)) track.releasePointerCapture(captured);
    track.classList.remove('cursor-grabbing');
    sync();
  };

  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  const resize = new ResizeObserver(measure);
  intersection.observe(viewport);
  resize.observe(track);
  desktopMotion.addEventListener('change', configure);
  document.addEventListener('visibilitychange', sync);
  track.addEventListener('pointerenter', onEnter);
  track.addEventListener('pointerleave', onLeave);
  track.addEventListener('pointerdown', onDown);
  track.addEventListener('pointermove', onMove, { passive: false });
  track.addEventListener('pointerup', onUp);
  track.addEventListener('pointercancel', onUp);
  track.addEventListener('lostpointercapture', onUp);
  configure();

  return () => {
    stop();
    intersection.disconnect();
    resize.disconnect();
    desktopMotion.removeEventListener('change', configure);
    document.removeEventListener('visibilitychange', sync);
    track.removeEventListener('pointerenter', onEnter);
    track.removeEventListener('pointerleave', onLeave);
    track.removeEventListener('pointerdown', onDown);
    track.removeEventListener('pointermove', onMove);
    track.removeEventListener('pointerup', onUp);
    track.removeEventListener('pointercancel', onUp);
    track.removeEventListener('lostpointercapture', onUp);
    track.style.transform = '';
    track.style.touchAction = original.touchAction;
    viewport.style.overflowX = original.overflowX;
    if (duplicate) duplicate.style.display = original.duplicateDisplay;
    track.classList.remove('cursor-grabbing');
  };
};
