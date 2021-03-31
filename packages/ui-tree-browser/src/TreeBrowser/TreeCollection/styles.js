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

const list = keyframes`{
  to {
    transform: scaleY(1);
  }
}`

/**
 *  ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */

const generateStyles = (componentTheme, props) => {
  const { size, variant } = props
  const sizeMap = {
    small: {
      indent: {
        marginInlineStart: `calc(${componentTheme.baseSpacingSmall} * 3)`,
        marginInlineEnd: 0
      },
      folderTree: {
        marginInlineStart: `calc(${componentTheme.baseSpacingSmall} * 2)`,
        marginInlineEnd: 0,
        paddingTop: `calc(1.75 * ${componentTheme.baseSpacingSmall})`,
        marginTop: `calc(-1.75 * ${componentTheme.baseSpacingSmall})`
      }
    },
    medium: {
      indent: {
        marginInlineStart: `calc(${componentTheme.baseSpacingMedium} * 3)`,
        marginInlineEnd: 0
      },
      folderTree: {
        marginInlineStart: `calc(${componentTheme.baseSpacingMedium} * 2)`,
        marginInlineEnd: 0,
        paddingTop: componentTheme.baseSpacingMedium,
        marginTop: `calc(-1 * ${componentTheme.baseSpacingMedium})`
      }
    },
    large: {
      indent: {
        marginInlineStart: `calc(${componentTheme.baseSpacingLarge} * 3)`,
        marginInlineEnd: 0
      },
      folderTree: {
        marginInlineStart: `calc(${componentTheme.baseSpacingLarge} * 2)`,
        marginInlineEnd: 0,
        paddingTop: `calc(0.875 * ${componentTheme.baseSpacingMedium})`,
        marginTop: `calc(-0.875 * ${componentTheme.baseSpacingMedium})`
      }
    }
  }
  return {
    treeCollection: {
      label: 'treeCollection',
      margin: 0,
      padding: 0,
      '&:focus': {
        outline: 0
      }
    },
    list: {
      label: 'treeCollection__list',
      fontFamily: componentTheme.fontFamily,
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      listStyleType: 'none',
      position: 'relative',
      ...(variant === 'folderTree' && {
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '0.25rem',
          bottom: '1.1875rem',
          insetInlineStart: '0',
          insetInlineEnd: 'auto',
          transform: 'scaleY(0.01)',
          transformOrigin: 'center top',
          animationName: list,
          animationDuration: '0.2s',
          animationFillMode: 'forwards',
          animationTimingFunction: 'ease-out',
          pointerEvents: 'none',
          width: componentTheme.borderWidth,
          background: componentTheme.borderColor
        }
      }),
      ...sizeMap[size][variant]
    },
    item: {
      label: 'treeCollection__label',
      '&:focus': {
        outline: 0
      }
    }
  }
}

export default generateStyles
