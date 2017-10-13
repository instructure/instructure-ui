/**
 * ---
 * category: utilities/themes
 * ---
 * Formats a variable as a CSS variable (prefixed with `--`)
 * @param {String} variableName
 * @param {String} prefix an optional prefix to add to the variable name
 * @returns {String} formatted variable name
 */
export default function formatVariableName (variableName, prefix) {
  const name = prefix ? `${prefix}-${variableName}` : variableName
  return `--${name}`
}
