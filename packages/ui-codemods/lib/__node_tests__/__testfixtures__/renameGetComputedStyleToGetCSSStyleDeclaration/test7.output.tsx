// @ts-nocheck
import { getCSSStyleDeclaration } from '@instructure/ui-dom-utils'
import * as DOMUtils from '@instructure/ui-dom-utils'

function test() {
  getCSSStyleDeclaration(element)
  DOMUtils.getCSSStyleDeclaration(element)
  window.getComputedStyle(element)
}
