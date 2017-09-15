module.exports = function transformCssRequire (tokens, css) {
  return `{
      template: function (theme) {
        const tmpl = function () {
          return \`${css}\`
        }
        return tmpl.call(theme, theme)
      },
      ${Object.keys(tokens).map(key => `'${key}': '${tokens[key]}'`).join(',\n')}
    }`
}
