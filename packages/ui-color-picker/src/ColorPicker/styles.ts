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

import { mapSpacingToShorthand } from '@instructure/emotion'
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
  const {
    hashMarkColor,
    errorIconColor,
    warningIconColor,
    successIconColor,
    spacing
  } = componentTheme
  const { checkContrast, popoverMaxHeight, margin } = props
  const { isSimple, calculatedPopoverMaxHeight } = state

  const cssMargin = mapSpacingToShorthand(margin, spacing)
  return {
    colorPicker: {
      label: 'colorPicker',
      display: 'flex',
      margin: cssMargin
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
            paddingInlineStart: componentTheme.hashMarkContainerLeftPadding,
            paddingInlineEnd: componentTheme.hashMarkContainerRightPadding
          }
        : {})
    },
    errorIcons: {
      label: 'colorPicker__errorIcons',
      display: 'flex',
      paddingInlineEnd: componentTheme.errorIconsRightPadding,
      color: checkContrast?.isStrict ? errorIconColor : warningIconColor
    },
    successIcon: {
      label: 'colorPicker__successIcon',
      display: 'flex',
      paddingInlineEnd: componentTheme.successIconRightPadding,
      color: successIconColor
    },
    label: {
      label: 'colorPicker__label',
      marginInlineEnd: componentTheme.labelRightMargin
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
      marginBottom: componentTheme.popoverContentBlockBottomMargin,
      paddingTop: componentTheme.popoverContentBlockTopPadding
    },
    popoverFooter: {
      label: 'colorPicker__popoverFooter',
      backgroundColor: componentTheme.popoverFooterColor,
      display: 'flex',
      justifyContent: 'flex-end',
      padding: componentTheme.popoverFooterPadding,
      borderTop: `solid ${componentTheme.popoverFooterTopBorderWidth}`,
      borderColor: componentTheme.popoverSeparatorColor
    },
    colorMixerButtonContainer: {
      label: 'colorPicker__colorMixerButtonContainer',
      marginInlineStart: componentTheme.colorMixerButtonContainerLeftMargin
    },
    popoverContentContainer: {
      label: 'colorPicker__popoverContentContainer',
      maxHeight: calculatedPopoverMaxHeight || popoverMaxHeight || '100vh',
      overflowY: 'auto',
      overflowX: 'hidden',
      scrollbarGutter: 'stable',
      display: 'flex',
      flexDirection: 'column',
      opacity: state.isHeightCalculated ? 1 : 0,
      transition: 'opacity 150ms ease-in'
    },
    colorMixerButtonWrapper: {
      label: 'colorPicker__colorMixerButtonWrapper',
      position: 'static'
    }
  }
}

export default generateStyle
