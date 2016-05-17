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
  },
  controllable (propType, handlerName = 'onChange', defaultPropName = 'defaultValue') {
    return function (props, propName, componentName) {
      const error = propType.apply(null, arguments)
      if (error) {
        return error
      }

      if (props[propName] && typeof props[handlerName] !== 'function') {
        return new Error([
          'You provided a `' + propName + '` prop without an `' + handlerName + '` handler on `' + componentName + '`.',
          'This will render a controlled component. ',
          'If the component should be uncontrolled and manage its own state, use `' + defaultPropName + '`. ',
          'Otherwise, set `' + handlerName + '`.'
        ].join(''))
      }
    }
  }
}
