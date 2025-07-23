// @ts-nocheck

import { getCSSStyleDeclaration } from '@instructure/ui-dom-utils'

function test() {
  const styleFunc = getCSSStyleDeclaration
  return styleFunc(element)
}
