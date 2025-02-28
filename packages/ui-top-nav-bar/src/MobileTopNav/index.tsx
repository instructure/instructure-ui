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
import React, {
  Children,
  Fragment,
  PropsWithChildren,
  useEffect,
  useState
} from 'react'
import { jsx, useTheme } from '@instructure/emotion'
import type { MobileTopNavProps } from './props'

import { IconButton } from '@instructure/ui-buttons'
import { IconHamburgerLine, IconXLine } from '@instructure/ui-icons'
import {
  generateItemListStyles,
  generateItemStyles,
  generateStyles
} from './styles'

/**
---
category: utilities
---
**/
const MobileTopNav = ({
  lti = false,
  brand,
  styles,
  children
}: MobileTopNavProps) => {
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = open ? 'hidden' : 'visible'
  }, [open])

  const getSubComponent = (displayName: any) => {
    // TODO: specify the type of the child
    return Children.map(children, (child: any) => child)?.filter(
      (child: any) => child?.type?.displayName === displayName
    )
  }

  return (
    <div style={styles.container(open)}>
      <div style={styles.topBar}>
        {brand}
        <span style={styles.end}>
          {!open && getSubComponent('End')}
          <IconButton
            withBackground={false}
            withBorder={false}
            screenReaderLabel="burger"
            color={lti ? undefined : 'primary-inverse'}
            onClick={() => setOpen((open) => !open)}
          >
            {open ? <IconXLine /> : <IconHamburgerLine />}
          </IconButton>
        </span>
      </div>

      <div style={styles.content(open)}>{getSubComponent('Menu')}</div>
    </div>
  )
}

const End = ({ children }: PropsWithChildren) => {
  return <Fragment>{children}</Fragment>
}

const Menu = ({ children }: PropsWithChildren) => {
  return <Fragment>{children}</Fragment>
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

const SC: any = withStyles(generateStyles)(MobileTopNav)

SC.End = End
SC.End.displayName = 'End'
// TODO investigate whether displayName should be added to the original component
SC.Menu = Menu
SC.Menu.displayName = 'Menu'
SC.displayName = 'MobileTopNav'

export { SC as MobileTopNav }
export default SC
