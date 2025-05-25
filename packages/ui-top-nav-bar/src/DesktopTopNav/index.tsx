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

import { Children, PropsWithChildren } from 'react'
import { useStyle } from '@instructure/emotion'
import type { DesktopTopNavProps } from './props'

import { generateStyle } from './styles'
import generateComponentTheme from './theme'

/**
---
category: utilities
---
**/
const DesktopTopNav = ({ children }: DesktopTopNavProps) => {
  const styles = useStyle({
    generateStyle,
    generateComponentTheme,
    params: {},
    componentId: 'DesktopTopNav',
    displayName: 'DesktopTopNav'
  })

  const getSubComponent = (displayName: any) => {
    return Children.map(children, (child: any) => child)?.filter(
      (child: any) => child?.type?.displayName === displayName
    )
  }
  return (
    <div css={styles.container}>
      {getSubComponent('Start')}
      {getSubComponent('End')}
    </div>
  )
}

const Start = ({ children }: PropsWithChildren) => {
  const styles = useStyle({
    generateStyle,
    generateComponentTheme,
    params: {},
    componentId: 'DesktopTopNav.Start',
    displayName: 'DesktopTopNav.Start'
  })
  return <div css={styles.start}>{children}</div>
}

const End = ({ children }: PropsWithChildren) => {
  const styles = useStyle({
    generateStyle,
    generateComponentTheme,
    params: {},
    componentId: 'DesktopTopNav.End',
    displayName: 'DesktopTopNav.End'
  })
  return <div css={styles.end}>{children}</div>
}

Start.displayName = 'Start'
End.displayName = 'End'
DesktopTopNav.Start = Start
DesktopTopNav.End = End

DesktopTopNav.displayName = 'DesktopTopNav'
Start.displayName = 'Start'
End.displayName = 'End'
DesktopTopNav.Start = Start
DesktopTopNav.End = End

export { DesktopTopNav }
export default DesktopTopNav
