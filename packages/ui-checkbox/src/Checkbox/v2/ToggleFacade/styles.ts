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

import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import { calcFocusOutlineStyles } from '@instructure/emotion'
import type { ToggleFacadeProps, ToggleFacadeStyle } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} sharedTokens Shared theme token object
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NewComponentTypes['Toggle'],
  props: ToggleFacadeProps,
  sharedTokens: SharedTokens
): ToggleFacadeStyle => {
  const { disabled, size, checked, focused, labelPlacement, invalid } = props

  const labelPlacementVariants = {
    start: {
      facade: {
        marginInlineEnd: componentTheme.marginEnd,
        marginInlineStart: componentTheme.marginStart
      },
      label: {
        textAlign: 'end'
      }
    },
    end: {
      facade: {
        marginInlineEnd: componentTheme.marginEnd
      },
      label: {}
    },
    top: {
      facade: {
        marginTop: componentTheme.marginVertical
      },
      label: {
        display: 'block'
      }
    }
  }

  const labelSizeVariants = {
    small: {
      fontSize: componentTheme.labelFontSizeSm,
      lineHeight: componentTheme.labelLineHeightSm
    },
    medium: {
      fontSize: componentTheme.labelFontSizeMd,
      lineHeight: componentTheme.labelLineHeightMd
    },
    large: {
      fontSize: componentTheme.labelFontSizeLg,
      lineHeight: componentTheme.labelLineHeightLg
    }
  }

  return {
    toggleFacade: {
      label: 'toggleFacade',
      display: 'flex',
      alignItems: 'center',
      ...(labelPlacement === 'top' && { display: 'block' })
    },
    facade: {
      label: 'toggleFacade__facade',
      background: componentTheme.toggleBackground,
      borderColor: componentTheme.borderColor,
      cursor: 'pointer',
      display: 'inline-block',
      userSelect: 'none',
      position: 'relative',
      borderRadius: '3rem',
      verticalAlign: 'middle',
      boxShadow: `inset 0 0 0 ${componentTheme.borderWidth} ${
        invalid && !checked
          ? componentTheme.errorBorderColor
          : componentTheme.borderColor
      }`,
      height: componentTheme.toggleSize,
      width: `calc(${componentTheme.toggleSize} * 1.5)`,
      ...labelPlacementVariants[labelPlacement!].facade,
      ...(sharedTokens?.focusOutline
        ? calcFocusOutlineStyles(sharedTokens.focusOutline, {
            withFocusOutline: focused
          })
        : {}),

      ...(checked && {
        background: componentTheme.checkedBackgroundColor,
        boxShadow: 'none'
      }),

      ...(disabled && {
        cursor: 'not-allowed',
        pointerEvents: 'none'
      })
    },

    icon: {
      label: 'toggleFacade__icon',
      display: 'block',
      textAlign: 'center',
      position: 'absolute',
      top: '0',
      insetInlineStart: '0',
      insetInlineEnd: 'auto',
      transition: 'all 0.2s',
      transform: 'translate3d(0, 0, 0)',
      fontSize: '0.875rem',
      height: componentTheme.toggleSize,
      width: componentTheme.toggleSize,

      ...(checked && {
        transform: 'translate3d(50%, 0, 0)',
        '[dir="rtl"] &': {
          transform: 'translate3d(-50%, 0, 0)'
        }
      })
    },

    iconToggle: {
      label: 'toggleFacade__iconToggle',
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '&::before': {
        content: '""',
        position: 'absolute',
        height: `calc(100% - (${componentTheme.borderWidth} * 6))`,
        width: `calc(100% - (${componentTheme.borderWidth} * 6))`,
        background: componentTheme.toggleBackground,
        boxShadow: componentTheme.toggleShadow,
        borderRadius: '100%',
        border: `${componentTheme.borderWidth} solid ${
          checked
            ? componentTheme.checkedIconBorderColor
            : componentTheme.uncheckedIconBorderColor
        }`
      },

      '& [class*="lucideIcon"] svg': {
        position: 'relative',
        zIndex: 1
      }
    },

    label: {
      label: 'toggleFacade__label',
      flex: 1,
      minWidth: '0.0625rem',
      color: componentTheme.labelColor,
      fontFamily: componentTheme.labelFontFamily,
      fontWeight: componentTheme.labelFontWeight,
      ...labelSizeVariants[size!],
      ...labelPlacementVariants[labelPlacement!].label
    }
  }
}

export default generateStyle
