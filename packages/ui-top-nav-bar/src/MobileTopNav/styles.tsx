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

//TODO use theme variables for spacing
const generateStyles = (props: MobileTopNavProps, theme: any) => {
  const { lti } = props
  return {
    container: (_open: boolean) => {
      return {
        height: '54px',
        backgroundColor: lti
          ? theme?.colors?.contrasts?.grey1111
          : theme?.colors?.contrasts?.grey100100, //CANVAS, LTI LATER
        color: theme?.colors?.contrasts?.grey125125,
        width: '100%',
        zIndex: '9999'
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
        height: open ? '100%' : '0px',
        top: '3.375rem',
        bottom: 0,
        left: 0,
        right: 0,
        overflow: open ? 'hidden' : 'scroll',
        position: 'fixed',
        backgroundColor: lti
          ? theme?.colors?.contrasts?.grey1111
          : theme?.colors?.contrasts?.grey100100,
        color: theme.colors?.contrasts?.white1010
      }
    },
    end: {
      display: 'flex',
      gap: '12px',
      marginLeft: 'auto'
    }
  }
}

export { generateStyles }
