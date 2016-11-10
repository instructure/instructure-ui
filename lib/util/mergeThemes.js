const mergeSymbols = function (target, source) {
  const merged = {}
  Object.getOwnPropertySymbols(source).forEach(function (symbol) {
    const t = target[symbol] || {}
    const s = source[symbol]
    merged[symbol] = {...t, ...s}
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
