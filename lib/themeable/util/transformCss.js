import parseCss, { ruleTypes } from './parseCss'

export default function transformCss (cssText, transform) {
  let node = parseCss(cssText)

  if (typeof transform === 'function') {
    node = transformNode(node, transform)
  }

  return toCssText(node)
}

export function isKeyframesSelector (rule) {
  return rule.parent && rule.parent.type === ruleTypes.keyframes
}

export function toRules (cssText) {
  const node = parseCss(cssText)
  let rules = []

  if (node.rules && node.rules.length > 0) {
    rules = node.rules.map((rule) => toCssText(rule))
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
      cssText = '  ' + cssText + '\n'
    }
  }

  if (cssText) {
    const prefix = node.selector ? `${node.selector} {\n` : ''
    const suffix = node.selector ? '}\n' : ''
    result += `${prefix}${cssText}${suffix}`
  }

  return result
}
