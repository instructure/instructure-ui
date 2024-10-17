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
import {
  Component,
  createContext,
  LegacyRef,
  ReactElement,
  SyntheticEvent
} from 'react'

import { Alert } from '@instructure/ui-alerts'
import {
  InstUISettingsProvider,
  withStyle,
  jsx,
  Global
} from '@instructure/emotion'
import { Flex } from '@instructure/ui-flex'
import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'
import { AccessibleContent } from '@instructure/ui-a11y-content'
import { Mask } from '@instructure/ui-overlays'
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
import IconsPage from '../Icons'
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
        this.setState({
          docsData,
          themeKey: Object.keys(docsData.themes)[0]
        })
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
          Icons
        </Heading>
        <IconsPage glyphs={iconsData.glyphs} />
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
        this.setState(
          {
            currentDocData: data
          },
          this.scrollToElement
        )
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
    const { repository } = this.state.docsData!.library

    if (!key || key === 'index') {
      return this.renderHero()
    }
    if (key === 'CHANGELOG') {
      return this.renderChangeLog()
    } else if (key === 'icons') {
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
    return (
      <AppContext.Provider
        value={{
          library: docsData.library,
          themeKey: this.state.themeKey!,
          themes: docsData.themes
        }}
      >
        <div css={this.props.styles?.app}>
          <Global styles={this.props.styles?.globalStyles} />
          {showMenu && layout === 'small' && (
            <Mask onClick={this.handleMenuClose} />
          )}
          {this.renderNavigation()}
          <div
            css={this.props.styles?.content}
            aria-label={key || docsData.library.name}
            ref={this.handleContentRef}
          >
            {!showMenu && (
              <div css={this.props.styles?.hamburger}>
                <InstUISettingsProvider>
                  <IconButton
                    onClick={this.handleMenuOpen}
                    elementRef={this.handleMenuTriggerRef}
                    renderIcon={IconHamburgerSolid}
                    screenReaderLabel="Open Navigation"
                    shape="circle"
                    aria-expanded={false}
                  />
                </InstUISettingsProvider>
              </div>
            )}
            {this.renderContent(key)}
            {this.renderFooter()}
          </div>
        </div>
        {this.renderLegacyDocWarning()}
      </AppContext.Provider>
    )
  }
}

export default App
export type { AppContextType }
export { App }
