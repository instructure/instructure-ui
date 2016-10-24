const RULE_TYPES = {
  style: 1,
  keyframes: 7,
  media: 4
}

const lex = function (text) {
  const rootNode = {
    start: 0,
    end: text.length
  }
  let node = rootNode

  for (let i = 0, l = text.length; i < l; i++) {
    switch (text[i]) {
      case '{':
        if (!node.rules) {
          node.rules = []
        }
        const parent = node
        const previous = parent.rules[parent.rules.length - 1]
        node = {
          start: i + 1,
          parent: parent,
          previous: previous
        }
        parent.rules.push(node)
        break
      case '}':
        node.end = i + 1
        node = node.parent || rootNode
        break
    }
  }

  return rootNode
}

const parseCss = function (node, text) {
  const multipleSpaces = /\s+/g

  node.cssText = text.substring(node.start, node.end - 1).trim()

  if (node.parent) {
    const selectorStart = node.previous ? node.previous.end : node.parent.start

    let selector = text.substring(selectorStart, node.start - 1)
    selector = selector.replace(multipleSpaces, ' ')
    selector = selector.substring(selector.lastIndexOf(';') + 1)

    selector = node.selector = selector.trim()

    node.atRule = (selector.indexOf('@') === 0)

    if (node.atRule) {
      if (selector.indexOf('@media') === 0) {
        node.type = RULE_TYPES.media
      } else if (selector.match(/^@[^\s]*keyframes/)) {
        node.type = RULE_TYPES.keyframes
      }
    } else {
      node.type = RULE_TYPES.style
    }
  }

  const rules = node.rules

  if (rules) {
    for (let i = 0, l = rules.length, r; (i < l) && (r = rules[i]); i++) {
      parseCss(r, text)
    }
  }

  return node
}

const clean = function (text) {
  // remove comments and imports
  return text
    .replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, '')
    .replace(/@import[^;]*;/gim, '')
}

const CssParser = {

  stringify (node, text = '') {
    let cssText = ''
    let stringified = text

    if (node.cssText || node.rules) {
      const rules = node.rules

      if (rules) {
        for (let i = 0, l = rules.length, r; (i < l) && (r = rules[i]); i++) {
          cssText = this.stringify(r, cssText)
        }
      } else {
        cssText = node.cssText.trim()

        if (cssText) {
          cssText = '  ' + cssText + '\n'
        }
      }
    }

    if (cssText) {
      if (node.selector) {
        stringified += node.selector + ' {\n'
      }

      stringified += cssText

      if (node.selector) {
        stringified += '}\n\n'
      }
    }

    return stringified
  },

  parse (text) {
    const cssText = clean(text)
    return parseCss(lex(cssText), cssText)
  },

  clean,

  RULE_TYPES

}

export default CssParser
