// @ts-nocheck

import { getComputedStyle } from '@instructure/ui-dom-utils'

function test() {
  const getComputedStyle = () => {}
  return getComputedStyle(element)
}

getComputedStyle()
const styles = getComputedStyle<HTMLElement>(element)
