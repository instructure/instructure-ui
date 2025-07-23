// @ts-nocheck

import { getComputedStyle } from '@instructure/ui-dom-utils'

function test() {
  const styleFunc = getComputedStyle
  return styleFunc(element)
}
