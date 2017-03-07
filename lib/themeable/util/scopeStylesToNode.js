import transformCss, { isKeyframesSelector } from './transformCss'

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

export function scopeCssText (cssText, scope) {
  return transformCss(cssText, function (rule) {
    const transformed = {...rule}
    if (!rule.isScoped) {
      transformed.selector = scopeRule(rule, scope)
      transformed.isScoped = true
    }
    return transformed
  })
}

function addScopeToDomNode (node, scope) {
  const children = node.children || node.childNodes // for SVG nodes children is undefined in IE/Edge

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

function scopeSimpleSelector (selector, scope) {
  const parts = selector.split(':')
  parts[0] += scope
  return parts.join(':')
}

function scopeCompoundSelector (selector, combinator, scope) {
  const scopedSelector = scope ? scopeSimpleSelector(selector, scope) : selector

  return combinator + scopedSelector
}

function scopeComplexSelector (selector, scope) {
  let scopedSelector = selector.trim()

  scopedSelector = scopedSelector.replace(
    /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=\[])+)/g,

    function (match, combinator, selector) {
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
