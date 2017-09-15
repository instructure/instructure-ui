export const ruleTypes = {
  style: 1,
  keyframes: 7,
  media: 4
}

export default function parse (cssText = '') {
  const cleaned = clean(cssText)
  return parseLexed(lex(cleaned), cleaned)
}

export function clean (text = '') {
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

  chars.forEach((char, i) => {
    switch (char) {
      case '{': // eslint-disable-line no-case-declarations
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
      return ruleTypes.media
    } else if (selector.match(/^@[^\s]*keyframes/)) {
      return ruleTypes.keyframes
    }
  } else {
    return ruleTypes.style
  }
}

function parseLexed (node, text = '') {
  /* eslint-disable no-param-reassign */

  if (node.parent) {
    node.selector = parseSelector(node, text)
    node.type = parseRuleType(node.selector)
  }

  node.cssText = text.substring(node.start, node.end - 1).trim()

  if (node.rules && node.rules.length > 0) {
    node.rules = node.rules.map(rule => parseLexed(rule, text))
  }

  /* eslint-enable no-param-reassign */

  return node
}
