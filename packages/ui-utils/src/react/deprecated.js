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
* @param {object} oldProps
* @return {function} - React component with deprecated props behavior
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

      warning(
        false,
        '%s was deprecated in %s%s',
        oldProp, version, (newProp ? ` use ${newProp} instead` : '')
      )
    }
  })
}
