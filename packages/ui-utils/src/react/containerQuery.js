import getDisplayName from './getDisplayName'
import findDOMNode from '../dom/findDOMNode'
import getFontSize from '../dom/getFontSize'
import addResizeListener from '../dom/addResizeListener'
import debounce from '../debounce'

/**
 * ---
 * category: utilities/react
 * ---
 * A decorator or higher order component to provide the ability to style a
 * React component with container queries.
 *
 * The containerQuery HOC provides a `size` getter so that you can alter the behavior
 * of the component based on the size of its container.
 *
 * The `size` will be updated whenever the dimensions of the container change.
 *
 * So that CSS rules can be applied based on the dimensions of the container,
 * custom data attributes are added to the container DOM element.
 *
 * @param {Object} query
 * @returns {Function} a function that creates an element with containerQuery behavior
 */
export default function containerQuery (query) {
  const getSelectorMap = function (el) {
    return parseQuery(query, el)
  }

  return function (ComposedComponent) {
    return class extends ComposedComponent {
      static displayName = getDisplayName(ComposedComponent)
      static getSelectorMap = getSelectorMap

      updateAttributes = (size) => {
        if (this._size && (this._size.width === size.width && this._size.height === size.height)) {
          return
        }

        const container = findDOMNode(this)
        const selectorMap = getSelectorMap(container)(size)

        this._size = size

        // eslint-disable-next-line no-restricted-syntax
        for (const [selectorName, isOn] of toPairs(selectorMap)) {
          if (isOn) {
            container.setAttribute(`data-${selectorName}`, '')
          } else {
            container.removeAttribute(`data-${selectorName}`)
          }
        }
      }

      componentDidMount () {
        const node = findDOMNode(this)

        const size = {
          width: node.offsetWidth,
          height: node.offsetHeight
        }

        this._debounced = debounce(this.updateAttributes, 100, {leading: false, trailing: true})
        this._resizeListener = addResizeListener(node, this._debounced)

        this.updateAttributes(size)

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      componentWillUnmount () {
        if (this._resizeListener) {
          this._resizeListener.remove()
        }

        if (this._debounced) {
          this._debounced.cancel()
        }

        if (super.componentWillUnmount) {
          super.componentWillUnmount()
        }
      }

      get size () {
        this._size
      }
    }
  }
}

function parseQuery (query, el) {
  const rules = []
  let fontSizeRem = null
  let fontSizeEm = null

  // eslint-disable-next-line no-restricted-syntax
  for (const [selectorName, {minWidth, maxWidth, minHeight, maxHeight}] of toPairs(query)) {
    rules.push([
      selectorName,
      {
        minWidth: px(minWidth) || 0,
        maxWidth: px(maxWidth) || Infinity,
        minHeight: px(minHeight) || 0,
        maxHeight: px(maxHeight) || Infinity
      }
    ])
  }

  function px (val) {
    if (!val || typeof val === 'number') {
      return val
    }

    const [ num, unit ] = parseUnit(val)

    if (unit === 'rem') {
      fontSizeRem = fontSizeRem || getFontSize()
      return num * fontSizeRem
    } else if (unit === 'em') {
      fontSizeEm = fontSizeEm || getFontSize(el)
      return num * fontSizeEm
    } else {
      return num
    }
  }

  return function ({width, height}) {
    const selectorMap = {}

    // eslint-disable-next-line no-restricted-syntax
    for (const [selectorName, {minWidth, maxWidth, minHeight, maxHeight}] of rules) {
      selectorMap[selectorName] = (
        minWidth <= width && width <= maxWidth &&
        minHeight <= height && height <= maxHeight
      )
    }

    return selectorMap
  }
}

function toPairs (obj) {
  return Object.keys(obj).map((key) => [key, obj[key]])
}

function parseUnit (str) {
  return [
    parseFloat(`${str}`, 10),
    str.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
  ]
}
