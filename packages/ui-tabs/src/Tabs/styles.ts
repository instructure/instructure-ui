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

import type { TabsTheme } from '@instructure/shared-types'
import type { TabsProps, TabsStyle } from './props'

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
const generateStyle = (
  componentTheme: TabsTheme,
  props: TabsProps
): TabsStyle => {
  const { variant, tabOverflow } = props

  const variants = {
    default: {
      container: { background: componentTheme.defaultBackground },
      tabs: { marginBottom: `calc(${componentTheme.tabVerticalOffset} * -1)` },
      scrollOverlay: { width: componentTheme.scrollOverlayWidthDefault },
      scrollSpacer: { flexBasis: componentTheme.scrollOverlayWidthDefault }
    },
    secondary: {
      container: {},
      tabs: {},
      scrollOverlay: { width: componentTheme.scrollOverlayWidthSecondary },
      scrollSpacer: {
        flexBasis: componentTheme.scrollOverlayWidthSecondary
      }
    }
  }

  const tabOverflowVariants = {
    stack: {
      flexFlow: 'row wrap'
    },
    scroll: {
      overflowX: 'auto',
      ...(variant === 'default' && {
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar': {
          height: '0.0625rem',
          backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent'
        }
      })
    }
  }

  return {
    tabs: {
      label: 'tabs',
      ...variants[variant!].tabs
    },

    container: {
      label: 'tabs__container',
      ...variants[variant!].container
    },

    tabList: {
      label: 'tabs__tabList',
      display: 'flex',
      width: '100%',
      ...tabOverflowVariants[tabOverflow!]
    },

    scrollOverlay: {
      label: 'tabs__scrollOverlay',
      height: `calc(100% - (${componentTheme.tabVerticalOffset} + 0.25rem))`,
      position: 'absolute',
      zIndex: componentTheme.zIndex,
      top: '0',
      insetInlineEnd: '0',
      background: `linear-gradient(to left, ${componentTheme.scrollFadeColor} 0%, rgba(255, 255, 255, 0) 100%)`,
      pointerEvents: 'none',
      ...variants[variant!].scrollOverlay,

      '[dir="rtl"] &': {
        background: `linear-gradient(to right, ${componentTheme.scrollFadeColor} 0%, rgba(255, 255, 255, 0) 100%)`
      }
    },

    scrollSpacer: {
      label: 'tabs__scrollSpacer',
      flexShrink: 0,
      ...variants[variant!].scrollSpacer
    },

    scrollOverlayWidthDefault: componentTheme.scrollOverlayWidthDefault,
    scrollOverlayWidthSecondary: componentTheme.scrollOverlayWidthSecondary
  }
}

export default generateStyle
