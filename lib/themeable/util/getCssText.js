import replaceValuesWithVariableNames from './replaceValuesWithVariableNames'
import formatVariableNames from './formatVariableNames'
import applyCustomMediaToCss from './applyCustomMediaToCss'
import customPropertiesSupported from './customPropertiesSupported'

/**
 * Returns the CSS as a string with variables applied
 *
 * @param {Function} template A template function that returns the CSS as a string with variables injected
 * @param {Object} variables JS variables
 * @param {string} prefix CSS variable prefix/namespace
 * @returns {String} css text
 */
export default function getCssText () {
  if (customPropertiesSupported()) {
    return getCssTextWithVariables.apply(this, arguments)
  } else {
    return getCssTextWithPolyfill.apply(this, arguments)
  }
}

export function getCssTextWithPolyfill (template, variables) {
  // inject variable values
  let cssText = template(variables)

  // inject valules for @custom-media rules
  const customMedia = variables ? formatVariableNames(variables) : {}
  cssText = applyCustomMediaToCss(cssText, customMedia)

  return cssText
}

export function getCssTextWithVariables (template, variables, prefix) {
  const variableNames = variables ? replaceValuesWithVariableNames(variables, prefix) : {}

  // inject the CSS variable names into the style template
  let cssText = template(variableNames)

  cssText = removeIEHacks(cssText)

  // inject values for @custom-media rules (https://www.w3.org/TR/2016/WD-mediaqueries-4-20160126/#custom-mq)
  const customMedia = variables ? formatVariableNames(variables) : {}
  cssText = applyCustomMediaToCss(cssText, customMedia)

  const cssVariablesString = variables ? formatVariableNames(variables, prefix) : ''

  // append the CSS variables (defaults) to the result
  cssText = [
    cssText,
    variablesToCSSText(cssVariablesString)
  ].join('\n')

  return cssText
}

function variablesToCSSText (variables) {
  const names = Object.keys(variables || {})
  const rules = names.map((name) => {
    return name + ': ' + variables[name]
  }).join(';\n')

  if (names.length > 0) {
    return `
      :root {
        ${rules};
      }
    `
  } else {
    return ''
  }
}

function removeIEHacks (cssText) {
  return cssText.replace(/_:-ms-fullscreen[^,]*,\s*:root[^{]*{[^}]*}?/gim, '')
}
