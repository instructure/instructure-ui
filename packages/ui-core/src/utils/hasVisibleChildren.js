import React from 'react'
import matchComponentTypes from '@instructure/ui-utils/lib/react/matchComponentTypes'

import ScreenReaderContent from '../components/ScreenReaderContent'

/**
 * ---
 * category: utilities/react
 * ---
 * Returns `true` if any of the children are not wrapped with [ScreenReaderContent](#ScreenReaderContent).
 * @param {ReactChildren} children - A react component's children prop
 * @return {boolean} whether any of the children are visible
 */
export default function hasVisibleChildren (children) {
  let visible = false

  React.Children.forEach(children, (child) => {
    if (child && !matchComponentTypes(child, [ScreenReaderContent])) {
      visible = true
    }
  })

  return visible
}
