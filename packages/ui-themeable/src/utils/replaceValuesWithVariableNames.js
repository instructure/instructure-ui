import formatVariableName from './formatVariableName'

export default function replaceValuesWithVariableNames (variables, prefix) {
  const map = {}

  Object.keys(variables || {}).forEach((variableName) => {
    map[variableName] = `var(${formatVariableName(variableName, prefix)})`
  })

  return map
}
