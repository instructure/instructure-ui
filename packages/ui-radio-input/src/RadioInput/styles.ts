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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'componentTheme' implicitly has an 'any'... Remove this comment to see the full error message
const generateStyle = (componentTheme, props, state) => {
  const { disabled, variant, context, size, inline } = props

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
  const getInputStateSelector = (state) =>
    `[class$=-radioInput__input]:${state} + [class$=-radioInput__control] &`

  const toggleFacadeContextVariants = {
    success: { backgroundColor: componentTheme.toggleBackgroundSuccess },
    danger: { backgroundColor: componentTheme.toggleBackgroundDanger },
    warning: { backgroundColor: componentTheme.toggleBackgroundWarning },
    off: { backgroundColor: componentTheme.toggleBackgroundOff }
  }

  const facadeVariants = {
    simple: {
      base: {
        boxSizing: 'border-box',
        display: 'block',
        position: 'relative',
        marginInlineEnd: componentTheme.simpleFacadeMarginEnd,
        marginInlineStart: '0',
        flexShrink: 0,
        minWidth: '1rem',
        transition: 'all 0.2s ease-out',
        borderRadius: '100%',
        border: `0.125rem solid ${componentTheme.borderColor}`,
        background: componentTheme.background,

        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-0.375rem',
          left: '-0.375rem',
          width: 'calc(100% + 0.75rem)',
          height: 'calc(100% + 0.75rem)',
          boxSizing: 'border-box',
          borderRadius: '100%',
          border: `${componentTheme.focusBorderWidth} ${componentTheme.focusBorderStyle} ${componentTheme.focusBorderColor}`,
          transition: 'all 0.2s',
          transform: 'scale(0.75)',
          opacity: 0,
          pointerEvents: 'none'
        },

        [getInputStateSelector('hover')]: {
          borderColor: componentTheme.hoverBorderColor
        },
        [getInputStateSelector('focus')]: {
          background: componentTheme.background,
          '&::before': { transform: 'scale(1)', opacity: 1 }
        }
      },
      small: {
        width: componentTheme.simpleFacadeSmallSize,
        height: componentTheme.simpleFacadeSmallSize,
        [getInputStateSelector('checked')]: {
          background: componentTheme.background,
          boxShadow: `inset 0 0 0 ${componentTheme.simpleCheckedInsetSmall} ${componentTheme.hoverBorderColor}`,
          borderColor: componentTheme.hoverBorderColor
        }
      },
      medium: {
        width: componentTheme.simpleFacadeMediumSize,
        height: componentTheme.simpleFacadeMediumSize,
        [getInputStateSelector('checked')]: {
          background: componentTheme.background,
          boxShadow: `inset 0 0 0 ${componentTheme.simpleCheckedInsetMedium} ${componentTheme.hoverBorderColor}`,
          borderColor: componentTheme.hoverBorderColor
        }
      },
      large: {
        width: componentTheme.simpleFacadeLargeSize,
        height: componentTheme.simpleFacadeLargeSize,
        [getInputStateSelector('checked')]: {
          background: componentTheme.background,
          boxShadow: `inset 0 0 0 ${componentTheme.simpleCheckedInsetLarge} ${componentTheme.hoverBorderColor}`,
          borderColor: componentTheme.hoverBorderColor
        }
      }
    },
    toggle: {
      base: {
        boxSizing: 'border-box',
        visibility: 'hidden',
        display: 'block',
        position: 'absolute',
        zIndex: 1,
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        boxShadow: componentTheme.toggleShadow,
        borderRadius: componentTheme.toggleBorderRadius,
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        ...toggleFacadeContextVariants[context],

        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-0.25rem',
          left: '-0.25rem',
          width: 'calc(100% + 0.5rem)',
          height: 'calc(100% + 0.5rem)',
          boxSizing: 'border-box',
          borderRadius: `calc(${componentTheme.toggleBorderRadius} + 0.0625rem)`,
          border: `${componentTheme.focusBorderWidth} ${componentTheme.focusBorderStyle} ${componentTheme.focusBorderColor}`,
          transition: 'all 0.2s',
          transform: 'scale(0.75)',
          opacity: 0
        },

        [getInputStateSelector('checked')]: {
          visibility: 'visible'
        },
        [getInputStateSelector('focus')]: {
          '&::before': { opacity: 1, transform: 'scale(1)' }
        }
      },
      small: {},
      medium: {},
      large: {}
    }
  }

  const controlVariants = {
    simple: {
      base: {
        display: 'flex',
        alignItems: 'flex-start'
      },
      small: {},
      medium: {},
      large: {}
    },
    toggle: {
      base: {
        display: 'block',
        userSelect: 'none',
        boxSizing: 'border-box',
        position: 'relative'
      },
      small: {
        padding: '0 0.5rem',
        height: componentTheme.toggleSmallHeight
      },
      medium: {
        padding: '0 0.875rem',
        height: componentTheme.toggleMediumHeight
      },
      large: {
        padding: '0 1rem',
        height: componentTheme.toggleLargeHeight
      }
    }
  }

  const labelVariants = {
    simple: {
      base: {},
      small: { fontSize: componentTheme.simpleFontSizeSmall },
      medium: { fontSize: componentTheme.simpleFontSizeMedium },
      large: { fontSize: componentTheme.simpleFontSizeLarge }
    },
    toggle: {
      base: {
        position: 'relative',
        zIndex: 1,
        textTransform: 'uppercase',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        minWidth: '0.0625rem',

        [getInputStateSelector('checked')]: {
          color: componentTheme.toggleHandleText
        },
        [getInputStateSelector('focus')]: {
          textDecoration: 'underline'
        }
      },
      small: {
        fontSize: componentTheme.toggleSmallFontSize,
        height: componentTheme.toggleSmallHeight,
        svg: {
          fontSize: `calc(${componentTheme.toggleSmallFontSize} + 0.375rem)`
        }
      },
      medium: {
        fontSize: componentTheme.toggleMediumFontSize,
        height: componentTheme.toggleMediumHeight,
        svg: {
          fontSize: `calc(${componentTheme.toggleMediumFontSize} + 0.375rem)`
        }
      },
      large: {
        fontSize: componentTheme.toggleLargeFontSize,
        height: componentTheme.toggleLargeHeight,
        svg: {
          fontSize: `calc(${componentTheme.toggleLargeFontSize} + 0.375rem)`
        }
      }
    }
  }

  const inputStyles = {
    padding: '0',
    margin: '0',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    width: 'auto',
    position: 'absolute',
    top: '0',
    left: '0',
    opacity: 0.0001 /* selenium cannot find fully transparent elements */
  }

  return {
    radioInput: {
      label: 'radioInput',
      position: 'relative',
      width: '100%',
      ...(disabled && { opacity: 0.5 }),
      ...(inline && {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: 'auto'
      }),

      '&:hover': {
        cursor: 'default',
        ...(disabled && { cursor: 'not-allowed' })
      }
    },
    input: {
      label: 'radioInput__input',
      ...inputStyles,

      // NOTE: needs separate groups for `:is()` and `:-webkit-any()` because of css selector group validation (see https://www.w3.org/TR/selectors-3/#grouping)
      '&:is(input)[type="radio"]': inputStyles,
      '&:-webkit-any(input)[type="radio"]': inputStyles
    },
    control: {
      label: 'radioInput__control',
      all: 'initial',
      display: 'block',
      direction: 'inherit',
      textAlign: 'start',
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...controlVariants[variant].base,
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...controlVariants[variant][size]
    },
    facade: {
      label: 'radioInput__facade',
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...facadeVariants[variant].base,
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...facadeVariants[variant][size]
    },
    label: {
      label: 'radioInput__label',
      flex: '1 1 auto',
      color: componentTheme.labelColor,
      fontFamily: componentTheme.labelFontFamily,
      fontWeight: componentTheme.labelFontWeight,
      lineHeight: componentTheme.labelLineHeight,
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...labelVariants[variant].base,
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...labelVariants[variant][size]
    }
  }
}

export default generateStyle
