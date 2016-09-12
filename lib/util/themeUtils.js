import pickBy from 'lodash/pickBy'
import CssTransformer from './CssTransformer'
import brand from '../theme/brand'
import shortid from 'shortid'
import flat from 'flat'

const customPropsSupported = function () {
  return window.CSS &&
    window.CSS.supports && window.CSS.supports('color', 'var(--primary)')
}

const variablesToProperties = function (namespace, variables) {
  return flat({ ['--' + namespace]: variables }, { delimiter: '-' })
}

const propertiesToCssText = function (properties) {
  const propertyNames = Object.keys(properties)
  const rules = propertyNames.map((name) => {
    return name + ': ' + properties[name]
  }).join(';\n')

  if (propertyNames.length > 0) {
    return [
      ':root {',
      rules,
      '}'
    ].join('\n')
  } else {
    return ''
  }
}

const addScopeToDomNode = function (node, scopeAttr, id) {
  if (node.setAttribute) {
    node.setAttribute(scopeAttr, id)
  }

  for (let i; i < node.children.length; i++) {
    addScopeToDomNode(node.children[i], scopeAttr, id)
  }
}

const setNodeProperties = function (node, properties) {
  Object.keys(properties).forEach(function (propertyName) {
    const value = properties[propertyName]
    if (value) {
      node.style.setProperty(propertyName, value)
    } else {
      node.style.removeProperty(propertyName)
    }
  })
}

const pickOverrides = function (defaults, overrides) {
  // filter out any properties that are the same as in defaults
  return pickBy(overrides, (value, key) => {
    return defaults[key] !== value
  })
}

const polyfillCustomProperties = function (componentName, properties = {}, node, id, styles) {
  const styleNode = document.createElement('style')
  const scopeAttr = 'data-theme'
  const themeId = componentName + '__' + id

  // replace variables with the actual values
  let cssText = CssTransformer.applyVariables(styles._cssText, properties)

  styleNode.setAttribute('scoped', true)
  styleNode.setAttribute('type', 'text/css')
  styleNode.id = themeId

  if (!styleNode.scoped) { // if scoped styles are not supported...
    addScopeToDomNode(node, scopeAttr, themeId)
    cssText = CssTransformer.scopeStyles(cssText, `[${scopeAttr}="${themeId}"]`)
  }

  node.insertBefore(styleNode, node.firstChild)

  if ('textContent' in styleNode) {
    styleNode.textContent = cssText
  } else {
    styleNode.styleSheet.cssText = cssText
  }
}

// we only want to inject the brand vars into the document once, so generate the id here
const BRAND_ID = 'Brand__' + shortid.generate()
const BRAND_VARIABLES = variablesToProperties('Brand', brand)
const BRAND_CSS = propertiesToCssText(BRAND_VARIABLES)

export function injectBrandVariables (injectStylesFunc) {
  if (typeof injectStylesFunc === 'function' && customPropsSupported()) {
    return injectStylesFunc(BRAND_CSS, BRAND_ID)
  }
}

export function getComponentCss (componentName, styles, variables = {}) {
  const properties = variablesToProperties(componentName, variables)

  if (!styles || !styles._cssText) {
    return null
  } else if (customPropsSupported()) {
    // just append the css variables to the css
    return styles._cssText + '\n' + propertiesToCssText(properties)
  } else {
    return styles._cssText
  }
}

export function generateThemeVariables (generator) {
  if (typeof generator === 'function') {
    return generator(brand)
  }
}

export function applyComponentTheme (componentName, defaults, variables, node, id, styles) {
  // only apply the variables that override the defaults
  const properties = pickOverrides(
    variablesToProperties(componentName, defaults),
    variablesToProperties(componentName, variables)
  )

  if (customPropsSupported()) {
    setNodeProperties(node, properties)
  } else if (Object.keys(properties).length > 0) {
    polyfillCustomProperties(componentName, properties, node, id, styles)
  }
}
