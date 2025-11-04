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

/**
 * Generates consistent focus outline styles.
 *
 * This function creates CSS-in-JS styles for focus indicators.
 *
 * @param {Object} theme - The focus outline theme configuration object containing color and sizing tokens.
 * @param {string} theme.offset - Outline offset value for 'offset' positioning (e.g., '2px').
 * @param {string} theme.inset - Outline offset value for 'inset' positioning (e.g., '-2px').
 * @param {string} theme.width - Outline width value (e.g., '2px').
 * @param {string} theme.infoColor - Default info/primary focus color (typically blue).
 * @param {string} theme.onColor - High contrast color for use on dark backgrounds.
 * @param {string} theme.successColor - Success state focus color (typically green).
 * @param {string} theme.dangerColor - Error/danger state focus color (typically red).
 *
 * @param {Object} [params] - Optional configuration parameters to customize the focus styles.
 * @param {'info' | 'inverse' | 'success' | 'danger'} [params.focusColor='info'] - The color variant to use for the focus outline.
 * @param {'offset' | 'inset'} [params.focusPosition='offset'] - Whether to position the outline outside ('offset') or inside ('inset') the element.
 * @param {boolean} [params.shouldAnimateFocus=true] - Whether to include smooth transition animations for focus changes.
 * @param {boolean} [params.focusWithin=false] - Whether to apply focus styles to :focus-within pseudo-class for container elements.
 *
 * @returns {Object} CSS-in-JS style object containing focus outline styles ready for use with emotion or similar libraries.
 */
const calcFocusOutlineStyles = (
  theme: {
    offset: string
    inset: string
    width: string
    infoColor: string
    onColor: string
    successColor: string
    dangerColor: string
  },
  params?: {
    focusColor?: 'info' | 'inverse' | 'success' | 'danger'
    focusPosition?: 'offset' | 'inset'
    shouldAnimateFocus?: boolean
    focusWithin?: boolean
  }
) => {
  const focusColor = params?.focusColor ?? 'info'
  const focusPosition = params?.focusPosition ?? 'offset'
  const shouldAnimateFocus = params?.shouldAnimateFocus ?? true
  const focusWithin = params?.focusWithin ?? false

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
    outlineColor: alpha(outlineStyle.outlineColor, 0),
    '&:focus': {
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
