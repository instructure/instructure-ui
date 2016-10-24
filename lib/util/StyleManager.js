import shortid from 'shortid'
import invariant from 'invariant'

const STYLES = {}

const setCssText = function (styleNode, cssText) {
  if ('textContent' in styleNode) {
    styleNode.textContent = cssText
  } else {
    styleNode.styleSheet.cssText = cssText
  }
}

const insertStyle = function (cssText, id) {
  const styleNode = document.createElement('style')

  styleNode.setAttribute('type', 'text/css')
  styleNode.id = id

  setCssText(styleNode, cssText)

  document.head.insertBefore(styleNode, document.head.childNodes[0])
}

export default class StyleManager {
  constructor (prefix = 's__') {
    this._prefix = prefix
  }

  getStyleId = (id) => {
    return this._prefix + id
  }

  removeStyle = (id) => {
    const styleId = this.getStyleId(id)
    const styleNode = document.getElementById(styleId)

    invariant(styleNode, 'Attempting to remove a style node that does not exist with id: ' + id)

    if (!STYLES[styleId] || --STYLES[styleId] <= 0) {
      styleNode && styleNode.parentNode.removeChild(styleNode)
    }
  }

  updateStyle = (cssText, id) => {
    const styleId = this.getStyleId(id)
    const styleNode = document.getElementById(styleId)

    invariant(styleNode, 'Attempting to update a style node that does not exist with id: ' + id)

    styleNode && setCssText(styleNode, cssText)

    return styleId
  }

  addStyle = (cssText, id) => {
    const styleId = this.getStyleId(id || shortid.generate())
    const styleNode = document.getElementById(styleId)

    if (styleNode) {
      STYLES[styleId]++
    } else {
      STYLES[styleId] = 1
      insertStyle(cssText, styleId)
    }

    return styleId
  }
}
