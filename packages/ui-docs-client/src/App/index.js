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

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { themeable, ApplyTheme } from '@instructure/ui-themeable'
import { Alert } from '@instructure/ui-alerts'
import { DrawerLayout } from '@instructure/ui-drawer-layout'
import { Flex } from '@instructure/ui-flex'
import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'
import { AccessibleContent } from '@instructure/ui-a11y-content'
import { Mask } from '@instructure/ui-overlays'
import { Pill } from '@instructure/ui-pill'
import { IconButton } from '@instructure/ui-buttons'

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

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class App extends Component {
  static propTypes = {
    library: LibraryPropType.isRequired,
    docs: PropTypes.object.isRequired,
    parents: PropTypes.object,
    sections: PropTypes.object,
    themes: PropTypes.object,
    icons: PropTypes.object,
    descriptions: PropTypes.object,
    trayWidth: PropTypes.number
  }

  static defaultProps = {
    icons: {},
    themes: {},
    parents: {},
    sections: {},
    descriptions: {},
    trayWidth: 300
  }

  static childContextTypes = {
    library: LibraryPropType,
    themes: PropTypes.object,
    themeKey: PropTypes.string
  }

  constructor (props) {
    super()
    // determine what page we're loading
    const [page] = this.getPathInfo()

    // if there's room for the tray + 700px, load with the tray open (unless it's the homepage)
    const smallerScreen = window.matchMedia(`(max-width: ${props.trayWidth + 700}px)`).matches
    const isHomepage = page === 'index' || typeof page === 'undefined'
    const showTrayOnPageLoad = !smallerScreen && !isHomepage

    this.state = {
      showMenu: showTrayOnPageLoad,
      trayOverlay: false,
      themeKey: Object.keys(props.themes)[0],
      contentWidth: undefined
    }

    this._content = null
    this._menuTrigger = null
  }

  componentDidMount () {
    this._defaultDocumentTitle = document.title
    this.updateKey()

    window.addEventListener('hashchange', this.updateKey, false)
  }

  componentWillUnmount () {
    window.removeEventListener('hashchange', this.updateKey, false)
  }

  getChildContext () {
    return {
      library: this.props.library,
      themeKey: this.state.themeKey,
      themes: this.props.themes
    }
  }

  trackPage (page) {
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
      const [ page, id ] = path.map(entry => decodeURI(entry.replace('#', '')))
      return [ page, id ]
    }
    return []
  }

  computeLayout = (contentWidth = this.state.contentWidth) => {
    if (contentWidth >= 700 && contentWidth < 1100 ) {
      return 'medium'
    } else if (contentWidth >= 1100 && contentWidth < 1300) {
      return 'large'
    } else if (contentWidth >= 1300) {
      return 'x-large'
    } else {
      return 'small'
    }
  }

  updateKey = () => {
    const [page, id] = this.getPathInfo()

    if (page) {
      this.setState(
        ({ key, contentWidth, trayOverlay, showMenu }) => ({
          key: page || 'index',
          showMenu: this.handleShowTrayOnURLChange(key, contentWidth, trayOverlay, showMenu)
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
    this.setState({ showMenu: false })
  }

  handleThemeChange = (event, option) => {
    this.setState({
      themeKey: option.value
    })
  }

  handleOverlayTrayChange = (trayIsOverlayed) => {
    this.setState({ trayOverlay: trayIsOverlayed })
  }

  handleShowTrayOnURLChange = (key, contentWidth, trayOverlay, showMenu) => {
    const userIsComingFromHomepage = key === 'index' || typeof key === 'undefined'

    // homepage doesn't know the layout size on initial render
    const layout = typeof key === 'undefined' ? this.computeLayout() : this.computeLayout(contentWidth)

    const layoutIsLargeEnough = layout === 'large' || layout === 'x-large'

    // if the menu tray is overlaying content, close it when the page changes
    if (trayOverlay) {
      return false
    // if the user is coming from the homepage, make the tray show if the layout is large enough
    } else if (userIsComingFromHomepage && layoutIsLargeEnough) {
      return true
    } else {
      return showMenu
    }
  }

  handleTrayDismiss = (e) => {
    this.setState({ showMenu: false })
  }

  handleContentSizeChange = (size) => {
    if (this.state.contentWidth !== size.width) {
      this.setState({
        contentWidth: size.width
      })
    }
  }

  handleTrayExited = (e) => {
    // TODO: Remove this once we fix the issue where focus is lost if the focus
    // later element changes while focus is being returned
    this._menuTrigger && this._menuTrigger.focus()
  }

  renderThemeSelect () {
    const themeKeys = Object.keys(this.props.themes)
    const smallScreen = this.computeLayout() === 'small'

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
            {themeKeys.map(themeKey => {
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

  renderTheme (themeKey) {
    const theme = this.props.themes[themeKey]
    const smallerScreens = this.computeLayout() === 'small' || this.computeLayout() === 'medium'
    const themeContent = (
      <View as="div" padding={smallerScreens ? 'x-large none none large' : 'x-large none none'}>
        <Heading
          level="h1"
          as="h2"
          margin="0 0 medium 0"
        >
          Theme: {themeKey}
        </Heading>
        <Theme
          themeKey={themeKey}
          variables={theme.resource.variables}
          requirePath={theme.requirePath}
          immutable={theme.resource.immutable}
        />
      </View>
    )
    return (
      <Section id={themeKey}>
        {this.renderWrappedContent(themeContent)}
      </Section>
    )
  }

  renderIcons (key) {
    const { icons } = this.props
    const smallerScreens = this.computeLayout() === 'small' || this.computeLayout() === 'medium'

    const iconContent = (
      <View as="div" padding={smallerScreens ? 'x-large none none large' : 'x-large none none'}>
        <Heading
          level="h1"
          as="h2"
          margin="0 0 medium"
        >
          Iconography
        </Heading>
        <Icons
          packageName={icons.packageName}
          selectedFormat={key}
          formats={icons.formats}
        />
      </View>
    )

    return (
      <Section id={key}>
        {this.renderWrappedContent(iconContent)}
      </Section>
    )
  }

  renderDocument (doc, repository) {
    const { descriptions, docs, parents } = this.props
    let children = []

    if (parents[doc.id]) {
      children = parents[doc.id].children.map(childId => docs[childId])
    }

    const description = descriptions[doc.id]
    const heading = (doc.extension !== '.md') ? doc.title : ''
    const smallerScreens = this.computeLayout() === 'small' || this.computeLayout() === 'medium'

    const documentContent = (
      <View as="div" padding={smallerScreens ? 'x-large none none large' : 'x-large none none'}>
        { this.renderThemeSelect() }
        { doc.experimental && <div><Pill color="info" margin="small 0">Experimental</Pill></div>}
        <Section id={doc.id} heading={heading}>
          <Document
            doc={{
              ...doc,
              children
            }}
            description={description || doc.description}
            themeKey={this.state.themeKey}
            repository={repository}
            layout={this.computeLayout()}
          />
        </Section>
      </View>
    )

    return this.renderWrappedContent(documentContent)
  }

  renderWrappedContent (content, padding="large") {
    return (
      <ContentWrap padding={padding}>
        {content}
      </ContentWrap>
    )
  }

  renderIndex () {
    const { docs, library } = this.props

    return docs[library.name] ? (
      <Section id={library.name}>
        { /* only serve Instructure UI homepage to Instructure UI docs */ }
        {library.name === 'instructure-ui' ?
          this.renderHero() :
          this.renderWrappedContent(
            compileMarkdown(docs[library.name].description, { title: library.name }),
            'medium large'
        )}
      </Section>
    ) : null
  }

  renderHero () {
    const { library, docs, themes } = this.props
    const themeDocs = {}

    Object.keys(themes).forEach((key) => {
      themeDocs[key] = {
        category: 'themes'
      }
    })
    return (
      <ApplyTheme theme={ApplyTheme.generateTheme('instructure')}>
        <Hero
          name={library.name}
          docs={{...docs, ...themeDocs}}
          description={library.description}
          repository={library.repository}
          version={library.version}
          trayOverlay={this.state.trayOverlay}
          layout={this.computeLayout()}
        />
      </ApplyTheme>
    )
  }

  renderChangeLog () {
    const { docs } = this.props
    return docs.CHANGELOG ? (
      <Section id="CHANGELOG">
        {this.renderWrappedContent(compileMarkdown(docs.CHANGELOG.description, { title: 'CHANGELOG' }))}
      </Section>
    ) : null
  }

  renderError () {
    const errorContent = (
      <Alert
        variant="error"
        margin="small"
      >
        <Text weight="bold">Document not found.</Text> Please use the search in the navigation to find any page in this documentation.
      </Alert>
    )
    return (
      <Section id="error">
        {this.renderWrappedContent(errorContent)}
      </Section>
    )
  }

  renderContent (key) {
    const doc = this.props.docs[key]
    const theme = this.props.themes[key]
    const icon = this.props.icons.formats[key]
    const { repository } = this.props.library

    if (!key || key === 'index') {
      return this.renderIndex(this.computeLayout())
    } if (key === 'CHANGELOG') {
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

  renderFooter () {
    const {
      author,
      repository
    } = this.props.library

    return author || repository ? (
      <View
        as="footer"
        textAlign="center"
        padding="large medium"
      >
        { author && (
          <AccessibleContent alt={`Made with love by ${author}`}>
            <Text color="secondary" letterSpacing="expanded" transform="uppercase" size="small" lineHeight="fit">
              Made with <IconHeartLine size="small" className={styles.footerIcon} color="error" /> by {author}.
            </Text>
          </AccessibleContent>
        ) }
      </View>
    ) : null
  }

  render () {
    const {
      name,
      version
    } = this.props.library

    const key = this.state.key
    const showMenu = this.state.showMenu
    const trayWidth = this.props.trayWidth

    return (
      <div className={styles.root}>
        { this.state.trayOverlay && showMenu && <Mask onClick={this.handleTrayDismiss} /> }
        <DrawerLayout
          minWidth="700px"
          onOverlayTrayChange={this.handleOverlayTrayChange}
        >
          <DrawerLayout.Tray
            label="Navigation"
            placement="start"
            open={showMenu}
            mountNode={this.state.trayOverlay ? document.body : null}
            onDismiss={this.handleTrayDismiss}
            onExited={this.handleTrayExited}
          >
            <View
              as="div"
              width={trayWidth}
              padding="small none none"
            >
              <View display="block" textAlign="end" margin="xx-small x-small none">
                <ApplyTheme theme={ApplyTheme.generateTheme('instructure')}>
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
                </ApplyTheme>
              </View>
              <Header name={name === 'instructure-ui' ? 'Instructure UI' : name} version={version} />
              <Nav
                selected={key}
                sections={this.props.sections}
                docs={this.props.docs}
                themes={this.props.themes}
                icons={this.props.icons}
              />
            </View>
          </DrawerLayout.Tray>
          <DrawerLayout.Content
            label={key || this.props.library.name}
            role="main"
            contentRef={this.handleContentRef}
            onSizeChange={this.handleContentSizeChange}
          >
            {!showMenu && (
              <div className={styles.hamburger}>
                <ApplyTheme theme={ApplyTheme.generateTheme('instructure')}>
                  <IconButton
                    onClick={this.handleMenuOpen}
                    elementRef={this.handleMenuTriggerRef}
                    renderIcon={IconHamburgerSolid}
                    screenReaderLabel="Open Navigation"
                    shape="circle"
                  />
                </ApplyTheme>
              </div>
            )}
            {this.renderContent(key, this.computeLayout())}
            {this.renderFooter()}
          </DrawerLayout.Content>
        </DrawerLayout>
      </div>
    )
  }
}

export default App
export { App }
