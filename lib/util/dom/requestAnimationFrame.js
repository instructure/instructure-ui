import canUseDOM from './canUseDOM'

let requestAnimationFrame

/* istanbul ignore else  */
if (canUseDOM) {
  requestAnimationFrame = (cb) => {
    const id = window.requestAnimationFrame(cb)
    return {
      cancel: () => window.cancelAnimationFrame(id)
    }
  }
} else {
  /* https://github.com/component/raf */
  let prev = new Date().getTime()

  requestAnimationFrame = (cb) => {
    const curr = new Date().getTime()
    const ms = Math.max(0, 16 - (curr - prev))
    const req = setTimeout(cb, ms)
    prev = curr
    return {
      cancel: () => window.clearTimeout(req)
    }
  }
}

export default requestAnimationFrame
