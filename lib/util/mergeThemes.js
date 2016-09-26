import mergeDeep from './mergeDeep'

const mergeSymbols = function (target, source) {
  const merged = {}
  Object.getOwnPropertySymbols(source).forEach(function (symbol) {
    merged[symbol] = mergeDeep(target[symbol] || {}, source[symbol])
  })
  return merged
}

export default function mergeThemes (...args) {
  let merged = {}

  for (const arg of args) {
    merged = mergeSymbols(merged, arg)
  }

  return merged
}
