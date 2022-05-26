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

import type { ColorPickerTheme } from '@instructure/shared-types'
import { colorIndicatorBorderColor } from '../ColorIndicator/theme'

import { isValid } from '@instructure/ui-color-utils/src/isValid'
import type {
  ColorPickerProps,
  ColorPickerState,
  ColorPickerStyle
} from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ColorPickerTheme,
  props: ColorPickerProps,
  state: ColorPickerState & { isSimple: boolean }
): ColorPickerStyle => {
  const { hashMarkColor, errorIconColor, warningIconColor, successIconColor } =
    componentTheme
  const { checkContrast } = props
  const { hexCode, isSimple } = state

  const checkerBoard = {
    backgroundColor: componentTheme.checkerboardBackgroundColor,
    background: componentTheme.checkerboardBackgroundImage,
    backgroundSize: componentTheme.checkerboardBackgroundSize,
    backgroundPosition: componentTheme.checkerboardBackgroundPosition
  }

  return {
    colorPicker: {
      label: 'colorPicker',
      display: 'flex'
    },
    colorCircle: {
      backgroundColor: `#${hexCode}`,
      width: '1.5rem',
      height: '1.5rem',
      margin: 'auto',
      border: `${componentTheme.smallBorder} solid ${colorIndicatorBorderColor}`,
      borderRadius: '1.5rem',
      display: 'inline-block',
      ...(!isValid(hexCode) ? checkerBoard : {})
    },
    simpleColorContainer: {
      display: 'flex',
      paddingLeft: componentTheme.xSmallSpacing
    },
    hashMarkContainer: {
      color: hashMarkColor,
      display: 'inline-block',
      fontSize: '1rem',
      lineHeight: componentTheme.xLargeFontSize,
      ...(isSimple
        ? {
            paddingLeft: componentTheme.xSmallSpacing,
            paddingRight: componentTheme.xxxSmallSpacing
          }
        : {})
    },
    errorIcons: {
      display: 'flex',
      paddingRight: componentTheme.smallSpacing,
      color: checkContrast?.isStrict ? errorIconColor : warningIconColor
    },
    successIcon: {
      display: 'flex',
      paddingRight: componentTheme.smallSpacing,
      color: successIconColor
    },
    label: {
      marginRight: componentTheme.xxSmallSpacing
    },
    popoverContent: {
      padding: componentTheme.xxSmallSpacing
    },
    popoverContentBlock: {
      borderTop: 'solid',
      borderWidth: componentTheme.smallBorder,
      borderColor: componentTheme.popoverSeparatorColor,
      margin: `${componentTheme.smallSpacing} 0 ${componentTheme.smallSpacing} 0`
    },
    popoverFooter: {
      backgroundColor: componentTheme.popoverFooterColor,
      display: 'flex',
      flexDirection: 'row-reverse',
      padding: componentTheme.xSmallSpacing,
      borderColor: componentTheme.popoverSeparatorColor,
      borderTop: `solid ${componentTheme.smallBorder}`
    },
    colorMixerButtonContainer: {
      alignSelf: 'flex-end',
      marginLeft: componentTheme.xSmallSpacing
    }
  }
}

export default generateStyle
