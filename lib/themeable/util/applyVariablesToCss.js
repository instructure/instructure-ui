import regExpReplaceWithValue from './regExpReplaceWithValue'

export default function applyVariablesToCss (cssText, variables) {
  return regExpReplaceWithValue(cssText, /(var\((--[^)]+)\)?)/g, match => variables[match[2]])
}
