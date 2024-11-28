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
  lightMode = false,
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
            screenReaderLabel="burgir"
            color={lightMode ? 'secondary' : 'primary-inverse'}
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

const Title = ({ children }: PropsWithChildren) => {
  return <div style={{ margin: '32px 0' }}>{children}</div>
}

Title.displayName = 'Title'

const ItemList = ({
  children,
  styles
}: PropsWithChildren & { styles: any }) => {
  return (
    <Fragment>
      {Children.map(children, (child, index) => (
        <Fragment>
          {child}
          {index < React.Children.count(children) - 1 && (
            <div style={styles.divider}></div>
          )}
        </Fragment>
      ))}
    </Fragment>
  )
}

ItemList.displayName = 'ItemList'

const Item = ({
  children,
  renderBeforeLabel,
  renderAfterLabel,
  onClick,
  styles
}: PropsWithChildren & {
  renderBeforeLabel: any
  renderAfterLabel: any
  onClick: any
  styles: any
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div style={styles.container} onClick={onClick}>
      {renderBeforeLabel && (
        <div style={styles.leftIcon}>{renderBeforeLabel}</div>
      )}
      {children}
      {renderAfterLabel && (
        <div style={styles.rightIcon}>{renderAfterLabel}</div>
      )}
    </div>
  )
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
SC.Title = Title
SC.ItemList = withStyles(generateItemListStyles)(ItemList)
// TODO investigate whether displayName should be added to the original component
SC.ItemList.displayName = 'ItemList'
SC.Item = withStyles(generateItemStyles)(Item) //withStyles(generateItemStyles)(Item)
SC.Item.displayName = 'Item'
SC.Menu = Menu
SC.Menu.displayName = 'Menu'
SC.displayName = 'MobileTopNav'

export { SC as MobileTopNav }
export default SC
