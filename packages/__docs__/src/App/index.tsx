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
  SyntheticEvent,
  createRef
} from 'react'

import { Alert } from '@instructure/ui-alerts'
import { InstUISettingsProvider, Global } from '@instructure/emotion'
import { withStyleForDocs as withStyle } from '../withStyleForDocs'
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
import LegacyIconsPage from '../LegacyIcons'
import { compileMarkdown } from '../compileMarkdown'

import { fetchVersionData, versionInPath } from '../versionData'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { LoadingScreen } from '../LoadingScreen'
import * as EveryComponent from '../../components'
import type { AppProps, AppState, DocData, LayoutSize } from './props'
import { allowedProps } from './props'
import type {
  LibraryOptions,
  MainDocsData,
  ParsedDocSummary
} from '../../buildScripts/DataTypes.mjs'
import { logError } from '@instructure/console'
import type { Spacing } from '@instructure/emotion'
import type { NewComponentTypes } from '@instructure/ui-themes'
import { FocusRegion } from '@instructure/ui-a11y-utils'

type AppContextType = {
  /**
   * The ID of the currently selected theme.
   */
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
  static allowedProps = allowedProps

  private navRef = createRef<HTMLElement>()
  private navFocusRegion: FocusRegion | null = null

  static defaultProps = {
    trayWidth: 300
  }
  _content?: HTMLDivElement | null
  _menuTrigger?: HTMLButtonElement
  _mediaQueryListener?: ReturnType<typeof addMediaQueryMatchListener>
  _defaultDocumentTitle?: string
  _controller?: AbortController
  _heroRef: React.RefObject<any>
  _navRef: React.RefObject<any>
  _skipToMainButtonRef?: HTMLElement
  _mainContentRef?: HTMLElement

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
      versionsData: undefined
    }

    this._heroRef = createRef()
    this._navRef = createRef()
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
      const everyComp = EveryComponent as Record<string, any>
      docData.componentInstance = everyComp[docId]
    }
    return docData
  }

  fetchVersionData = async (signal: AbortController['signal']) => {
    const versionsData = await fetchVersionData(signal)
    return this.setState({ versionsData })
  }

  mainContentRef = (el: Element | null) => {
    this._mainContentRef = el as HTMLElement
  }

  focusContent = () => {
    if (this._mainContentRef) {
      this._mainContentRef.focus()
    }
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

  componentDidMount() {
    this._defaultDocumentTitle = document.title
    this.updateKey()

    window.addEventListener('popstate', this.updateKey, false)

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
    document.addEventListener('keydown', this.handleTabKey)

    fetch('markdown-and-sources-data.json', { signal })
      .then((response) => response.json())
      .then((docsData) => {
        this.setState({
          docsData,
          themeKey: Object.keys(docsData.themes)[0]
        })
      })
      .catch(errorHandler)

    const [page] = this.getPathInfo()
    const isHomepage = page === 'index' || typeof page === 'undefined'
    if (isHomepage) {
      this.setState({ showMenu: false })
    }

    document.addEventListener('focusin', this.handleFocusChange)
  }

  componentDidUpdate(_prevProps: AppProps, prevState: AppState) {
    this.props.makeStyles?.()

    if (
      prevState.showMenu !== this.state.showMenu ||
      prevState.layout !== this.state.layout
    ) {
      this.handleNavigationFocusRegion()
    }
  }

  componentWillUnmount() {
    //cancel ongoing requests
    this._controller?.abort()
    window.removeEventListener('popstate', this.updateKey, false)

    if (this._mediaQueryListener) {
      this._mediaQueryListener.remove()
    }
    document.removeEventListener('focusin', this.handleFocusChange)
    this.navFocusRegion?.deactivate()
  }

  trackPage(page: string) {
    let title = this._defaultDocumentTitle
    if (page !== 'index') {
      title = `${page} - ${this._defaultDocumentTitle}`
    }

    document.title = title!
  }

  getPathInfo = () => {
    const { hash, pathname } = window.location

    // Case 1: Old hash-based routing (hash contains the main content)
    const cleanPath = pathname.replace(/^\/+|\/+$/g, '')
    const pathSegments = cleanPath.split('/')

    // Check if the pathname is just a base path (ends with slash or has no meaningful final segment)
    const hasSubstantialPathname =
      pathSegments.length > 0 &&
      pathSegments[pathSegments.length - 1] !== '' &&
      !pathSegments.every((seg) => seg === '')

    // If it's just a base path with no hash, treat as homepage
    if ((!hasSubstantialPathname || pathname.endsWith('/')) && !hash) {
      return ['index'] // homepage
    }

    if (
      hash &&
      (!hasSubstantialPathname || pathname.endsWith('/')) &&
      hash.startsWith('#') &&
      !hash.startsWith('##')
    ) {
      const path = hash.split('/')
      if (path) {
        const [page, id] = path.map((entry) =>
          decodeURI(entry.replace('#', ''))
        )
        return [page, id]
      }
    }
    // Case 2: New clean URL routing (pathname contains the main content)
    else {
      if (pathSegments.length > 0 && pathSegments[0] !== '') {
        // Get the page from the last segment of the path
        const page = pathSegments[pathSegments.length - 1]
        // If there's a hash that's not at the beginning (like #Guidelines), use it as ID
        let id = undefined
        if (hash && hash.startsWith('##')) {
          id = decodeURI(hash.replace('##', ''))
        } else if (hash && !hash.startsWith('#/')) {
          id = decodeURI(hash.replace('#', ''))
        }
        return [page, id]
      }
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
    this.setState({ showMenu: true }, () => {
      this._navRef.current?.focusTextInput()
    })
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

  focusMainContent = () => {
    if (this._heroRef?.current?.focusMainContent) {
      this._heroRef.current.focusMainContent()
    } else if (this._mainContentRef?.focus) {
      this._mainContentRef.focus()
    }
  }

  handleTabKey = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      if (document.activeElement === document.body) {
        event.preventDefault()
        this.focusSkipToMainButton()
      }
    }
  }

  skipToMainButtonRef = (el: Element | null) => {
    this._skipToMainButtonRef = el as HTMLElement
  }

  focusSkipToMainButton = () => {
    if (this._skipToMainButtonRef) {
      this._skipToMainButtonRef.focus()
    }
  }

  getFocusRegionConfig() {
    return {
      shouldContainFocus: true,
      shouldCloseOnEscape: true,
      shouldReturnFocus: false,
      onDismiss: this.handleMenuClose
    }
  }

  handleNavigationFocusRegion() {
    if (this.state.showMenu) {
      if (this.navFocusRegion) {
        this.navFocusRegion.activate()
      } else if (this.navRef.current) {
        this.navFocusRegion = new FocusRegion(
          this.navRef.current,
          this.getFocusRegionConfig()
        )
        this.navFocusRegion.activate()
      }
    }
  }

  handleFocusChange = (e: FocusEvent) => {
    const isFocusInsideNav =
      e.target && this.navRef.current?.contains(e.target as Node)
    if (!isFocusInsideNav && this.navFocusRegion) {
      this.navFocusRegion.deactivate()
      this.navFocusRegion = null
    } else if (isFocusInsideNav && !this.navFocusRegion) {
      this.handleNavigationFocusRegion()
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
        <Theme themeKey={themeKey} variables={theme.resource} />
      </View>
    )
    return (
      <Section id={themeKey}>{this.renderWrappedContent(themeContent)}</Section>
    )
  }

  renderIcons(key: string) {
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
        <IconsPage />
      </View>
    )

    return <Section id={key}>{this.renderWrappedContent(iconContent)}</Section>
  }

  renderLegacyIcons(key: string) {
    const { layout } = this.state
    const smallerScreens = layout === 'small' || layout === 'medium'

    const iconContent = (
      <View
        as="div"
        padding={
          smallerScreens ? 'x-large none none large' : 'x-large none none'
        }
      >
        {/*<Heading level="h1" as="h2" margin="0 0 medium">*/}
        {/*  Legacy Icons*/}
        {/*</Heading>*/}
        <LegacyIconsPage />
      </View>
    )

    return <Section id={key}>{this.renderWrappedContent(iconContent)}</Section>
  }

  renderDocument(docId: keyof NewComponentTypes, repository: string) {
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
    let legacyGitBranch: string | undefined = undefined

    if (olderVersionsGitBranchMap && versionInPath) {
      legacyGitBranch = olderVersionsGitBranchMap[versionInPath]
    }
    let themeVariables
    if (themes[themeKey!].resource.newTheme.components[docId]) {
      // new theme
      themeVariables = themes[themeKey!].resource.newTheme
    } else {
      themeVariables = themes[themeKey!].resource // old theme
    }
    const heading = currentData.extension !== '.md' ? currentData.title : ''
    const documentContent = (
      <View as="div" padding="x-large none none">
        {this.renderThemeSelect()}
        <View
          elementRef={this.mainContentRef}
          tabIndex={0}
          aria-label="main content"
        >
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
      </View>
    )
    const padding: Spacing =
      layout === 'small' ? 'large small large small' : 'large'
    return this.renderWrappedContent(documentContent, padding)
  }

  renderWrappedContent(
    content: ReactElement[] | ReactElement,
    padding: Spacing = 'large'
  ) {
    return <ContentWrap padding={padding}>{content}</ContentWrap>
  }

  renderHero() {
    const { library, docs, themes } = this.state.docsData!
    const { layout } = this.state

    const themeDocs: ParsedDocSummary = {}

    Object.keys(themes).forEach((key) => {
      themeDocs[key] = {
        title: key,
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
          ref={this._heroRef}
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
    const currentMajorVersion = this.state.docsData!.library.version.slice(0, 2)

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
      return (
        <View
          elementRef={this.mainContentRef}
          tabIndex={0}
          aria-label="changelog page main content"
        >
          {this.renderChangeLog()}
        </View>
      )
    } else if (key === 'icons') {
      return (
        <View
          elementRef={this.mainContentRef}
          tabIndex={0}
          aria-label="icons page main content"
          as={'div'}
        >
          {this.renderIcons(key)}
        </View>
      )
    } else if (key === 'legacy-icons') {
      return (
        <View
          elementRef={this.mainContentRef}
          tabIndex={0}
          aria-label="legacy icons page main content"
          as={'div'}
        >
          {this.renderLegacyIcons(key)}
        </View>
      )
    } else if (theme) {
      return (
        <View
          elementRef={this.mainContentRef}
          tabIndex={0}
          aria-label="theme page main content"
        >
          {this.renderTheme(key)}
        </View>
      )
    } else if (doc) {
      return this.renderDocument((key as keyof NewComponentTypes)!, repository)
    } else {
      return (
        <View
          elementRef={this.mainContentRef}
          tabIndex={0}
          aria-label="error page main content"
        >
          {this.renderError()}
        </View>
      )
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
        <View display="block" textAlign="end" margin="space4 space8 space12">
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
              aria-expanded={true}
            />
          </InstUISettingsProvider>
        </View>

        <Header
          name={name === 'instructure-ui' ? 'v' : name}
          version={version}
          versionsData={versionsData}
        />

        <Nav
          selected={key}
          sections={this.state.docsData!.sections}
          docs={this.state.docsData!.docs}
          themes={this.state.docsData!.themes}
          ref={this._navRef}
        />
      </View>
    )

    return layout !== 'small' ? (
      <nav css={this.props.styles?.inlineNavigation} ref={this.navRef}>
        {navContent}
      </nav>
    ) : (
      <Tray label="Navigation" open={showMenu} onDismiss={this.handleMenuClose}>
        {navContent}
      </Tray>
    )
  }

  renderLegacyDocWarning() {
    const { versionsData } = this.state

    if (!versionsData) {
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

  renderSkipToMainButton = () => {
    return (
      <View
        as={'button'}
        onClick={this.focusMainContent}
        tabIndex={0}
        css={this.props.styles?.skipToMainButton}
        borderRadius="small"
        display="inline-block"
        padding="small"
        background="primary"
        elementRef={this.skipToMainButtonRef}
      >
        Skip to main content
      </View>
    )
  }

  render() {
    const key = this.state.key
    const { showMenu, layout, docsData } = this.state

    if (!docsData) {
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
          {this.renderSkipToMainButton()}
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
                    themeOverride={{
                      secondaryBorderColor: '#343434'
                    }}
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
