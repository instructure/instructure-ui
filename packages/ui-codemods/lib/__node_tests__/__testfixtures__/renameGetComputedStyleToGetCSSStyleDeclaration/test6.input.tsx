// @ts-nocheck

import * as DOMUtils from '@instructure/ui-dom-utils'

function test() {
  DOMUtils.getComputedStyle()
  getComputedStyle()
  window.getComputedStyle()
  const styles = DOMUtils.getComputedStyle(element)
  const { getComputedStyle } = window
  const styles2 = getComputedStyle(element)
}
