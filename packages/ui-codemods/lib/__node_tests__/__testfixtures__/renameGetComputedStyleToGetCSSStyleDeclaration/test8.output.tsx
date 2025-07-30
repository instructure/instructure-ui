// @ts-nocheck
import { getCSSStyleDeclaration } from '@instructure/ui-dom-utils'

function test() {
  getCSSStyleDeclaration()

  const getComputedStyle = window.getComputedStyle()
  getComputedStyle()
}
