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

import { boxShadowObjectsToCSSString } from '@instructure/ui-themes'
import { contrast } from '@instructure/ui-color-utils'
import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import type { AlertStyle, AlertStyleParams } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} params Additional parameters to customize the style.
 * @param  {Object} sharedTokens Shared token object that stores common values
 * for the theme.
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['Alert']>,
  params: AlertStyleParams,
  sharedTokens: SharedTokens
): AlertStyle => {
  const { variant, prominence } = params
  const isProminent = prominence === 'prominent'

  const variantColors = {
    error: {
      background: componentTheme.dangerBackground,
      backgroundInline: componentTheme.dangerBackgroundInline,
      borderColor: componentTheme.dangerBorderColor,
      borderColorInline: componentTheme.dangerBorderColorInline
    },
    info: {
      background: componentTheme.infoBackground,
      backgroundInline: componentTheme.infoBackgroundInline,
      borderColor: componentTheme.infoBorderColor,
      borderColorInline: componentTheme.infoBorderColorInline
    },
    success: {
      background: componentTheme.successBackground,
      backgroundInline: componentTheme.successBackgroundInline,
      borderColor: componentTheme.successBorderColor,
      borderColorInline: componentTheme.successBorderColorInline
    },
    warning: {
      background: componentTheme.warningBackground,
      backgroundInline: componentTheme.warningBackgroundInline,
      borderColor: componentTheme.warningBorderColor,
      borderColorInline: componentTheme.warningBorderColorInline
    }
  }
  const colors = variantColors[variant]
  const textColor =
    isProminent && variant !== 'warning'
      ? componentTheme.textOnColor
      : componentTheme.textBase
  // light text means a dark background, where the theme's blue focus and link
  // colors don't show, so focus outlines and links inside turn white
  const isTextLight =
    contrast(textColor, '#000000') > contrast(textColor, '#ffffff')

  return {
    alert: {
      label: 'alert',
      color: textColor,
      background: isProminent ? colors.background : colors.backgroundInline,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'flex-start',
      minWidth: '12rem',
      borderWidth: componentTheme.borderWidth,
      borderStyle: componentTheme.borderStyle,
      borderColor: isProminent ? colors.borderColor : colors.borderColorInline,
      borderRadius: componentTheme.borderRadius,
      ...(isProminent && {
        boxShadow: boxShadowObjectsToCSSString(
          sharedTokens.boxShadow.elevation4
        )
      })
    },
    icon: {
      boxSizing: 'content-box',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      paddingBlock: componentTheme.iconPaddingVertical,
      paddingInlineStart: componentTheme.iconPaddingLeft,
      paddingInlineEnd: componentTheme.iconPaddingRight
    },
    closeButton: {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'flex-start',
      marginTop: componentTheme.closeButtonMarginTop,
      marginInlineEnd: componentTheme.closeButtonMarginRight
    },
    content: {
      boxSizing: 'border-box',
      flex: 1,
      minWidth: '0.0625rem',
      fontSize: componentTheme.contentFontSize,
      fontFamily: componentTheme.contentFontFamily,
      fontWeight: componentTheme.contentFontWeight,
      lineHeight: componentTheme.contentLineHeight,
      padding: `${componentTheme.contentPaddingVertical} ${componentTheme.contentPaddingHorizontal}`
    },
    contentOnColor: isTextLight ? componentTheme.textOnColor : undefined,
    variantScreenReaderLabel: {
      position: 'absolute',
      height: '1px',
      width: '1px',
      overflow: 'hidden',
      margin: '-1px'
    }
  }
}

export default generateStyle
