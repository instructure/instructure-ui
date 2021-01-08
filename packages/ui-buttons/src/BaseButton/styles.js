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
  const {
    size,
    color,
    textAlign,
    shape,
    withBackground,
    withBorder,
    isCondensed
  } = props

  const { isDisabled, hasOnlyIconVisible } = state

  const shapeVariants = {
    circle: { borderRadius: '50%' }
  }

  const sizeVariants = {
    small: {
      content: {
        fontSize: componentTheme.smallFontSize,
        paddingLeft: componentTheme.smallPaddingHorizontal,
        paddingRight: componentTheme.smallPaddingHorizontal,
        ...(hasOnlyIconVisible && {
          paddingLeft: 0,
          paddingRight: 0,
          height: componentTheme.smallHeight,
          width: componentTheme.smallHeight
        })
      },
      children: {
        paddingTop: componentTheme.smallPaddingTop,
        paddingBottom: componentTheme.smallPaddingBottom
      },
      iconSVG: {
        fontSize: isCondensed
          ? componentTheme.smallFontSize
          : componentTheme.iconSizeSmall
      }
    },
    medium: {
      content: {
        fontSize: componentTheme.mediumFontSize,
        paddingLeft: componentTheme.mediumPaddingHorizontal,
        paddingRight: componentTheme.mediumPaddingHorizontal,
        ...(hasOnlyIconVisible && {
          paddingLeft: 0,
          paddingRight: 0,
          height: componentTheme.mediumHeight,
          width: componentTheme.mediumHeight
        })
      },
      children: {
        paddingTop: componentTheme.mediumPaddingTop,
        paddingBottom: componentTheme.mediumPaddingBottom
      },
      iconSVG: {
        fontSize: isCondensed
          ? componentTheme.mediumFontSize
          : componentTheme.iconSizeMedium
      }
    },
    large: {
      content: {
        fontSize: componentTheme.largeFontSize,
        paddingLeft: componentTheme.largePaddingHorizontal,
        paddingRight: componentTheme.largePaddingHorizontal,
        ...(hasOnlyIconVisible && {
          paddingLeft: 0,
          paddingRight: 0,
          height: componentTheme.largeHeight,
          width: componentTheme.largeHeight
        })
      },
      children: {
        paddingTop: componentTheme.largePaddingTop,
        paddingBottom: componentTheme.largePaddingBottom
      },
      iconSVG: {
        fontSize: isCondensed
          ? componentTheme.largeFontSize
          : componentTheme.iconSizeLarge
      }
    }
  }

  const colorVariants = {
    primary: withBackground
      ? {
          default: {
            color: componentTheme.primaryColor,
            background: componentTheme.primaryBackground,
            borderColor: componentTheme.primaryBorderColor
          },
          active: {
            background: componentTheme.primaryActiveBackground,
            boxShadow: componentTheme.primaryActiveBoxShadow
          },
          hover: {
            background: componentTheme.primaryHoverBackground
          }
        }
      : {
          default: {
            color: componentTheme.primaryGhostColor,
            borderColor: componentTheme.primaryGhostBorderColor,
            background: componentTheme.primaryGhostBackground
          },
          active: {
            background: componentTheme.primaryGhostActiveBackground,
            boxShadow: componentTheme.primaryGhostActiveBoxShadow
          },
          hover: {
            background: componentTheme.primaryGhostHoverBackground
          }
        },

    secondary: withBackground
      ? {
          default: {
            color: componentTheme.secondaryColor,
            background: componentTheme.secondaryBackground,
            borderColor: componentTheme.secondaryBorderColor
          },
          active: {
            background: componentTheme.secondaryActiveBackground,
            boxShadow: componentTheme.secondaryActiveBoxShadow
          },
          hover: {
            background: componentTheme.secondaryHoverBackground
          }
        }
      : {
          default: {
            color: componentTheme.secondaryGhostColor,
            borderColor: componentTheme.secondaryGhostBorderColor,
            background: componentTheme.secondaryGhostBackground
          },
          active: {
            background: componentTheme.secondaryGhostActiveBackground,
            boxShadow: componentTheme.secondaryGhostActiveBoxShadow
          },
          hover: {
            background: componentTheme.secondaryGhostHoverBackground
          }
        },

    'primary-inverse': withBackground
      ? {
          default: {
            color: componentTheme.primaryInverseColor,
            background: componentTheme.primaryInverseBackground,
            borderColor: componentTheme.primaryInverseBorderColor
          },
          active: {
            background: componentTheme.primaryInverseActiveBackground,
            boxShadow: componentTheme.primaryInverseActiveBoxShadow
          },
          hover: {
            background: componentTheme.primaryInverseHoverBackground
          }
        }
      : {
          default: {
            color: componentTheme.primaryInverseGhostColor,
            borderColor: componentTheme.primaryInverseGhostBorderColor,
            background: componentTheme.primaryInverseGhostBackground
          },
          active: {
            background: componentTheme.primaryInverseGhostActiveBackground,
            boxShadow: componentTheme.primaryInverseGhostActiveBoxShadow
          },
          hover: {
            background: componentTheme.primaryInverseGhostHoverBackground
          }
        },

    success: withBackground
      ? {
          default: {
            color: componentTheme.successColor,
            background: componentTheme.successBackground,
            borderColor: componentTheme.successBorderColor
          },
          active: {
            background: componentTheme.successActiveBackground,
            boxShadow: componentTheme.successActiveBoxShadow
          },
          hover: {
            background: componentTheme.successHoverBackground
          }
        }
      : {
          default: {
            color: componentTheme.successGhostColor,
            borderColor: componentTheme.successGhostBorderColor,
            background: componentTheme.successGhostBackground
          },
          active: {
            background: componentTheme.successGhostActiveBackground,
            boxShadow: componentTheme.successGhostActiveBoxShadow
          },
          hover: {
            background: componentTheme.successGhostHoverBackground
          }
        },

    danger: withBackground
      ? {
          default: {
            color: componentTheme.dangerColor,
            background: componentTheme.dangerBackground,
            borderColor: componentTheme.dangerBorderColor
          },
          active: {
            background: componentTheme.dangerActiveBackground,
            boxShadow: componentTheme.dangerActiveBoxShadow
          },
          hover: {
            background: componentTheme.dangerHoverBackground
          }
        }
      : {
          default: {
            color: componentTheme.dangerGhostColor,
            borderColor: componentTheme.dangerGhostBorderColor,
            background: componentTheme.dangerGhostBackground
          },
          active: {
            background: componentTheme.dangerGhostActiveBackground,
            boxShadow: componentTheme.dangerGhostActiveBoxShadow
          },
          hover: {
            background: componentTheme.dangerGhostHoverBackground
          }
        }
  }

  return {
    baseButton: {
      label: 'baseButton',
      appearance: 'none',
      textDecoration: 'none' /* for links styled as buttons */,
      touchAction: 'manipulation',

      '&::-moz-focus-inner': {
        border: '0' /* removes default dotted focus outline in Firefox */
      },
      '*': {
        pointerEvents:
          'none' /* Ensures that button or link is always the event target */
      },

      '&:active > [class$=-baseButton__content]': colorVariants[color].active,
      '&:hover > [class$=-baseButton__content]': colorVariants[color].hover
    },

    content: {
      label: 'baseButton__content',
      boxSizing: 'border-box',
      width: '100%',
      display: 'block',
      direction: 'inherit',
      userSelect: 'none',
      transition: 'background 0.2s, transform 0.2s',
      transform: componentTheme.transform,
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      textTransform: componentTheme.textTransform,
      letterSpacing: componentTheme.letterSpacing,
      borderStyle: componentTheme.borderStyle,
      borderWidth: componentTheme.borderWidth,
      borderRadius: componentTheme.borderRadius,
      lineHeight: componentTheme.lineHeight,

      textAlign,

      '&:hover': { transform: componentTheme.hoverTransform },

      ...sizeVariants[size].content,
      ...colorVariants[color].default,
      ...shapeVariants[shape],

      ...(isCondensed && {
        paddingLeft: 0,
        paddingRight: 0
      }),
      ...(isDisabled && {
        opacity: 0.5
      }),
      ...(hasOnlyIconVisible && {
        lineHeight: 1
      }),
      ...(!withBorder && {
        borderStyle: 'none'
      })
    },

    children: {
      label: 'baseButton__children',
      display: 'block',

      ...sizeVariants[size].children,

      ...(isCondensed && {
        paddingTop: 0,
        paddingBottom: 0
      })
    },

    iconSVG: {
      label: 'baseButton__iconSVG',
      display: 'flex',
      alignItems: 'center',

      ...sizeVariants[size].iconSVG
    }
  }
}

export default generateStyle
