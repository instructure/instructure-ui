export default function pickOverrides (defaultTheme, theme) {
  const overrides = {}

  // filter out any properties that have values that are the same as in defaults
  Object.keys(theme || {}).forEach((key) => {
    if (defaultTheme[key] !== theme[key]) {
      overrides[key] = theme[key]
    }
  })

  return overrides
}
