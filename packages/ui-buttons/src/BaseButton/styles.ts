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

  const gapForSize = {
    small: componentTheme.gapButtonContentSm,
    medium: componentTheme.gapButtonContentMd,
    large: componentTheme.gapButtonContentLg,
    condensedSmall: componentTheme.gapButtonContentSm,
    condensedMedium: componentTheme.gapButtonContentSm
  }

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
        minHeight: componentTheme.smallHeight,
        ...(hasOnlyIconVisible && {
          paddingLeft: 0,
          paddingRight: 0,
          width: componentTheme.smallHeight
        })
      }
    },
    medium: {
      content: {
        fontSize: componentTheme.mediumFontSize,
        paddingLeft: componentTheme.mediumPaddingHorizontal,
        paddingRight: componentTheme.mediumPaddingHorizontal,
        minHeight: componentTheme.mediumHeight,
        ...(hasOnlyIconVisible && {
          paddingLeft: 0,
          paddingRight: 0,
          width: componentTheme.mediumHeight
        })
      }
    },
    large: {
      content: {
        fontSize: componentTheme.largeFontSize,
        paddingLeft: componentTheme.largePaddingHorizontal,
        paddingRight: componentTheme.largePaddingHorizontal,
        minHeight: componentTheme.largeHeight,
        ...(hasOnlyIconVisible && {
          paddingLeft: 0,
          paddingRight: 0,
          width: componentTheme.largeHeight
        })
      }
    },
    condensedSmall: {
      content: {
        fontSize: componentTheme.smallFontSize,
        paddingLeft: componentTheme.smallPaddingHorizontal,
        paddingRight: componentTheme.smallPaddingHorizontal,
        height: componentTheme.heightXxs,
        ...(hasOnlyIconVisible && {
          paddingLeft: 0,
          paddingRight: 0,
          width: componentTheme.heightXxs
        })
      }
    },
    condensedMedium: {
      content: {
        fontSize: componentTheme.smallFontSize,
        paddingLeft: componentTheme.smallPaddingHorizontal,
        paddingRight: componentTheme.smallPaddingHorizontal,
        height: componentTheme.heightXs,
        ...(hasOnlyIconVisible && {
          paddingLeft: 0,
          paddingRight: 0,
          width: componentTheme.heightXs
        })
      }
    }
  }

  const colorVariants = {
    'ai-primary': {
      default: {
        color: componentTheme.aiBaseTextColor,
        background: `
        linear-gradient(to bottom,  ${componentTheme.aiBackgroundTopGradientColor} 0%, ${componentTheme.aiBackgroundBottomGradientColor} 100%) padding-box,
        linear-gradient(to bottom, ${componentTheme.aiBorderTopGradientColor} 0%, ${componentTheme.aiBorderBottomGradientColor} 100%) border-box`,
        borderStyle: 'solid',
        borderColor: 'transparent',
        boxShadow: componentTheme.primaryBoxShadow
      },
      active: {
        background: `
        linear-gradient(to bottom, ${componentTheme.aiActiveBackgroundTopGradientColor} 0%, ${componentTheme.aiActiveBackgroundBottomGradientColor} 100%) padding-box,
        linear-gradient(to bottom, ${componentTheme.aiActiveBorderTopGradientColor} 0%, ${componentTheme.aiActiveBorderBottomGradientColor} 100%) border-box`,
        borderStyle: 'solid',
        borderColor: 'transparent',
        color: componentTheme.aiActiveTextColor
      },
      hover: {
        background: `
        linear-gradient(to bottom, ${componentTheme.aiHoverBackgroundTopGradientColor} 0%, ${componentTheme.aiHoverBackgroundBottomGradientColor} 100%) padding-box,
        linear-gradient(to bottom, ${componentTheme.aiHoverBorderTopGradientColor} 0%, ${componentTheme.aiHoverBorderBottomGradientColor} 100%) border-box`,
        borderStyle: 'solid',
        borderColor: 'transparent',
        color: componentTheme.aiHoverTextColor,
        boxShadow: componentTheme.primaryHoverBoxShadow
      },
      disabled: {
        background: componentTheme.aiDisabledBackgroundColor,
        borderColor: componentTheme.aiDisabledBorderColor,
        color: componentTheme.aiDisabledTextColor
      }
    },
    'ai-secondary': {
      default: {
        boxShadow: componentTheme.primaryBoxShadow
      },
      active: {
        background: `
        linear-gradient(to bottom, ${componentTheme.aiSecondaryActiveBackgroundTopGradientColor} 0%, ${componentTheme.aiSecondaryActiveBackgroundBottomGradientColor} 100%)`
      },
      hover: {
        background: `
        linear-gradient(to bottom, ${componentTheme.aiSecondaryHoverBackgroundTopGradientColor} 0%, ${componentTheme.aiSecondaryHoverBackgroundBottomGradientColor} 100%)`
      },
      disabled: {
        borderColor: componentTheme.aiSecondaryDisabledBorderColor,
        color: componentTheme.aiSecondaryDisabledTextColor
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
            color: componentTheme.primaryActiveTextColor,
            borderColor: componentTheme.primaryActiveBorderColor
          },
          hover: {
            background: componentTheme.primaryHoverBackground,
            boxShadow: componentTheme.primaryHoverBoxShadow,
            color: componentTheme.primaryHoverTextColor,
            borderColor: componentTheme.primaryHoverBorderColor
          },
          disabled: {
            background: componentTheme.primaryDisabledBackgroundColor,
            borderColor: componentTheme.primaryDisabledBorderColor,
            color: componentTheme.primaryDisabledTextColor
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
            color: componentTheme.tertiaryActiveTextColor,
            borderColor: componentTheme.tertiaryActiveBorderColor
          },
          hover: {
            background: componentTheme.primaryGhostHoverBackground,
            boxShadow: componentTheme.primaryHoverBoxShadow,
            color: componentTheme.tertiaryHoverTextColor,
            borderColor: componentTheme.tertiaryHoverBorderColor
          },
          disabled: {
            background: 'transparent',
            borderColor: componentTheme.tertiaryDisabledBorderColor,
            color: componentTheme.tertiaryDisabledTextColor
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
            color: componentTheme.secondaryActiveTextColor,
            borderColor: componentTheme.secondaryActiveBorderColor
          },
          hover: {
            background: componentTheme.secondaryHoverBackground,
            boxShadow: componentTheme.secondaryHoverBoxShadow,
            color: componentTheme.secondaryHoverTextColor,
            borderColor: componentTheme.secondaryHoverBorderColor
          },
          disabled: {
            background: componentTheme.secondaryDisabledBackgroundColor,
            borderColor: componentTheme.secondaryDisabledBorderColor,
            color: componentTheme.secondaryDisabledTextColor
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
          },
          hover: {
            background: componentTheme.secondaryGhostHoverBackground,
            boxShadow: componentTheme.secondaryGhostHoverBoxShadow
          },
          disabled: {
            background: 'transparent'
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
            color: componentTheme.primaryOnColorActiveTextColor,
            borderColor: componentTheme.primaryOnColorActiveBorderColor
          },
          hover: {
            background: componentTheme.primaryInverseHoverBackground,
            boxShadow: componentTheme.primaryInverseHoverBoxShadow,
            color: componentTheme.primaryOnColorHoverTextColor,
            borderColor: componentTheme.primaryOnColorHoverBorderColor
          },
          disabled: {
            background: componentTheme.primaryOnColorDisabledBackgroundColor,
            borderColor: componentTheme.primaryOnColorDisabledBorderColor,
            color: componentTheme.primaryOnColorDisabledTextColor
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
            color: componentTheme.secondaryOnColorActiveTextColor,
            borderColor: componentTheme.secondaryOnColorActiveBorderColor
          },
          hover: {
            background: componentTheme.primaryInverseGhostHoverBackground,
            boxShadow: componentTheme.primaryInverseGhostHoverBoxShadow,
            color: componentTheme.secondaryOnColorHoverTextColor,
            borderColor: componentTheme.secondaryOnColorHoverBorderColor
          },
          disabled: {
            background: 'transparent',
            borderColor: componentTheme.secondaryOnColorDisabledBorderColor,
            color: componentTheme.secondaryOnColorDisabledTextColor
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
            color: componentTheme.successActiveTextColor,
            borderColor: componentTheme.successActiveBorderColor
          },
          hover: {
            background: componentTheme.successHoverBackground,
            boxShadow: componentTheme.successHoverBoxShadow,
            color: componentTheme.successHoverTextColor,
            borderColor: componentTheme.successHoverBorderColor
          },
          disabled: {
            background: componentTheme.successDisabledBackgroundColor,
            borderColor: componentTheme.successDisabledBorderColor,
            color: componentTheme.successDisabledTextColor
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
            color: componentTheme.successSecondaryActiveTextColor,
            borderColor: componentTheme.successSecondaryActiveBorderColor
          },
          hover: {
            background: componentTheme.successGhostHoverBackground,
            boxShadow: componentTheme.successGhostHoverBoxShadow,
            color: componentTheme.successSecondaryHoverTextColor,
            borderColor: componentTheme.successSecondaryHoverBorderColor
          },
          disabled: {
            background: 'transparent',
            borderColor: componentTheme.successSecondaryDisabledBorderColor,
            color: componentTheme.successSecondaryDisabledTextColor
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
            color: componentTheme.destructiveActiveTextColor,
            borderColor: componentTheme.destructiveActiveBorderColor
          },
          hover: {
            background: componentTheme.dangerHoverBackground,
            boxShadow: componentTheme.dangerHoverBoxShadow,
            color: componentTheme.destructiveHoverTextColor,
            borderColor: componentTheme.destructiveHoverBorderColor
          },
          disabled: {
            background: componentTheme.destructiveDisabledBackgroundColor,
            borderColor: componentTheme.destructiveDisabledBorderColor,
            color: componentTheme.destructiveDisabledTextColor
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
            color: componentTheme.destructiveSecondaryActiveTextColor,
            borderColor: componentTheme.destructiveSecondaryActiveBorderColor
          },
          hover: {
            background: componentTheme.dangerGhostHoverBackground,
            boxShadow: componentTheme.dangerGhostHoverBoxShadow,
            color: componentTheme.destructiveSecondaryHoverTextColor,
            borderColor: componentTheme.destructiveSecondaryHoverBorderColor
          },
          disabled: {
            background: 'transparent',
            borderColor: componentTheme.destructiveSecondaryDisabledBorderColor,
            color: componentTheme.destructiveSecondaryDisabledTextColor
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
          '&:hover > [class$=-baseButton__content]':
            colorVariants[color!].hover,
          '&:active > [class$=-baseButton__content]':
            colorVariants[color!].active,

          //TODO not the greatest solution. Must be stronger than the same &&& enforcement of <View>
          ...(color === 'ai-secondary'
            ? {
                '&&&&&&&&&&': {
                  padding: componentTheme.borderWidth,
                  ...(shape !== 'circle'
                    ? {
                        borderRadius: `calc(${componentTheme.borderRadius} + ${componentTheme.borderWidth})`
                      }
                    : { borderRadius: '50%' }),
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: '0',
                    borderRadius: 'inherit',
                    padding: componentTheme.borderWidth,
                    background: `linear-gradient(to bottom, ${componentTheme.aiBorderTopGradientColor} 0%, ${componentTheme.aiBorderBottomGradientColor} 100%)`,
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    pointerEvents: 'none'
                  }
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
            background: 'transparent',
            transition: 'none'
          }
        : {}),

      paddingTop: componentTheme.paddingVertical,
      paddingBottom: componentTheme.paddingVertical,

      ...sizeVariants[size!].content,
      ...colorVariants[color!].default,
      ...shapeVariants[shape!],

      ...(isCondensed && {
        paddingLeft: 0,
        paddingRight: 0
      }),
      ...((size === 'condensedSmall' || size === 'condensedMedium') && {
        background: 'transparent',
        borderStyle: 'none'
      }),
      ...(isDisabled && {
        ...colorVariants[color!].disabled,
        opacity: componentTheme.opacityDisabled
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
      minWidth: 0,

      ...(isCondensed && {
        paddingTop: 0,
        paddingBottom: 0
      }),
      ...(color === 'ai-secondary'
        ? {
            ...(isDisabled
              ? {
                  color: componentTheme.aiSecondaryDisabledTextColor
                }
              : {
                  background: `
        linear-gradient(to bottom, ${componentTheme.aiSecondaryTextTopGradientColor} 0%, ${componentTheme.aiSecondaryTextBottomGradientColor} 100%)`,
                  backgroundClip: 'text',
                  color: 'transparent'
                })
          }
        : {})
    },

    iconSVG: {
      label: 'baseButton__iconSVG',
      display: 'flex',
      alignItems: 'center'
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
      paddingInlineEnd: gapForSize[size!],
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
