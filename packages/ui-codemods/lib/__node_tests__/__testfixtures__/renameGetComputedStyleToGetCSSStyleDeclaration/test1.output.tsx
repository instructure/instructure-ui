// @ts-nocheck

// test for basic import renaming
import { getCSSStyleDeclaration } from '@instructure/ui-dom-utils'

function test() {
  const oldStyles = getCSSStyleDeclaration(element)
  const newStyles = getCSSStyleDeclaration(element)

  document.defaultView.getComputedStyle(element)

  window.getComputedStyle()

  getCSSStyleDeclaration(element, ':before')

  registerFunction(getCSSStyleDeclaration)

  return getCSSStyleDeclaration()
}
