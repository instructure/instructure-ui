const postcss = require('postcss')

module.exports = postcss.plugin('postcss-themeable-styles', () => {
  return (css, result) => {
    css.walkRules((rule) => {
      rule.walkDecls((decl) => {
        let { value } = decl
        getMatches(value, /var\(--([^)]+)\)?/g)
          .forEach((match) => {
            const matcher = new RegExp(match[0].replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'), 'gm')
            value = value.replace(matcher, '${theme.' + match[1] + '}') // eslint-disable-line no-param-reassign
          })
        decl.value = value // eslint-disable-line no-param-reassign
      })
    })
  }
})

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
