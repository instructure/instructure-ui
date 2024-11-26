/* eslint-disable react/display-name */
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

/** @jsx jsx */
import { Children, PropsWithChildren } from 'react'
import { jsx, useTheme } from '@instructure/emotion'
import type { DesktopTopNavProps } from './props'

import { generateStyles } from './styles'

/**
 ---
 category: utilities
 ---
 **/
const DesktopTopNav = ({ styles, children }: DesktopTopNavProps) => {
  const getSubComponent = (displayName: any) => {
    return Children.map(children, (child: any) => child)?.filter(
      (child: any) => child?.type?.displayName === displayName
    )
  }
  //console.log('getSubComponent', getSubComponent('Start'))

  return (
    <div style={styles.container}>
      {getSubComponent('Start')}
      {getSubComponent('End')}
    </div>
  )
}

const Start = ({ children, styles }: PropsWithChildren & { styles: any }) => {
  return <div style={styles.start}>{children}</div>
}

const End = ({ children, styles }: PropsWithChildren & { styles: any }) => {
  return <div style={styles.end}>{children}</div>
}

const withStyles =
  <ComponentOwnProps, ComponentStyle>(
    generateStyles: (props: any, theme: any) => ComponentStyle
  ) =>
  (WrappedComponent: any) =>
  (originalProps: ComponentOwnProps) => {
    const theme = useTheme()
    const styledProps = {
      styles: generateStyles(originalProps, theme),
      ...originalProps
    }
    return <WrappedComponent {...styledProps} />
  }

const SC: any = withStyles(generateStyles)(DesktopTopNav)

SC.displayName = 'DesktopTopNav'
SC.Start = withStyles(generateStyles)(Start)
SC.Start.displayName = 'Start'
SC.End = withStyles(generateStyles)(End)
SC.End.displayName = 'End'

export { SC as DesktopTopNav }
export default SC
