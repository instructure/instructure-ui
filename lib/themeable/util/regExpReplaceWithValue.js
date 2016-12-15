export default function regExpReplaceWithValue (str, regex, value) {
  const matches = getMatches(str, regex)
  let result = str

  matches.forEach((match) => {
    const matcher = new RegExp(match[1].replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'), 'gm')
    const replaceWith = (typeof value === 'function') ? value(match) : value

    if (replaceWith) {
      result = result.replace(matcher, replaceWith)
    }
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
