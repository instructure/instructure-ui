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
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (componentTheme, props, state) => {
  const { size, checked, focused, labelPlacement } = props

  const labelPlacementVariants = {
    start: {
      facade: {
        marginInlineEnd: '0',
        marginInlineStart: componentTheme.marginStart
      },
      label: {
        textAlign: 'end'
      }
    },
    end: {
      facade: {
        marginInlineEnd: componentTheme.marginEnd,
        marginInlineStart: '0'
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
    small: { fontSize: componentTheme.labelFontSizeSmall },
    medium: { fontSize: componentTheme.labelFontSizeMedium },
    large: { fontSize: componentTheme.labelFontSizeLarge }
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
      background: componentTheme.background,
      borderColor: componentTheme.borderColor,
      cursor: 'pointer',
      display: 'inline-block',
      userSelect: 'none',
      position: 'relative',
      borderRadius: '3rem',
      verticalAlign: 'middle',
      boxShadow: `inset 0 0 0 ${componentTheme.borderWidth} ${componentTheme.borderColor}`,
      height: componentTheme.toggleSize,
      width: `calc(${componentTheme.toggleSize} * 1.5)`,
      ...labelPlacementVariants[labelPlacement].facade,

      ...(checked && {
        background: componentTheme.checkedBackground,
        boxShadow: 'none'
      }),

      '&::before': {
        content: '""',
        position: 'absolute',
        top: '-0.25rem',
        left: '-0.25rem',
        width: 'calc(100% + 0.5rem)',
        height: 'calc(100% + 0.5rem)',
        boxSizing: 'border-box',
        borderRadius: componentTheme.borderRadius,
        border: `${componentTheme.focusBorderWidth} ${componentTheme.focusBorderStyle} ${componentTheme.focusOutlineColor}`,
        transition: 'all 0.2s',
        transform: 'scale(0.75)',
        opacity: 0,
        pointerEvents: 'none',

        ...(focused && {
          transform: 'scale(1)',
          opacity: 1
        })
      }
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
        top: componentTheme.borderWidth,
        left: componentTheme.borderWidth,
        height: `calc(100% - (${componentTheme.borderWidth} * 2))`,
        width: `calc(100% - (${componentTheme.borderWidth} * 2))`,
        background: componentTheme.toggleBackground,
        boxShadow: componentTheme.toggleShadow,
        borderRadius: '100%'
      }
    },

    iconSVG: {
      label: 'toggleFacade__iconSVG',
      display: 'block',
      color: componentTheme.uncheckedIconColor,
      position: 'relative',
      zIndex: 1,
      ...(checked && { color: componentTheme.checkedIconColor })
    },

    label: {
      label: 'toggleFacade__label',
      flex: 1,
      minWidth: '0.0625rem',
      color: componentTheme.labelColor,
      fontFamily: componentTheme.labelFontFamily,
      fontWeight: componentTheme.labelFontWeight,
      lineHeight: componentTheme.labelLineHeight,
      ...labelSizeVariants[size],
      ...labelPlacementVariants[labelPlacement].label
    }
  }
}

export default generateStyle
