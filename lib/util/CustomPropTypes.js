import React from 'react'

export default {
  validChildren (validTypes) {
    return function (props, propName, componentName) {
      let error
      const children = props[propName]
      const validTypeNames = validTypes.map((type) => (type.displayName || type.name || type))

      React.Children.forEach(children, (child) => {
        const childName = (child.type.displayName || child.type.name || child.type)

        if (validTypeNames.indexOf(childName) < 0) {
          error = new Error(
            'Expected one of ' + validTypeNames.join(', ') + ' in ' + componentName + ' but found `' + childName + '`'
          )
        }
      })

      return error
    }
  }
}
