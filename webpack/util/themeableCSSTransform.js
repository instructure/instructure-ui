const getMatches = function (str, regex) {
  const matches = []
  let match
  let safeRegex = regex

  if (safeRegex.global) {
    safeRegex.lastIndex = 0
  } else {
    safeRegex = new RegExp(safeRegex.source, 'g' +
      (safeRegex.ignoreCase ? 'i' : '') +
      (safeRegex.multiline ? 'm' : '') +
      (safeRegex.sticky ? 'y' : ''))
  }

  while ((match = safeRegex.exec(str)) !== null) {
    matches.push(match)

    if (safeRegex.lastIndex === match.index) {
      safeRegex.lastIndex++
    }
  }

  return matches
}

module.exports = {
  transformCss (cssText) {
    const results = getMatches(cssText, /var\(--([^)]+)\)?/g)
    let transformedCss = cssText

    results.forEach(function (result) {
      const match = result[0]
      const name = result[1]

      transformedCss = transformedCss.replace(match, '${theme.' + name + '}', 'gm')
    })

    return transformedCss
  },

  transformRequire (tokens, css) {
    return `
      Object.assign(
        function (theme) {
          return (function () {
            return \`${css}\`
          }.call(theme, theme))
        },
        ${JSON.stringify(tokens)}
      )
    `
  }
}
