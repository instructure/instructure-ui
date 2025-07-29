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



import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  OtherHTMLAttributes,
  
  ColorContrastTheme
} from '@instructure/shared-types'

type ColorContrastOwnProps = {
  /**
   * Provides a reference to the component's underlying html element.
   */
  elementRef?: (element: Element | null) => void
  /**
   * Text of the failure indicator (Suggested english text: FAIL)
   */
  failureLabel: string
  /**
   * The first color to compare (HEX code)
   */
  firstColor: string
  /**
   * The name of the first color which will be compared
   */
  firstColorLabel?: string
  /**
   * Text of the third check (Suggested english text: Graphics text)
   */
  graphicsTextLabel: string
  /**
   * Label of the component
   */
  label: string
  /**
   * Text of the second check (Suggested english text: Large text)
   */
  largeTextLabel: string
  /**
   * Text of the first check (Suggested english text: Normal text)
   */
  normalTextLabel: string
  /**
   * The second color to compare (HEX code)
   */
  secondColor: string
  /**
   * The name of the second color which will be compared
   */
  secondColorLabel?: string
  /**
   * Text of the success indicator (Suggested english text: PASS)
   */
  successLabel: string
  /**
   * Toggles the color preview part of the component.
   *
   * If true, firstColorLabel and secondColorLabel is not necessary.
   * Otherwise, it is required.
   */
  withoutColorPreview?: boolean
  /**
   * Triggers a callback whenever the contrast changes, due to a changing color input.
   * Communicates the contrast and the success/fail state of the contrast, depending on
   * the situation:
   *
   * isValidNormalText true if at least 4.5:1
   *
   * isValidLargeText true if at least 3:1
   *
   * isValidGraphicsText true if at least 3:1
   */
  onContrastChange?: (conrastData: {
    contrast: number
    isValidNormalText: boolean
    isValidLargeText: boolean
    isValidGraphicsText: boolean
    firstColor: string
    secondColor: string
  }) => null
  /**
   * According to WCAG 2.2
   *
   * AA level (https://www.w3.org/TR/WCAG22/#contrast-minimum)
   *
   * text: 4.5:1
   *
   * large text: 3:1
   *
   * non-text: 3:1 (https://www.w3.org/TR/WCAG22/#non-text-contrast)
   *
   *
   * AAA level (https://www.w3.org/TR/WCAG22/#contrast-enhanced)
   *
   * text: 7:1
   *
   * large text: 4.5:1
   *
   * non-text: 3:1 (https://www.w3.org/TR/WCAG22/#non-text-contrast)
   */
  validationLevel?: 'AA' | 'AAA'
}

type PropKeys = keyof ColorContrastOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ColorContrastProps = ColorContrastOwnProps &
  WithStyleProps<ColorContrastTheme, ColorContrastStyle> &
  OtherHTMLAttributes<ColorContrastOwnProps>

type ColorContrastStyle = ComponentStyle<
  | 'colorContrast'
  | 'successDescription'
  | 'failureDescription'
  | 'statusWrapper'
  | 'colorIndicator'
  | 'statusIndicatorWrapper'
  | 'colorIndicatorLabel'
  | 'pickedColorHex'
  | 'colorPreview'
  | 'firstColorPreview'
  | 'secondColorPreview'
  | 'label'
  | 'onContrastChange'
  | 'validationLevel'
>
const allowedProps: AllowedPropKeys = [
  'elementRef',
  'failureLabel',
  'firstColor',
  'firstColorLabel',
  'graphicsTextLabel',
  'withoutColorPreview',
  'label',
  'largeTextLabel',
  'normalTextLabel',
  'secondColor',
  'secondColorLabel',
  'successLabel',
  'onContrastChange',
  'validationLevel'
]

type ColorContrastState = {
  contrast: number
  isValidNormalText: boolean
  isValidLargeText: boolean
  isValidGraphicsText: boolean
}
export type { ColorContrastProps, ColorContrastStyle, ColorContrastState }
export { allowedProps }
