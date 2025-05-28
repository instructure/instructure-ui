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

import { useEffect, useState } from 'react'
import { DesktopTopNav } from '../DesktopTopNav'
import { MobileTopNav } from '../MobileTopNav'
import { InstUISettingsProvider, useStyle } from '@instructure/emotion'
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
import {
  DeepPartial,
  DrilldownTheme,
  OptionsItemTheme,
  TopNavBarItemTheme
} from '@instructure/shared-types'

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
  ltiMenuItems,
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
          id={item.id}
          renderBackButtonLabel={item?.backButtonLabel}
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
                ...(styles.optionsOverride as DeepPartial<OptionsItemTheme>)
              },
              Drilldown: {
                ...(styles.drilldownOverride as DeepPartial<DrilldownTheme>)
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
            >
              <IconHamburgerLine />
            </IconButton>
          )}
          {lti && <div css={styles.ltiIcon}>{ltiIcon}</div>}
          {!lti && breadcrumb && (
            <div style={{ minWidth: '100%' }}>
              <Breadcrumb label={breadcrumb.label}>
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
          {lti && (
            <div css={styles.menuItems}>
              <InstUISettingsProvider
                theme={{
                  componentOverrides: {
                    'TopNavBar.Item': {
                      ...(styles.topNavBarItemOverride as DeepPartial<TopNavBarItemTheme>)
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
                    {ltiMenuItems?.map((item: any) => {
                      // Check if this item has a submenu
                      if (item.options?.length) {
                        return (
                          <TopNavBarItem
                            key={item.id}
                            id={item.id}
                            renderSubmenu={
                              <Drilldown rootPageId={item.id}>
                                {/* Root Page */}
                                <Drilldown.Page id={item.id}>
                                  {item.options.map((option: any) => (
                                    <Drilldown.Option
                                      key={option.id}
                                      id={option.id}
                                      subPageId={option.subPageId}
                                      href={option.href}
                                    >
                                      {option.renderBeforeTitle}
                                      {option.label}
                                    </Drilldown.Option>
                                  ))}
                                </Drilldown.Page>

                                {/* Optional nested pages if subPageId is used */}
                                {item.options
                                  .filter((opt: any) => opt.subOptions?.length)
                                  .map((opt: any) => (
                                    <Drilldown.Page
                                      key={opt.subPageId}
                                      id={opt.subPageId}
                                    >
                                      {opt.subOptions.map((subOpt: any) => (
                                        <Drilldown.Option
                                          key={subOpt.id}
                                          id={subOpt.id}
                                          href={subOpt.href}
                                        >
                                          {subOpt.renderBeforeTitle}
                                          {subOpt.label}
                                        </Drilldown.Option>
                                      ))}
                                    </Drilldown.Page>
                                  ))}
                              </Drilldown>
                            }
                          >
                            {item.title}
                          </TopNavBarItem>
                        )
                      }

                      // Top-level item with no submenu
                      return (
                        <TopNavBarItem key={item.id} id={item.id}>
                          {item.title}
                        </TopNavBarItem>
                      )
                    })}
                  </TopNavBarMenuItems>
                </TopNavBarContext.Provider>
              </InstUISettingsProvider>
            </div>
          )}
        </DesktopTopNav.Start>
        <DesktopTopNav.End>
          {buttons.map((button: any) => (
            <Button
              key={button.label}
              renderIcon={button.icon}
              onClick={button.onClick}
            >
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
