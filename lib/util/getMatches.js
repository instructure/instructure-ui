export default function getMatches (str, regex) {
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
