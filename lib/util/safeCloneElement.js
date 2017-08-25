import React from 'react'
import warning from './warning'
import createChainedFunction from './createChainedFunction'

export default function safeCloneElement (element, props, ...children) {
  const cloneRef = props.ref
  const originalRef = element.ref
  const originalRefIsAFunction = (typeof originalRef === 'function')

  const mergedProps = {...props}

  if (element.props.style && props.style) {
    // merge with existing styles
    mergedProps.style = { ...element.props.style, ...props.style }
  }

  // prevent overriding existing keys
  mergedProps.key = element.key || props.key

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
      mergedProps[prop] = createChainedFunction(element.props[prop], props[prop])
    }
  })

  if (originalRef == null || cloneRef == null) {
    return React.cloneElement(element, mergedProps, ...children)
  }

  warning(originalRefIsAFunction,
    `Cloning an element with a ref that will be overwritten because the ref \
is not a function. Use a composable callback-style ref instead. \
Ignoring ref: ${originalRef}`)

  return React.cloneElement(element, {
    ...mergedProps,
    ref (component) {
      cloneRef(component)
      originalRef(component)
    }
  }, ...children)
}
