import scopeStylesToNode from './scopeStylesToNode'
import formatVariableNames from './formatVariableNames'
import removeRulesWithoutVariables from './removeRulesWithoutVariables'
import replaceValuesWithVariableNames from './replaceValuesWithVariableNames'
import removeVariablesFromCss from './removeVariablesFromCss'
import applyVariablesToCss from './applyVariablesToCss'
import pickOverrides from './pickOverrides'
import customPropertiesSupported from './customPropertiesSupported'

/**
 *
 * Apply custom style properties to a dom node (with polyfill for IE)
 *
 * @param {Element} domNode HTML element to apply variables to using the style attribute
 * @param {Object} variables JS variables
 * @param {Object} defaults Default JS variables
 * @param {String} prefix A variable prefix/namespace
 * @param {Function} template (for IE) A template function that returns the CSS as a string with variables injected
 * @param {String} scope (for IE) A scope to apply to the styles applied to domNode
 */
export default function applyVariablesToNode () {
  if (customPropertiesSupported()) {
    applyVariablesToNodeStyle.apply(this, arguments)
  } else {
    applyVariablesPolyfillToNode.apply(this, arguments)
  }
}

export function applyVariablesPolyfillToNode (domNode, variables, defaults, prefix, template, scope) {
  if (!domNode) {
    return
  }

  let cssText = ''

  const overrides = pickOverrides(defaults, variables)

  if (overrides && Object.keys(overrides).length > 0) {
    const variables = formatVariableNames(overrides, prefix)

    // inject the CSS variables into the style template
    cssText = template(replaceValuesWithVariableNames(defaults, prefix))

    cssText = removeRulesWithoutVariables(cssText)

    // replace variables in the CSS with the actual values
    cssText = applyVariablesToCss(cssText, variables)
    cssText = removeVariablesFromCss(cssText)
  }

  scopeStylesToNode(domNode, cssText, scope)
}

export function applyVariablesToNodeStyle (domNode, variables, defaults, prefix) {
  if (!domNode) {
    return
  }

  clearCustomProperties(domNode, prefix)

  const overrides = pickOverrides(defaults, variables)

  if (overrides && Object.keys(overrides).length > 0) {
    setCustomProperties(domNode, formatVariableNames(overrides, prefix))
  }
}

function clearCustomProperties (domNode, prefix) {
  const styles = domNode.style
  for (let i = styles.length - 1; i >= 0; i--) {
    const prop = styles[i]
    if (prop.indexOf(`--${prefix}-`) >= 0) {
      domNode.style.removeProperty(prop)
    }
  }
}

function setCustomProperties (domNode, properties) {
  Object.keys(properties).forEach(function (propertyName) {
    const value = properties[propertyName]

    if (value) {
      domNode.style.setProperty(propertyName, value)
    }
  })
}
