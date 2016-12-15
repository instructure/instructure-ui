module.exports = function transformCssRequire (tokens, css) {
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
