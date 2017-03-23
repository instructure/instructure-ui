import React, { PropTypes } from 'react'
import getDisplayName from './getDisplayName'

export default {
  Children: {
    /**
     * Validate that the children of a component is one of the specified types.
     *
     * Example:
     *
     *  class Example extends Component {
     *    static propTypes = {
     *      children: CustomPropTypes.Children.oneOf([Foo, Bar, Baz])
     *    }
     *
     *    render () {
     *      return <div>{this.props.children}</div>
     *    }
     *  }
     *
     * This will allow children such as:
     *
     *  <Example>
     *    <Foo />
     *  </Example>
     *
     *  - OR -
     *
     *  <Example>
     *    <Bar />
     *    <Foo />
     *  </Example>
     *
     * But will fail on something like:
     *
     *  <Example>
     *    <h1>Example</h1>
     *    <Foo />
     *  </Example>
     *
     * @returns Error if validation failed
     */
    oneOf (validTypes) {
      return function (props, propName, componentName) {
        const children = React.Children.toArray(props[propName])
        const validTypeNames = validTypes.map(type => getDisplayName(type))

        for (let i = 0; i < children.length; i++) {
          const childName = getDisplayName(children[i].type)

          if (validTypeNames.indexOf(childName) < 0) {
            return new Error(
              'Expected one of ' + validTypeNames.join(', ') + ' in ' + componentName + ' but found `' + childName + '`'
            )
          }
        }
      }
    },

    /**
     * Validate the type and order of children for a component.
     *
     * Example:
     *
     *  class Example extends Component {
     *    static propTypes = {
     *      children: CustomPropTypes.Children.requireOrder([Foo, Bar, Baz])
     *    }
     *
     *    render () {
     *      return <div>{this.props.children}</div>
     *    }
     *  }
     *
     * This will enforce the following:
     *
     *  <Example>
     *    <Foo />
     *    <Bar />
     *    <Baz />
     *  </Example>
     *
     * This validator will also allow various permutations of the order.
     *
     * Example:
     *
     *  class Example extends Component {
     *    static propTypes = {
     *      children: CustomPropTypes.Children.requireOrder(
     *        [Foo, Bar, Baz],
     *        [Foo, Bar],
     *        [Bar, Baz],
     *      )
     *    }
     *
     *    render () {
     *      return <div>{this.props.children}</div>
     *    }
     *  }
     *
     * This will enforce one of the following:
     *
     *  <Example>
     *    <Foo />
     *    <Bar />
     *    <Baz />
     *  </Example>
     *
     *  - OR -
     *
     *  <Example>
     *    <Foo />
     *    <Bar />
     *  </Example>
     *
     *  - OR -
     *
     *  <Example>
     *    <Bar />
     *    <Baz />
     *  </Example>
     *
     * @param {...Array} validTypeGroups One or more Arrays of valid types
     * @returns Error if validation failed
     */
    enforceOrder (...validTypeGroups) {
      function validateTypes (childNames, typeNames) {
        for (let i = 0; i < childNames.length; i++) {
          if (childNames[i] !== typeNames[i]) {
            return false
          }
        }

        return true
      }

      function formatGroupTypes (componentName, typeGroups) {
        return typeGroups
          .map((types) => formatTypes(componentName, types))
          .join('\n\n')
      }

      function formatTypes (componentName, types) {
        const children = types.map((type) => getDisplayName(type))
          .map((name) => `  <${name} />`)
          .join('\n')

        return `<${componentName}>\n${children}\n</${componentName}>`
      }

      return function (props, propName, componentName) {
        const childNames = React.Children.toArray(props[propName])
          .map((child) => getDisplayName(child.type))

        // Validate each group, if any of them are valid we're done
        for (let i = 0; i < validTypeGroups.length; i++) {
          const validTypeNames = validTypeGroups[i].map(type => getDisplayName(type))

          if (validateTypes(childNames, validTypeNames)) {
            return
          }
        }

        // If we make it through the loop then children are not valid
        return new Error(
          'Expected children of ' + componentName + ' in one of the following formats:\n' +
          formatGroupTypes(componentName, validTypeGroups) + '\n\n' +
          'Instead of:\n' +
          formatTypes(componentName, childNames)
        )
      }
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
  },

  elementType (props, propName, componentName, location, propFullName) {
    if (props[propName] === undefined) {
      return
    }

    const propValue = props[propName]
    const propType = typeof propValue

    if (React.isValidElement(propValue)) {
      return new Error(
        `Invalid ${location} \`${propFullName}\` of type ReactElement supplied to \`${componentName}\`, expected ` +
        `an element type (a string or a ReactClass).`
      )
    }

    if (propType !== 'function' && propType !== 'string') {
      return new Error(
        `Invalid ${location} \`${propFullName}\` of value \`${propValue}\` supplied to \`${componentName}\`, ` +
        `expected an element type (a string or a ReactClass).`
      )
    }
  },

  spacing (props, propName, componentName, location) {
    const validValues = [
      '0',
      'none',
      'auto',
      'xxxSmall',
      'xxSmall',
      'xSmall',
      'small',
      'medium',
      'large',
      'xLarge',
      'xxLarge'
    ]

    const propValue = props[propName]

    if (propValue === undefined) {
      return
    }

    const propValueType = typeof propValue

    if (propValueType !== 'string') {
      return new Error(
        `Invalid ${location} \`${propName}\` of type \`${propValueType}\` supplied to \`${componentName}\`, expected ` +
        `a string.`
      )
    }

    const propValues = propValue.split(' ')
    const valuesLength = propValues.length
    if (valuesLength > 0 && valuesLength < 5) {
      for (let i = 0; i < valuesLength; i++) {
        const valueIndex = validValues.indexOf(propValues[i])
        if (valueIndex === -1) {
          return new Error(
            `Invalid ${location} \`${propName}\` \`${propValues[i]}\` supplied to \`${componentName}\`, expected ` +
            `a one of \`${validValues.join(', ')}\`.`
          )
        }
      }
    } else {
      return new Error(
        `Invalid ${location} \`${propName}\` \`${propValue}\` supplied to \`${componentName}\`, expected ` +
        `between one and four of the following valid values: \`${validValues.join(', ')}\`.`
      )
    }
  },

  formFieldMessage: PropTypes.shape({
    text: PropTypes.string,
    type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
  })
}
