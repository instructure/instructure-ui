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
import { keyframes } from '@instructure/emotion'

const transform = keyframes` {
  50% {
    opacity: 0.5;
    transform: translate3d(2%, 0, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}`
/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (componentTheme, props) => {
  const { size, variant, selected, focused } = props

  const sizeMap = {
    small: {
      folderTree: {
        root: {
          padding: `calc(${componentTheme.baseSpacingSmall} / 3) ${componentTheme.baseSpacingSmall}`
        },
        before: {
          width: `calc(${componentTheme.baseSpacingSmall} - 0.0625rem)`
        },
        icon: {
          fontSize: `calc(${componentTheme.baseSpacingSmall} * 2)`,
          marginInlineEnd: componentTheme.baseSpacingSmall,
          marginInlineStart: '0'
        },
        thumbnail: {
          height: `calc(${componentTheme.baseSpacingSmall} * 2)`,
          width: `calc(${componentTheme.baseSpacingSmall}* 2)`,
          marginInlineEnd: componentTheme.baseSpacingSmall,
          marginInlineStart: '0'
        }
      },
      indent: {
        root: {
          padding: `calc(${componentTheme.baseSpacingSmall} / 3) calc(${componentTheme.baseSpacingSmall} / 2)`
        },
        icon: {
          fontSize: `calc(${componentTheme.baseSpacingSmall} * 2)`,
          marginInlineEnd: `calc(${componentTheme.baseSpacingSmall} / 2)`,
          marginInlineStart: '0'
        },
        thumbnail: {
          height: `calc(${componentTheme.baseSpacingSmall} * 2)`,
          width: `calc(${componentTheme.baseSpacingSmall} * 2)`,
          marginInlineEnd: `calc(${componentTheme.baseSpacingSmall} / 2)`,
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
        root: {
          padding: `calc(${componentTheme.baseSpacingMedium} / 3) ${componentTheme.baseSpacingMedium}`
        },
        before: {
          width: `calc(${componentTheme.baseSpacingMedium} - 0.0625rem)`
        },
        icon: {
          fontSize: `calc(${componentTheme.baseSpacingMedium} * 2)`,
          marginInlineEnd: componentTheme.baseSpacingMedium,
          marginInlineStart: '0'
        },
        thumbnail: {
          height: `calc(${componentTheme.baseSpacingMedium} * 2)`,
          width: `calc(${componentTheme.baseSpacingMedium} * 2)`,
          marginInlineEnd: componentTheme.baseSpacingMedium,
          marginInlineStart: '0'
        }
      },
      indent: {
        root: {
          padding: `calc(${componentTheme.baseSpacingMedium} / 3) calc(${componentTheme.baseSpacingMedium} / 2)`
        },
        icon: {
          fontSize: `calc(${componentTheme.baseSpacingMedium} * 2)`,
          marginInlineEnd: `calc(${componentTheme.baseSpacingMedium} / 2)`,
          marginInlineStart: '0'
        },
        thumbnail: {
          height: `calc(${componentTheme.baseSpacingMedium} * 2)`,
          width: `calc(${componentTheme.baseSpacingMedium} * 2)`,
          marginInlineEnd: `calc(${componentTheme.baseSpacingMedium} / 2)`,
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
        root: {
          padding: `calc(${componentTheme.baseSpacingLarge} / 3) ${componentTheme.baseSpacingLarge}`
        },
        before: {
          width: `calc(${componentTheme.baseSpacingLarge} - 0.0625rem)`
        },
        icon: {
          fontSize: `calc(${componentTheme.baseSpacingLarge} * 2)`,
          marginInlineEnd: componentTheme.baseSpacingLarge,
          marginInlineStart: '0'
        },
        thumbnail: {
          height: `calc(${componentTheme.baseSpacingLarge} * 2)`,
          width: `calc(${componentTheme.baseSpacingLarge} * 2)`,
          marginInlineEnd: componentTheme.baseSpacingLarge,
          marginInlineStart: '0'
        }
      },
      indent: {
        padding: `calc(${componentTheme.baseSpacingLarge} / 3) calc(${componentTheme.baseSpacingLarge} / 2)`,
        icon: {
          fontSize: `calc(${componentTheme.baseSpacingLarge} * 2)`,
          marginInlineEnd: `calc(${componentTheme.baseSpacingLarge} / 2)`,
          marginInlineStart: '0'
        },
        thumbnai: {
          height: `calc(${componentTheme.baseSpacingLarge} * 2)`,
          width: `calc(${componentTheme.baseSpacingLarge}* 2)`,
          marginInlineEnd: `calc(${componentTheme.baseSpacingLarge} / 2)`,
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
      transform: 'translate3d(-2%, 0, 0)',
      opacity: 0.01,
      transformOrigin: 'left center',
      animationName: transform,
      animationDuration: '0.2s',
      animationFillMode: 'forwards',
      animationTimingFunction: 'ease-out',
      animationDelay: '0.2s',
      outline: '0',
      ...(variant === 'folderTree' && {
        '&::before': {
          content: '""',
          height: componentTheme.borderWidth,
          background: componentTheme.borderColor,
          position: 'absolute',
          insetInlineStart: '0',
          insetInlineEnd: 'auto',
          top: '50%',
          ...sizeMap[size][variant].before
        }
      }),
      '&::after': {
        content: '""',
        pointerEvents: 'none',
        boxSizing: 'border-box',
        display: 'block',
        position: 'absolute',
        top: '-0.25rem',
        bottom: '-0.25rem',
        left: '-0.25rem',
        right: '-0.25rem',
        border: `${componentTheme.focusOutlineWidth} ${componentTheme.focusOutlineStyle} ${componentTheme.focusOutlineColor}`,
        borderRadius: `calc(${componentTheme.borderRadius} * 1.5)`,
        transition: 'all 0.2s',
        opacity: 0,
        transform: 'scale(0.95)',
        ...(focused && {
          opacity: 1,
          transform: 'scale(1)'
        })
      },
      ...(variant === 'folderTree' && {
        '&:hover::before': {
          visibility: 'hidden'
        }
      }),
      '&:hover': {
        backgroundColor: selected
          ? componentTheme.selectedBackgroundColor
          : componentTheme.hoverBackgroundColor,

        '[class$=-treeButton__textName],[class$=-treeButton__textDescriptor],[class$=-treeButton__icon]': {
          color: componentTheme.hoverTextColor
        }
      },
      ...(selected && {
        backgroundColor: componentTheme.selectedBackgroundColor
      }),
      ...sizeMap[size][variant].root
    },
    layout: {
      label: 'treeButton__layout',
      display: 'flex',
      alignItems: 'center',
      lineHeight: 1,
      minHeight: '2rem'
    },
    text: {
      label: 'treeButton__text',
      minWidth: '0.0625rem',
      lineHeight: componentTheme.textLineHeight,
      flex: 1
    },
    textName: {
      label: 'treeButton__textName',
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      color: componentTheme.nameTextColor,
      ...sizeMap[size].textName,
      ...(selected && {
        color: componentTheme.selectedTextColor
      })
    },
    textDescriptor: {
      label: 'treeButton__textDescriptor',
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      marginTop: componentTheme.descriptorMarginTop,
      color: componentTheme.descriptorTextColor,
      ...sizeMap[size].textDescriptor,
      ...(selected && {
        color: componentTheme.selectedTextColor
      })
    },
    icon: {
      label: 'treeButton__icon',
      minWidth: '0.0625rem',
      position: 'relative',
      zIndex: 1,
      color: componentTheme.iconColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...sizeMap[size][variant].icon,
      ...(selected && {
        color: componentTheme.selectedTextColor
      })
    },
    thumbnail: {
      label: 'treeButton__thumbnail',
      ...sizeMap[size][variant].thumbnail
    }
  }
}

export default generateStyle
