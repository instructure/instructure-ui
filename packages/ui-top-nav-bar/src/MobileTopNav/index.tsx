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
import { Children, Fragment, useState, useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { jsx, useTheme } from '@instructure/emotion'
import type { MobileTopNavProps } from './props'

import { IconButton } from '@instructure/ui-buttons'
import { IconHamburgerLine, IconXLine } from '@instructure/ui-icons'

/**
---
category: components
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
    return Children.map(children, (child: any) => child).filter(
      (child: any) => child?.type?.displayName === displayName
    )
  }

  return (
    <div css={styles.container(open)}>
      <div css={styles.topBar}>
        {brand}
        <span css={styles.btnRow}>
          {!open && getSubComponent('BtnRow')}
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

      <div style={styles.content(open)}>
        {getSubComponent('BreadCrumb')}
        {getSubComponent('Title')}
        <p>
          1 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          excepturi a blanditiis, aspernatur repellat repellendus dolores cum
          labore eligendi architecto asperiores, dolor quisquam sequi mollitia
          quibusdam, cumque id ab amet?
        </p>
        <p>
          2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          excepturi a blanditiis, aspernatur repellat repellendus dolores cum
          labore eligendi architecto asperiores, dolor quisquam sequi mollitia
          quibusdam, cumque id ab amet?
        </p>
        <p>
          3 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          excepturi a blanditiis, aspernatur repellat repellendus dolores cum
          labore eligendi architecto asperiores, dolor quisquam sequi mollitia
          quibusdam, cumque id ab amet?
        </p>
        <p>
          4 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          excepturi a blanditiis, aspernatur repellat repellendus dolores cum
          labore eligendi architecto asperiores, dolor quisquam sequi mollitia
          quibusdam, cumque id ab amet?
        </p>
        <p>
          5 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          excepturi a blanditiis, aspernatur repellat repellendus dolores cum
          labore eligendi architecto asperiores, dolor quisquam sequi mollitia
          quibusdam, cumque id ab amet?
        </p>
        <p>
          6 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          excepturi a blanditiis, aspernatur repellat repellendus dolores cum
          labore eligendi architecto asperiores, dolor quisquam sequi mollitia
          quibusdam, cumque id ab amet?
        </p>
        <p>
          7 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          excepturi a blanditiis, aspernatur repellat repellendus dolores cum
          labore eligendi architecto asperiores, dolor quisquam sequi mollitia
          quibusdam, cumque id ab amet?
        </p>
        <p>
          8 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          excepturi a blanditiis, aspernatur repellat repellendus dolores cum
          labore eligendi architecto asperiores, dolor quisquam sequi mollitia
          quibusdam, cumque id ab amet?
        </p>
        <p>
          9 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          excepturi a blanditiis, aspernatur repellat repellendus dolores cum
          labore eligendi architecto asperiores, dolor quisquam sequi mollitia
          quibusdam, cumque id ab amet?
        </p>
        <p>
          10 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          excepturi a blanditiis, aspernatur repellat repellendus dolores cum
          labore eligendi architecto asperiores, dolor quisquam sequi mollitia
          quibusdam, cumque id ab amet?
        </p>
        <p>
          11 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          excepturi a blanditiis, aspernatur repellat repellendus dolores cum
          labore eligendi architecto asperiores, dolor quisquam sequi mollitia
          quibusdam, cumque id ab amet?
        </p>
      </div>
    </div>
  )
}

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
        top: '54px',
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

const BtnRow = ({ children }: PropsWithChildren) => {
  return <Fragment>{children}</Fragment>
}

BtnRow.displayName = 'BtnRow'

const BreadCrumb = ({ children }: PropsWithChildren) => {
  return <div css={{ margin: '24px 0' }}>{children}</div>
}

BreadCrumb.displayName = 'BreadCrumb'

const Title = ({ children }: PropsWithChildren) => {
  return <div css={{ margin: '32px 0' }}>{children}</div>
}

Title.displayName = 'Title'

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

SC.BtnRow = BtnRow
SC.BreadCrumb = BreadCrumb
SC.Title = Title

export { SC as MobileTopNav }
export default SC
