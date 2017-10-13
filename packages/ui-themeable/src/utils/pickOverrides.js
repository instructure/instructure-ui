/**
* ---
* category: utilities/themes
* ---
* Return only the theme variables that are different from the default
* @param {Object} defaultTheme
* @param {Object} theme
* @returns {Object} variables that are different from the defaults
*/
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
