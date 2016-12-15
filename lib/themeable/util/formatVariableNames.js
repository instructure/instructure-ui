import formatVariableName from './formatVariableName'

export default function formatVariableNames (variables, prefix) {
  const formatted = {}
  Object.keys(variables || {}).forEach((key) => {
    formatted[formatVariableName(key, prefix)] = variables[key]
  })
  return formatted
}
