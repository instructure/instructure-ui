import React from 'react'
import invariant from 'invariant'
import createChainedFunction from './createChainedFunction'

export default function safeCloneElement (element, props, ...children) {
  const cloneRef = props.ref
  const originalRef = element.ref
  const originalRefIsAFunction = (typeof originalRef === 'function')

  const overrides = {
    ...props,
    key: element.key || props.key // prevent overriding existing keys
  }

  // Add chained function to preserve existing event handlers
  Object.keys(props).forEach((prop) => {
    // If prop looks like an event handler "on*" and either
    // props[props] or element.props[prop] is a function create a chained function.
    // If only one is a function it will just use that function with no extra overhead.
    // This is necessary in cases where props[prop] is `null` or `undefined` which would
    // otherwise unwantedly override element.props[prop].
    if (prop.indexOf('on') === 0 && (
        typeof props[prop] === 'function' ||
        typeof element.props[prop] === 'function'
    )) {
      overrides[prop] = createChainedFunction(element.props[prop], props[prop])
    }
  })

  if (originalRef == null || cloneRef == null) {
    return React.cloneElement(element, overrides, ...children)
  }

  invariant(originalRefIsAFunction,
    `Cloning an element with a ref that will be overwritten because it \
is not a function. Use a composable callback-style ref instead. \
Ignoring ref: ${originalRef}`)

  return React.cloneElement(element, {
    ...overrides,
    ref (component) {
      cloneRef(component)
      originalRef(component)
    }
  }, ...children)
}
