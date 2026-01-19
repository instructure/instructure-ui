/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import type { Spacing } from './ThemeablePropValues'

type DeepStringRecord = {
  [key: string]: string | DeepStringRecord
}

/**
 * Converts hyphen-case strings to camelCase
 * Example: 'medium-small' -> 'mediumSmall'
 */
function camelize(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

/**
 * Converts shorthand spacing values into CSS strings using theme spacing tokens.
 *
 * This function parses space-separated spacing values (margin, padding) and resolves theme
 * tokens to their actual CSS values. It supports CSS shorthand syntax (1-4 values), nested
 * theme token paths using dot notation, and automatically converts hyphen-case tokens to camelCase.
 *
 * @param {Spacing | undefined} value - The shorthand spacing value string containing space-separated tokens or CSS values.
 *   Tokens can be in camelCase (mediumSmall) or hyphen-case (medium-small).
 *   Can be undefined, in which case '0' is returned.
 * @param {Record<string, string>} spacingMap - The spacing theme object containing spacing tokens and nested values.
 *   Typically comes from `sharedTokens.margin.spacing` or `sharedTokens.padding.spacing` in the component theme.
 *
 * @returns {string} The resolved CSS spacing string ready to be used in styles.
 *
 * @example
 * // Hyphen-case tokens are converted to camelCase
 * calcSpacingFromShorthand('medium-small', spacingMap) // resolves to spacingMap.mediumSmall
 * calcSpacingFromShorthand('x-large small', spacingMap) // resolves to spacingMap.xLarge + spacingMap.small
 *
 * // Dot notation paths are NOT converted
 * calcSpacingFromShorthand('gap.nested-value', spacingMap) // resolves to spacingMap.gap['nested-value']
 *
 * // CSS values like 'none', 'auto', '10px' are returned as-is
 * calcSpacingFromShorthand('none', spacingMap) // returns 'none'
 */
export function calcSpacingFromShorthand(
  value: Spacing | undefined,
  spacingMap: DeepStringRecord
) {
  // return undefined when there is no value -> this is important when a component (like View)
  // doesn't have a prop like `padding` but has inline css for padding
  // this makes sure to not overwrite the inline style
  if (!value) return

  const tokens = value.trim().split(' ')

  // Handle whitespace-only strings
  if (tokens.length === 1 && tokens[0] === '') return ''

  // Map each token to its resolved CSS value
  const resolvedValues = tokens.map((token) => {
    // Handle special CSS value 'none' - convert to 0 for valid CSS
    if (token === 'none') {
      return '0'
    }

    // Handle valid CSS numeric and keyword values
    if (token === '0' || token === 'auto') {
      return token
    }

    // Handle dot notation for nested theme token paths (no camelization)
    if (token.includes('.')) {
      const path = token.split('.')
      let currentLevel: string | DeepStringRecord = spacingMap

      for (const key of path) {
        if (
          currentLevel &&
          typeof currentLevel === 'object' &&
          key in currentLevel
        ) {
          currentLevel = currentLevel[key]
        } else {
          console.warn(`Theme token path "${token}" not found in theme.`)
          // If path doesn't resolve, return the original token as fallback
          return token
        }
      }
      if (typeof currentLevel === 'string') {
        return currentLevel
      }
    }

    // For direct tokens, try camelized version
    const camelizedToken = camelize(token)
    const directValue = spacingMap[camelizedToken]
    if (typeof directValue === 'string') {
      return directValue
    }

    // Return the original token if not found (could be a direct CSS value like 'auto', '10px', etc.)
    console.warn(`Theme token path "${token}" not found in theme.`)
    return token
  })

  // Return the space-separated resolved values
  return resolvedValues.join(' ')
}
