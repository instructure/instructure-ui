import capitalizeFirstLetter from '../capitalizeFirstLetter'
import getBoundingClientRect from './getBoundingClientRect'
import getScrollParents from './getScrollParents'
import canUseDOM from './canUseDOM'
import findDOMNode from './findDOMNode'

const MIRROR_PLACEMENT = {
  center: 'center',
  left: 'right',
  right: 'left',
  middle: 'middle',
  top: 'bottom',
  bottom: 'top'
}

const OFFSET_MAP = {
  top: 0,
  left: 0,
  middle: '50%',
  center: '50%',
  bottom: '100%',
  right: '100%'
}

const SIDES = ['left', 'top', 'right', 'bottom']

export default function calculateElementPosition (element, target, options) {
  const node = findDOMNode(element)
  const targetNode = findDOMNode(target)

  if (!node || !targetNode || options.placement === 'offscreen') {
    return {
      style: getPositionStyle(),
      container: document.body,
      placement: options.placement
    }
  } else {
    const pos = _calculatePosition(node, targetNode, options)
    const placement = formatPlacement(pos.placement)

    return {
      container: pos.container,
      style: getPositionStyle({ ...pos }),
      placement
    }
  }
}

export function getPositionStyle (pos) {
  if (!pos) {
    return {
      left: '-9999em',
      overflow: 'hidden',
      position: 'absolute'
    }
  }

  let { top: yPos, left: xPos } = pos
  const { top: offsetY, left: offsetX } = pos.offset

  yPos += offsetY
  xPos += offsetX

  if (canUseDOM && window.matchMedia) {
    const retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches ||
                   window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches
    if (!retina) {
      xPos = Math.round(xPos)
      yPos = Math.round(yPos)
    }
  }

  return {
    top: 0,
    left: 0,
    position: 'absolute',
    transform: `translateX(${xPos}px) translateY(${yPos}px) translateZ(0)`
  }
}

function _calculatePosition (element, target, options) {
  const { width, height } = getBoundingClientRect(element)
  const {
    width: targetWidth,
    height: targetHeight,
    top,
    left
  } = getBoundingClientRect(target)

  const placement = parsePlacement(options.placement)
  const targetPlacement = mirrorPlacement(placement)

  const targetSize = { width: targetWidth, height: targetHeight }
  const elementSize = { width, height }

  let position = {
    offset: calculateOffset(placement, targetPlacement, elementSize, targetSize, options),
    width,
    height,
    top,
    left,
    targetPlacement,
    placement,
    container: element.ownerDocument.body
  }

  if (options.constrainToWindow || options.constrainToScrollParent) {
    if (options.constrainToWindow) {
      position = getConstrainedPosition(position, window, targetSize)
    }

    if (options.constrainToScrollParent) {
      position = getConstrainedPosition(position, getScrollParents(target)[0], targetSize)
    }

    // re-calculate the offset since placement may have changed
    position.offset = calculateOffset(placement, targetPlacement, elementSize, targetSize, options)
  }

  return position
}

function calculateOffset (placement, targetPlacement, elementSize, targetSize, options) {
  const optionalOffset = adjustOffsetForPlacement(
    targetPlacement, offsetToPx({ top: options.offsetY, left: options.offsetX }, targetSize)
  )

  let offset = addOffsets(
    optionalOffset,
    offsetToPx(getOffsetForPlacement(targetPlacement), elementSize)
  )

  const targetOffset = offsetToPx(getOffsetForPlacement(placement), targetSize)

  offset = {
    top: targetOffset.top - offset.top,
    left: targetOffset.left - offset.left
  }

  return offset
}

function getConstrainedPosition (position, container, targetSize) {
  const { height, width, placement, targetPlacement, offset } = position
  let { top, left } = position

  top += offset.top
  left += offset.left

  const bounds = getBounds(container)

  if (placement[0] === 'top') {
    if (targetPlacement[0] === 'bottom' && top < bounds.left) {
      placement[0] = 'bottom'
      targetPlacement[0] = 'top'
    } else if (targetPlacement[0] === 'top' &&
      top + height > bounds.bottom &&
      top - (height - targetSize.height) >= bounds.top
    ) {
      placement[0] = targetPlacement[0] = 'bottom'
    }
  } else if (placement[0] === 'bottom') {
    if (targetPlacement[0] === 'top' && top + height > bounds.bottom) {
      placement[0] = 'top'
      targetPlacement[0] = 'bottom'
    } else if (targetPlacement[0] === 'bottom' &&
      top < bounds.top &&
      top + (height * 2 - targetSize.height) <= bounds.bottom
    ) {
      placement[0] = targetPlacement[0] = 'top'
    }
  } else if (placement[0] === 'left') {
    if (targetPlacement[0] === 'right' && left < bounds.left) {
      placement[0] = 'right'
      targetPlacement[0] = 'left'
    } else if (targetPlacement[0] === 'left' &&
      left + width > bounds.right &&
      left - (width - targetSize.width) >= bounds.left
    ) {
      placement[0] = targetPlacement[0] = 'right'
    }
  } else if (placement[0] === 'right') {
    if (targetPlacement[0] === 'left' && left + width > bounds.right) {
      placement[0] = 'left'
      targetPlacement[0] = 'right'
    } else if (targetPlacement[0] === 'right' &&
      left < bounds.left &&
      left + (width * 2 - targetSize.width) <= bounds.right
    ) {
      placement[0] = targetPlacement[0] = 'left'
    }
  }

  return {
    ...position,
    targetPlacement,
    placement
  }
}

function getBounds (el) {
  if (el === window) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset,
      right: window.innerWidth + window.pageXOffset,
      bottom: window.innerHeight + window.pageYOffset
    }
  }

  let bounds = getBoundingClientRect(el)

  bounds.right = bounds.width + bounds.left
  bounds.bottom = bounds.height + bounds.top

  if (el.ownerDocument !== document) { // iframe
    const win = el.ownerDocument.defaultView
    bounds = {
      left: bounds.left += win.pageXOffset,
      top: bounds.top += win.pageYOffset,
      right: bounds.right += win.pageXOffset,
      bottom: bounds.bottom += win.pageYOffset
    }
  }

  const style = getComputedStyle(el)

  SIDES.forEach((side, i) => {
    bounds[side] += parseFloat(style[`border${capitalizeFirstLetter(side)}Width`])
  })

  return bounds
}

function addOffsets (...offsets) {
  const sum = { top: 0, left: 0 }

  offsets.forEach((offset) => {
    let { top, left } = offset

    if (typeof top === 'string') {
      top = parseFloat(top, 10)
    }

    if (typeof left === 'string') {
      left = parseFloat(left, 10)
    }

    sum.top += top
    sum.left += left
  })

  return sum
}

function offsetToPx (offset, size) {
  let { left, top } = offset

  if (typeof left === 'string' && left.indexOf('%') !== -1) {
    left = parseFloat(left, 10) / 100 * size.width
  } else {
    left = parseFloat(left, 10)
  }

  if (typeof top === 'string' && top.indexOf('%') !== -1) {
    top = parseFloat(top, 10) / 100 * size.height
  } else {
    top = parseFloat(top, 10)
  }

  return { left, top }
}

function getOffsetForPlacement (placement) {
  let [first, second] = placement

  if (['left', 'right'].indexOf(first) >= 0) {
    [first, second] = [second, first]
  }

  let top = 0
  let left = 0

  if (typeof OFFSET_MAP[first] !== 'undefined') {
    top = OFFSET_MAP[first]
  }

  if (typeof OFFSET_MAP[second] !== 'undefined') {
    left = OFFSET_MAP[second]
  }

  return { top, left }
}

function adjustOffsetForPlacement (placement, offset) {
  let { top, left } = offset

  if (top && placement[0] === 'top') {
    top = -1 * top
  }

  if (left && placement[0] === 'left') {
    left = -1 * left
  }

  return { top, left }
}

function mirrorPlacement (placement) {
  const [first, second] = placement
  return [MIRROR_PLACEMENT[first], second]
}

function sortPlacement (placement) {
  let [first, second] = placement

  if (first === 'middle' || first === 'center') {
    [first, second] = [second, first]
  }

  return [first, second]
}

function parsePlacement (placement) {
  let parsed = []

  if (placement.indexOf(' ') >= 0) {
    parsed = placement.split(' ')
  }

  if (['left', 'right'].indexOf(placement) >= 0) {
    parsed = [placement, 'middle']
  } else if (['bottom', 'top'].indexOf(placement) >= 0) {
    parsed = [placement, 'center']
  }

  return sortPlacement(parsed)
}

function formatPlacement (placement) {
  return placement.join(' ')
}
