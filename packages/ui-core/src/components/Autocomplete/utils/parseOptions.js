import { Children } from 'react'
import warning from '@instructure/ui-utils/lib/warning'

/**
---
parent: Autocomplete
id: parseOptions
---
*/
export default function parseOptions (children) {
  return Children.map(children, (option) => {
    const { label, id, value, children } = option.props

    warning(typeof value === 'string', '[Autocomplete] The value prop in <option> must be a string')

    return {
      id: id || value,
      label: label || children,
      children: children || label,
      value
    }
  }) || []
}
