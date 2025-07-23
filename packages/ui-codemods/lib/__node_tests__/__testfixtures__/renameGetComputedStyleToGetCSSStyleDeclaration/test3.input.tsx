// @ts-nocheck

import { getComputedStyle, otherFunc } from '@instructure/ui-dom-utils'

function test() {
  const oldStyles = getComputedStyle(element)
  const newStyles = getCSSStyleDeclaration(element)
  window.getComputedStyle()
  return getComputedStyle()
}
