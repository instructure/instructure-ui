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

import { describe, it, expect, vi } from 'vitest'
import { calcSpacingFromShorthand } from '../calcSpacingFromShorthand.js'

describe('calcSpacingFromShorthand', () => {
  const spacingMap = {
    space0: '0px',
    space4: '4px',
    space8: '8px',
    space16: '16px',
    gap: {
      sm: '2px',
      md: '8px',
      lg: '16px',
      nested: {
        xl: '24px'
      }
    },
    padding: {
      small: '4px',
      large: '16px'
    }
  }

  describe('single token values', () => {
    it('should resolve a direct key to its value', () => {
      expect(calcSpacingFromShorthand('space4', spacingMap)).toBe('4px')
    })

    it('should resolve space0 to 0px', () => {
      expect(calcSpacingFromShorthand('space0', spacingMap)).toBe('0px')
    })

    it('should resolve space16 to 16px', () => {
      expect(calcSpacingFromShorthand('space16', spacingMap)).toBe('16px')
    })
  })

  describe('multiple token values (CSS shorthand)', () => {
    it('should handle two token values', () => {
      expect(calcSpacingFromShorthand('space4 space8', spacingMap)).toBe('4px 8px')
    })

    it('should handle three token values', () => {
      expect(calcSpacingFromShorthand('space4 gap.sm space16', spacingMap)).toBe('4px 2px 16px')
    })

    it('should handle four token values', () => {
      expect(calcSpacingFromShorthand('space0 space4 space8 space16', spacingMap)).toBe('0px 4px 8px 16px')
    })
  })

  describe('nested token paths with dot notation', () => {
    it('should resolve single-level nested path', () => {
      expect(calcSpacingFromShorthand('gap.sm', spacingMap)).toBe('2px')
    })

    it('should resolve two-level nested path', () => {
      expect(calcSpacingFromShorthand('gap.nested.xl', spacingMap)).toBe('24px')
    })

    it('should handle multiple nested paths', () => {
      expect(calcSpacingFromShorthand('gap.sm gap.nested.xl', spacingMap)).toBe('2px 24px')
    })

    it('should handle padding.small', () => {
      expect(calcSpacingFromShorthand('padding.small', spacingMap)).toBe('4px')
    })

    it('should handle padding.large', () => {
      expect(calcSpacingFromShorthand('padding.large', spacingMap)).toBe('16px')
    })
  })

  describe('mixing direct keys and nested paths', () => {
    it('should handle space0 and gap.sm', () => {
      expect(calcSpacingFromShorthand('space0 gap.sm', spacingMap)).toBe('0px 2px')
    })

    it('should handle padding.small and gap.md', () => {
      expect(calcSpacingFromShorthand('padding.small gap.md', spacingMap)).toBe('4px 8px')
    })

    it('should handle four mixed values', () => {
      expect(calcSpacingFromShorthand('space4 gap.sm padding.large space16', spacingMap)).toBe('4px 2px 16px 16px')
    })
  })

  describe('fallback for non-existent tokens', () => {
    it('should return the original token when not found in spacingMap', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = calcSpacingFromShorthand('nonExistent', spacingMap)
      expect(result).toBe('nonExistent')
      expect(consoleWarnSpy).toHaveBeenCalledWith('Theme token path "nonExistent" not found in theme.')

      consoleWarnSpy.mockRestore()
    })

    it('should handle CSS values like auto', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = calcSpacingFromShorthand('auto', spacingMap)
      expect(result).toBe('auto')

      consoleWarnSpy.mockRestore()
    })

    it('should handle direct CSS values like 10px', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = calcSpacingFromShorthand('10px', spacingMap)
      expect(result).toBe('10px')

      consoleWarnSpy.mockRestore()
    })

    it('should handle mixed valid tokens and CSS values', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = calcSpacingFromShorthand('auto 10px', spacingMap)
      expect(result).toBe('auto 10px')

      consoleWarnSpy.mockRestore()
    })

    it('should handle mixed valid tokens and invalid nested paths', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = calcSpacingFromShorthand('space4 gap.invalid', spacingMap)
      expect(result).toBe('4px gap.invalid')
      expect(consoleWarnSpy).toHaveBeenCalledWith('Theme token path "gap.invalid" not found in theme.')

      consoleWarnSpy.mockRestore()
    })

    it('should handle deeply nested invalid path', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = calcSpacingFromShorthand('gap.nested.xl.invalid', spacingMap)
      expect(result).toBe('gap.nested.xl.invalid')
      expect(consoleWarnSpy).toHaveBeenCalledWith('Theme token path "gap.nested.xl.invalid" not found in theme.')

      consoleWarnSpy.mockRestore()
    })
  })

  describe('undefined and edge cases', () => {
    it('should return undefined for undefined value', () => {
      expect(calcSpacingFromShorthand(undefined, spacingMap)).toBe(undefined)
    })

    it('should handle empty string', () => {
      expect(calcSpacingFromShorthand('', spacingMap)).toBe(undefined)
    })

    it('should handle string with only whitespace', () => {
      expect(calcSpacingFromShorthand('   ', spacingMap)).toBe('')
    })

    it('should handle extra spaces between tokens', () => {
      expect(calcSpacingFromShorthand('space4  space8', spacingMap)).toBe('4px  8px')
    })

    it('should trim leading and trailing whitespace', () => {
      expect(calcSpacingFromShorthand('  space4 space8  ', spacingMap)).toBe('4px 8px')
    })
  })

  describe('console warnings', () => {
    it('should warn when a direct key is not found', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      calcSpacingFromShorthand('invalidToken', spacingMap)
      expect(consoleWarnSpy).toHaveBeenCalledWith('Theme token path "invalidToken" not found in theme.')

      consoleWarnSpy.mockRestore()
    })

    it('should warn when a nested path is not found', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      calcSpacingFromShorthand('gap.invalid', spacingMap)
      expect(consoleWarnSpy).toHaveBeenCalledWith('Theme token path "gap.invalid" not found in theme.')

      consoleWarnSpy.mockRestore()
    })

    it('should warn for each invalid token in a multi-token value', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      calcSpacingFromShorthand('invalid1 invalid2', spacingMap)
      expect(consoleWarnSpy).toHaveBeenCalledTimes(2)
      expect(consoleWarnSpy).toHaveBeenNthCalledWith(1, 'Theme token path "invalid1" not found in theme.')
      expect(consoleWarnSpy).toHaveBeenNthCalledWith(2, 'Theme token path "invalid2" not found in theme.')

      consoleWarnSpy.mockRestore()
    })
  })

  describe('complex scenarios', () => {
    it('should handle all direct keys', () => {
      expect(calcSpacingFromShorthand('space0 space4 space8 space16', spacingMap)).toBe('0px 4px 8px 16px')
    })

    it('should handle all nested paths', () => {
      expect(calcSpacingFromShorthand('gap.sm gap.md gap.lg gap.nested.xl', spacingMap)).toBe('2px 8px 16px 24px')
    })

    it('should handle mix of everything', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = calcSpacingFromShorthand('space4 gap.md auto padding.small', spacingMap)
      expect(result).toBe('4px 8px auto 4px')

      consoleWarnSpy.mockRestore()
    })
  })

  // Era-3 (current) tokens are referenced via dot-path notation and resolved
  // against the new theme's nested `sharedTokens.spacing` map. This block mirrors
  // that shape to verify the real consumer syntax (e.g. `margin="general.spaceMd"`).
  describe('era-3 (current) spacing tokens', () => {
    const eraThreeMap = {
      general: {
        spaceNone: '0rem',
        space2xs: '0.125rem',
        spaceXs: '0.25rem',
        spaceSm: '0.5rem',
        spaceMd: '0.75rem',
        spaceLg: '1rem',
        spaceXl: '1.5rem',
        space2xl: '2rem'
      },
      gap: {
        sections: '3rem',
        buttons: '0.75rem',
        cards: {
          sm: '0.75rem',
          md: '1rem',
          lg: '1.5rem',
          nestedContainers: { sm: '0.5rem', md: '0.75rem', lg: '1rem' }
        },
        inputs: { horizontal: '0.75rem', vertical: '1rem' }
      },
      padding: {
        card: { sm: '0.5rem', md: '0.75rem', lg: '1rem' }
      }
    }

    it('resolves a general scale token', () => {
      expect(calcSpacingFromShorthand('general.spaceMd', eraThreeMap)).toBe('0.75rem')
    })

    it('resolves general.spaceNone', () => {
      expect(calcSpacingFromShorthand('general.spaceNone', eraThreeMap)).toBe('0rem')
    })

    it('resolves a deeply nested semantic gap token', () => {
      expect(
        calcSpacingFromShorthand('gap.cards.nestedContainers.md', eraThreeMap)
      ).toBe('0.75rem')
    })

    it('resolves a semantic padding token', () => {
      expect(calcSpacingFromShorthand('padding.card.lg', eraThreeMap)).toBe('1rem')
    })

    it('handles CSS-like shorthand mixing the general scale with auto', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      expect(
        calcSpacingFromShorthand('general.spaceLg auto general.spaceXl', eraThreeMap)
      ).toBe('1rem auto 1.5rem')

      consoleWarnSpy.mockRestore()
    })

    it('mixes semantic gap and padding tokens', () => {
      expect(
        calcSpacingFromShorthand('gap.cards.sm padding.card.md', eraThreeMap)
      ).toBe('0.75rem 0.75rem')
    })
  })
})
