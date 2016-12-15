import regExpReplaceWithValue from './regExpReplaceWithValue'

export default function applyCustomMediaToCss (cssText, variables) {
  return regExpReplaceWithValue(cssText, /@media\s*[^(]*\((--[^)]+)\)?/g, match => variables[match[1]])
}
