import React, { Children } from 'react'
import safeCloneElement from './safeCloneElement'

export default function ensureSingleChild (children, props = {}) {
  const childCount = Children.count(children)

  if (childCount === 0) {
    return null
  } else if ((typeof children === 'string' && children.length > 0) ||
    childCount > 1) {
    return <span {...props}>children</span>
  } else {
    return safeCloneElement(children, props)
  }
}
