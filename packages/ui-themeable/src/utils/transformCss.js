import Browser from '@instructure/ui-utils/lib/Browser'
import parseCss, { ruleTypes } from './parseCss'

/**
* ---
* category: utilities/themes
* ---
* Transform a string of CSS
* @module transformCss
* @param {String} cssText CSS to parse and transform
* @param {Function} transform a transform function to apply to each rule
* @returns {String} the transformed CSS string
*/
export default function transformCss (cssText, transform) {
  let node = parseCss(cssText)

  if (typeof transform === 'function') {
    node = transformNode(node, transform)
  }

  return toCssText(node)
}

/**
* Checks if a rule is a keyframes selector/block
* @param {Object} rule
* @returns {Boolean} true if the rule is a keyframes rule
*/
export function isKeyframesSelector (rule) {
  return rule.parent && rule.parent.type === ruleTypes.keyframes
}

/**
* Parses a string of CSS into an array of rules objects (selector + declaration block)
* Filters out any vendor rules that don't apply to the current browser
* @param {String} CSS text to parse
* @returns {Array} an array of rules objects
*/
export function toRules (cssText) {
  const node = parseCss(cssText)
  let rules = []

  if (node.rules && node.rules.length > 0) {
    rules = node.rules
      .filter((rule) => filterUnusedVendorRule(rule.selector))
      .map((rule) => toCssText(rule))
  } else {
    const cssText = toCssText(node)
    if (cssText) {
      rules = [cssText]
    }
  }

  return rules
}

function transformNode (node, transform) {
  if (!node) {
    return
  }

  if (node.type === ruleTypes.style) {
    return transform(node)
  }

  const rules = node.rules || []
  const transformed = {...node}

  transformed.rules = rules.map((rule) => transformNode(rule, transform))

  return transformed
}

function toCssText (node, text) {
  let cssText = ''
  let result = text || ''

  if (node.rules && node.rules.length > 0) {
    cssText = node.rules.map((rule) => toCssText(rule, cssText)).join('\n')
  } else {
    cssText = node.cssText.trim()

    if (cssText) {
      cssText = `  ${cssText}\n`
    }
  }

  if (cssText) {
    const prefix = node.selector ? `${node.selector} {\n` : ''
    const suffix = node.selector ? '}\n' : ''
    result += `${prefix}${cssText}${suffix}`
  }

  return result
}

function filterUnusedVendorRule (selector) {
  if (!(Browser.msedge || Browser.msie) && selector.indexOf('-ms-') > -1) {
    return false
  }

  if (!(Browser.webkit || Browser.msedge || Browser.blink) && selector.indexOf('-webkit-') > -1) {
    return false
  }

  if (!Browser.gecko && selector.indexOf('-moz-') > -1) {
    return false
  }

  return true
}
