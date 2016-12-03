const mergeSymbols = function (target, source) {
  const merged = {}
  Object.getOwnPropertySymbols(source).forEach(function (symbol) {
    const t = target[symbol] || {}
    const s = source[symbol]
    merged[symbol] = {...t, ...s}
  })
  return merged
}

export default function mergeThemes () {
  const args = [...arguments]
  let merged = {}

  args.forEach(function (arg) {
    merged = mergeSymbols(merged, arg)
  })

  return merged
}
