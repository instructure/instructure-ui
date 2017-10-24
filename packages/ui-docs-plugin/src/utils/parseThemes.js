module.exports = function parseThemes (themes) {
  const parsed = {}

  themes.forEach((theme) => {
    parsed[theme.resource.key] = theme
  })

  return parsed
}
