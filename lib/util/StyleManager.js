import shortid from 'shortid'

const setCssText = function (styleNode, cssText) {
  if ('textContent' in styleNode) {
    styleNode.textContent = cssText
  } else {
    styleNode.styleSheet.cssText = cssText
  }
}

// TODO: investigate whether injecting component styles into a single style node would perform better
const insertStyle = function (cssText, id) {
  const styleNode = document.createElement('style')

  styleNode.setAttribute('type', 'text/css')
  styleNode.id = id

  setCssText(styleNode, cssText)

  document.head.insertBefore(styleNode, document.head.childNodes[0])
}

export default class StyleManager {
  constructor (prefix = 's__') {
    this._mounted = {}
    this._prefix = prefix
  }

  removeStyle = (id) => {
    const styleNode = document.getElementById(id)

    if (--this._mounted[id] <= 0 && styleNode) {
      styleNode.parentNode.removeChild(styleNode)
    }
  }

  updateStyle = (cssText, id) => {
    const styleId = this._prefix + id
    const styleNode = document.getElementById(styleId)

    if (styleNode) {
      setCssText(styleNode, cssText)
    } else {
      insertStyle(cssText, styleId)
    }

    return styleId
  }

  addStyle = (cssText, id) => {
    const styleId = this._prefix + (id || shortid.generate())
    const styleNode = document.getElementById(styleId)

    if (!styleNode) {
      this._mounted[styleId] = 1
      insertStyle(cssText, styleId)
    } else {
      this._mounted[styleId]++
    }

    return styleId
  }
}
