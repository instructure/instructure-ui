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
  const { isSimple } = state

  return {
    colorPicker: {
      label: 'colorPicker',
      display: 'flex'
    },
    simpleColorContainer: {
      label: 'colorPicker__simpleColorContainer',
      display: 'flex',
      paddingLeft: componentTheme.simpleColorContainerLeftPadding,
      alignItems: 'center'
    },
    hashMarkContainer: {
      label: 'colorPicker__hashMarkContainer',
      color: hashMarkColor,
      display: 'inline-block',
      fontSize: '1rem',
      lineHeight: componentTheme.hashMarkContainerLineHeight,
      ...(isSimple
        ? {
            paddingLeft: componentTheme.hashMarkContainerLeftPadding,
            paddingRight: componentTheme.hashMarkContainerRightPadding
          }
        : {})
    },
    errorIcons: {
      label: 'colorPicker__errorIcons',
      display: 'flex',
      paddingRight: componentTheme.errorIconsRightPadding,
      color: checkContrast?.isStrict ? errorIconColor : warningIconColor
    },
    successIcon: {
      label: 'colorPicker__successIcon',
      display: 'flex',
      paddingRight: componentTheme.successIconRightPadding,
      color: successIconColor
    },
    label: {
      label: 'colorPicker__label',
      marginRight: componentTheme.labelRightMargin
    },
    popoverContent: {
      label: 'colorPicker__popoverContent',
      padding: componentTheme.popoverContentPadding
    },
    popoverContentBlock: {
      label: 'colorPicker__popoverContentBlock',
      borderTop: 'solid',
      borderWidth: componentTheme.popoverContentBlockBorderWidth,
      borderColor: componentTheme.popoverSeparatorColor,
      marginTop: componentTheme.popoverContentBlockTopMargin,
      marginBottom: componentTheme.popoverContentBlockBottomMargin
    },
    popoverFooter: {
      label: 'colorPicker__popoverFooter',
      backgroundColor: componentTheme.popoverFooterColor,
      display: 'flex',
      flexDirection: 'row-reverse',
      padding: componentTheme.popoverFooterPadding,
      borderColor: componentTheme.popoverSeparatorColor,
      borderTop: `solid ${componentTheme.popoverFooterTopBorderWidth}`
    },
    colorMixerButtonContainer: {
      label: 'colorPicker__colorMixerButtonContainer',
      alignSelf: 'flex-end',
      marginLeft: componentTheme.colorMixerButtonContainerLeftMargin
    },
    popoverContentContainer: {
      label: 'colorPicker__popoverContentContainer',
      maxHeight: '80vh',
      overflow: 'scroll'
    }
  }
}

export default generateStyle
