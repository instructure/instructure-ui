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
import type { CheckboxFacadeProps, CheckboxFacadeStyle } from './props'

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
  componentTheme: NewComponentTypes['Checkbox'],
  props: CheckboxFacadeProps,
  sharedTokens: SharedTokens
): CheckboxFacadeStyle => {
  const { size, checked, disabled, readOnly, focused, hovered, indeterminate, invalid } = props

  const isChecked = checked || indeterminate

  const sizeVariants = {
    small: {
      label: { fontSize: componentTheme.fontSizeSm },
      facade: {
        fontSize: componentTheme.fontSizeSm,
        width: componentTheme.controlSizeSm,
        height: componentTheme.controlSizeSm,
        margin: `${componentTheme.controlVerticalMargin} ${componentTheme.gap} 0 0`
      }
    },
    medium: {
      label: { fontSize: componentTheme.fontSizeMd },
      facade: {
        fontSize: componentTheme.fontSizeMd,
        width: componentTheme.controlSizeMd,
        height: componentTheme.controlSizeMd
      }
    },
    large: {
      label: { fontSize: componentTheme.fontSizeLg },
      facade: {
        fontSize: componentTheme.fontSizeLg,
        width: componentTheme.controlSizeLg,
        height: componentTheme.controlSizeLg
      }
    }
  }

  const getLabelColor = () => {
    if (disabled) {
      return componentTheme.labelDisabledColor
    }

    if (readOnly) {
      return componentTheme.labelReadonlyColor
    }

    // DEFAULT state
    return hovered ? componentTheme.labelHoverColor : componentTheme.labelBaseColor
  }

  const getFacadeStyles = () => {
    const baseStyles = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxSizing: 'border-box',
      flexShrink: 0,
      transition: 'all 0.2s',
      borderRadius: componentTheme.borderRadius,
      marginInlineEnd: componentTheme.gap,
      marginInlineStart: '0',
      ...sizeVariants[size!].facade
    }

    if (disabled) {
      return {
        ...baseStyles,
        background: componentTheme.backgroundDisabledColor,
        border: `${componentTheme.borderWidth} solid ${componentTheme.borderDisabledColor}`,
        cursor: 'not-allowed',
        pointerEvents: 'none'
      }
    }

    if (readOnly) {
      return {
        ...baseStyles,
        background: componentTheme.backgroundReadonlyColor,
        border: `${componentTheme.borderWidth} solid ${componentTheme.borderReadonlyColor}`,
        cursor: 'default',
        pointerEvents: 'none'
      }
    }

    if (invalid) {
      return {
        ...baseStyles,
        ...(isChecked && {
          background: componentTheme.backgroundCheckedColor,
          border: `${componentTheme.borderWidth} solid ${
            hovered
              ? componentTheme.errorBorderHoverColor
              : componentTheme.errorBorderColor
          }`
        }),
        ...(!isChecked && {
          background: hovered
            ? componentTheme.backgroundHoverColor
            : componentTheme.backgroundColor,
          border: `${componentTheme.borderWidth} solid ${
            hovered
              ? componentTheme.errorBorderHoverColor
              : componentTheme.errorBorderColor
          }`
        })
      }
    }

    if (isChecked) {
      return {
        ...baseStyles,
        background: componentTheme.backgroundCheckedColor,
        border: `${componentTheme.borderWidth} solid ${componentTheme.borderCheckedColor}`
      }
    }

    // DEFAULT (unchecked) state
    return {
      ...baseStyles,
      background: hovered
        ? componentTheme.backgroundHoverColor
        : componentTheme.backgroundColor,
      border: `${componentTheme.borderWidth} solid ${
        hovered ? componentTheme.borderHoverColor : componentTheme.borderColor
      }`
    }
  }

  return {
    checkboxFacade: {
      label: 'checkboxFacade',
      display: 'flex',
      alignItems: 'flex-start'
    },
    facade: {
      label: 'checkboxFacade__facade',
      ...getFacadeStyles(),
      ...(sharedTokens?.focusOutline
        ? calcFocusOutlineStyles(sharedTokens.focusOutline, {
            withFocusOutline: focused
          })
        : {})
    },
    label: {
      label: 'checkboxFacade__label',
      flex: '1 1 auto',
      alignSelf: 'center',
      minWidth: '0.0625rem',
      color: getLabelColor(),
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight,
      ...sizeVariants[size!].label
    }
  }
}

export default generateStyle
