export const RULE_TYPES = {
  style: 1,
  keyframes: 7,
  media: 4
}

export function parse (cssText) {
  const cleaned = clean(cssText)
  return parseLexed(lex(cleaned), cleaned)
}

export function isKeyframesSelector (rule) {
  return rule.parent && rule.parent.type === RULE_TYPES.keyframes
}

export default function transformCss (cssText, transform) {
  let node = parse(cssText)

  if (typeof transform === 'function') {
    node = transformNode(node, transform)
  }

  return toCssText(node)
}

function transformNode (node, transform) {
  if (!node) {
    return
  }

  if (node.type === RULE_TYPES.style) {
    return transform(node)
  }

  const rules = node.rules || []
  const transformed = {...node}

  transformed.rules = rules.map((rule) => transformNode(rule, transform))

  return transformed
}

function clean (text) {
  // remove comments and imports
  return text
    .replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, '')
    .replace(/@import[^;]*;/gim, '')
}

function lex (text) {
  const rootNode = {
    start: 0,
    end: text.length
  }
  let node = rootNode
  const chars = text.split('')

  chars.forEach(function (char, i) {
    switch (char) {
      case '{':
        if (!node.rules) {
          node.rules = []
        }
        const parent = node
        const previous = parent.rules[parent.rules.length - 1]
        node = {
          start: i + 1,
          parent,
          previous
        }
        parent.rules.push(node)
        break
      case '}':
        node.end = i + 1
        node = node.parent || rootNode
        break
    }
  })
  return rootNode
}

function parseSelector (node, text) {
  const start = node.previous ? node.previous.end : node.parent.start
  const end = node.start - 1

  let selector = text.substring(start, end)

  selector = selector.replace(/\s+/g, ' ')
  selector = selector.substring(selector.lastIndexOf(';') + 1)

  return selector.trim()
}

function parseRuleType (selector) {
  if (selector.indexOf('@') === 0) {
    if (selector.indexOf('@media') === 0) {
      return RULE_TYPES.media
    } else if (selector.match(/^@[^\s]*keyframes/)) {
      return RULE_TYPES.keyframes
    }
  } else {
    return RULE_TYPES.style
  }
}

function parseLexed (node, text = '') {
  let selector, type

  if (node.parent) {
    selector = parseSelector(node, text)
    type = parseRuleType(selector)
  }

  return {
    type,
    selector,
    cssText: text.substring(node.start, node.end - 1).trim(),
    rules: (node.rules || []).map(rule => parseLexed(rule, text))
  }
}

function toCssText (node, text) {
  let cssText = ''
  let result = text || ''

  if (node.rules.length > 0) {
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
