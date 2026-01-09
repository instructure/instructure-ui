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
import { alpha } from '@instructure/ui-color-utils'
import type { SharedTokens } from '@instructure/ui-themes'

/**
 * This function creates CSS-in-JS styles for focus indicators.
 *
 * @returns CSS-in-JS style object containing focus outline styles ready for use with emotion or similar libraries.
 */
const calcFocusOutlineStyles = (
  /**
   * The focus outline theme configuration object containing color and sizing tokens.
   */
  theme: SharedTokens['focusOutline'],
  params?: {
    /**
     * The color variant to use for the focus outline
     */
    focusColor?: 'info' | 'inverse' | 'success' | 'danger'
    /**
     * Whether to position the outline outside ('offset') or inside ('inset') the element.
     */
    focusPosition?: 'offset' | 'inset'
    /**
     * Whether to include smooth transition animations for focus changes.
     */
    shouldAnimateFocus?: boolean
    /**
     * Whether to apply focus styles to :focus-within pseudo-class for container elements.
     */
    focusWithin?: boolean
    /**
     * Whether to force showing the focus outline.
     */
    withFocusOutline?: boolean
    /**
     * What CSS selector to use to display the focus ring, `:focus` by default.
     */
    customCSSSelector?: string
  }
) => {
  const focusColor = params?.focusColor ?? 'info'
  const focusPosition = params?.focusPosition ?? 'offset'
  const shouldAnimateFocus = params?.shouldAnimateFocus ?? true
  const focusWithin = params?.focusWithin ?? false
  const withFocusOutline = params?.withFocusOutline ?? false
  const selector = params?.customCSSSelector ?? '&:focus'

  const focusColorVariants = {
    info: theme.infoColor,
    inverse: theme.onColor,
    success: theme.successColor,
    danger: theme.dangerColor
  }

  const outlineStyle = {
    outlineColor: focusColorVariants[focusColor!],
    outlineStyle: 'solid',
    outlineWidth: theme.width,
    outlineOffset: theme[focusPosition]
  }
  return {
    ...(shouldAnimateFocus && {
      transition: 'outline-color 0.2s, outline-offset 0.25s'
    }),
    outlineOffset: '-0.8rem',
    outlineStyle: 'solid',
    outlineColor: alpha(outlineStyle.outlineColor, 0),
    ...(withFocusOutline && outlineStyle),
    [selector]: {
      ...outlineStyle,
      '&:hover, &:active': {
        // apply the same style so it's not overridden by some global style
        ...outlineStyle
      }
    },
    ...(focusWithin && {
      '&:focus-within': outlineStyle
    })
  }
}

export default calcFocusOutlineStyles
export { calcFocusOutlineStyles }
