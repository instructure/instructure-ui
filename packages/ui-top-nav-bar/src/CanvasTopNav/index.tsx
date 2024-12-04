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
import { jsx } from '@instructure/emotion'
import {
  IconAddLine,
  IconAdminSolid,
  IconArrowOpenStartLine,
  IconHamburgerLine
} from '@instructure/ui-icons'
import { Button, IconButton } from '@instructure/ui-buttons'
import { Breadcrumb, BreadcrumbLink } from '@instructure/ui-breadcrumb'

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
  hamburgerOnClick
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
        </div>
      </DesktopTopNav.Start>
      <DesktopTopNav.End>
        <Button renderIcon={<IconAddLine />}>IconAddLine</Button>
        <Button renderIcon={<IconAdminSolid />}>IconAdminSolid</Button>
      </DesktopTopNav.End>
    </DesktopTopNav>
  )
}
// <CanvasTopNav
//   brand={
//     <IconButton
//       screenReaderLabel="Canvas Brand"
//       href="#"
//       withBackground={false}
//       withBorder={false}
//     >
//       <svg viewBox="0 0 1920 1920" fill="#fff" width="28px" height="28px">
//         <path d="M958.568 277.97C1100.42..." />
//       </svg>
//     </IconButton>
//   }
//   lightMode={true}
//   breadcrumbLinks={[
//     { href: '#', label: 'Student Forecast' },
//     { href: '#', label: 'University of Utah' },
//     { href: '#', label: 'University of Colleges' },
//   ]}
//   title="Courses"
//   buttons={[
//     {
//       screenReaderLabel: 'Analytics',
//       color: 'primary-inverse',
//     },
//     {
//       screenReaderLabel: 'Alerts',
//       color: 'primary-inverse',
//     },
//   ]}
//   items={[
//     { label: 'Account', leftIcon: <IconUserLine />, onClick: () => alert('Account clicked') },
//     { label: 'Admin', leftIcon: <IconAdminLine />, onClick: () => alert('Admin clicked') },
//     { label: 'Dashboard', leftIcon: <IconDashboardLine />, onClick: () => alert('Dashboard') },
//   ]}
// />

// <CanvasTopNav lightMode={true} >
//   <MobileTopNav>
//     <div>Mobile Navigation Content</div>
//   </MobileTopNav>
//   <DesktopTopNav>
//     <div>Desktop Navigation Content</div>
//   </DesktopTopNav>
// </CanvasTopNav>

export { CanvasTopNav }
export default CanvasTopNav
