/** Shared access to Locomotive Scroll for fixed UI (Navbar, etc.) */

let locoInstance = null
const listeners = new Set()

export function setLocoScroll(instance) {
  locoInstance = instance
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
  listeners.add(callback)

  const locoHandler = (args) => {
    const y = args?.scroll?.y ?? getScrollY()
    callback(y)
  }

  let attachedLoco = null

  const attach = () => {
    if (locoInstance && locoInstance !== attachedLoco) {
      if (attachedLoco) {
        try {
          attachedLoco.off('scroll', locoHandler)
        } catch {
          /* ignore */
        }
      }
      locoInstance.on('scroll', locoHandler)
      attachedLoco = locoInstance
    }
  }

  attach()
  // Loco may init after Navbar mounts — poll briefly
  const poll = window.setInterval(attach, 100)
  const stopPoll = window.setTimeout(() => clearInterval(poll), 2000)

  const onWindowScroll = () => callback(getScrollY())
  window.addEventListener('scroll', onWindowScroll, { passive: true })

  return () => {
    listeners.delete(callback)
    clearInterval(poll)
    clearTimeout(stopPoll)
    window.removeEventListener('scroll', onWindowScroll)
    if (attachedLoco) {
      try {
        attachedLoco.off('scroll', locoHandler)
      } catch {
        /* ignore */
      }
    }
  }
}
