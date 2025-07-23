// @ts-nocheck

import { getComputedStyle as getStyle } from '@instructure/ui-dom-utils'

function test() {
  const styles = getStyle(element)
  window.getComputedStyle()
  getComputedStyle()

  obj.getComputedStyle(element)
}
