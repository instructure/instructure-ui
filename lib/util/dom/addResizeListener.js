import findDOMNode from './findDOMNode'
import requestAnimationFrame from './requestAnimationFrame'

// TODO: replace with https://wicg.github.io/ResizeObserver/ when it's supported
export default function addResizeListener (el, handler) {
  const node = findDOMNode(el)
  let width = node.offsetWidth
  let cancelled = false
  let raf

  const checkDimensions = () => {
    if (cancelled) {
      return
    }

    const size = {
      width: node.offsetWidth,
      height: node.offsetHeight
    }

    if (size.width !== width && typeof handler === 'function') {
      handler(size)
    }

    width = size.width

    raf = requestAnimationFrame(checkDimensions)
  }

  checkDimensions()

  return {
    remove () {
      cancelled = true
      raf.cancel()
    }
  }
}
