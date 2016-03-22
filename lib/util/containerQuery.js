import { findDOMNode } from 'react-dom'
import shallowEqual from 'shallowequal'
import getDefaultFontSize from './getDefaultFontSize'

export default function containerQuery (query) {
  return function (ComposedComponent) {
    const displayName = ComposedComponent.displayName || ComposedComponent.name

    return class extends ComposedComponent {

      static displayName = displayName;

      updateAttributes = () => {
        const container = findDOMNode(this)
        const selectorMap = this._getSelectorMap(this._size)

        if (shallowEqual(this._containerQuerySelectorMap, selectorMap)) {
          return
        }

        this._containerQuerySelectorMap = selectorMap

        for (const [selectorName, isOn] of toPairs(this._containerQuerySelectorMap)) {
          if (isOn) {
            container.setAttribute('data-' + selectorName, '')
          } else {
            container.removeAttribute('data-' + selectorName)
          }
        }
      };

      componentDidMount () {
        const container = findDOMNode(this)

        this._containerQuerySelectorMap = null
        this._getSelectorMap = parseQuery(query)
        this._size = { width: null, height: null }
        this._rafId = null

        const checkDimensions = () => {
          const {
            clientWidth: width,
            clientHeight: height
          } = container

          let changed = false

          if (this._size.width !== width) {
            changed = true
          }

          this._size.width = width
          this._size.height = height

          if (changed) {
            this.updateAttributes()
          }

          this._rafId = window.requestAnimationFrame(checkDimensions)
        }

        checkDimensions()

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      componentWillUnmount () {
        window.cancelAnimationFrame(this._rafId)
        this._rafId = null

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
