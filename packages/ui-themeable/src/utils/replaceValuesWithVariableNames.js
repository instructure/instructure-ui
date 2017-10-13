import formatVariableName from './formatVariableName'

/**
* ---
* category: utilities/themes
* ---
* Replace the variables values with the CSS variable
* @param {Object} variables
* @param {String} prefix a prefix to add to the variable names
* @returns {Object} the theme variables object with CSS variables in place of values
*/
export default function replaceValuesWithVariableNames (variables, prefix) {
  const map = {}

  Object.keys(variables || {}).forEach((variableName) => {
    map[variableName] = `var(${formatVariableName(variableName, prefix)})`
  })

  return map
}
