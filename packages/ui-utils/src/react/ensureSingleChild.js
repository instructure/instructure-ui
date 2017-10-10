import React, { Children } from 'react'
import safeCloneElement from './safeCloneElement'

/**
 * ---
 * category: utilities/react
 * ---
 *
 * Ensure a single child. If it is a child of length 1, return a
 * cloned instance of the child. If it is a child of length > 1,
 * wrap in a span and return the child. Return null if child has
 * no length.
 *
 * @param {ReactElement} child
 * @param {Object} props - props for child
 * @returns {ReactElement} cloned instance for a single child, or children wrapped in a span
 */
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
