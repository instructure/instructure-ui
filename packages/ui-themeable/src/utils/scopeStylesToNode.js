import transformCss, { isKeyframesSelector } from './transformCss'

/**
* ---
* category: utilities/themes
* ---
* Scopes the styles in a CSS string to a DOM node
* to polyfill CSS variables for [themeable](#themeable) components.
* @module scopeStylesToNode
* @param {DOMNode} domNode
* @param {String} cssText
* @param {String} scope a unique identifier to use to scope the styles. Applied as a custom html attribute.
*/
export default function scopeStylesToNode (domNode, cssText, scope) {
  let styleNode = domNode.querySelector(`#${scope}`)
  const attr = scope.toLowerCase()

  if (!cssText) {
    if (styleNode) {
      if (!styleNode.scoped) {
        removeScopeFromDomNode(domNode, attr)
      }
      domNode.removeChild(styleNode)
    }
  } else {
    const shouldInsertNode = !styleNode
    let scopedCSS = cssText

    if (shouldInsertNode) {
      styleNode = document.createElement('style')
      styleNode.setAttribute('scoped', true)
      styleNode.setAttribute('type', 'text/css')
      styleNode.id = scope
    }

    if (!styleNode.scoped) { // if scoped styles are not supported
      addScopeToDomNode(domNode, attr)
      scopedCSS = scopeCssText(scopedCSS, `[${attr}]`)
    }

    if (shouldInsertNode) {
      domNode.insertBefore(styleNode, domNode.firstChild)
    }

    if ('textContent' in styleNode) {
      styleNode.textContent = scopedCSS
    } else {
      styleNode.styleSheet.cssText = scopedCSS
    }
  }
}

/**
* Transforms a CSS string to add a scoping selector to each rule
* @param {String} cssText
* @param {String} scope a unique identifier to use to scope the styles
*/
export function scopeCssText (cssText, scope) {
  return transformCss(cssText, (rule) => {
    const transformed = {...rule}
    if (!rule.isScoped) {
      transformed.selector = scopeRule(rule, scope)
      transformed.isScoped = true
    }
    return transformed
  })
}

function addScopeToDomNode (node, scope) {
  // for SVG nodes children is undefined in IE/Edge
  const children = node.children || node.childNodes

  if (node.setAttribute) {
    node.setAttribute(scope, '')
  }

  for (let i = 0; i < children.length; i++) {
    addScopeToDomNode(children[i], scope)
  }
}

function removeScopeFromDomNode (node, scope) {
  const children = node.children || node.childNodes

  if (node.removeAttribute) {
    node.removeAttribute(scope)
  }

  for (let i = 0; i < children.length; i++) {
    removeScopeFromDomNode(children[i], scope)
  }
}

function isRootSelector (selector) {
  return selector.match(/^(_|html|body|\:root)/i)
}

function scopeSimpleSelector (selector, scope) {
  const parts = selector.split(':')
  parts[0] += scope
  return parts.join(':')
}

function scopeCompoundSelector (selector, combinator, scope) {
  if (isRootSelector(selector)) {
    return selector
  }

  const scopedSelector = scope ? scopeSimpleSelector(selector, scope) : selector

  return combinator + scopedSelector
}

function scopeComplexSelector (selector, scope) {
  let scopedSelector = selector.trim()

  scopedSelector = scopedSelector.replace(
    /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=\[])+)/g,

    (match, combinator, selector) => {
      return scopeCompoundSelector(selector, combinator, scope)
    }
  )
  return scopedSelector
}

function scopeRule (rule, scope) {
  let parts = rule.selector.split(',')

  if (!isKeyframesSelector(rule)) {
    parts = parts.map((part) => scopeComplexSelector(part, scope))
  }

  return parts.join(',')
}
