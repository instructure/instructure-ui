import React from 'react'
import invariant from 'invariant'

export default function safeCloneElement (element, config, ...children) {
  const cloneRef = config.ref
  const originalRef = element.ref
  const originalRefIsAFunction = (typeof originalRef === 'function')

  const overrides = {
    ...config,
    key: element.key || config.key // prevent overriding existing keys
  }

  if (originalRef == null || cloneRef == null) {
    return React.cloneElement(element, overrides, ...children)
  }

  if (originalRefIsAFunction) {
    return React.cloneElement(element, {
      ...overrides,
      ref (component) {
        cloneRef(component)
        originalRef(component)
      }
    }, ...children)
  } else {
    invariant(originalRefIsAFunction,
      'Cloning an element with a ref that will be overwritten because it ' +
      'is not a function. Use a composable callback-style ref instead. ' +
      'Ignoring ref: ' + originalRef)
  }
}
