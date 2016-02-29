/**
 * Replaces strings that match "map({componentName}, {variableName})" with the variable value in the `styles` param
 *
 */
export default function applyThemeVariabes (componentName, variables, styles) {
  const variableMatcher = new RegExp('map\\(' + componentName + ',\\s*(.+?)\\)', 'g')
  let matches = []
  let css = styles.toString()

  while ((matches = variableMatcher.exec(styles)) !== null) {
    const variable = matches[1]

    if (variable && variables[variable]) {
      css = css.replace(matches[0], variables[variable], 'g')
    } else {
      throw new Error('Undefined theme variable: ' + variable)
    }
  }

  return css
}
