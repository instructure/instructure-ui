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

import type { ColorPresetTheme } from '@instructure/shared-types'
import type { ColorPresetProps } from './props'
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
  componentTheme: ColorPresetTheme,
  props: ColorPresetProps
) => {
  const { colorMixerSettings, disabled } = props
  return {
    colorPreset: {
      label: 'colorPreset',
      display: 'flex',
      flexWrap: 'wrap',
      width: '17rem',
      ...(disabled && {
        opacity: 0.5
      })
    },
    addNewPresetButton: {
      label: 'colorPreset__addNewPresetButton',
      width: '2.375rem',
      height: '2.375rem',
      margin: componentTheme.xxSmallSpacing
    },
    selectedIndicator: {
      label: 'colorPreset__selectedIndicator',
      width: '1.25rem',
      height: '1.25rem',
      borderStyle: 'solid',
      borderColor: componentTheme.selectedIndicatorBorderColor,
      borderWidth: componentTheme.smallBorder,
      borderRadius: '1.25rem',
      boxSizing: 'border-box',
      position: 'relative',
      insetInlineStart: '1.5rem',
      bottom: '2.75rem',
      backgroundColor: componentTheme.selectedIndicatorBackgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    popoverContent: {
      label: 'colorPreset__popoverContent',
      padding: componentTheme.smallSpacing,
      maxHeight: colorMixerSettings?.maxHeight || '100vh',
      overflow: 'auto'
    },
    popoverDivider: {
      label: 'colorPreset__popoverDivider',
      borderTop: 'solid',
      borderWidth: componentTheme.smallBorder,
      borderColor: componentTheme.popoverDividerColor,
      margin: `${componentTheme.smallSpacing} 0 ${componentTheme.smallSpacing} 0`
    },
    popoverContrastBlock: {
      label: 'colorPreset__popoverContrastBlock',
      borderTop: 'solid',
      borderWidth: componentTheme.smallBorder,
      borderColor: componentTheme.popoverDividerColor,
      marginTop: componentTheme.popoverContentBlockTopMargin,
      marginBottom: componentTheme.popoverContentBlockBottomMargin,
      paddingTop: componentTheme.popoverContentBlockTopPadding
    },
    popoverFooter: {
      label: 'colorPreset__popoverFooter',
      backgroundColor: componentTheme.popoverFooterColor,
      display: 'flex',
      flexDirection: 'row-reverse',
      padding: componentTheme.smallSpacing
    },
    label: {
      label: 'colorPreset__label',
      width: '100%',
      margin: componentTheme.xxSmallSpacing
    }
  }
}

export default generateStyle
