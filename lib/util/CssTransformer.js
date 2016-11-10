import CssParser from './CssParser'
import getMatches from './getMatches'

const VAR_REGEX = /var\((--[^)]+)\)?/g

const transformCss = function (cssText, callback) {
  const rules = CssParser.parse(cssText)

  if (typeof callback === 'function') {
    forEachRule(rules, callback)
  }

  return CssParser.stringify(rules)
}

const forEachRule = function (node, callback) {
  if (!node) {
    return
  }

  if (node.type === CssParser.RULE_TYPES.style) {
    callback(node)
  }

  const rules = node.rules

  if (rules) {
    for (let i = 0, l = rules.length, r; (i < l) && (r = rules[i]); i++) {
      forEachRule(r, callback)
    }
  }
}

const isKeyframesSelector = function (rule) {
  return rule.parent && rule.parent.type === CssParser.RULE_TYPES.keyframes
}

const scopeSimpleSelector = function (selector, scope) {
  const parts = selector.split(':')
  parts[0] += scope
  return parts.join(':')
}

const scopeCompoundSelector = function (selector, combinator, scope) {
  const scopedSelector = scope ? scopeSimpleSelector(selector, scope) : selector

  return combinator + scopedSelector
}

const scopeComplexSelector = function (selector, scope) {
  let scopedSelector = selector.trim()

  scopedSelector = scopedSelector.replace(
    /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=\[])+)/g,

    function (match, combinator, selector) {
      return scopeCompoundSelector(selector, combinator, scope)
    }
  )

  return scopedSelector
}

const applyScope = function (rule, scope) {
  const parts = rule.selector.split(',')

  if (!isKeyframesSelector(rule)) {
    for (let i = 0, l = parts.length, part; (i < l) && (part = parts[i]); i++) {
      parts[i] = scopeComplexSelector(part, scope)
    }
  }

  return parts.join(',')
}

const applyCustomProperties = function (cssText, variables) {
  const results = getMatches(cssText, VAR_REGEX)
  let transformedCss = cssText

  results.forEach(function (result) {
    const match = result[0]
    const name = result[1]
    const value = variables[name]

    if (value) {
      transformedCss = transformedCss.replace(match, value, 'gm')
    }
  })

  return transformedCss
}

const applyCustomMedia = function (cssText, variables) {
  const results = getMatches(cssText, /@media\s*[^(]*\((--[^)]+)\)?/g)
  let transformedCss = cssText

  results.forEach(function (result) {
    const name = result[1]
    const value = variables[name]

    if (value) {
      transformedCss = transformedCss.replace(name, value, 'gm')
    }
  })

  return transformedCss
}

const CssTransformer = {
  scopeStyles (cssText, scope) {
    return transformCss(cssText, function (rule) {
      if (!rule.isScoped) {
        rule.selector = applyScope(rule, scope)
        rule.isScoped = true
      }
    })
  },

  removeRulesWithoutVariables (cssText) {
    return transformCss(cssText, function (rule) {
      rule.cssText = rule.cssText
        .replace(/((?:^[^;\-\s}]+)?[^;{}]*?:(?![^;]*(?:var\([^)]+\)))[^{};]*?;)/g, '')
    })
  },

  applyVariables (cssText, variables) {
    return applyCustomProperties(cssText, variables)
  },

  applyCustomMedia (cssText, variables) {
    return applyCustomMedia(cssText, variables)
  },

  removeVariables (cssText) {
    return transformCss(cssText, function (rule) {
      rule.cssText = rule.cssText
        .replace(/:root\s*{[^}]*}?/gim, '') // :root selector blocks
        .replace(/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim, '') // variable assignment
        .replace(/[^;:{}]*?:[^;{]*?var\([^;]*\)(?:[;\n]|$[^}])?/gim, '') // rule that contains a variable
    })
  }
}

export default CssTransformer
