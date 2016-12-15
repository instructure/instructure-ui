import transformCss from './transformCss'

export default function removeVariables (cssText) {
  return transformCss(cssText, function (rule) {
    return {
      ...rule,
      cssText: rule.cssText
        .replace(/:root\s*{[^}]*}?/gim, '') // :root selector blocks
        .replace(/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim, '') // variable assignment
        .replace(/[^;:{}]*?:[^;{]*?var\([^;]*\)(?:[;\n]|$[^}])?/gim, '') // rule that contains a variable
    }
  })
}
