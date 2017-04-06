import findDOMNode from './dom/findDOMNode'
import getDefaultFontSize from './dom/getDefaultFontSize'
import getDisplayName from './getDisplayName'
import addResizeListener from './dom/addResizeListener'
import debounce from './debounce'

export default function containerQuery (query) {
  const getSelectorMap = parseQuery(query)

  return function (ComposedComponent) {
    return class extends ComposedComponent {
      static displayName = getDisplayName(ComposedComponent)
      static getSelectorMap = getSelectorMap

      updateAttributes = (size) => {
        if (this._size && (this._size.width === size.width && this._size.height === size.height)) {
          return
        }

        const container = findDOMNode(this)
        const selectorMap = getSelectorMap(size)

        this._size = size

        for (const [selectorName, isOn] of toPairs(selectorMap)) {
          if (isOn) {
            container.setAttribute('data-' + selectorName, '')
          } else {
            container.removeAttribute('data-' + selectorName)
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
    }
  }
}

function parseQuery (query) {
  const rules = []
  let defaultFontSize = null

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

    const num = parseFloat(val)

    if (val.indexOf('rem') > 0) {
      // cache defaultFontSize
      defaultFontSize = defaultFontSize || getDefaultFontSize()
      return num * defaultFontSize
    } else if (val.indexOf('px') > 0) {
      return num
    }
  }

  return function ({width, height}) {
    const selectorMap = {}

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
