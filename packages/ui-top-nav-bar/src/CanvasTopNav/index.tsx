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
import {
  InstUISettingsProvider,
  jsx,
  withFunctionalStyle
} from '@instructure/emotion'
import { IconHamburgerLine } from '@instructure/ui-icons'
import { Button, IconButton } from '@instructure/ui-buttons'
import { Breadcrumb } from '@instructure/ui-breadcrumb'
import { generateStyles } from './styles'
import { Drilldown } from '@instructure/ui-drilldown'

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
                  <div style={styles.optionContainer}>
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
    <MobileTopNav lti={lti} brand={brand}>
      <MobileTopNav.End>
        {mobileButtons.map((button: any, index: any) => (
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
      <DesktopTopNav lightMode={lti}>
        <DesktopTopNav.Start>
          <IconButton
            withBackground={false}
            withBorder={false}
            screenReaderLabel={hamburgerLabel}
            onClick={hamburgerOnClick}
            // color={lti ? 'secondary' : 'primary-inverse'}
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

const SC: any = withFunctionalStyle(generateStyles)(CanvasTopNav)
SC.displayName = 'CanvasTopNav'

export { SC as CanvasTopNav }
export default SC
