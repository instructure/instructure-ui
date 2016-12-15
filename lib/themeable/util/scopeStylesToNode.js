import transformCss, { isKeyframesSelector } from './transformCss'

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

export default function scopeStylesToNode (domNode, cssText, scope) {
  let styleNode = domNode.querySelector(`#${scope}`)

  if (!cssText) {
    styleNode && domNode.removeChild(styleNode)
    return
  } else {
    const shouldInsertNode = !styleNode
    const scopeAttr = 'data-theme'
    let scopedCSS = cssText

    if (shouldInsertNode) {
      styleNode = document.createElement('style')
      styleNode.setAttribute('scoped', true)
      styleNode.setAttribute('type', 'text/css')
      styleNode.id = scope
    }

    if (!styleNode.scoped) { // if scoped styles are not supported...
      addScopeToDomNode(domNode, scopeAttr, scope)
      scopedCSS = scopeCssText(scopedCSS, `[${scopeAttr}="${scope}"]`)
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

function addScopeToDomNode (node, scopeAttr, scope) {
  if (node.setAttribute) {
    node.setAttribute(scopeAttr, scope)
  }

  for (let i = 0; i < node.children.length; i++) {
    addScopeToDomNode(node.children[i], scopeAttr, scope)
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
