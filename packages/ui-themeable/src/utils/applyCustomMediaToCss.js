export default function applyCustomMediaToCss (cssText, variables) {
  const matches = getMatches(cssText, /@media\s*[^(]*\((--[^)]+)\)?/g)
  let result = cssText

  matches.forEach((match) => {
    const matcher = new RegExp(match[1].replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'), 'gm')

    result = result.replace(matcher, variables[match[1]])
  })

  return result
}

function getMatches (str, regex) {
  const matches = []
  let match
  let matcher = regex

  matcher.lastIndex = 0
  matcher = new RegExp(matcher.source, 'g')

  while ((match = matcher.exec(str)) !== null) {
    matches.push(match)

    if (matcher.lastIndex === match.index) {
      matcher.lastIndex++
    }
  }

  return matches
}
