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
import { useEffect, useState } from 'react'
import { DesktopTopNav } from '../DesktopTopNav'
import { MobileTopNav } from '../MobileTopNav'
import { InstUISettingsProvider, jsx, useTheme } from '@instructure/emotion'
import {
  IconAddLine,
  IconAdminSolid,
  IconArrowOpenStartLine,
  IconHamburgerLine
} from '@instructure/ui-icons'
import { Button, IconButton } from '@instructure/ui-buttons'
import { Breadcrumb, BreadcrumbLink } from '@instructure/ui-breadcrumb'
import { generateStyles } from './styles'

/**
---
category: components
---
**/
const CanvasTopNav = ({
  breakpoint = 768,
  lightMode = true,
  brand,
  breadcrumb,
  mobileMenuTitle,
  mobileButtons = [],
  mobileMenu = [],
  mobileMenuBackNavigation,
  hamburgerOnClick,
  beforeMobileMenuItems,
  afterMobileMenuItems,
  styles
}: any) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // Resize listener to check if the screen is small or not
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= Number(breakpoint))
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  // Render mobile or desktop nav based on screen size
  return isSmallScreen ? (
    <MobileTopNav lightMode={lightMode} brand={brand}>
      <MobileTopNav.End>
        {mobileButtons.map((button: any, index: any) => (
          <IconButton
            key={index}
            withBackground={false}
            withBorder={false}
            screenReaderLabel={button.screenReaderLabel}
            color={lightMode ? 'primary' : 'primary-inverse'}
            onClick={button.onClick}
          >
            {button.icon}
          </IconButton>
        ))}
      </MobileTopNav.End>
      <MobileTopNav.Menu>
        <div style={{ marginTop: 16 }}>
          <Breadcrumb label={mobileMenuBackNavigation.label}>
            <BreadcrumbLink
              href={mobileMenuBackNavigation.href}
              onClick={mobileMenuBackNavigation.onClick}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <IconArrowOpenStartLine />
                {mobileMenuBackNavigation.label}
              </div>
            </BreadcrumbLink>
          </Breadcrumb>
        </div>
        {beforeMobileMenuItems && beforeMobileMenuItems}
        <MobileTopNav.ItemList title={mobileMenuTitle}>
          {mobileMenu.map((item: any, index: any) => (
            <MobileTopNav.Item
              key={index}
              renderBeforeLabel={item.renderBeforeLabel || null}
              renderAfterLabel={item.renderAfterLabel || null}
              onClick={item.onClick}
            >
              {item.label}
            </MobileTopNav.Item>
          ))}
        </MobileTopNav.ItemList>
        {afterMobileMenuItems && afterMobileMenuItems}
      </MobileTopNav.Menu>
    </MobileTopNav>
  ) : (
    <DesktopTopNav lightMode={lightMode}>
      <DesktopTopNav.Start>
        <IconButton
          withBackground={false}
          withBorder={false}
          screenReaderLabel="burgir"
          onClick={hamburgerOnClick}
          color={lightMode ? 'secondary' : 'primary-inverse'}
        >
          <IconHamburgerLine />
        </IconButton>
        <div style={{ minWidth: '100%' }}>
          <InstUISettingsProvider
            theme={{
              componentOverrides: {
                Link: {
                  color: styles.breadcrumbOverride.color
                }
              }
            }}
          >
            <Breadcrumb label={breadcrumb.label}>
              {breadcrumb.links.map((link: any, index: any) =>
                link.href ? (
                  <Breadcrumb.Link key={index} href={link.href}>
                    {link.label}
                  </Breadcrumb.Link>
                ) : (
                  <Breadcrumb.Link key={index}>{link.label}</Breadcrumb.Link>
                )
              )}
            </Breadcrumb>
          </InstUISettingsProvider>
        </div>
      </DesktopTopNav.Start>
      <DesktopTopNav.End>
        <Button renderIcon={<IconAddLine />}>IconAddLine</Button>
        <Button renderIcon={<IconAdminSolid />}>IconAdminSolid</Button>
      </DesktopTopNav.End>
    </DesktopTopNav>
  )
}

const withStyles =
  <ComponentOwnProps, ComponentStyle>(
    generateStyles: (props: any, theme: any) => ComponentStyle
  ) =>
  (WrappedComponent: any) =>
  // eslint-disable-next-line react/display-name
  (originalProps: ComponentOwnProps) => {
    const theme = useTheme()
    const styledProps = {
      styles: generateStyles(originalProps, theme),
      ...originalProps
    }
    return <WrappedComponent {...styledProps} />
  }

const SC: any = withStyles(generateStyles)(CanvasTopNav)
SC.displayName = 'CanvasTopNav'

export { SC as CanvasTopNav }
export default SC
