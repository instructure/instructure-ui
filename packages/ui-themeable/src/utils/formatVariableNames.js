import formatVariableName from './formatVariableName'

/**
 * ---
 * category: utilities/themes
 * ---
 * Formats object keys as a CSS variable (prefixed with `--`)
 * @param {Object} variables
 * @param {String} prefix an optional prefix to add to the variable names
 * @returns {Object} variables object with the keys formatted as CSS variables
 */
export default function formatVariableNames (variables, prefix) {
  const formatted = {}
  Object.keys(variables || {}).forEach((key) => {
    formatted[formatVariableName(key, prefix)] = variables[key]
  })
  return formatted
}
