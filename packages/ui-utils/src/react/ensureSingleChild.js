import React, { Children } from 'react'
import safeCloneElement from './safeCloneElement'

export default function ensureSingleChild (child, props = {}) {
  const childCount = Children.count(child)

  if (childCount === 0) {
    return null
  } else if ((typeof child === 'string' && child.length > 0) || childCount > 1) {
    return (
      <span {...props}>
        {child}
      </span>
    )
  } else {
    return safeCloneElement(child, props)
  }
}
