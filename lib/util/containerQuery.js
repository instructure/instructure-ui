import { findDOMNode } from 'react-dom'
import deepEqual from 'deep-equal'
import getDefaultFontSize from './getDefaultFontSize'
import getDisplayName from './getDisplayName'

export default function containerQuery (query) {
  return function (ComposedComponent) {
    return class extends ComposedComponent {
      static displayName = getDisplayName(ComposedComponent)

      updateAttributes = () => {
        if (this._isUnmounted) {
          return
        }
        const container = findDOMNode(this)
        const selectorMap = this._getSelectorMap(this._size)

        if (deepEqual(this._containerQuerySelectorMap, selectorMap)) {
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
      }

      componentDidMount () {
        this._containerQuerySelectorMap = null
        this._getSelectorMap = parseQuery(query)
        this._size = { width: null, height: null }

        const checkDimensions = () => {
          if (this._isUnmounted) {
            return
          }

          const container = findDOMNode(this)

          const {
            offsetWidth: width,
            offsetHeight: height
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

          window.requestAnimationFrame(checkDimensions)
        }

        checkDimensions()

        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      componentWillUnmount () {
        this._isUnmounted = true

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
