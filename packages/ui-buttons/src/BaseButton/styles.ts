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
import type {
  BaseButtonProps,
  BaseButtonStyleProps,
  BaseButtonStyle
} from './props'

import { darken, lighten } from '@instructure/ui-color-utils'

const generateStyle = (
  componentTheme: NewComponentTypes['BaseButton'],
  params: BaseButtonProps,
  _sharedTokens: SharedTokens,
  extraArgs: BaseButtonStyleProps
): BaseButtonStyle => {
  const {
    size,
    color,
    textAlign,
    shape,
    withBackground,
    withBorder,
    isCondensed
  } = params

  const { isDisabled, hasOnlyIconVisible, isEnabled } = extraArgs

  const shapeVariants = {
    circle: { borderRadius: '50%' },
    rectangle: {}
  }

  const sizeVariants = {
    small: {
      content: {
        fontSize: componentTheme.smallFontSize,
        paddingLeft: componentTheme.smallPaddingHorizontal,
        paddingRight: componentTheme.smallPaddingHorizontal,
        height: componentTheme.smallHeight,
        ...(hasOnlyIconVisible && {
          paddingLeft: 0,
          paddingRight: 0,
          width: componentTheme.smallHeight
        })
      },
      iconSVG: {
        // TODO
        fontSize: isCondensed ? componentTheme.smallFontSize : '1rem'
      }
    },
    medium: {
      content: {
        fontSize: componentTheme.mediumFontSize,
        paddingLeft: componentTheme.mediumPaddingHorizontal,
        paddingRight: componentTheme.mediumPaddingHorizontal,
        height: componentTheme.mediumHeight,
        ...(hasOnlyIconVisible && {
          paddingLeft: 0,
          paddingRight: 0,
          width: componentTheme.mediumHeight
        })
      },
      iconSVG: {
        // TODO
        fontSize: isCondensed ? componentTheme.mediumFontSize : '1.25rem'
      }
    },
    large: {
      content: {
        fontSize: componentTheme.largeFontSize,
        paddingLeft: componentTheme.largePaddingHorizontal,
        paddingRight: componentTheme.largePaddingHorizontal,
        height: componentTheme.largeHeight,
        ...(hasOnlyIconVisible && {
          paddingLeft: 0,
          paddingRight: 0,
          width: componentTheme.largeHeight
        })
      },
      iconSVG: {
        // TODO
        fontSize: isCondensed ? componentTheme.largeFontSize : '1.625rem'
      }
    }
  }

  const colorVariants = {
    'ai-primary': {
      default: {
        color: componentTheme.primaryColor,
        background: `
        linear-gradient(to bottom,  ${componentTheme.aiBackgroundTopGradientColor} 0%, ${componentTheme.aiBackgroundBottomGradientColor} 100%) padding-box,
        linear-gradient(to bottom, ${componentTheme.aiBorderTopGradientColor} 0%, ${componentTheme.aiBorderBottomGradientColor} 100%) border-box`,
        borderStyle: 'solid',
        borderColor: 'transparent',
        boxShadow: componentTheme.primaryBoxShadow
      },
      active: {},
      hover: {
        background: `
          linear-gradient(to bottom, ${darken(
            componentTheme.aiBackgroundTopGradientColor,
            10
          )} 0%, ${darken(
          componentTheme.aiBackgroundBottomGradientColor,
          10
        )} 100%) padding-box,
  linear-gradient(to bottom, ${darken(
    componentTheme.aiBorderTopGradientColor,
    10
  )} 0%, ${darken(
          componentTheme.aiBorderBottomGradientColor,
          10
        )} 100%) border-box`,
        borderStyle: 'solid',
        borderColor: 'transparent',
        boxShadow: componentTheme.primaryHoverBoxShadow
      }
    },
    'ai-secondary': {
      default: {
        boxShadow: componentTheme.primaryBoxShadow
      },
      active: {},
      hover: {
        background: `
        linear-gradient(to bottom, ${lighten(
          componentTheme.aiBackgroundTopGradientColor,
          70
        )} 0%, ${lighten(
          componentTheme.aiBackgroundBottomGradientColor,
          70
        )} 100%)`
      }
    },
    primary: withBackground
      ? {
          default: {
            color: componentTheme.primaryColor,
            background: componentTheme.primaryBackground,
            borderColor: componentTheme.primaryBorderColor,
            boxShadow: componentTheme.primaryBoxShadow
          },
          active: {
            background: componentTheme.primaryActiveBackground,
            boxShadow: componentTheme.primaryActiveBoxShadow
          },
          hover: {
            background: componentTheme.primaryHoverBackground,
            boxShadow: componentTheme.primaryHoverBoxShadow
          }
        }
      : {
          default: {
            color: componentTheme.primaryGhostColor,
            borderColor: componentTheme.primaryGhostBorderColor,
            background: componentTheme.primaryGhostBackground,
            boxShadow: componentTheme.primaryBoxShadow
          },
          active: {
            background: componentTheme.primaryGhostActiveBackground,
            boxShadow: componentTheme.primaryGhostActiveBoxShadow
          },
          hover: {
            background: componentTheme.primaryGhostHoverBackground,
            boxShadow: componentTheme.primaryHoverBoxShadow
          }
        },

    secondary: withBackground
      ? {
          default: {
            color: componentTheme.secondaryColor,
            background: componentTheme.secondaryBackground,
            borderColor: componentTheme.secondaryBorderColor,
            boxShadow: componentTheme.secondaryBoxShadow
          },
          active: {
            background: componentTheme.secondaryActiveBackground,
            boxShadow: componentTheme.secondaryActiveBoxShadow
          },
          hover: {
            background: componentTheme.secondaryHoverBackground,
            boxShadow: componentTheme.secondaryHoverBoxShadow
          }
        }
      : {
          default: {
            color: componentTheme.secondaryGhostColor,
            borderColor: componentTheme.secondaryGhostBorderColor,
            background: componentTheme.secondaryGhostBackground,
            boxShadow: componentTheme.secondaryGhostBoxShadow
          },
          active: {
            background: componentTheme.secondaryGhostActiveBackground,
            boxShadow: componentTheme.secondaryGhostActiveBoxShadow
          },
          hover: {
            background: componentTheme.secondaryGhostHoverBackground,
            boxShadow: componentTheme.secondaryGhostHoverBoxShadow
          }
        },

    'primary-inverse': withBackground
      ? {
          default: {
            color: componentTheme.primaryInverseColor,
            background: componentTheme.primaryInverseBackground,
            borderColor: componentTheme.primaryInverseBorderColor,
            boxShadow: componentTheme.primaryInverseBoxShadow
          },
          active: {
            background: componentTheme.primaryInverseActiveBackground,
            boxShadow: componentTheme.primaryInverseActiveBoxShadow
          },
          hover: {
            background: componentTheme.primaryInverseHoverBackground,
            boxShadow: componentTheme.primaryInverseHoverBoxShadow
          }
        }
      : {
          default: {
            color: componentTheme.primaryInverseGhostColor,
            borderColor: componentTheme.primaryInverseGhostBorderColor,
            background: componentTheme.primaryInverseGhostBackground,
            boxShadow: componentTheme.primaryInverseGhostBoxShadow
          },
          active: {
            background: componentTheme.primaryInverseGhostActiveBackground,
            boxShadow: componentTheme.primaryInverseGhostActiveBoxShadow
          },
          hover: {
            background: componentTheme.primaryInverseGhostHoverBackground,
            boxShadow: componentTheme.primaryInverseGhostHoverBoxShadow
          }
        },

    success: withBackground
      ? {
          default: {
            color: componentTheme.successColor,
            background: componentTheme.successBackground,
            borderColor: componentTheme.successBorderColor,
            boxShadow: componentTheme.successBoxShadow
          },
          active: {
            background: componentTheme.successActiveBackground,
            boxShadow: componentTheme.successActiveBoxShadow
          },
          hover: {
            background: componentTheme.successHoverBackground,
            boxShadow: componentTheme.successHoverBoxShadow
          }
        }
      : {
          default: {
            color: componentTheme.successGhostColor,
            borderColor: componentTheme.successGhostBorderColor,
            background: componentTheme.successGhostBackground,
            boxShadow: componentTheme.successGhostBoxShadow
          },
          active: {
            background: componentTheme.successGhostActiveBackground,
            boxShadow: componentTheme.successGhostActiveBoxShadow
          },
          hover: {
            background: componentTheme.successGhostHoverBackground,
            boxShadow: componentTheme.successGhostHoverBoxShadow
          }
        },

    danger: withBackground
      ? {
          default: {
            color: componentTheme.dangerColor,
            background: componentTheme.dangerBackground,
            borderColor: componentTheme.dangerBorderColor,
            boxShadow: componentTheme.dangerBoxShadow
          },
          active: {
            background: componentTheme.dangerActiveBackground,
            boxShadow: componentTheme.dangerActiveBoxShadow
          },
          hover: {
            background: componentTheme.dangerHoverBackground,
            boxShadow: componentTheme.dangerHoverBoxShadow
          }
        }
      : {
          default: {
            color: componentTheme.dangerGhostColor,
            borderColor: componentTheme.dangerGhostBorderColor,
            background: componentTheme.dangerGhostBackground,
            boxShadow: componentTheme.dangerGhostBoxShadow
          },
          active: {
            background: componentTheme.dangerGhostActiveBackground,
            boxShadow: componentTheme.dangerGhostActiveBoxShadow
          },
          hover: {
            background: componentTheme.dangerGhostHoverBackground,
            boxShadow: componentTheme.dangerGhostHoverBoxShadow
          }
        }
  }

  return {
    baseButton: isEnabled
      ? {
          label: 'baseButton',
          appearance: 'none',
          textDecoration: 'none' /* for links styled as buttons */,
          touchAction: 'manipulation',
          // This sets the focus ring's border radius displayed by the `View`
          borderRadius: componentTheme.borderRadius,
          ...shapeVariants[shape!],
          // Prevents vertical stretching in flex parents with fixed height
          // Avoids background/focus ring distortion
          height: 'fit-content',

          '&::-moz-focus-inner': {
            border: '0' /* removes default dotted focus outline in Firefox */
          },
          '*': {
            pointerEvents:
              'none' /* Ensures that button or link is always the event target */
          },
          '&:focus': {
            textDecoration: 'none'
          },
          '&:active > [class$=-baseButton__content]':
            colorVariants[color!].active,
          '&:hover > [class$=-baseButton__content]':
            colorVariants[color!].hover,

          //TODO not the greatest solution. Must be stronger than the same &&& enforcement of <View>
          ...(color === 'ai-secondary'
            ? {
                '&&&&&&&&&&': {
                  background: `
               linear-gradient(to bottom, ${componentTheme.aiBorderTopGradientColor} 0%, ${componentTheme.aiBorderBottomGradientColor} 100%)`,
                  padding: componentTheme.borderWidth,
                  ...(shape !== 'circle'
                    ? {
                        borderRadius: `calc(${componentTheme.borderRadius} + ${
                          componentTheme.borderWidth
                        })`
                      }
                    : { borderRadius: '50%' })
                }
              }
            : {})
        }
      : {
          textDecoration: 'none',
          label: 'baseButton',
          appearance: 'none'
        },
    content: {
      label: 'baseButton__content',
      boxSizing: 'border-box',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
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

      ...(color === 'ai-secondary'
        ? {
            border: 'none',
            background: 'white',
            transition: 'none'
          }
        : {}),

      ...sizeVariants[size!].content,
      ...colorVariants[color!].default,
      ...shapeVariants[shape!],

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

      ...(isCondensed && {
        paddingTop: 0,
        paddingBottom: 0
      }),
      ...(color === 'ai-secondary'
        ? {
            background: `
        linear-gradient(to bottom, ${componentTheme.aiBorderTopGradientColor} 0%, ${componentTheme.aiBorderBottomGradientColor} 100%)`,
            backgroundClip: 'text',
            color: 'transparent'
          }
        : {})
    },

    iconSVG: {
      label: 'baseButton__iconSVG',
      display: 'flex',
      alignItems: 'center',

      ...sizeVariants[size!].iconSVG
    },

    childrenLayout: {
      label: 'baseButton__childrenLayout',
      display: 'flex',
      height: '100%',
      width: '100%',
      justifyContent:
        hasOnlyIconVisible || textAlign === 'center' ? 'center' : 'flex-start',
      boxSizing: 'border-box',
      alignItems: 'center',
      flexDirection: 'row',
      maxWidth: '100%',
      overflowX: 'visible',
      overflowY: 'visible',
      unicodeBidi: 'isolate'
    },

    iconOnly: {
      label: 'baseButton__iconOnly',
      boxSizing: 'border-box',
      minWidth: '0.0625rem',
      flexShrink: 0,
      maxWidth: '100%',
      overflowX: 'visible',
      overflowY: 'visible',
      unicodeBidi: 'isolate'
    },

    iconWrapper: {
      label: 'baseButton__iconWrapper',
      boxSizing: 'border-box',
      minWidth: '0.0625rem',
      // TODO
      paddingInlineEnd: isCondensed ? '0.375rem' : '',
      flexShrink: 0,
      maxWidth: '100%',
      overflowX: 'visible',
      overflowY: 'visible',
      unicodeBidi: 'isolate'
    },

    childrenWrapper: {
      label: 'baseButton__childrenWrapper',
      boxSizing: 'border-box',
      minWidth: '0.0625rem',
      flexShrink: 1,
      maxWidth: '100%',
      overflowX: 'visible',
      overflowY: 'visible',
      unicodeBidi: 'isolate'
    }
  }
}

export default generateStyle
