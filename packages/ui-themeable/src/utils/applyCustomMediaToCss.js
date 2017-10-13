/**
 * ---
 * category: utilities/themes
 * ---
 * Polyfill custom media for [themeable](#themeable) components.
 * Searches for strings like `(--mediumMin)` and replaces it with the
 * variable value (e.g. `variables.mediumMin`)
 * @param {String} cssText the CSS text to apply the custom media to
 * @param {Object} variables object containing custom media variables
 * @returns {String} CSS text with custom media values applied
 */
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
