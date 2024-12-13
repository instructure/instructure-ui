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
import { withStyle, jsx } from '@instructure/emotion'
import { CanvasTopNav } from '@instructure/ui-top-nav-bar'
import { IconButton } from '@instructure/ui-buttons'
import {
  IconAlertsLine,
  IconAnalyticsLine,
  IconArrowOpenEndSolid,
  IconCoursesLine,
  IconDashboardLine,
  IconQuestionLine,
  IconUserLine
} from '@instructure/ui-icons'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import { Img } from '@instructure/ui-img'

type AppProps = {
  navigate: (path: string, options?: { replace: boolean }) => void
}

type AppState = {
  menuStack: string[]
}

type MenuItem = {
  label: string
  renderBeforeLabel?: JSX.Element
  onClick?: () => void
  renderAfterLabel?: JSX.Element
}

type Menu = {
  items: MenuItem[]
  backNavigation: {
    href?: string
    label: string
    onClick?: () => void
  }
  title: string
  renderBeforeMobileMenuItems?: JSX.Element
  renderAfterMobileMenuItems?: JSX.Element
}

type MenuCollection = {
  [key: string]: Menu
}

@withStyle(generateStyle, generateComponentTheme)
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.state = {
      menuStack: [
        'default',
        ...(window.location.pathname.substring(1)
          ? [window.location.pathname.substring(1)]
          : [])
      ]
    }
  }

  pushMenu = (menuKey: string) => {
    this.setState((prevState) => ({
      menuStack: [...prevState.menuStack, menuKey]
    }))
  }

  popMenu = () => {
    this.setState((prevState) => ({
      menuStack: prevState.menuStack.slice(0, -1)
    }))
  }

  getCurrentMenu = () => {
    const { menuStack } = this.state
    return menuStack[menuStack.length - 1]
  }

  render() {
    const isLightMode = true

    const brandSvg = (
      <IconButton
        screenReaderLabel="Canvas Brand"
        href="#"
        withBackground={false}
        withBorder={false}
        color={isLightMode ? 'secondary' : 'primary-inverse'}
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
      </IconButton>
    )

    const menu: MenuCollection = {
      default: {
        items: [
          {
            label: 'Account',
            renderBeforeLabel: <IconUserLine />,
            onClick: () => {
              this.pushMenu('account')
            },
            renderAfterLabel: <IconArrowOpenEndSolid />
          },
          {
            label: 'Courses',
            renderBeforeLabel: <IconCoursesLine />,
            onClick: () => {
              this.pushMenu('courses')
            },
            renderAfterLabel: <IconArrowOpenEndSolid />
          },
          {
            label: 'Dashboard',
            renderBeforeLabel: <IconDashboardLine />,
            onClick: () => {
              this.props.navigate('/dashboard', { replace: true })
              window.location.reload()
            }
          },
          {
            label: 'Help',
            renderBeforeLabel: <IconQuestionLine />
          }
        ],
        backNavigation: {
          href: undefined,
          label: '',
          onClick: undefined
        },
        title: ''
      },
      account: {
        renderBeforeMobileMenuItems: (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Img src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png" />
          </div>
        ),
        renderAfterMobileMenuItems: <h3>Additional account info</h3>,
        items: [
          {
            label: 'AccountInfo1'
          },
          { label: 'AccountInfo2' }
        ],
        backNavigation: {
          label: 'Back',
          onClick: () => {
            this.popMenu()
          }
        },
        title: 'Account'
      },
      courses: {
        items: [{ label: 'Courses1' }, { label: 'Courses2' }],
        backNavigation: {
          label: 'Back',
          onClick: () => {
            this.popMenu()
          }
        },
        title: 'Courses'
      },
      dashboard: {
        title: 'Dashboard',
        items: [{ label: 'Courses1' }, { label: 'Courses2' }],
        backNavigation: {
          label: 'Back',
          onClick: () => {
            this.popMenu()
            this.props.navigate('/', { replace: true })
            window.location.reload()
          }
        }
      }
    }

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}
      >
        <CanvasTopNav
          brand={brandSvg}
          lightMode={false}
          breadcrumb={{
            label: 'You are here:',
            links: [
              { href: '#', label: 'Student Forecast' },
              { href: '#', label: 'University of Utah' },
              { href: '#', label: 'University of Colleges' }
            ]
          }}
          hamburgerOnClick={() => alert('Hamburger clicked')}
          mobileMenuTitle={menu[this.getCurrentMenu()].title}
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
          mobileMenuBackNavigation={menu[this.getCurrentMenu()]?.backNavigation}
          mobileMenu={menu[this.getCurrentMenu()].items}
          beforeMobileMenuItems={
            menu[this.getCurrentMenu()]?.renderBeforeMobileMenuItems
          }
          afterMobileMenuItems={
            menu[this.getCurrentMenu()]?.renderAfterMobileMenuItems
          }
        />
        <Routes>
          <Route path="/" element={<h1>This is home</h1>} />
          <Route path="/dashboard" element={<h1>This is dashboard</h1>} />
        </Routes>
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
