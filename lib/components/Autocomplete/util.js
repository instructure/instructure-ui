import { Children } from 'react'

export function getOptionId (option) {
  if (typeof option === 'string') {
    return option
  }

  if (!option || typeof option !== 'object') {
    return null
  }

  if (option.id !== undefined && option.id !== null) {
    return option.id
  }

  if (option.value !== undefined && option.value !== null) {
    return option.value
  }

  return null
}

export function parseOptions (children) {
  return Children.map(children, (option) => {
    const { label, id, value, children } = option.props

    // PropTypes will also fail due to this but this was added for emphasis
    if (typeof value !== 'string') {
      throw new Error('The value prop in <option> must be a string')
    }

    return {
      id: id || value,
      label: label || children,
      children: children || label,
      value
    }
  }) || []
}
