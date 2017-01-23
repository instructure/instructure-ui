import CssTransformer from './CssTransformer'
import deepEqual from 'deep-equal'

const formatVariableName = function (variableName, componentName) {
  const name = componentName ? `${componentName}-${variableName}` : variableName
  return `--${name}`
}

const mapToCSSVariables = function (theme, componentName) {
  const map = {}

  Object.keys(theme || {}).forEach((variableName) => {
    map[variableName] = `var(${formatVariableName(variableName, componentName)})`
  })

  return map
}

const formatVariableNames = function (variables, componentName) {
  const formatted = {}
  Object.keys(variables || {}).forEach((key) => {
    formatted[formatVariableName(key, componentName)] = variables[key]
  })
  return formatted
}

const pickOverrides = function (defaultTheme, theme) {
  const overrides = {}

  // filter out any properties that are the same as in defaults
  Object.keys(theme || {}).forEach((key) => {
    if (defaultTheme[key] !== theme[key]) {
      overrides[key] = theme[key]
    }
  })

  return overrides
}

class ThemeableComponentStylesWithPolyfill {
  constructor ({ componentName, styles, scope }) {
    this._scope = scope
    this._componentName = componentName
    this._styles = styles
    this._domNode = null
    this._defaultTheme = {}
    this._styleNode
  }

  formatCustomProperties (variables) {
    return formatVariableNames(variables, this._componentName)
  }

  scopeStyles (cssText) {
    const node = this._domNode
    const scope = this._scope
    const attr = scope.toLowerCase()

    const addScopeToDomNode = function (node, attr) {
      if (node.setAttribute) {
        node.setAttribute(attr, '')
      }

      const children = node.children || node.childNodes || []

      for (let i = 0; i < children.length; i++) {
        addScopeToDomNode(children[i], attr)
      }
    }

    let styleNode = node.querySelector(`#${scope}`)

    if (!cssText) {
      styleNode && node.removeChild(styleNode)
      return
    } else {
      const shouldInsertNode = !styleNode
      let scopedCSS = cssText

      if (shouldInsertNode) {
        styleNode = document.createElement('style')
        styleNode.setAttribute('scoped', true)
        styleNode.setAttribute('type', 'text/css')
        styleNode.id = scope
      }

      if (!styleNode.scoped) { // if scoped styles are not supported...
        addScopeToDomNode(node, attr)
        scopedCSS = CssTransformer.scopeStyles(scopedCSS, `[${attr}]`)
      }

      if (shouldInsertNode) {
        node.insertBefore(styleNode, node.firstChild)
      }

      if ('textContent' in styleNode) {
        styleNode.textContent = scopedCSS
      } else {
        styleNode.styleSheet.cssText = scopedCSS
      }
    }
  }

  applyTheme (theme) {
    if (!this._domNode) {
      return
    }

    const overrides = pickOverrides(this._defaultTheme, theme)
    let cssText = ''

    if (overrides && Object.keys(overrides).length > 0) {
      const variables = this.formatCustomProperties(overrides)

      // inject the CSS variables into the style template
      cssText = this._styles(mapToCSSVariables(this._defaultTheme, this._componentName))

      cssText = CssTransformer.removeRulesWithoutVariables(cssText)
      // replace variables in the CSS with the actual values
      cssText = CssTransformer.applyVariables(cssText, variables)
      cssText = CssTransformer.removeVariables(cssText)
    }

    this.scopeStyles(cssText)
  }

  get cssText () {
    const theme = this._defaultTheme
    let cssText = this._styles(theme)

    // inject vars for @media rules
    const customMedia = theme ? formatVariableNames(theme) : {}
    cssText = CssTransformer.applyCustomMedia(cssText, customMedia)

    return cssText
  }

  init ({ domNode, defaultTheme, theme }) {
    this._domNode = domNode
    this._defaultTheme = defaultTheme || {}

    this.applyTheme(theme)
  }

  update ({ defaultTheme, theme }) {
    this._defaultTheme = defaultTheme || {}

    this.applyTheme(theme)
  }
}

class ThemeableComponentStylesWithCustomProperties {
  constructor ({ componentName, styles }) {
    this._componentName = componentName
    this._styles = styles
    this._domNode = null
    this._defaultTheme = {}
  }

  formatCustomProperties (variables) {
    return formatVariableNames(variables, this._componentName)
  }

  clearCustomProperties () {
    const node = this._domNode

    Object.keys(node.style).forEach((prop) => {
      if (prop.indexOf('--' + this._componentName + '-') > 0) {
        node.style.removeProperty(prop)
      }
    })
  }

  setCustomProperties (properties) {
    const node = this._domNode
    const props = this.formatCustomProperties(properties)

    Object.keys(props).forEach(function (propertyName) {
      const value = props[propertyName]

      if (value) {
        node.style.setProperty(propertyName, value)
      }
    })
  }

  applyTheme (theme) {
    if (!this._domNode) {
      return
    }

    this.clearCustomProperties()

    const overrides = pickOverrides(this._defaultTheme, theme)

    if (overrides && Object.keys(overrides).length > 0) {
      this.setCustomProperties(overrides)
    }
  }

  get cssText () {
    const theme = this._defaultTheme || {}

    const toCSSText = function (variables = {}) {
      const names = Object.keys(variables)
      const rules = names.map((name) => {
        return name + ': ' + variables[name]
      }).join(';\n')

      if (names.length > 0) {
        return `
          :root {
            ${rules}
          }
        `
      } else {
        return ''
      }
    }

    const cssVariables = theme ? mapToCSSVariables(theme, this._componentName) : {}
    // inject the CSS variables into the style template
    let cssText = this._styles(cssVariables)

    // inject vars for @media rules
    const customMedia = theme ? formatVariableNames(theme) : {}
    cssText = CssTransformer.applyCustomMedia(cssText, customMedia)

    const cssVariablesString = theme ? this.formatCustomProperties(theme) : ''

    // append the CSS variables (defaults) to the result
    cssText = [
      cssText,
      toCSSText(cssVariablesString)
    ].join('\n')

    return cssText
  }

  init ({ domNode, defaultTheme, theme }) {
    this._domNode = domNode
    this._defaultTheme = defaultTheme || {}

    this.applyTheme(theme)
  }

  update ({ defaultTheme, theme }) {
    this._defaultTheme = defaultTheme || {}

    this.applyTheme(theme)
  }
}

export default class ThemeableComponentStyles {
  constructor ({ componentName, componentId, styles, styleManager, usePolyfill, scope }) {
    this._componentId = componentId
    this._defaultTheme = {}
    this._cache = null
    this._styleManager = styleManager

    if (usePolyfill) {
      this._impl = new ThemeableComponentStylesWithPolyfill({componentName, styles, scope})
    } else {
      this._impl = new ThemeableComponentStylesWithCustomProperties({componentName, styles})
    }
  }

  get cssText () {
    if (this._cache !== null) {
      return this._cache
    }

    this._cache = this._impl.cssText

    return this._cache
  }

  init ({ domNode, defaultTheme, theme }) {
    this._impl.init({ domNode, defaultTheme, theme })
    this._defaultTheme = defaultTheme
    this._styleManager.addStyle(this.cssText, this._componentId)
  }

  update ({ defaultTheme, theme }) {
    this._impl.update({ defaultTheme, theme })

    if (!deepEqual(defaultTheme, this._defaultTheme)) {
      this._cache = null
      this._styleManager.updateStyle(this.cssText, this._componentId)
      this._defaultTheme = defaultTheme
    }
  }

  unmount () {
    this._styleManager.removeStyle(this._componentId)
  }
}
