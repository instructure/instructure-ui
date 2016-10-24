import CssTransformer from './CssTransformer'
import flat from 'flat'
import pickBy from 'lodash/pickBy'
import invariant from 'invariant'

const customPropsSupported = function () {
  return window.CSS &&
    window.CSS.supports && window.CSS.supports('color', 'var(--primary)')
}

const namespaceVariables = function (namespace, variables) {
  if (variables && Object.keys(variables).length >= 1) {
    return flat({ ['--' + namespace]: variables }, { delimiter: '-' })
  } else {
    return {}
  }
}

const variablesToCssText = function (variables) {
  const names = Object.keys(variables)
  const rules = names.map((name) => {
    return name + ': ' + variables[name]
  }).join(';\n')

  if (names.length > 0) {
    return [
      ':root {',
      rules,
      '}'
    ].join('\n')
  } else {
    return ''
  }
}

const applyCustomProperties = function (cssText, properties) {
  if (!cssText) {
    return null
  }

  // inject vars for @media rules
  let transformedCssText = CssTransformer.applyCustomMedia(cssText, properties)

  if (!customPropsSupported()) {
    // first apply the component variables
    transformedCssText = CssTransformer.applyVariables(transformedCssText, properties)
  }

  return transformedCssText
}

const validateCustomProperties = function (componentName, cssText, variables) {
  const variablesUsed = CssTransformer.extractVariablesUsed(cssText)

  variablesUsed.forEach((variable) => {
    invariant(variables[variable], 'Undefined CSS variable %s for component %s.', variable, componentName)
  })
}

const pickOverrides = function (defaults, overrides) {
  // filter out any properties that are the same as in defaults
  return pickBy(overrides, (value, key) => {
    return defaults[key] !== value
  })
}

export function getComponentCss (componentName, cssText, theme) {
  if (!cssText) {
    return null
  }

  const themeVariables = namespaceVariables(componentName, theme)

  validateCustomProperties(componentName, cssText, themeVariables)

  let transformedCssText = applyCustomProperties(cssText, themeVariables)

  if (customPropsSupported()) {
    // append the css variables to the component css
    transformedCssText = transformedCssText + '\n' + variablesToCssText(themeVariables)
  }

  return transformedCssText
}

export function getComponentVariables (componentName, defaultTheme, theme) {
  const defaultVariables = namespaceVariables(componentName, defaultTheme)
  const variables = namespaceVariables(componentName, theme)

  return pickOverrides(defaultVariables, variables)
}

const addScopeToDomNode = function (node, scopeAttr, id) {
  if (node.setAttribute) {
    node.setAttribute(scopeAttr, id)
  }

  for (let i; i < node.children.length; i++) {
    addScopeToDomNode(node.children[i], scopeAttr, id)
  }
}

const polyfillScopedCustomProperties = function (node, properties, scope, styles) {
  // replace variables with the actual values
  let cssText = CssTransformer.removeRulesWithoutVariables(styles)

  cssText = CssTransformer.applyVariables(cssText, properties)
  cssText = CssTransformer.removeVariables(cssText)

  scopeStyles(node, scope, cssText)
}

const scopeStyles = function (node, scope, styles) {
  let styleNode = node.querySelector(`#${scope}`)
  const shouldInsertNode = !styleNode
  const scopeAttr = 'data-theme'
  let cssText = styles

  if (shouldInsertNode) {
    styleNode = document.createElement('style')
    styleNode.setAttribute('scoped', true)
    styleNode.setAttribute('type', 'text/css')
    styleNode.id = scope
  }

  if (!styleNode.scoped) { // if scoped styles are not supported...
    addScopeToDomNode(node, scopeAttr, scope)
    cssText = CssTransformer.scopeStyles(cssText, `[${scopeAttr}="${scope}"]`)
  }

  if (shouldInsertNode) {
    node.insertBefore(styleNode, node.firstChild)
  }

  if ('textContent' in styleNode) {
    styleNode.textContent = cssText
  } else {
    styleNode.styleSheet.cssText = cssText
  }
}

const setNodeProperties = function (node, properties) {
  Object.keys(properties).forEach(function (propertyName) {
    const value = properties[propertyName]
    if (value) {
      node.style.setProperty(propertyName, value)
    }
  })
}

export function removeScopedCustomProperties (node, properties, scope) {
  if (customPropsSupported()) {
    Object.keys(properties).forEach(function (propertyName) {
      node.style.removeProperty(propertyName)
    })
  }
}

export function applyScopedCustomProperties (node, properties, scope, styles) {
  if (customPropsSupported()) {
    setNodeProperties(node, properties)
  } else if (Object.keys(properties).length > 0) {
    polyfillScopedCustomProperties(node, properties, scope, styles)
  }
}
