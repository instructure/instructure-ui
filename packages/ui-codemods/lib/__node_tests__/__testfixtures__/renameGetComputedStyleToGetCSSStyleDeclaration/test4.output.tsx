// @ts-nocheck

import { getCSSStyleDeclaration } from '@instructure/ui-dom-utils'

function test() {
  const getComputedStyle = () => {}
  return getComputedStyle(element)
}

getCSSStyleDeclaration()
const styles = getCSSStyleDeclaration<HTMLElement>(element)
