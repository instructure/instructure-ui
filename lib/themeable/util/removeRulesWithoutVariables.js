import transformCss from './transformCss'

export default function removeRulesWithoutVariables (cssText) {
  return transformCss(cssText, function (rule) {
    return {
      ...rule,
      cssText: rule.cssText.replace(/((?:^[^;\-\s}]+)?[^;{}]*?:(?![^;]*(?:var\([^)]+\)))[^{};]*?;)/g, '')
    }
  })
}
