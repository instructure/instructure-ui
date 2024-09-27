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
import type { MobileTopNavProps } from './props'

const generateStyles = (props: MobileTopNavProps, theme: any) => {
  const { lightMode } = props
  return {
    container: (open: boolean) => {
      return {
        height: '54px',
        position: open ? 'fixed' : 'relative',
        backgroundColor: lightMode
          ? theme.colors.ui.surfacePageSecondary
          : theme.colors.ui.surfaceDark,
        color: lightMode
          ? theme.colors.contrasts.grey125125
          : theme.colors?.contrasts?.white1010,
        width: '100%'
      }
    },
    topBar: {
      padding: `0 ${theme.spacing.small}`,
      height: '54px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    content: (open: boolean) => {
      return {
        padding: `0 ${theme.spacing.small}`,
        height: open ? '100%' : '0px',
        top: '3.375rem',
        bottom: 0,
        left: 0,
        right: 0,
        overflow: open ? 'scroll' : 'hidden',
        position: 'fixed',
        backgroundColor: lightMode
          ? theme.colors.ui.surfacePageSecondary
          : theme.colors.ui.surfaceDark,
        color: lightMode
          ? theme.colors.contrasts.grey125125
          : theme.colors?.contrasts?.white1010
      }
    },
    btnRow: {
      display: 'flex',
      gap: '12px'
    }
  }
}
const generateItemListStyles = (_props: any, theme: any) => {
  return {
    divider: {
      height: '0.0625rem',
      overflow: 'hidden',
      background: theme.colors.contrasts.grey1214
    }
  }
}
const generateItemStyles = (_props: any, _theme: any) => {
  return {
    container: {
      margin: '16px 0',
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'flex-end'
    },
    leftIcon: { paddingRight: '8px', fontSize: '18px' },
    rightIcon: { marginLeft: 'auto', paddingRight: '8px', fontSize: '18px' }
  }
}

export { generateStyles, generateItemListStyles, generateItemStyles }
