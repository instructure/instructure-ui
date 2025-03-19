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
import { Component } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { withStyle, jsx, InstUISettingsProvider } from '@instructure/emotion'
import { CanvasTopNav, SubNav } from '@instructure/ui-top-nav-bar'
import {
  IconAddLine,
  IconAdminLine,
  IconAlertsLine,
  IconAnalyticsLine,
  IconCoursesLine,
  IconDashboardLine,
  IconQuestionLine,
  IconUserLine
} from '@instructure/ui-icons'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import { Img } from '@instructure/ui-img'
import { View } from '@instructure/ui-view'
import { SideNavBar } from '@instructure/ui-side-nav-bar'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

type AppProps = {
  navigate: (path: string, options?: { replace: boolean }) => void
}

type AppState = {
  menuStack: string[]
}

@withStyle(generateStyle, generateComponentTheme)
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.state = {
      windowWidth: window.innerWidth
    }
  }

  isCoursePage() {
    return location.pathname.startsWith('/courses')
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth })
  }

  render() {
    const isMobile = this.state.windowWidth < 768

    const brandSvg = (
      <View
        href="#"
        tabIndex={0}
        role="button"
        position="relative"
        borderRadius="small"
        focusColor="inverse" // LTI eseten nincs itt inverse, kek marad a focusring
      >
        <svg
          viewBox="0 0 1920 1920"
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
          width="28px"
          height="28px"
        >
          <path d="M958.568 277.97C1100.42 277.97 1216.48 171.94 1233.67 34.3881 1146.27 12.8955 1054.57 0 958.568 0 864.001 0 770.867 12.8955 683.464 34.3881 700.658 171.94 816.718 277.97 958.568 277.97ZM35.8207 682.031C173.373 699.225 279.403 815.285 279.403 957.136 279.403 1098.99 173.373 1215.05 35.8207 1232.24 12.8953 1144.84 1.43262 1051.7 1.43262 957.136 1.43262 862.569 12.8953 769.434 35.8207 682.031ZM528.713 957.142C528.713 1005.41 489.581 1044.55 441.31 1044.55 393.038 1044.55 353.907 1005.41 353.907 957.142 353.907 908.871 393.038 869.74 441.31 869.74 489.581 869.74 528.713 908.871 528.713 957.142ZM1642.03 957.136C1642.03 1098.99 1748.06 1215.05 1885.61 1232.24 1908.54 1144.84 1920 1051.7 1920 957.136 1920 862.569 1908.54 769.434 1885.61 682.031 1748.06 699.225 1642.03 815.285 1642.03 957.136ZM1567.51 957.142C1567.51 1005.41 1528.38 1044.55 1480.11 1044.55 1431.84 1044.55 1392.71 1005.41 1392.71 957.142 1392.71 908.871 1431.84 869.74 1480.11 869.74 1528.38 869.74 1567.51 908.871 1567.51 957.142ZM958.568 1640.6C816.718 1640.6 700.658 1746.63 683.464 1884.18 770.867 1907.11 864.001 1918.57 958.568 1918.57 1053.14 1918.57 1146.27 1907.11 1233.67 1884.18 1216.48 1746.63 1100.42 1640.6 958.568 1640.6ZM1045.98 1480.11C1045.98 1528.38 1006.85 1567.51 958.575 1567.51 910.304 1567.51 871.172 1528.38 871.172 1480.11 871.172 1431.84 910.304 1392.71 958.575 1392.71 1006.85 1392.71 1045.98 1431.84 1045.98 1480.11ZM1045.98 439.877C1045.98 488.148 1006.85 527.28 958.575 527.28 910.304 527.28 871.172 488.148 871.172 439.877 871.172 391.606 910.304 352.474 958.575 352.474 1006.85 352.474 1045.98 391.606 1045.98 439.877ZM1441.44 1439.99C1341.15 1540.29 1333.98 1697.91 1418.52 1806.8 1579 1712.23 1713.68 1577.55 1806.82 1418.5 1699.35 1332.53 1541.74 1339.7 1441.44 1439.99ZM1414.21 1325.37C1414.21 1373.64 1375.08 1412.77 1326.8 1412.77 1278.53 1412.77 1239.4 1373.64 1239.4 1325.37 1239.4 1277.1 1278.53 1237.97 1326.8 1237.97 1375.08 1237.97 1414.21 1277.1 1414.21 1325.37ZM478.577 477.145C578.875 376.846 586.039 219.234 501.502 110.339 341.024 204.906 206.338 339.592 113.203 498.637 220.666 584.607 378.278 576.01 478.577 477.145ZM679.155 590.32C679.155 638.591 640.024 677.723 591.752 677.723 543.481 677.723 504.349 638.591 504.349 590.32 504.349 542.048 543.481 502.917 591.752 502.917 640.024 502.917 679.155 542.048 679.155 590.32ZM1440 475.712C1540.3 576.01 1697.91 583.174 1806.8 498.637 1712.24 338.159 1577.55 203.473 1418.51 110.339 1332.54 217.801 1341.13 375.413 1440 475.712ZM1414.21 590.32C1414.21 638.591 1375.08 677.723 1326.8 677.723 1278.53 677.723 1239.4 638.591 1239.4 590.32 1239.4 542.048 1278.53 502.917 1326.8 502.917 1375.08 502.917 1414.21 542.048 1414.21 590.32ZM477.145 1438.58C376.846 1338.28 219.234 1331.12 110.339 1415.65 204.906 1576.13 339.593 1710.82 498.637 1805.39 584.607 1696.49 577.443 1538.88 477.145 1438.58ZM679.155 1325.37C679.155 1373.64 640.024 1412.77 591.752 1412.77 543.481 1412.77 504.349 1373.64 504.349 1325.37 504.349 1277.1 543.481 1237.97 591.752 1237.97 640.024 1237.97 679.155 1277.1 679.155 1325.37Z" />
        </svg>
      </View>
    )

    const menuArray: any = [
      {
        id: 'default',
        options: [
          {
            id: 'account',
            label: 'Account',
            renderBeforeTitle: <IconUserLine />,
            subPageId: 'account'
          },
          {
            id: 'courses',
            label: 'Courses',
            renderBeforeTitle: <IconCoursesLine />,
            subPageId: 'courses'
          },
          {
            id: 'dashboard',
            label: 'Dashboard',
            renderBeforeTitle: <IconDashboardLine />,
            onClick: () => {
              this.props.navigate('/dashboard', { replace: true })
              // window.location.reload()
            }
          },
          {
            id: 'help',
            label: 'Help',
            renderBeforeTitle: <IconQuestionLine />,
            onClick: () => alert('Help clicked')
          }
        ]
      },
      {
        id: 'account',
        title: 'Account',
        renderBeforeMobileMenuItems: (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Img src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png" />
          </div>
        ),
        renderAfterMobileMenuItems: (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            aliquet erat in orci semper fringilla. Nullam suscipit mollis mi, at
            vehicula magna vulputate eu. Cras mattis felis id quam vehicula
            euismod. Nulla dolor enim, ornare in odio a, molestie dictum ligula.
            Nullam maximus et dolor eget porttitor. Vestibulum faucibus viverra
            pellentesque. Duis lorem lectus, porta vitae aliquam vitae, vehicula
            sagittis nulla. Aenean sagittis congue rhoncus. Cras laoreet eu
            nulla eu dignissim. Maecenas sed massa nisi. Suspendisse
            pellentesque, metus sed ultricies porta, justo tellus pulvinar diam,
            ac ornare massa nibh quis purus. Duis erat ipsum, pellentesque in
            diam non, luctus accumsan metus. In ipsum tellus, ullamcorper a
            faucibus a, venenatis ut urna. Sed at rutrum turpis.
          </p>
        ),
        options: [
          { id: 'accountinfo1', label: 'Account info 1' },
          { id: 'accountinfo2', label: 'Account info 2' }
        ]
      },
      {
        id: 'courses',
        title: 'Courses',
        options: [
          {
            id: 'courses1',
            label: 'Courses1',
            onClick: () => {
              this.props.navigate('/courses/course1', { replace: true })
              setTimeout(() => {
                window.location.reload()
              }, 50) // Small delay ensures React updates before reloading

              // window.location.reload()
            }
          },
          {
            id: 'courses2',
            label: 'Courses2',
            onClick: () => {
              this.props.navigate('/courses/course2', { replace: true })
              setTimeout(() => {
                window.location.reload()
              }, 50) // Small delay ensures React updates before reloading

              // window.location.reload()
            }
          }
        ]
      }
    ]

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <InstUISettingsProvider
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ height: '100vh' }}>
            {!isMobile && (
              <SideNavBar
                label="Main navigation"
                toggleLabel={{
                  expandedLabel: 'Minimize SideNavBar',
                  minimizedLabel: 'Expand SideNavBar'
                }}
              >
                <SideNavBar.Item
                  label={<ScreenReaderContent>Home</ScreenReaderContent>}
                />
                <SideNavBar.Item
                  icon={brandSvg}
                  label={<ScreenReaderContent>Home</ScreenReaderContent>}
                  onClick={() => this.props.navigate('/', { replace: true })}
                />
                <SideNavBar.Item
                  icon={<IconUserLine />}
                  label="Account"
                  href="/account"
                />
                <SideNavBar.Item
                  icon={<IconCoursesLine />}
                  label="Courses"
                  href="/courses"
                />
                <SideNavBar.Item
                  icon={<IconDashboardLine />}
                  label="Dashboard"
                  onClick={() =>
                    this.props.navigate('/dashboard', { replace: true })
                  }
                />
                <SideNavBar.Item
                  icon={<IconQuestionLine />}
                  label="Help"
                  href="#"
                />
              </SideNavBar>
            )}
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <CanvasTopNav
              brand={brandSvg}
              lti={false}
              buttons={[
                {
                  label: 'AddLine',
                  onClick: () => alert('Button 1'),
                  icon: <IconAddLine />
                },
                {
                  label: 'AdminLine',
                  onClick: () => alert('Button 2'),
                  icon: <IconAdminLine />
                }
              ]}
              breadcrumb={{
                label: 'You are here:',
                links: [
                  { href: '#', label: 'Student Forecast' },
                  { href: '#', label: 'University of Utah' },
                  { label: 'University of Colleges' }
                ]
              }}
              hamburgerOnClick={() => alert('Hamburger clicked')}
              mobileButtons={[
                {
                  screenReaderLabel: 'Analytics',
                  icon: <IconAnalyticsLine />,
                  onClick: () => alert('Analytics clicked')
                },
                {
                  screenReaderLabel: 'Alerts',
                  icon: <IconAlertsLine />,
                  onClick: () => alert('Alerts clicked')
                }
              ]}
              mobileMenu={menuArray}
            />
            <div style={{ display: 'flex' }}>
              {this.isCoursePage() && (
                <SubNav
                  menuItems={[
                    { title: 'Home', href: '/', selected: true },
                    { title: 'Announcements', href: '/' },
                    { title: 'Assignments', href: '/' }
                  ]}
                />
              )}
              <div style={{ padding: '30px' }}>
                <Routes>
                  <Route path="/" element={<h1>This is home</h1>} />
                  <Route
                    path="/dashboard"
                    element={<h1>This is the dashboard</h1>}
                  />
                  <Route
                    path="/account"
                    element={<h1>This is the account page</h1>}
                  />
                  <Route
                    path="/courses"
                    element={<h1>This is a course home page</h1>}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </InstUISettingsProvider>
      </div>
    )
  }
}

function AppWrapper() {
  const navigate = useNavigate()
  return <App navigate={navigate} />
}

export default App
export { App, AppWrapper }
