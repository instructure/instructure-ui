import React from 'react'
import ScreenReaderContent from '../components/ScreenReaderContent'
import matchComponentTypes from './matchComponentTypes'

export default function hasVisibleContent (children) {
  let visible = false

  React.Children.forEach(children, (child) => {
    if (child && !matchComponentTypes(child, [ScreenReaderContent])) {
      visible = true
    }
  })

  return visible
}
