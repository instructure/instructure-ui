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
import type { DesktopTopNavProps } from './props'

const generateStyles = (props: DesktopTopNavProps, theme: any) => {
  const { lti } = props
  return {
    container: {
      height: '66px',
      position: 'relative',
      borderBottom: '1px solid',
      borderColor: theme.colors.contrasts.grey1424,
      backgroundColor: theme.colors.contrasts.grey1111,
      width: '100%',
      color: theme.colors.contrasts.grey125125,
      zIndex: '1000',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row'
    },
    start: {
      marginLeft: '24px',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '16px'
    },
    end: {
      marginRight: '24px',
      display: 'flex',
      gap: '12px'
    }
  }
}

export { generateStyles }
