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

import {
  boxShadowObjectsToCSSString,
  type NewComponentTypes
} from '@instructure/ui-themes'

import type { SegmentedControlProps } from '../../SegmentedControl/v2/props'
import type { SegmentedControlOptionStyle } from './props'

type StyleParams = {
  size: NonNullable<SegmentedControlProps['size']>
  isSelected: boolean
  isDisabled: boolean
}

/**
 * ---
 * private: true
 * ---
 * Maps the SegmentedControl tokens onto the BaseButton tokens that render the option.
 * @param  {Object} componentTheme The theme variable object.
 * @param params Additional parameters to customize the style.
 * @return {Object} The BaseButton theme override, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['SegmentedControl']>,
  params: StyleParams
): SegmentedControlOptionStyle => {
  const { size, isSelected, isDisabled } = params

  const shadow = boxShadowObjectsToCSSString(componentTheme.selectedItemShadow)

  const sizes = {
    sm: {
      smallHeight: componentTheme.heightSm,
      smallPaddingHorizontal: componentTheme.itemPaddingHorizontalSm,
      smallFontSize: componentTheme.fontSizeSm,
      gapButtonContentSm: componentTheme.itemGapSm
    },
    md: {
      mediumHeight: componentTheme.heightMd,
      mediumPaddingHorizontal: componentTheme.itemPaddingHorizontalMd,
      mediumFontSize: componentTheme.fontSizeMd,
      gapButtonContentMd: componentTheme.itemGapMd
    },
    lg: {
      largeHeight: componentTheme.heightLg,
      largePaddingHorizontal: componentTheme.itemPaddingHorizontalLg,
      largeFontSize: componentTheme.fontSizeLg,
      gapButtonContentLg: componentTheme.itemGapLg
    }
  }

  // the selected option is a filled secondary button, the others are ghost buttons
  const states = isSelected
    ? {
        secondaryColor: componentTheme.selectedItemTextColor,
        secondaryBackground: componentTheme.selectedItemBackgroundColor,
        secondaryBoxShadow: isDisabled ? 'none' : shadow,
        secondaryHoverBackground:
          componentTheme.selectedItemBackgroundHoverColor,
        secondaryHoverTextColor: componentTheme.selectedItemTextColor,
        secondaryHoverBoxShadow: shadow,
        secondaryActiveBackground:
          componentTheme.selectedItemBackgroundActiveColor,
        secondaryActiveTextColor: componentTheme.selectedItemTextColor,
        secondaryDisabledBackgroundColor:
          componentTheme.selectedItemBackgroundDisabledColor,
        secondaryDisabledTextColor: componentTheme.selectedItemTextDisabledColor
      }
    : {
        secondaryGhostColor: componentTheme.unselectedItemTextColor,
        secondaryGhostBackground: 'transparent',
        secondaryGhostBoxShadow: 'none',
        secondaryGhostHoverBackground:
          componentTheme.unselectedItemBackgroundHoverColor,
        secondaryGhostHoverBoxShadow: 'none',
        secondaryGhostActiveBackground:
          componentTheme.unselectedItemBackgroundActiveColor,
        secondaryDisabledTextColor:
          componentTheme.unselectedItemTextDisabledColor
      }

  return {
    buttonTheme: {
      ...sizes[size],
      ...states,
      borderRadius: componentTheme.itemBorderRadius,
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight,
      paddingVertical: '0',
      // the disabled colors already carry the disabled look
      opacityDisabled: 1,
      secondaryBorderColor: 'transparent',
      secondaryGhostBorderColor: 'transparent',
      secondaryHoverBorderColor: 'transparent',
      secondaryActiveBorderColor: 'transparent',
      secondaryDisabledBorderColor: 'transparent'
    }
  }
}

export default generateStyle
