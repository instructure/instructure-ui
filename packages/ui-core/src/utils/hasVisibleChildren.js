import React from 'react'
import matchComponentTypes from '@instructure/ui-utils/lib/react/matchComponentTypes'

import ScreenReaderContent from '../components/ScreenReaderContent'

export default function hasVisibleChildren (children) {
  let visible = false

  React.Children.forEach(children, (child) => {
    if (child && !matchComponentTypes(child, [ScreenReaderContent])) {
      visible = true
    }
  })

  return visible
}
