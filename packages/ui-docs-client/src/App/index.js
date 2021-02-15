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
import { Component, createContext } from 'react'
import PropTypes from 'prop-types'

import { Alert } from '@instructure/ui-alerts'
import {
  EmotionThemeProvider,
  withStyle,
  jsx,
  Global
} from '@instructure/emotion'
import { Flex } from '@instructure/ui-flex'
import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'
import { instructure } from '@instructure/ui-themes'
import { AccessibleContent } from '@instructure/ui-a11y-content'
import { Mask } from '@instructure/ui-overlays'
import { Pill } from '@instructure/ui-pill'
import { IconButton } from '@instructure/ui-buttons'
import { Tray } from '@instructure/ui-tray'
import { addMediaQueryMatchListener } from '@instructure/ui-responsive'
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
import { LibraryPropType } from '../propTypes'

import generateStyle from './styles'
import generateComponentTheme from './theme'

export const AppContext = createContext({
  library: {},
  themes: {},
  themeKey: ''
})
@withStyle(generateStyle, generateComponentTheme)
class App extends Component {
  static propTypes = {
    library: LibraryPropType.isRequired,
    docs: PropTypes.object.isRequired,
    parents: PropTypes.object,
    sections: PropTypes.object,
    themes: PropTypes.object,
    icons: PropTypes.object,
    descriptions: PropTypes.object,
    trayWidth: PropTypes.number,
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    icons: {},
    themes: {},
    parents: {},
    sections: {},
    descriptions: {},
    trayWidth: 300
  }

  constructor(props) {
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
      themeKey: Object.keys(props.themes)[0],
      layout: 'large'
    }

    this._content = null
    this._menuTrigger = null
    this._mediaQueryListener = null
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
      this._content,
      this.updateLayout
    )
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.updateKey, false)

    if (this._mediaQueryListener) {
      this._mediaQueryListener.remove()
    }
  }

  trackPage(page) {
    let title = this._defaultDocumentTitle
    if (page !== 'index') {
      title = `${page} - ${this._defaultDocumentTitle}`
    }

    document.title = title

    if (window.ga) {
      window.ga('set', 'page', page)
      window.ga('set', 'title', title)
      window.ga('send', 'pageview')
    }
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

  updateLayout = (matches) => {
    let layout = 'small'

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
    const [page, id] = this.getPathInfo()

    if (page) {
      this.setState(
        ({ key, showMenu }) => ({
          key: page || 'index',
          showMenu: this.handleShowTrayOnURLChange(key, showMenu)
        }),
        () => {
          this.trackPage(page || 'index')
          if (id) {
            // After setting state, if we have an id and it corresponds to an element
            // that exists, scroll it into view
            const linkedSection = document.getElementById(id)
            linkedSection && linkedSection.scrollIntoView()
          } else if (this._content) {
            // If we don't have an id, scroll the content back to the top
            this._content.scrollTop = 0
          }
        }
      )
    } else {
      this.trackPage('index')
    }
  }

  handleContentRef = (el) => {
    this._content = el
  }

  handleMenuTriggerRef = (el) => {
    this._menuTrigger = el
  }

  handleMenuOpen = () => {
    this.setState({ showMenu: true })
  }

  handleMenuClose = () => {
    this.setState({ showMenu: false }, () => {
      this._menuTrigger && this._menuTrigger.focus()
    })
  }

  handleThemeChange = (event, option) => {
    this.setState({
      themeKey: option.value
    })
  }

  handleShowTrayOnURLChange = (key, showMenu) => {
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
    const themeKeys = Object.keys(this.props.themes)
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

  renderTheme(themeKey) {
    const theme = this.props.themes[themeKey]

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
          immutable={theme.resource.immutable}
        />
      </View>
    )
    return (
      <Section id={themeKey}>{this.renderWrappedContent(themeContent)}</Section>
    )
  }

  renderIcons(key) {
    const { icons } = this.props
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
          packageName={icons.packageName}
          selectedFormat={key}
          formats={icons.formats}
        />
      </View>
    )

    return <Section id={key}>{this.renderWrappedContent(iconContent)}</Section>
  }

  renderDocument(doc, repository) {
    const { descriptions, docs, parents, themes } = this.props
    const { layout, themeKey } = this.state

    let children = []

    if (parents[doc.id]) {
      children = parents[doc.id].children.map((childId) => docs[childId])
    }

    const themeVariables = themes[themeKey].resource

    const description = descriptions[doc.id]
    const heading = doc.extension !== '.md' ? doc.title : ''

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
        {doc.experimental && (
          <div>
            <Pill color="info" margin="small 0">
              Experimental
            </Pill>
          </div>
        )}
        <Section id={doc.id} heading={heading}>
          <Document
            doc={{
              ...doc,
              children
            }}
            description={description || doc.description}
            themeVariables={themeVariables}
            repository={repository}
            layout={layout}
          />
        </Section>
      </View>
    )

    return this.renderWrappedContent(documentContent)
  }

  renderWrappedContent(content, padding = 'large') {
    return <ContentWrap padding={padding}>{content}</ContentWrap>
  }

  renderIndex() {
    const { docs, library } = this.props

    return docs[library.name] ? (
      <Section id={library.name}>
        {/* only serve Instructure UI homepage to Instructure UI docs */}
        {library.name === 'instructure-ui'
          ? this.renderHero()
          : this.renderWrappedContent(
              compileMarkdown(docs[library.name].description, {
                title: library.name
              }),
              'medium large'
            )}
      </Section>
    ) : null
  }

  renderHero() {
    const { library, docs, themes } = this.props
    const { layout } = this.state

    const themeDocs = {}

    Object.keys(themes).forEach((key) => {
      themeDocs[key] = {
        category: 'themes'
      }
    })
    return (
      <EmotionThemeProvider theme={instructure}>
        <Hero
          name={library.name}
          docs={{ ...docs, ...themeDocs }}
          description={library.description}
          repository={library.repository}
          version={library.version}
          layout={layout}
        />
      </EmotionThemeProvider>
    )
  }

  renderChangeLog() {
    const { docs } = this.props
    return docs.CHANGELOG ? (
      <Section id="CHANGELOG">
        {this.renderWrappedContent(
          compileMarkdown(docs.CHANGELOG.description, { title: 'CHANGELOG' })
        )}
      </Section>
    ) : null
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

  renderContent(key) {
    const doc = this.props.docs[key]
    const theme = this.props.themes[key]
    const icon = this.props.icons.formats[key]
    const { repository } = this.props.library

    if (!key || key === 'index') {
      return this.renderIndex()
    }
    if (key === 'CHANGELOG') {
      return this.renderChangeLog()
    } else if (key === 'iconography' || icon) {
      return this.renderIcons(key)
    } else if (theme) {
      return this.renderTheme(key)
    } else if (doc) {
      return this.renderDocument(doc, repository)
    } else {
      return this.renderError(key)
    }
  }

  renderFooter() {
    const { author, repository } = this.props.library

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
    const { name, version } = this.props.library

    const { key, layout, showMenu } = this.state

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
          <EmotionThemeProvider theme={instructure}>
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
          </EmotionThemeProvider>
        </View>
        <Header
          name={name === 'instructure-ui' ? 'Instructure UI' : name}
          version={version}
        />
        <Nav
          selected={key}
          sections={this.props.sections}
          docs={this.props.docs}
          themes={this.props.themes}
          icons={this.props.icons}
        />
      </View>
    )

    return layout !== 'small' ? (
      <nav css={this.props.styles.inlineNavigation}>{navContent}</nav>
    ) : (
      <Tray label="Navigation" open={showMenu} onDismiss={this.handleMenuClose}>
        {navContent}
      </Tray>
    )
  }

  render() {
    const key = this.state.key
    const { showMenu, layout } = this.state

    return (
      <AppContext.Provider
        value={{
          library: this.props.library,
          themeKey: this.state.themeKey,
          themes: this.props.themes
        }}
      >
        <div css={this.props.styles.app}>
          <Global styles={this.props.styles.appGlobalStyles} />
          {showMenu && layout === 'small' && (
            <Mask onClick={this.handleMenuClose} />
          )}
          {this.renderNavigation()}
          <div
            css={this.props.styles.content}
            label={key || this.props.library.name}
            role="main"
            ref={this.handleContentRef}
          >
            {!showMenu && (
              <div css={this.props.styles.hamburger}>
                <EmotionThemeProvider theme={instructure}>
                  <IconButton
                    onClick={this.handleMenuOpen}
                    elementRef={this.handleMenuTriggerRef}
                    renderIcon={IconHamburgerSolid}
                    screenReaderLabel="Open Navigation"
                    shape="circle"
                  />
                </EmotionThemeProvider>
              </div>
            )}

            {this.renderContent(key)}
            {this.renderFooter()}
          </div>
        </div>
      </AppContext.Provider>
    )
  }
}

export default App
export { App }
