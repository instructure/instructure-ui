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

import { generateStyles } from './styles'
import { Link } from '@instructure/ui-link'

/**
---
category: utilities
---
 **/
const SubNav = ({ children, menuItems }: any) => {
  const getSubComponent = (displayName: any) => {
    return Children.map(children, (child: any) => child)?.filter(
      (child: any) => child?.type?.displayName === displayName
    )
  }
  return (
    <div style={{ marginLeft: '20px', marginTop: '20px' }}>
      {menuItems.map((item: any) => (
        <div
          style={{
            justifyContent: 'center',
            color: 'black',
            fontSize: '20px',
            padding: '4px',
            borderLeft: item.selected ? '3px solid' : 'none',
            height: '32px',
            fontWeight: 'bold'
          }}
          key={item}
        >
          <Link
            key={item}
            href={item.href}
            themeOverride={item.selected ? { color: 'black' } : {}}
            isWithinText={false}
          >
            {item.title}
          </Link>
        </div>
      ))}
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

const SC: any = withStyles(generateStyles)(SubNav)

SC.displayName = 'SubNav'
SC.Start = withStyles(generateStyles)(Start)
SC.Start.displayName = 'Start'
SC.End = withStyles(generateStyles)(End)
SC.End.displayName = 'End'

export { SC as SubNav }
export default SC
