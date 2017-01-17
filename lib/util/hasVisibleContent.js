import React from 'react'
import ScreenReaderContent from '../components/ScreenReaderContent'

export default function hasVisibleContent (children) {
  const childCount = React.Children.count(children)
  let hasVisibleContent = childCount > 0

  if (childCount === 1 && typeof children !== 'string') {
    const onlyChild = React.Children.only(children)
    hasVisibleContent = onlyChild.type !== ScreenReaderContent
  }

  return hasVisibleContent
}
