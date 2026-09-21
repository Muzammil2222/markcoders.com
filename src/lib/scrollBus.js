/** Shared access to Locomotive Scroll for fixed UI (Navbar, etc.) */

let locoInstance = null
const scrollListeners = new Set()
const locoReadyListeners = new Set()

export function setLocoScroll(instance) {
  locoInstance = instance
  locoReadyListeners.forEach((fn) => {
    try {
      fn(instance)
    } catch {
      /* ignore */
    }
  })
}

export function getLocoScroll() {
  return locoInstance
}

/** Smooth-scroll to a selector/element via Locomotive, with native fallback. */
export function scrollToTarget(target, options = {}) {
  const loco = locoInstance
  const el =
    typeof target === 'string' ? document.querySelector(target) : target

  if (!el) return

  if (loco) {
    loco.scrollTo(el, {
      offset: options.offset ?? -96,
      duration: options.duration ?? 800,
      disableLerp: options.disableLerp ?? false,
    })
    return
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function getScrollY() {
  if (locoInstance?.scroll?.instance?.scroll) {
    return locoInstance.scroll.instance.scroll.y || 0
  }
  return window.scrollY || window.pageYOffset || 0
}

/** Subscribe to scroll from Locomotive (preferred) or window. */
export function subscribeScroll(callback) {
  scrollListeners.add(callback)

  const locoHandler = (args) => {
    const y = args?.scroll?.y ?? getScrollY()
    callback(y)
  }

  let attachedLoco = null

  const detachLoco = () => {
    if (!attachedLoco) return
    try {
      attachedLoco.off('scroll', locoHandler)
    } catch {
      /* ignore */
    }
    attachedLoco = null
  }

  const attachLoco = (instance) => {
    if (!instance) {
      detachLoco()
      return
    }
    if (instance === attachedLoco) return
    detachLoco()
    instance.on('scroll', locoHandler)
    attachedLoco = instance
  }

  attachLoco(locoInstance)
  locoReadyListeners.add(attachLoco)

  const onWindowScroll = () => callback(getScrollY())
  window.addEventListener('scroll', onWindowScroll, { passive: true })

  return () => {
    scrollListeners.delete(callback)
    locoReadyListeners.delete(attachLoco)
    window.removeEventListener('scroll', onWindowScroll)
    detachLoco()
  }
}
