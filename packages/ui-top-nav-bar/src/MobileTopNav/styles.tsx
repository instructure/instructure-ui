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
import type { MobileTopNavTheme } from '@instructure/shared-types'

const generateStyle = (
  componentTheme: MobileTopNavTheme,
  params: MobileTopNavProps
) => {
  const { lti } = params

  const contentBase = {
    top: '3.375rem',
    bottom: 0,
    left: 0,
    right: 0,
    position: 'fixed',
    backgroundColor: lti
      ? componentTheme.backgroundColorLti
      : componentTheme.backgroundColor,
    color: componentTheme.backgroundColor
  }

  return {
    container: {
      label: 'mobileTopNavContainer',
      height: '54px',
      backgroundColor: lti
        ? componentTheme.backgroundColorLti
        : componentTheme.backgroundColor,
      color: componentTheme.backgroundColor,
      width: '100%',
      zIndex: '9999'
    },
    topBar: {
      label: 'mobileTopNavTopBar',
      padding: `0 ${componentTheme.topBarPadding}`,
      height: '54px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    contentOpen: {
      label: 'mobileTopNavContentOpen',
      ...contentBase,
      height: '100%',
      overflow: 'hidden'
    },
    contentClosed: {
      label: 'mobileTopNavContentClosed',
      ...contentBase,
      height: '0px',
      overflow: 'scroll'
    },
    end: {
      label: 'mobileTopNavEnd',
      display: 'flex',
      gap: '12px',
      marginLeft: 'auto'
    }
  }
}

export { generateStyle }
