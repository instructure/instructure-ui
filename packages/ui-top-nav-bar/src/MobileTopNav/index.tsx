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

import {
  Children,
  Fragment,
  PropsWithChildren,
  useEffect,
  useState
} from 'react'
import { useStyle } from '@instructure/emotion'
import type { MobileTopNavProps } from './props'

import { IconButton } from '@instructure/ui-buttons'
import { IconHamburgerLine, IconXLine } from '@instructure/ui-icons'
import { generateStyle } from './styles'
import generateComponentTheme from './theme'

/**
---
category: utilities
---
**/
const MobileTopNav = ({
  lti = false,
  brand,
  children,
  open: controlledOpen,
  onOpenChange,
  ltiIcon
}: MobileTopNavProps) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(false)

  const styles = useStyle({
    generateStyle,
    generateComponentTheme,
    params: {
      lti
    },
    componentId: 'MobileTopNav',
    displayName: 'MobileTopNav'
  })

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
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

  const handleToggle = () => {
    const newOpen = !open
    if (isControlled) {
      onOpenChange?.(newOpen)
    } else {
      setInternalOpen(newOpen)
    }
  }

  return (
    <div css={styles.container}>
      <div css={styles.topBar}>
        {lti ? (
          <IconButton
            withBackground={false}
            withBorder={false}
            screenReaderLabel={'lti'}
          >
            <div style={{ fontSize: '36px' }}> {ltiIcon}</div>
          </IconButton>
        ) : (
          brand
        )}
        <span css={styles.end}>
          {!open && getSubComponent('End')}
          <IconButton
            withBackground={false}
            withBorder={false}
            screenReaderLabel={open ? 'Close menu' : 'Open menu'}
            color={lti ? undefined : 'primary-inverse'}
            onClick={handleToggle}
          >
            {open ? <IconXLine /> : <IconHamburgerLine />}
          </IconButton>
        </span>
      </div>

      <div css={open ? styles.contentOpen : styles.contentClosed}>
        {getSubComponent('Menu')}
      </div>
    </div>
  )
}

const End = ({ children }: PropsWithChildren) => {
  return <Fragment>{children}</Fragment>
}

const Menu = ({ children }: PropsWithChildren) => {
  return <Fragment>{children}</Fragment>
}

MobileTopNav.End = End
;(MobileTopNav.End as React.FC).displayName = 'End'
MobileTopNav.Menu = Menu
;(MobileTopNav.Menu as React.FC).displayName = 'Menu'
MobileTopNav.displayName = 'MobileTopNav'

export { MobileTopNav }
export default MobileTopNav
