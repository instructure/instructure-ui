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
  IconAdminLine,
  IconAdminSolid,
  IconArrowOpenStartLine,
  IconCoursesLine,
  IconDashboardLine,
  IconHamburgerLine,
  IconQuestionLine,
  IconUserLine
} from '@instructure/ui-icons'
import { Button, IconButton } from '@instructure/ui-buttons'
import { Breadcrumb, BreadcrumbLink } from '@instructure/ui-breadcrumb'
import { generateStyles } from './styles'
import { Drilldown } from '@instructure/ui-drilldown'
import { Img } from '@instructure/ui-img'

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

  const renderDrilldownPages = (items) => {
    return items.map((item: any, index: any) => {
      return (
        <Drilldown.Page key={item.id} id={item.id}>
          {item.options.map((option) => {
            return (
              <Drilldown.Group key={option.id} id={option.id}>
                <Drilldown.Option
                  id={option.id}
                  subPageId={option.subPageId}
                  onOptionClick={option.onClick}
                >
                  {option.label}
                </Drilldown.Option>
              </Drilldown.Group>
            )
          })}
        </Drilldown.Page>
      )
    })
  }

  // <Drilldown rootPageId={'default'}>
  //   <Drilldown.Page id={'default'}>
  //     <Drilldown.Group id={'account'} withoutSeparators={false}>
  //       <Drilldown.Option id={'account'} subPageId={'account'} afterLabelContentVAlign={'center'}>
  //
  //
  // return (
  //   <Drilldown.Page id={items[0]}>
  //     <Drilldown.Group id
  //       <Drilldown.Option></Drilldown.Option>
  //     </Drilldown.Group>
  //   </Drilldown.Page>
  // )

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
        <Drilldown rootPageId={'default'}>
          {renderDrilldownPages(mobileMenu)}
        </Drilldown>
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
            <Drilldown.Page id={'default'}>
              <Drilldown.Group id={'account'} withoutSeparators={false}>
                <Drilldown.Option
                  id={'account'}
                  subPageId={'account'}
                  afterLabelContentVAlign={'center'}
                >
                  <div style={styles.optionContainer}>
                    <IconUserLine />
                    Account
                  </div>
                </Drilldown.Option>
              </Drilldown.Group>
              <Drilldown.Group id={'courses'} withoutSeparators={false}>
                <Drilldown.Option
                  id={'courses'}
                  subPageId={'courses'}
                  afterLabelContentVAlign={'center'}
                >
                  <div style={styles.optionContainer}>
                    <IconCoursesLine /> Courses
                  </div>
                </Drilldown.Option>
              </Drilldown.Group>
              <Drilldown.Group id={'dashboard'} withoutSeparators={false}>
                <Drilldown.Option
                  id={'dashboard'}
                  onOptionClick={() => (window.location.href = '/dashboard')}
                >
                  <div style={styles.optionContainer}>
                    <IconDashboardLine /> Dashboard
                  </div>
                </Drilldown.Option>
              </Drilldown.Group>
              <Drilldown.Group id={'help'} withoutSeparators={false}>
                <Drilldown.Option
                  id={'help'}
                  onOptionClick={() =>
                    (window.location.href = 'https://www.google.com')
                  }
                >
                  <div style={styles.optionContainer}>
                    <IconQuestionLine /> Help
                  </div>
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>

            <Drilldown.Page
              id="account"
              renderTitle="Account"
              renderBeforeChildren={() => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Img src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png" />
                </div>
              )}
              renderAfterChildren={() => (
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  aliquet erat in orci semper fringilla. Nullam suscipit mollis
                  mi, at vehicula magna vulputate eu. Cras mattis felis id quam
                  vehicula euismod. Nulla dolor enim, ornare in odio a, molestie
                  dictum ligula. Nullam maximus et dolor eget porttitor.
                  Vestibulum faucibus viverra pellentesque. Duis lorem lectus,
                  porta vitae aliquam vitae, vehicula sagittis nulla. Aenean
                  sagittis congue rhoncus. Cras laoreet eu nulla eu dignissim.
                  Maecenas sed massa nisi. Suspendisse pellentesque, metus sed
                  ultricies porta, justo tellus pulvinar diam, ac ornare massa
                  nibh quis purus. Duis erat ipsum, pellentesque in diam non,
                  luctus accumsan metus. In ipsum tellus, ullamcorper a faucibus
                  a, venenatis ut urna. Sed at rutrum turpis.
                </p>
              )}
            >
              <Drilldown.Group id={'account1'} withoutSeparators={false}>
                <Drilldown.Option id="account1">AccountInfo1</Drilldown.Option>
              </Drilldown.Group>
              <Drilldown.Group id={'account2'} withoutSeparators={false}>
                <Drilldown.Option id="account2">AccountInfo2</Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
            <Drilldown.Page id="courses" renderTitle="Courses">
              <Drilldown.Group id={'course1'} withoutSeparators={false}>
                <Drilldown.Option id="courses1">Course 1</Drilldown.Option>
              </Drilldown.Group>
              <Drilldown.Group id={'course2'} withoutSeparators={false}>
                <Drilldown.Option id="course2">Course 2</Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        </InstUISettingsProvider>
      </MobileTopNav.Menu>
    </MobileTopNav>
  ) : (
    <DesktopTopNav lightMode={lti}>
      <DesktopTopNav.Start>
        <IconButton
          withBackground={false}
          withBorder={false}
          screenReaderLabel="burgir"
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
        <Button renderIcon={<IconAddLine />}>IconAddLine</Button>
        <Button renderIcon={<IconAdminLine />}>IconAdminSolid</Button>
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
