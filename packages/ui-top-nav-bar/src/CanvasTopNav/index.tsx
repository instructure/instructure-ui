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
import { InstUISettingsProvider, jsx, useStyle } from '@instructure/emotion'
import { IconHamburgerLine } from '@instructure/ui-icons'
import { Button, IconButton } from '@instructure/ui-buttons'
import { Breadcrumb } from '@instructure/ui-breadcrumb'
import { generateStyle } from './styles'
import { Drilldown } from '@instructure/ui-drilldown'
import { TopNavBarMenuItems } from '../TopNavBar/TopNavBarMenuItems'
import { TopNavBarItem } from '../TopNavBar/TopNavBarItem'
import { CanvasTopNavProps } from './props'
import generateComponentTheme from './theme'
import TopNavBarContext from '../TopNavBar/TopNavBarContext'

/**
---
category: components
---
**/
const CanvasTopNav = ({
  breakpoint = 768,
  lti = false,
  brand,
  breadcrumb,
  buttons = [],
  mobileButtons = [],
  mobileMenu = [],
  hamburgerOnClick,
  hamburgerLabel,
  showDesktopView,
  menuItems,
  open,
  onOpenChange,
  ltiIcon,
  currentPageId
}: CanvasTopNavProps) => {
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

  const styles = useStyle({
    generateStyle,
    generateComponentTheme,
    params: { lti },
    componentId: 'CanvasTopNav',
    displayName: 'CanvasTopNav'
  })

  const renderDrilldownPages = (items: any) => {
    return items.map((item: any) => {
      return (
        <Drilldown.Page
          key={item.id}
          id={item.id} //TODO renderbackbuttonlabel
          renderBeforeChildren={item.renderBeforeMobileMenuItems}
          renderAfterChildren={item.renderAfterMobileMenuItems}
        >
          {item.options.map((option: any) => {
            return (
              <Drilldown.Group key={option.id} id={option.id}>
                <Drilldown.Option
                  id={option.id}
                  subPageId={option.subPageId}
                  onOptionClick={option.onClick}
                  afterLabelContentVAlign={'center'}
                >
                  <div css={styles.optionContainer}>
                    {option.renderBeforeTitle}
                    {option.label}
                  </div>
                </Drilldown.Option>
              </Drilldown.Group>
            )
          })}
        </Drilldown.Page>
      )
    })
  }

  // Render mobile or desktop nav based on screen size
  return isSmallScreen ? (
    <MobileTopNav
      lti={lti}
      ltiIcon={ltiIcon}
      brand={brand}
      open={open}
      onOpenChange={onOpenChange}
    >
      <MobileTopNav.End>
        {!lti &&
          mobileButtons.map((button: any, index: any) => (
            <IconButton
              key={index}
              withBackground={false}
              withBorder={false}
              screenReaderLabel={button.screenReaderLabel}
              color={lti ? undefined : 'primary-inverse'}
              onClick={button.onClick}
            >
              {button.icon}
            </IconButton>
          ))}
      </MobileTopNav.End>
      <MobileTopNav.Menu>
        <InstUISettingsProvider
          theme={{
            componentOverrides: {
              'Options.Item': {
                ...styles.optionsOverride
              },
              Drilldown: {
                ...styles.drilldownOverride
              }
            }
          }}
        >
          <Drilldown rootPageId={'default'}>
            {renderDrilldownPages(mobileMenu)}
          </Drilldown>
        </InstUISettingsProvider>
      </MobileTopNav.Menu>
    </MobileTopNav>
  ) : (
    <div style={{ display: showDesktopView ? 'block' : 'none' }}>
      <DesktopTopNav>
        <DesktopTopNav.Start>
          {!lti && (
            <IconButton
              withBackground={false}
              withBorder={false}
              screenReaderLabel={hamburgerLabel}
              onClick={hamburgerOnClick}
              // color={lti ? 'secondary' : 'primary-inverse'}
            >
              <IconHamburgerLine />
            </IconButton>
          )}
          {lti && <div css={styles.ltiIcon}>{ltiIcon}</div>}
          {!lti && (
            <div style={{ minWidth: '100%' }}>
              <Breadcrumb label={breadcrumb?.label}>
                {breadcrumb?.links.map((link: any, index: any) =>
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
          )}
          <InstUISettingsProvider
            theme={{
              componentOverrides: {
                'TopNavBar.Item': {
                  ...styles.topNavBarItemOverride
                }
              }
            }}
          >
            <TopNavBarContext.Provider
              value={{
                layout: 'desktop',
                inverseColor: true
              }}
            >
              <TopNavBarMenuItems
                renderHiddenItemsMenuTriggerLabel={() => ''}
                currentPageId={currentPageId}
              >
                {menuItems?.map((item: any) => (
                  <TopNavBarItem key={item.id} id={item.id}>
                    {item.title}
                  </TopNavBarItem>
                ))}
                <TopNavBarItem
                  id="submenu"
                  renderSubmenu={
                    <Drilldown rootPageId="root">
                      <Drilldown.Page id="root">
                        <Drilldown.Option
                          id="rootOption1"
                          subPageId="secondPage"
                        >
                          Link One
                        </Drilldown.Option>
                        <Drilldown.Option id="rootOption2" href="/#TopNavBar">
                          Link Two
                        </Drilldown.Option>
                        <Drilldown.Option id="rootOption3" href="/#TopNavBar">
                          Link Three
                        </Drilldown.Option>
                      </Drilldown.Page>
                      <Drilldown.Page id="secondPage">
                        <Drilldown.Option id="secondPageOption1">
                          Level 2 Option One
                        </Drilldown.Option>
                        <Drilldown.Option
                          id="secondPageOption2"
                          href="/#TopNavBar"
                        >
                          Level 2 Option Two
                        </Drilldown.Option>
                      </Drilldown.Page>
                    </Drilldown>
                  }
                >
                  Submenu
                </TopNavBarItem>
              </TopNavBarMenuItems>
            </TopNavBarContext.Provider>
          </InstUISettingsProvider>
        </DesktopTopNav.Start>
        <DesktopTopNav.End>
          {buttons.map((button: any) => (
            <Button key={button.label} renderIcon={button.icon}>
              {button.label}
            </Button>
          ))}
        </DesktopTopNav.End>
      </DesktopTopNav>
    </div>
  )
}

CanvasTopNav.displayName = 'CanvasTopNav'

export { CanvasTopNav }
export default CanvasTopNav
