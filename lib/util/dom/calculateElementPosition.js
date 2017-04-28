import getBoundingClientRect from './getBoundingClientRect'
import getScrollParents from './getScrollParents'
import canUseDOM from './canUseDOM'
import findDOMNode from './findDOMNode'

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
  const elementRect = getBoundingClientRect(element)
  const targetRect = getBoundingClientRect(target)

  const placement = parsePlacement(options.placement)
  const targetPlacement = mirrorPlacement(placement)

  const targetSize = { width: targetRect.width, height: targetRect.height }
  const elementSize = { width: elementRect.width, height: elementRect.height }

  const offset = offsetToPx({ top: options.offsetY, left: options.offsetX }, targetSize)

  let position = {
    offset: calculateOffset(placement, targetPlacement, elementSize, targetSize, offset),
    width: elementSize.width,
    height: elementSize.height,
    top: targetRect.top,
    left: targetRect.left,
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
    position.offset = calculateOffset(placement, targetPlacement, elementSize, targetSize, offset)
  }

  return position
}

function calculateOffset (placement, targetPlacement, elementSize, targetSize, optionalOffset) {
  let offset = addOffsets(
    adjustOffsetForPlacement(targetPlacement, optionalOffset),
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

  const oob = {
    top: top < bounds.top,
    bottom: top + height > bounds.bottom,
    left: left < bounds.left,
    right: left + width > bounds.right
  }

  if (['top', 'bottom'].indexOf(placement[0]) >= 0) {
    // vertical: placement[1] could be center, start, end

    if (oob.left && oob.right) {
      placement[1] = 'center'
      targetPlacement[1] = 'center'
    } else if (oob.left) {
      placement[1] = 'start'
      targetPlacement[1] = 'start'
    } else if (oob.right) {
      placement[1] = 'end'
      targetPlacement[1] = 'end'
    }

    if (oob.top) {
      placement[0] = 'bottom'
      targetPlacement[0] = 'top'
    } else if (oob.bottom) {
      placement[0] = 'top'
      targetPlacement[0] = 'bottom'
    }
  } else if (['start', 'end'].indexOf(placement[0]) >= 0) {
    // horizontal: placement[1] could be center, top, bottom

    if (oob.top && oob.bottom) {
      placement[1] = 'center'
      targetPlacement[1] = 'center'
    } else if (oob.top) {
      placement[1] = 'top'
      targetPlacement[1] = 'top'
    } else if (oob.bottom) {
      placement[1] = 'bottom'
      targetPlacement[1] = 'bottom'
    }

    if (oob.left) {
      placement[0] = 'end'
      targetPlacement[0] = 'start'
    } else if (oob.right) {
      placement[0] = 'start'
      targetPlacement[0] = 'end'
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

  return getBoundingClientRect(el)
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
  const offset = {
    top: 0,
    start: 0,
    center: '50%',
    bottom: '100%',
    end: '100%'
  }

  let [first, second] = placement

  if (['start', 'end'].indexOf(first) >= 0) {
    [first, second] = [second, first]
  }

  let top = 0
  let left = 0

  if (typeof offset[first] !== 'undefined') {
    top = offset[first]
  }

  if (typeof offset[second] !== 'undefined') {
    left = offset[second]
  }

  return { top, left }
}

function adjustOffsetForPlacement (placement, offset) {
  let { top, left } = offset

  if (top && placement[0] === 'top') {
    top = -1 * top
  }

  if (left && placement[0] === 'start') {
    left = -1 * left
  }

  return { top, left }
}

function sortPlacement (placement) {
  let [first, second] = placement

  if (first === 'center') {
    [first, second] = [second, first]
  }
  return [first, second]
}

function mirrorPlacement (placement) {
  const [first, second] = placement
  const mirror = {
    center: 'center',
    start: 'end',
    end: 'start',
    top: 'bottom',
    bottom: 'top'
  }
  return [mirror[first], second]
}

function parsePlacement (placement) {
  let parsed = placement.split(' ')

  if (parsed.length === 1) {
    parsed = [placement, 'center']
  }

  return sortPlacement(parsed)
}

function formatPlacement (placement) {
  return placement.join(' ')
}
