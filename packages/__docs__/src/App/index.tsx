/* eslint-disable react/jsx-no-undef */
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

import {
  Component,
  createContext,
  LegacyRef,
  ReactElement,
  SyntheticEvent
} from 'react'

import { Alert } from '@instructure/ui-alerts'
import { InstUISettingsProvider, withStyle, Global } from '@instructure/emotion'
import { Flex } from '@instructure/ui-flex'
import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'
import { AccessibleContent } from '@instructure/ui-a11y-content'
import { MobileTopNav } from '@instructure/ui-top-nav-bar'
import { IconButton } from '@instructure/ui-buttons'
import { Tray } from '@instructure/ui-tray'
import { Link } from '@instructure/ui-link'
import { addMediaQueryMatchListener } from '@instructure/ui-responsive'
import type { QueriesMatching } from '@instructure/ui-responsive'
import {
  IconHamburgerSolid,
  IconHeartLine,
  IconXSolid
} from '@instructure/ui-icons'

import { ContentWrap } from '../ContentWrap'
import { Document } from '../Document'
import { Header } from '../Header'
import { Heading } from '../Heading'
import { Hero } from '../Hero'
import { Nav } from '../Nav'
import { Theme } from '../Theme'
import { Select } from '../Select'
import { Section } from '../Section'
import { Icons } from '../Icons'
import { compileMarkdown } from '../compileMarkdown'

import { fetchVersionData, versionInPath } from '../versionData'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { LoadingScreen } from '../LoadingScreen'
import * as EveryComponent from '../../components'
import type { AppProps, AppState, DocData, LayoutSize } from './props'
import { propTypes, allowedProps } from './props'
import type {
  LibraryOptions,
  MainDocsData
} from '../../buildScripts/DataTypes.mjs'
import { logError } from '@instructure/console'

type AppContextType = {
  themeKey: keyof MainDocsData['themes']
  themes: MainDocsData['themes']
  library?: LibraryOptions
}

export const AppContext = createContext<AppContextType>({
  themes: {},
  themeKey: '',
  library: undefined
})

@withStyle(generateStyle, generateComponentTheme)
class App extends Component<AppProps, AppState> {
  static propTypes = propTypes
  static allowedProps = allowedProps

  static defaultProps = {
    trayWidth: 300
  }
  _content?: HTMLDivElement | null
  _menuTrigger?: HTMLButtonElement
  _mediaQueryListener?: ReturnType<typeof addMediaQueryMatchListener>
  _defaultDocumentTitle?: string
  _controller?: AbortController

  constructor(props: AppProps) {
    super(props)
    // determine what page we're loading
    const [page] = this.getPathInfo()

    // if there's room for the tray + 700px, load with the tray open (unless it's the homepage)
    const smallerScreen = window.matchMedia(
      `(max-width: ${props.trayWidth + 700}px)`
    ).matches
    const isHomepage = page === 'index' || typeof page === 'undefined'
    const showTrayOnPageLoad = !smallerScreen && !isHomepage

    this.state = {
      showMenu: showTrayOnPageLoad,
      themeKey: undefined,
      layout: 'large',
      docsData: null,
      versionsData: null,
      iconsData: null
    }
  }

  fetchDocumentData = async (docId: string) => {
    const result = await fetch('docs/' + docId + '.json', {
      signal: this._controller?.signal
    })
    const docData: DocData = await result.json()
    if (docId.includes('.')) {
      // e.g. 'Calendar.Day', first get 'Calendar' then 'Day'
      const components = docId.split('.')
      const everyComp = EveryComponent as Record<string, any>
      docData.componentInstance = everyComp[components[0]][components[1]]
    } else {
      docData.componentInstance =
        // eslint-disable-next-line import-x/namespace
        EveryComponent[docId as keyof typeof EveryComponent]
    }
    return docData
  }

  fetchVersionData = async (signal: AbortController['signal']) => {
    const versionsData = await fetchVersionData(signal)
    return this.setState({ versionsData })
  }

  scrollToElement() {
    const [_page, id] = this.getPathInfo()

    if (id) {
      // If we have an id and it corresponds to an element
      // that exists, scroll it into view
      const linkedSection = document.getElementById(id)
      linkedSection && linkedSection.scrollIntoView()
    } else if (this._content) {
      // If we don't have an id, scroll the content back to the top
      this._content.scrollTop = 0
    }
  }

  /**
   * Get every static prop from an object (inherited ones too)
   * @param object The object to check
   * @returns {Set<string>} the properties
   */
  getAllPropNames(object: Record<string, any>) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    let obj: object | null = object
    const props: Set<string> = new Set()
    // exclude some common static props for performance
    const invalidKeys = [
      '$$typeof',
      'render',
      'propTypes',
      'selector',
      'defaultProps',
      'displayName',
      'generateComponentTheme'
    ]
    while (obj) {
      const keys = Object.keys(obj)
      keys.forEach((k) => {
        if (!invalidKeys.includes(k)) props.add(k)
      })
      obj = Reflect.getPrototypeOf(obj)
    }
    return props
  }

  componentDidMount() {
    this._defaultDocumentTitle = document.title
    this.updateKey()

    window.addEventListener('hashchange', this.updateKey, false)

    // TODO: Replace with the Responsive component later
    // Using this method directly for now instead to avoid a call to findDOMNode
    this._mediaQueryListener = addMediaQueryMatchListener(
      {
        medium: { minWidth: 700 },
        large: { minWidth: 1100 },
        'x-large': { minWidth: 1300 }
      },
      this._content!,
      this.updateLayout
    )
    this.props.makeStyles?.()

    this._controller = new AbortController()
    const signal = this._controller.signal

    this.fetchVersionData(signal)

    const errorHandler = (error: Error) => {
      logError(error.name === 'AbortError', error.message)
    }

    fetch('icons-data.json', { signal })
      .then((response) => response.json())
      .then((iconsData) => {
        this.setState({ iconsData: iconsData })
      })
      .catch(errorHandler)
    fetch('markdown-and-sources-data.json', { signal })
      .then((response) => response.json())
      .then((docsData) => {
        this.setState(
          {
            docsData,
            themeKey: Object.keys(docsData.themes)[0]
          },
          this.scrollToElement
        )
      })
      .catch(errorHandler)
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  componentWillUnmount() {
    //cancel ongoing requests
    this._controller?.abort()
    window.removeEventListener('hashchange', this.updateKey, false)

    if (this._mediaQueryListener) {
      this._mediaQueryListener.remove()
    }
  }

  trackPage(page: string) {
    let title = this._defaultDocumentTitle
    if (page !== 'index') {
      title = `${page} - ${this._defaultDocumentTitle}`
    }

    document.title = title!
  }

  getPathInfo = () => {
    const { hash } = window.location

    const path = hash && hash.split('/')

    if (path) {
      const [page, id] = path.map((entry) => decodeURI(entry.replace('#', '')))
      return [page, id]
    }
    return []
  }

  updateLayout = (matches: QueriesMatching) => {
    let layout: LayoutSize = 'small'

    if (matches.length > 0) {
      if (matches.includes('medium') && matches.length === 1) {
        layout = 'medium'
      } else if (matches.includes('large') && matches.length === 2) {
        layout = 'large'
      } else if (matches.includes('x-large')) {
        layout = 'x-large'
      }
    }
    this.setState({ layout })
  }

  updateKey = () => {
    const [page, _id] = this.getPathInfo()

    if (page) {
      this.setState(
        ({ key, showMenu }) => ({
          key: page || 'index',
          showMenu: this.handleShowTrayOnURLChange(key, showMenu)
        }),
        this.scrollToElement
      )
    } else {
      this.trackPage('index')
    }
  }

  handleContentRef: LegacyRef<HTMLDivElement> = (el) => {
    this._content = el
  }

  handleMenuTriggerRef = (el: Element | null) => {
    this._menuTrigger = el as HTMLButtonElement
  }

  handleMenuOpen = () => {
    this.setState({ showMenu: true })
  }

  handleMenuClose = () => {
    this.setState({ showMenu: false }, () => {
      this._menuTrigger && this._menuTrigger.focus()
    })
  }

  handleThemeChange = (_event: SyntheticEvent, option: { value: string }) => {
    this.setState({
      themeKey: option.value
    })
  }

  handleShowTrayOnURLChange = (key: string | undefined, showMenu: boolean) => {
    const userIsComingFromHomepage =
      key === 'index' || typeof key === 'undefined'

    const { layout } = this.state

    // if the user is coming from the homepage, make the tray show if the layout is large enough
    if (layout === 'small') {
      return false
    } else if (userIsComingFromHomepage) {
      return true
    } else {
      return showMenu
    }
  }

  renderThemeSelect() {
    const themeKeys = Object.keys(this.state.docsData!.themes)
    const smallScreen = this.state.layout === 'small'

    return themeKeys.length > 1 ? (
      <Flex
        margin={smallScreen ? 'none none medium' : 'none none x-small'}
        justifyItems={!smallScreen ? 'end' : 'start'}
      >
        <Flex.Item shouldGrow={smallScreen} shouldShrink={smallScreen}>
          <Select
            name="theme"
            renderLabel="Theme"
            onChange={this.handleThemeChange}
            value={this.state.themeKey}
          >
            {themeKeys.map((themeKey) => {
              return (
                <option key={themeKey} value={themeKey}>
                  {themeKey}
                </option>
              )
            })}
          </Select>
        </Flex.Item>
      </Flex>
    ) : null
  }

  renderTheme(themeKey: string) {
    const theme = this.state.docsData!.themes[themeKey]

    const { layout } = this.state
    const smallerScreens = layout === 'small' || layout === 'medium'
    const themeContent = (
      <View
        as="div"
        padding={
          smallerScreens ? 'x-large none none large' : 'x-large none none'
        }
      >
        <Heading level="h1" as="h2" margin="0 0 medium 0">
          Theme: {themeKey}
        </Heading>
        <Theme
          themeKey={themeKey}
          variables={theme.resource}
          requirePath={theme.requirePath}
        />
      </View>
    )
    return (
      <Section id={themeKey}>{this.renderWrappedContent(themeContent)}</Section>
    )
  }

  renderIcons(key: string) {
    const { iconsData } = this.state
    const { layout } = this.state
    const smallerScreens = layout === 'small' || layout === 'medium'

    const iconContent = (
      <View
        as="div"
        padding={
          smallerScreens ? 'x-large none none large' : 'x-large none none'
        }
      >
        <Heading level="h1" as="h2" margin="0 0 medium">
          Iconography
        </Heading>
        <Icons
          packageName={iconsData!.packageName}
          selectedFormat={key}
          formats={iconsData!.formats}
        />
      </View>
    )

    return <Section id={key}>{this.renderWrappedContent(iconContent)}</Section>
  }

  renderDocument(docId: string, repository: string) {
    const { parents } = this.state.docsData!
    const children: any[] = []
    const currentData = this.state.currentDocData
    if (!currentData || currentData.id !== docId) {
      // load all children and the main doc
      this.fetchDocumentData(docId).then(async (data) => {
        if (parents[docId]) {
          for (const childId of parents[docId].children) {
            children.push(await this.fetchDocumentData(childId))
          }
        }
        // eslint-disable-next-line no-param-reassign
        data.children = children
        this.setState({ currentDocData: data })
      })
      return (
        <View as="div" padding="xx-large 0">
          <LoadingScreen />
        </View>
      )
    }
    const { themes } = this.state.docsData!
    const { layout, themeKey, versionsData } = this.state
    const { olderVersionsGitBranchMap } = versionsData || {}
    let legacyGitBranch

    if (olderVersionsGitBranchMap) {
      legacyGitBranch = olderVersionsGitBranchMap[versionInPath]
    }

    const themeVariables = themes[themeKey!].resource
    const heading = currentData.extension !== '.md' ? currentData.title : ''
    const documentContent = (
      <View
        as="div"
        padding={
          layout === 'small' || layout === 'medium'
            ? 'x-large none none large'
            : 'x-large none none'
        }
      >
        {this.renderThemeSelect()}
        <Section id={currentData.id} heading={heading}>
          <Document
            doc={{
              ...currentData,
              legacyGitBranch
            }}
            description={currentData.description}
            themeVariables={themeVariables}
            repository={repository}
            layout={layout}
          />
        </Section>
      </View>
    )
    return this.renderWrappedContent(documentContent)
  }

  renderWrappedContent(
    content: ReactElement[] | ReactElement,
    padding: any = 'large'
  ) {
    return <ContentWrap padding={padding}>{content}</ContentWrap>
  }

  renderHero() {
    const { library, docs, themes } = this.state.docsData!
    const { layout } = this.state

    const themeDocs: Record<string, any> = {}

    Object.keys(themes).forEach((key) => {
      themeDocs[key] = {
        category: 'themes'
      }
    })
    return (
      <InstUISettingsProvider>
        <Hero
          name={library.name}
          docs={{ ...docs, ...themeDocs }}
          repository={library.repository}
          version={library.version}
          layout={layout}
        />
      </InstUISettingsProvider>
    )
  }

  renderChangeLog() {
    if (!this.state.changelogData) {
      this.fetchDocumentData('CHANGELOG').then((data) => {
        this.setState({ changelogData: data })
      })
      return (
        <View as="div" padding="xx-large 0">
          <LoadingScreen />
        </View>
      )
    }
    const CHANGELOG = this.state.changelogData
    let content: string

    const { description } = CHANGELOG
    const currentMajorVersion = this.state.docsData!.library.version.slice(0, 1)

    // we want to cut the docs below the last 2 major versions,
    // so find the next title after it
    const versionCutoffPoint = parseInt(currentMajorVersion, 10) - 2
    const breakpointIndex = description.indexOf(`# [${versionCutoffPoint}`) - 1

    if (breakpointIndex < 0) {
      content = description
    } else {
      content =
        description.slice(0, breakpointIndex) +
        '\n...\n' +
        `# Version ${versionCutoffPoint} and below\n` +
        `For older releases (v${versionCutoffPoint} and below), check the [GitHub CHANGELOG](https://github.com/instructure/instructure-ui/blob/master/CHANGELOG.md).`
    }

    return (
      <Section id="CHANGELOG">
        {this.renderWrappedContent(compileMarkdown(content))}
      </Section>
    )
  }

  renderError() {
    const errorContent = (
      <Alert variant="error" margin="small">
        <Text weight="bold">Document not found.</Text> Please use the search in
        the navigation to find any page in this documentation.
      </Alert>
    )
    return (
      <Section id="error">{this.renderWrappedContent(errorContent)}</Section>
    )
  }

  renderContent(key?: string) {
    const doc = this.state.docsData!.docs[key!]
    const theme = this.state.docsData!.themes[key!]
    let icon
    if (this.state.iconsData && this.state.iconsData.formats) {
      icon =
        this.state.iconsData.formats[
          key as 'icons-svg' | `icons-react` | 'icons-font'
        ]
    }
    const { repository } = this.state.docsData!.library

    if (!key || key === 'index') {
      return this.renderHero()
    }
    if (key === 'CHANGELOG') {
      return this.renderChangeLog()
    } else if (key === 'iconography' || icon) {
      return this.renderIcons(key)
    } else if (theme) {
      return this.renderTheme(key)
    } else if (doc) {
      return this.renderDocument(key!, repository)
    } else {
      return this.renderError()
    }
  }

  renderFooter() {
    const { author, repository } = this.state.docsData!.library

    return author || repository ? (
      <View as="footer" textAlign="center" padding="large medium">
        {author && (
          <AccessibleContent alt={`Made with love by ${author}`}>
            <Text
              color="secondary"
              letterSpacing="expanded"
              transform="uppercase"
              size="small"
              lineHeight="fit"
            >
              Made with <IconHeartLine size="small" color="error" /> by {author}
              .
            </Text>
          </AccessibleContent>
        )}
      </View>
    ) : null
  }

  renderNavigation() {
    const { name, version } = this.state.docsData!.library
    const { key, layout, showMenu, versionsData } = this.state
    // Render nothing when the menu is not shown and the layout isn't small
    // When the layout is small, we still render the tray so that it can properly
    // finish the exit transition
    if (!showMenu && layout !== 'small') return

    const navContent = (
      <View
        as="div"
        padding="small none none"
        minHeight="100vh"
        width="18.75rem"
      >
        <View display="block" textAlign="end" margin="xx-small x-small none">
          <InstUISettingsProvider>
            <IconButton
              renderIcon={IconXSolid}
              screenReaderLabel="Close Navigation"
              withBorder={false}
              withBackground={false}
              onClick={this.handleMenuClose}
              shape="circle"
              color="secondary"
              size="medium"
            />
          </InstUISettingsProvider>
        </View>

        <Header
          name={name === 'instructure-ui' ? 'Instructure UI' : name}
          version={version}
          versionsData={versionsData}
        />

        <Nav
          selected={key}
          sections={this.state.docsData!.sections}
          docs={this.state.docsData!.docs}
          themes={this.state.docsData!.themes}
          icons={this.state.iconsData}
        />
      </View>
    )

    return layout !== 'small' ? (
      <nav css={this.props.styles?.inlineNavigation}>{navContent}</nav>
    ) : (
      <Tray label="Navigation" open={showMenu} onDismiss={this.handleMenuClose}>
        {navContent}
      </Tray>
    )
  }

  renderLegacyDocWarning() {
    const { versionsData, iconsData } = this.state

    if (!versionsData || !iconsData) {
      return null
    }

    // tf there is a version in the path, e.g. "/v6", then it is a legacy page
    return versionInPath ? (
      <div css={this.props.styles?.legacyVersionAlert}>
        <InstUISettingsProvider
          theme={{
            componentOverrides: {
              BaseButton: {
                secondaryGhostColor: 'white'
              }
            }
          }}
        >
          <Alert
            variant="warning"
            transition="none"
            margin="none"
            renderCloseButtonLabel="Close"
            themeOverride={{
              background: '#BF32A4',
              color: 'white',
              borderRadius: '0rem',
              warningBorderColor: '#BF32A4',
              warningIconBackground: '#BF32A4',
              boxShadow: 'none'
            }}
          >
            You are currently viewing the documentation of an older version of
            Instructure UI. For the latest version,{' '}
            <Link color="link-inverse" href={`/${window.location.hash}`}>
              click here
            </Link>
            .
          </Alert>
        </InstUISettingsProvider>
      </div>
    ) : null
  }

  render() {
    const key = this.state.key
    const { showMenu, layout, docsData, iconsData } = this.state

    if (!docsData || !iconsData) {
      return <LoadingScreen />
    }

    const lightMode = false
    const brandSvg = (
      <IconButton
        screenReaderLabel="Canvas Brand"
        href="#"
        withBackground={false}
        withBorder={false}
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

    return (
      <AppContext.Provider
        value={{
          library: docsData.library,
          themeKey: this.state.themeKey!,
          themes: docsData.themes
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}
        >
          <MobileTopNav brand={brandSvg} lightMode={lightMode}>
            <MobileTopNav.BtnRow>
              <IconButton
                withBackground={false}
                withBorder={false}
                screenReaderLabel="burgir"
                color={lightMode ? 'secondary' : 'primary-inverse'}
              >
                <IconAnalyticsLine />
              </IconButton>
              <IconButton
                withBackground={false}
                withBorder={false}
                screenReaderLabel="burgir"
                color={lightMode ? 'secondary' : 'primary-inverse'}
              >
                <IconAlertsLine />
              </IconButton>
            </MobileTopNav.BtnRow>
            <MobileTopNav.BreadCrumb>
              <Link href="#" isWithinText={false} color="link-inverse">
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <IconArrowOpenStartLine />
                  Back
                </div>
              </Link>
            </MobileTopNav.BreadCrumb>
            <MobileTopNav.Title>Courses</MobileTopNav.Title>
          </MobileTopNav>
          <p>
            1 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            2 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            3 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            4 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            5 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            6 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            7 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            8 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            9 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            10 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            11 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            12 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            13 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            14 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            15 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            16 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            17 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            18 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            19 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
          <p>
            20 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Molestias excepturi a blanditiis, aspernatur repellat repellendus
            dolores cum labore eligendi architecto asperiores, dolor quisquam
            sequi mollitia quibusdam, cumque id ab amet?
          </p>
        </div>
      </AppContext.Provider>
    )
  }
}

export default App
export type { AppContextType }
export { App }
