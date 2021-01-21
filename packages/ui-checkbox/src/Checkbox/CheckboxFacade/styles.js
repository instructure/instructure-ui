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
const generateStyle = (componentTheme, props, state) => {
  const { size, checked, focused, hovered, indeterminate } = props

  const isChecked = checked || indeterminate

  const sizeVariants = {
    small: {
      label: { fontSize: componentTheme.labelFontSizeSmall },
      facade: {
        fontSize: componentTheme.iconSizeSmall,
        width: componentTheme.facadeSizeSmall,
        height: componentTheme.facadeSizeSmall
      }
    },
    medium: {
      label: { fontSize: componentTheme.labelFontSizeMedium },
      facade: {
        fontSize: componentTheme.iconSizeMedium,
        width: componentTheme.facadeSizeMedium,
        height: componentTheme.facadeSizeMedium
      }
    },
    large: {
      label: { fontSize: componentTheme.labelFontSizeLarge },
      facade: {
        fontSize: componentTheme.iconSizeLarge,
        width: componentTheme.facadeSizeLarge,
        height: componentTheme.facadeSizeLarge
      }
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
      color: componentTheme.color,
      background: componentTheme.background,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      flexShrink: 0,
      transition: 'all 0.2s',
      border: `${componentTheme.borderWidth} solid ${componentTheme.borderColor}`,
      borderRadius: componentTheme.borderRadius,
      marginInlineEnd: componentTheme.marginRight,
      marginInlineStart: '0',
      padding: componentTheme.padding,
      ...sizeVariants[size].facade,

      '&::before': {
        content: '""',
        position: 'absolute',
        top: '-0.3125rem',
        bottom: '-0.3125rem',
        left: '-0.3125rem',
        right: '-0.3125rem',
        boxSizing: 'border-box',
        borderRadius: `calc(${componentTheme.borderRadius} * 1.5)`,
        border: `${componentTheme.focusBorderWidth} ${componentTheme.focusBorderStyle} ${componentTheme.focusBorderColor}`,
        transition: 'all 0.2s',
        transform: 'scale(0.75)',
        opacity: 0,
        pointerEvents: 'none',
        ...(focused && {
          transform: 'scale(1)',
          opacity: 1
        })
      },

      ...(isChecked && {
        background: componentTheme.checkedBackground,
        borderColor: componentTheme.checkedBorderColor
      }),
      ...(hovered && {
        borderColor: componentTheme.hoverBorderColor
      })
    },
    label: {
      label: 'checkboxFacade__label',
      flex: '1 1 auto',
      minWidth: '0.0625rem',
      color: componentTheme.labelColor,
      fontFamily: componentTheme.labelFontFamily,
      fontWeight: componentTheme.labelFontWeight,
      lineHeight: componentTheme.labelLineHeight,
      ...sizeVariants[size].label,

      ...(isChecked && {
        color: componentTheme.checkedLabelColor
      })
    }
  }
}

export default generateStyle
