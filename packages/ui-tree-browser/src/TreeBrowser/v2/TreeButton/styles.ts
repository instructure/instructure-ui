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

import { keyframes, calcFocusOutlineStyles } from '@instructure/emotion'

import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import type { TreeBrowserButtonProps, TreeBrowserButtonStyle } from './props'

const transform = keyframes`
  50% {
    opacity: 0.5;
    transform: translate3d(2%, 0, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }`
/**
 *
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyles = (
  componentTheme: NewComponentTypes['TreeBrowserTreeButton'],
  props: TreeBrowserButtonProps,
  sharedTokens: SharedTokens,
  state: { animation?: boolean; hoverable?: boolean }
): TreeBrowserButtonStyle => {
  const { size, variant, selected, level } = props

  const isRootButton = level && level === 1

  const sizeMap = {
    small: {
      folderTree: {
        before: {
          width: componentTheme.baseSpacingSmall
        },
        icon: {
          marginInlineEnd: componentTheme.iconsMarginRightSmall,
          marginInlineStart: '0'
        },
        thumbnail: {
          height: `calc(${componentTheme.baseSpacingSmall} * 2)`,
          width: `calc(${componentTheme.baseSpacingSmall}* 2)`,
          marginInlineEnd: componentTheme.iconsMarginRightSmall,
          marginInlineStart: '0'
        }
      },
      indent: {
        icon: {
          marginInlineEnd: componentTheme.iconsMarginRightSmall,
          marginInlineStart: '0'
        },
        thumbnail: {
          height: `calc(${componentTheme.baseSpacingSmall} * 2)`,
          width: `calc(${componentTheme.baseSpacingSmall} * 2)`,
          marginInlineEnd: componentTheme.iconsMarginRightSmall,
          marginInlineStart: '0'
        }
      },
      textName: {
        fontSize: componentTheme.nameFontSizeSmall
      },
      textDescriptor: {
        fontSize: componentTheme.descriptorFontSizeSmall
      }
    },
    medium: {
      folderTree: {
        before: {
          width: componentTheme.baseSpacingMedium
        },
        icon: {
          marginInlineEnd: componentTheme.iconsMarginRightMedium,
          marginInlineStart: '0'
        },
        thumbnail: {
          height: `calc(${componentTheme.baseSpacingMedium} * 2)`,
          width: `calc(${componentTheme.baseSpacingMedium} * 2)`,
          marginInlineEnd: componentTheme.iconsMarginRightMedium,
          marginInlineStart: '0'
        }
      },
      indent: {
        icon: {
          marginInlineEnd: componentTheme.iconsMarginRightMedium,
          marginInlineStart: '0'
        },
        thumbnail: {
          height: `calc(${componentTheme.baseSpacingMedium} * 2)`,
          width: `calc(${componentTheme.baseSpacingMedium} * 2)`,
          marginInlineEnd: componentTheme.iconsMarginRightMedium,
          marginInlineStart: '0'
        }
      },
      textName: {
        fontSize: componentTheme.nameFontSizeMedium
      },
      textDescriptor: {
        fontSize: componentTheme.descriptorFontSizeMedium
      }
    },
    large: {
      folderTree: {
        before: {
          width: componentTheme.baseSpacingLarge
        },
        icon: {
          marginInlineEnd: componentTheme.iconsMarginRightLarge,
          marginInlineStart: '0'
        },
        thumbnail: {
          height: `calc(${componentTheme.baseSpacingLarge} * 2)`,
          width: `calc(${componentTheme.baseSpacingLarge} * 2)`,
          marginInlineEnd: componentTheme.iconsMarginRightLarge,
          marginInlineStart: '0'
        }
      },
      indent: {
        icon: {
          marginInlineEnd: componentTheme.iconsMarginRightLarge,
          marginInlineStart: '0'
        },
        thumbnail: {
          height: `calc(${componentTheme.baseSpacingLarge} * 2)`,
          width: `calc(${componentTheme.baseSpacingLarge}* 2)`,
          marginInlineEnd: componentTheme.iconsMarginRightLarge,
          marginInlineStart: '0'
        }
      },
      textName: {
        fontSize: componentTheme.nameFontSizeLarge
      },
      textDescriptor: {
        fontSize: componentTheme.descriptorFontSizeLarge
      }
    }
  }

  const textStyle = {
    minWidth: '0.0625rem',
    lineHeight: componentTheme.textLineHeight,
    flex: 1
  }

  const textNameStyle = {
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    ...sizeMap[size!].textName
  }

  const layoutPadding = {
    small: {
      folderTree: {
        padding: `calc(${componentTheme.baseSpacingSmall} / 3) ${componentTheme.baseSpacingSmall}`
      },
      indent: {
        padding: `calc(${componentTheme.baseSpacingSmall} / 3) calc(${componentTheme.baseSpacingSmall} / 2)`
      }
    },
    medium: {
      folderTree: {
        padding: `calc(${componentTheme.baseSpacingMedium} / 3) ${componentTheme.baseSpacingMedium}`
      },
      indent: {
        padding: `calc(${componentTheme.baseSpacingMedium} / 3) calc(${componentTheme.baseSpacingMedium} / 2)`
      }
    },
    large: {
      folderTree: {
        padding: `calc(${componentTheme.baseSpacingLarge} / 3) ${componentTheme.baseSpacingLarge}`
      },
      indent: {
        padding: `calc(${componentTheme.baseSpacingLarge} / 3) calc(${componentTheme.baseSpacingLarge} / 2)`
      }
    }
  }

  return {
    treeButton: {
      label: 'treeButton',
      boxSizing: 'border-box',
      display: 'block',
      width: '100%',
      margin: '0',
      backgroundColor: 'transparent',
      textAlign: 'start',
      fontFamily: 'inherit',
      userSelect: 'none',
      cursor: 'pointer',
      border: 'none',
      borderRadius: componentTheme.borderRadius,
      position: 'relative',
      zIndex: 1,
      ...(state?.animation
        ? {
            transform: 'translate3d(-2%, 0, 0)',
            opacity: 0.01,
            transformOrigin: 'left center',
            animationName: transform,
            animationDuration: '0.2s',
            animationFillMode: 'forwards',
            animationTimingFunction: 'ease-out',
            animationDelay: '0.2s'
          }
        : {}),
      outline: '0',
      padding: '0',
      ...(sharedTokens?.focusOutline
        ? calcFocusOutlineStyles(sharedTokens.focusOutline)
        : {}),
      ...(variant === 'folderTree' &&
        !isRootButton && {
          '&::before': {
            content: '""',
            height: componentTheme.borderWidth,
            background: componentTheme.borderColor, // Tree horizontal lines
            position: 'absolute',
            insetInlineStart: '0',
            insetInlineEnd: 'auto',
            top: '50%',
            ...(selected && { visibility: 'hidden' }),
            ...sizeMap[size!][variant!].before
          },
          '&:hover::before': {
            visibility: state?.hoverable ? 'hidden' : 'visible'
          }
        }),
      ...(state?.hoverable !== false && {
        '&:hover': {
          backgroundColor: selected
            ? componentTheme.selectedBackgroundColor
            : componentTheme.hoverBackgroundColor,

          '[class$=-treeButton__textName], [class$=-treeButton__textDescriptor], [class$=-treeButton__node]':
            {
              color: selected
                ? componentTheme.selectedTextColor
                : componentTheme.hoverTextColor
            }
        }
      }),
      ...(selected && {
        backgroundColor: componentTheme.selectedBackgroundColor
      })
    },
    layout: {
      label: 'treeButton__layout',
      display: 'flex',
      alignItems: 'center',
      lineHeight: 1,
      minHeight: '2rem',
      ...layoutPadding[size!][variant!]
    },
    text: {
      label: 'treeButton__text',
      ...textStyle
    },
    textName: {
      label: 'treeButton__textName',
      ...textNameStyle,
      color: selected
        ? componentTheme.selectedTextColor
        : componentTheme.nameTextColor
    },
    textDescriptor: {
      label: 'treeButton__textDescriptor',
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      marginTop: componentTheme.descriptorMarginTop,
      color: selected
        ? componentTheme.selectedTextColor
        : componentTheme.descriptorTextColor,
      ...sizeMap[size!].textDescriptor
    },
    icon: {
      label: 'treeButton__icon',
      minWidth: '0.0625rem',
      position: 'relative',
      zIndex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      ...sizeMap[size!][variant!].icon
    },
    thumbnail: {
      label: 'treeButton__thumbnail',
      ...sizeMap[size!][variant!].thumbnail
    },
    node: {
      label: 'treeButton__node',
      ...textStyle,
      ...textNameStyle,
      color: componentTheme.descriptorTextColor
    }
  }
}

export default generateStyles
