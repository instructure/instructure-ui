import React, { Children } from 'react'
import warning from '@instructure/ui-utils/lib/warning'

/**
---
parent: Select
id: parseOptions
---
*/
export default function parseOptions (children) {
  const options = Children.map(children, (child) => {
    const { label, children } = child.props
    if (child.type === 'optgroup') {
      const group = []
      group.push(
        <option
          {...child.props}
          value={label}
          groupLabel
          disabled
        >
          {label}
        </option>
      )
      Children.forEach(children, (option, index) => {
        group.push(
          <option {...option.props} groupItem>
            {option.props.children}
          </option>
        )
      })
      return group
    } else {
      return child
    }
  })
  return Children.map(options, (option) => {
    const { label, id, value, children, disabled, icon, groupLabel, groupItem } = option.props

    warning(typeof value === 'string', '[Select] The value prop in <option> must be a string')

    return {
      id: id || value,
      label: label || children,
      children: children || label,
      icon: icon || null,
      disabled: disabled || null,
      groupLabel: groupLabel || null,
      groupItem: groupItem || null,
      value
    }
  }) || []
}
