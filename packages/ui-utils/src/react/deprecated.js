import getDisplayName from './getDisplayName'
import warning from '../warning'

/**
* ---
* category: utilities/react
* ---
* Deprecate React component props. Warnings will display in the console when deprecated
* props are used.
*
* ```js
*  class Example extends Component {
*    static propTypes = {
*      currentProp: PropTypes.func
*    }
*  }
*  export default deprecated('3.0.0', {
*    deprecatedProp: 'currentProp',
*    nowNonExistentProp: true
*  })(Example)
* ```
*
* @module deprecated
* @param {string} version
* @param {object} oldProps (if this argument is null or undefined, the entire component is deprecated)
* @param {string} message
* @return {function} React component with deprecated props behavior
*/
export default function deprecated (version, oldProps, message) {
  return function (ComposedComponent) {
    const displayName = getDisplayName(ComposedComponent)

    class DeprecatedComponent extends ComposedComponent {
      static displayName = displayName

      constructor (props, context) {
        if (oldProps) {
          warnDeprecatedProps(version, props, oldProps, message)
        } else {
          warnDeprecatedComponent(version, displayName, message)
        }

        super(props, context)
      }

      componentWillReceiveProps (nextProps) {
        if (oldProps) {
          warnDeprecatedProps(version, nextProps, oldProps, message)
        } else {
          warnDeprecatedComponent(version, displayName, message)
        }

        if (super.componentWillReceiveProps) {
          super.componentWillReceiveProps(nextProps)
        }
      }
    }

    return DeprecatedComponent
  }
}

function warnDeprecatedProps (version, props, oldProps, message) {
  Object.keys(oldProps).forEach((oldProp) => {
    if (typeof props[oldProp] !== 'undefined') {
      const newProp = typeof oldProps[oldProp] === 'string'
        ? oldProps[oldProp]
        : null

      warning(
        false,
        '%s was deprecated in %s%s. %s',
        oldProp, version, (newProp ? ` use ${newProp} instead` : ''), message || ''
      )
    }
  })
}

function warnDeprecatedComponent (version, displayName, message) {
  warning(false, '%s was deprecated in version %s %s', displayName, version, message || '')
}

export function changedPackageWarning (prevPackage, newPackage) {
  return `It has been moved from ${prevPackage} to ${newPackage}. See ${newPackage} ` +
    `in the documentation for more details`
}
