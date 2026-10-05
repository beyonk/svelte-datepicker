const once = (el, evt, cb) => {
  if (!el) { return }
  function handler () {
    cb.apply(this, arguments)
    el.removeEventListener(evt, handler)
  }
  el.addEventListener(evt, handler)
}

export {
  once
}
