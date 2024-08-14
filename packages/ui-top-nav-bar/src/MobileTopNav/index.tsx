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
// import { useState, useEffect, useContext } from 'react'

import { useState } from 'react'
import { jsx, useTheme } from '@instructure/emotion'
import type { MobileTopNavProps, MobileTopNavOwnProps } from './props'

import { IconButton } from '@instructure/ui-buttons'
import {
  IconHamburgerSolid,
  IconEyeSolid,
  IconXSolid
} from '@instructure/ui-icons'

/**
---
category: components
---
**/
const MobileTopNav = ({
  lightMode = false,
  brand,
  styles
}: MobileTopNavProps) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div css={{ ...styles.container, ...styles.containerHeight(open) }}>
      <div
        css={{
          height: '54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {brand}
        <span
          css={{
            display: 'flex',
            gap: '12px'
          }}
        >
          <IconButton
            withBackground={false}
            withBorder={false}
            screenReaderLabel="burgir"
            color={lightMode ? 'secondary' : 'primary-inverse'}
          >
            <IconEyeSolid />
          </IconButton>
          <IconButton
            withBackground={false}
            withBorder={false}
            screenReaderLabel="burgir"
            color={lightMode ? 'secondary' : 'primary-inverse'}
            onClick={() => setOpen((open) => !open)}
          >
            {open ? <IconXSolid /> : <IconHamburgerSolid />}
          </IconButton>
        </span>
      </div>
    </div>
  )
}

const generateStyles = (props, theme) => {
  const { lightMode } = props
  return {
    container: {
      padding: `0 ${theme.spacing.small}`,
      backgroundColor: lightMode
        ? theme.colors.ui.surfacePageSecondary
        : theme.colors.ui.surfaceDark,
      color: lightMode
        ? theme.colors.contrasts.grey125125
        : theme.colors?.contrasts?.white1010,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%'
    },
    containerHeight: (open: boolean) => {
      return {
        height: open ? '100%' : '54px',
        position: open ? 'absolute' : 'relative'
      }
    }
  }
}

// eslint-disable-next-line react/display-name
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

const SC = withStyles(generateStyles)(MobileTopNav)

export { SC as MobileTopNav }
export default SC
