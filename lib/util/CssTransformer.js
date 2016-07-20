import CssParser from './CssParser'

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

  let skipRules = false

  if (node.type === CssParser.RULE_TYPES.style) {
    callback(node)
  } else if (node.type === CssParser.RULE_TYPES.mixin) {
    skipRules = true
  }

  const rules = node.rules

  if (rules && !skipRules) {
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

const removeRulesWithoutVariables = function (cssText) {
  return cssText
    .replace(/((?:^[^;\-\s}]+)?[^;{}]*?:(?![^;]*(?:var\([^)]+\)))[^{};]*?;)/g, '')
}

const removeCustomProperties = function (cssText) {
  return cssText
    .replace(/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim, '') // variable assignment
    .replace(/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim, '') // mixin definition
    .replace(/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim, '') // @apply rule
    .replace(/[^;:{}]*?:[^;{]*?var\([^;]*\)(?:[;\n]|$[^}])?/gim, '') // rule that contains a variable
}

const replaceCustomProperties = function (cssText, variables) {
  const VAR_MATCH = /(?:^[^;\-\s}]+)?var\((--[^),]+)\s*([,)])([^;)]*)\)?/g
  let matches
  let transformedCss = cssText

  while ((matches = VAR_MATCH.exec(transformedCss)) !== null) {
    const variable = matches[1]

    if (variable && variables[variable]) {
      transformedCss = transformedCss.replace(matches[0], variables[variable], 'gim')
    }
  }

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

  applyVariables (cssText, variables) {
    return removeCustomProperties(transformCss(removeRulesWithoutVariables(cssText), function (rule) {
      rule.cssText = replaceCustomProperties(rule.cssText, variables)
    }))
  }
}

export default CssTransformer
