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

  return Component.defaultProps.as || 'span'
}
