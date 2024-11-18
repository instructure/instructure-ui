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
import React, { useEffect, useState } from 'react'
import type { TopNavProps } from './props'

/**
 ---
 category: components
 ---
 **/
const TopNav = ({
  children,
  breakpoint = '768',
  lightMode = true
}: TopNavProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= Number(breakpoint))
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const mobileNav = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      child?.type &&
      (child.type as any).displayName === 'MobileTopNav'
  )
  const desktopNav = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      child?.type &&
      (child.type as any).displayName === 'DesktopTopNav'
  )

  // Clone and inject the lightMode prop into identified children
  const mobileNavWithProps = mobileNav
    ? React.cloneElement(mobileNav as React.ReactElement, { lightMode })
    : null
  const desktopNavWithProps = desktopNav
    ? React.cloneElement(desktopNav as React.ReactElement, { lightMode })
    : null

  return isSmallScreen ? mobileNavWithProps : desktopNavWithProps
}

// <TopNav
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

// <TopNav lightMode={true} >
//   <MobileTopNav>
//     <div>Mobile Navigation Content</div>
//   </MobileTopNav>
//   <DesktopTopNav>
//     <div>Desktop Navigation Content</div>
//   </DesktopTopNav>
// </TopNav>

export { TopNav }
export default TopNav
