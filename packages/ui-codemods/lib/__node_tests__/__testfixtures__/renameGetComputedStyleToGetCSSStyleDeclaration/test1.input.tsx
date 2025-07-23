// @ts-nocheck

// test for basic import renaming
import { getComputedStyle } from '@instructure/ui-dom-utils'

function test() {
  const oldStyles = getComputedStyle(element)
  const newStyles = getCSSStyleDeclaration(element)

  document.defaultView.getComputedStyle(element)

  window.getComputedStyle()

  getComputedStyle(element, ':before')

  registerFunction(getComputedStyle)

  return getComputedStyle()
}
