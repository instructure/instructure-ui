/**
 * ---
 * category: utilities/react
 * ---
 * Get the React element type for a component.
 *
 * @module getElementType
 * @param {ReactComponent} Component
 * @param {Object} props
 * @param {Function} getDefault an optional function that returns the default element type
 * @returns {String} the element type
 */
export default function (Component, props, getDefault) {
  if (props.as && props.as !== Component.defaultProps.as) {
    return props.as
  }

  if (typeof getDefault === 'function') {
    return getDefault()
  }

  if (props.href) {
    return 'a'
  }

  if (typeof props.onClick === 'function') {
    return 'button'
  }

  return Component.defaultProps.as || 'span'
}
