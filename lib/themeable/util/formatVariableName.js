export default function formatVariableName (variableName, prefix) {
  const name = prefix ? `${prefix}-${variableName}` : variableName
  return `--${name}`
}
