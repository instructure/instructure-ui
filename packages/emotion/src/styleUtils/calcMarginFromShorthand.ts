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
 * Converts shorthand margin values into CSS margin strings using theme spacing tokens.
 *
 * This function parses space-separated margin values and resolves theme tokens to their
 * actual CSS values. It supports CSS shorthand syntax (1-4 values) and nested theme
 * token paths using dot notation.
 *
 * @param {Spacing | undefined} value - The shorthand margin value string containing space-separated tokens or CSS values.
 *   Can be undefined, in which case '0' is returned.
 * @param {Record<string, string>} spacingMap - The spacing theme object containing margin tokens and nested values.
 *   Typically comes from `sharedTokens.margin.spacing` in the component theme.
 *
 * @returns {string} The resolved CSS margin string ready to be used in styles.
 */
export function calcMarginFromShorthand(
  value: Spacing | undefined,
  spacingMap: DeepStringRecord
) {
  if (value === undefined) {
    return '0'
  }
  const tokens = value.trim().split(' ')

  // Map each token to its resolved CSS value
  const resolvedValues = tokens.map(token => {
    // If the token is already a direct key in spacingMap, and it's a string, return its value
    const directValue = spacingMap[token]
    if (typeof directValue === 'string') {
      return directValue
    }

    // Handle dot notation for nested theme token paths
    if (token.includes('.')) {
      const path = token.split('.')
      let currentLevel: string | DeepStringRecord = spacingMap

      for (const key of path) {
        if (currentLevel && typeof currentLevel === 'object' && key in currentLevel) {
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
    // Return the original token if not found (could be a direct CSS value like 'auto', '10px', etc.)
    console.warn(`Theme token path "${token}" not found in theme.`)
    return token
  })

  // Return the space-separated resolved values
  return resolvedValues.join(' ')
}
