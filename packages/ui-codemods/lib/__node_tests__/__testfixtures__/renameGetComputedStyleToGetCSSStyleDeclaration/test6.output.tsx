// @ts-nocheck

import * as DOMUtils from '@instructure/ui-dom-utils'

function test() {
  DOMUtils.getCSSStyleDeclaration()
  getComputedStyle()
  window.getComputedStyle()
  const styles = DOMUtils.getCSSStyleDeclaration(element)
  const { getComputedStyle } = window
  const styles2 = getComputedStyle(element)
}
