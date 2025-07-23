// @ts-nocheck

import { getCSSStyleDeclaration, otherFunc } from '@instructure/ui-dom-utils'

function test() {
  const oldStyles = getCSSStyleDeclaration(element)
  const newStyles = getCSSStyleDeclaration(element)
  window.getComputedStyle()
  return getCSSStyleDeclaration()
}
