import invariant from 'invariant'
import getDisplayName from './getDisplayName'

/**
 * Deprecate a prop for a Component
 */
export default function deprecated (version, oldProps) {
  return function (ComposedComponent) {
    const displayName = getDisplayName(ComposedComponent)

    class DeprecatedComponent extends ComposedComponent {
      static displayName = displayName

      constructor (props, context) {
        checkProps(version, props, oldProps)

        super(props, context)
      }

      componentWillReceiveProps (nextProps) {
        checkProps(version, nextProps, oldProps)

        if (super.componentWillReceiveProps) {
          super.componentWillReceiveProps(nextProps)
        }
      }
    }

    return DeprecatedComponent
  }
}

function checkProps (version, props, oldProps) {
  Object.keys(oldProps).forEach((oldProp) => {
    if (typeof props[oldProp] !== 'undefined') {
      const newProp = typeof oldProps[oldProp] === 'string'
        ? oldProps[oldProp]
        : null

      invariant(
        false,
        '%s was deprecated in %s%s',
        oldProp, version, (newProp ? ` use ${newProp} instead` : '')
      )
    }
  })
}
