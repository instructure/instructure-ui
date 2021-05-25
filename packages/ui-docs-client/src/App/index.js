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

import React, { Component } from "react"
import PropTypes from "prop-types"

import GithubCorner from "react-github-corner"

import { themeable } from "@instructure/ui-themeable"
import { DrawerLayout } from "@instructure/ui-drawer-layout"
import { View } from "@instructure/ui-view"
import { ScreenReaderContent } from "@instructure/ui-a11y-content"
import { Mask } from "@instructure/ui-overlays"
import { Heading } from "@instructure/ui-heading"
import { Pill } from "@instructure/ui-pill"
import { IconButton } from "@instructure/ui-buttons"

import {
  IconGithubSolid,
  IconHamburgerSolid,
  IconHeartSolid,
  IconXSolid,
} from "@instructure/ui-icons"

import { Document } from "../Document"
import { Header } from "../Header"
import { Nav } from "../Nav"
import { Theme } from "../Theme"
import { Select } from "../Select"
import { Section } from "../Section"
import { Icons } from "../Icons"
import { compileMarkdown } from "../compileMarkdown"
import { LibraryPropType } from "../propTypes"

import styles from "./styles.css"
import theme from "./theme"

@themeable(theme, styles)
class App extends Component {
  static propTypes = {
    docs: PropTypes.object.isRequired,
    parents: PropTypes.object,
    sections: PropTypes.object,
    themes: PropTypes.object,
    icons: PropTypes.object,
    descriptions: PropTypes.object,
    library: LibraryPropType.isRequired,
  }

  static defaultProps = {
    icons: {},
    themes: {},
    parents: {},
    sections: {},
    descriptions: {},
  }

  static childContextTypes = {
    library: LibraryPropType,
    themes: PropTypes.object,
    themeKey: PropTypes.string,
  }

  constructor(props) {
    super()

    this.state = {
      showMenu: false,
      trayOverlay: false,
      themeKey: Object.keys(props.themes)[0],
      versionsData: {
        latestVersion: 'v8',
        previousVersions: ['v7', 'v6']
      }
    }

    this._content = null
    this._menuTrigger = null

    this.fetchVersionData()
  }

  fetchVersionData = async () => {
    const isLocalHost = window.location.hostname === 'localhost'

    if (!isLocalHost) {
      // eslint-disable-next-line compat/compat
      const result = await fetch(`${window.location.origin}/versions.json`)
      const versionsData = await result.json()

      return this.setState({ versionsData })
    }
  }
  getChildContext() {
    return {
      library: this.props.library,
      themeKey: this.state.themeKey,
      themes: this.props.themes,
    }
  }

  trackPage(page) {
    let title = this._defaultDocumentTitle
    if (page !== "index") {
      title = `${page} - ${this._defaultDocumentTitle}`
    }

    document.title = title

    if (window.ga) {
      window.ga("set", "page", page)
      window.ga("set", "title", title)
      window.ga("send", "pageview")
    }
  }

  updateKey = () => {
    const { hash } = window.location

    const path = hash && hash.split("/")

    if (path) {
      const [page, id] = path.map((entry) => decodeURI(entry.replace("#", "")))

      this.setState(
        {
          key: page || "index",
        },
        () => {
          this.trackPage(page || "index")
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
      this.trackPage("index")
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
      themeKey: option.value,
    })
  }

  handleOverlayTrayChange = (trayIsOverlayed) => {
    this.setState({ trayOverlay: trayIsOverlayed })
  }

  handleTrayDismiss = (e) => {
    this.setState({ showMenu: false })
  }

  handleTrayExited = (e) => {
    // TODO: Remove this once we fix the issue where focus is lost if the focus
    // later element changes while focus is being returned
    this._menuTrigger && this._menuTrigger.focus()
  }

  componentDidMount() {
    this._defaultDocumentTitle = document.title
    this.updateKey()

    window.addEventListener("hashchange", this.updateKey, false)
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.updateKey, false)
  }

  renderThemeSelect() {
    const themeKeys = Object.keys(this.props.themes)
    return themeKeys.length > 1 ? (
      <div className={styles.docsSection}>
        <div className={styles.themeSelect}>
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
        </div>
      </div>
    ) : null
  }

  renderTheme(themeKey) {
    const theme = this.props.themes[themeKey]
    return (
      <Section id={themeKey}>
        <Heading level="h1" as="h2" margin="0 0 medium 0">
          {themeKey}
        </Heading>
        <Theme
          themeKey={themeKey}
          variables={theme.resource.variables}
          requirePath={theme.requirePath}
          immutable={theme.resource.immutable}
        />
      </Section>
    )
  }

  renderIcons(key) {
    const { icons } = this.props

    return (
      <Section id={key}>
        <Heading level="h1" as="h2" margin="0 0 medium 0">
          Iconography
        </Heading>
        <Icons
          packageName={icons.packageName}
          selectedFormat={key}
          formats={icons.formats}
        />
      </Section>
    )
  }

  renderDocument(doc) {
    const { descriptions, docs, parents } = this.props
    let children = []

    if (parents[doc.id]) {
      children = parents[doc.id].children.map((childId) => docs[childId])
    }

    const description = descriptions[doc.id]
    const heading = doc.extension !== ".md" ? doc.title : ""

    return (
      <div>
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
              children,
            }}
            description={description || doc.description}
            themeKey={this.state.themeKey}
          />
        </Section>
      </div>
    )
  }

  renderIndex() {
    const { docs, library } = this.props

    return docs[library.name] ? (
      <Section id={library.name}>
        {compileMarkdown(docs[library.name].description, {
          title: library.name,
        })}
      </Section>
    ) : null
  }

  renderChangeLog() {
    const { docs } = this.props
    return docs.CHANGELOG ? (
      <Section id="CHANGELOG">
        {compileMarkdown(docs.CHANGELOG.description, { title: "CHANGELOG" })}
      </Section>
    ) : null
  }

  renderError() {
    return (
      <Section id="error">
        <Heading level="h1" as="h2">
          Document not found
        </Heading>
      </Section>
    )
  }

  renderContent(key) {
    const doc = this.props.docs[key]
    const theme = this.props.themes[key]
    const icon = this.props.icons.formats[key]

    if (!key || key === "index") {
      return this.renderIndex()
    }
    if (key === "CHANGELOG") {
      return this.renderChangeLog()
    } else if (key === "iconography" || icon) {
      return this.renderIcons(key)
    } else if (theme) {
      return this.renderTheme(key)
    } else if (doc) {
      return this.renderDocument(doc, theme)
    } else {
      return this.renderError(key)
    }
  }

  renderFooter() {
    const { author, repository } = this.props.library

    return author || repository ? (
      <div className={styles.footer}>
        {author && (
          <span>
            Made with &nbsp
            <IconHeartSolid className={styles.footerIcon} />
            &nbsp by {author}. &nbsp
          </span>
        )}
        {repository && (
          <a
            href={repository}
            rel="noopener noreferrer"
            className={styles.githubLink}
            target="_blank"
          >
            <IconGithubSolid className={styles.footerIcon} />
            <ScreenReaderContent>Contribute on Github</ScreenReaderContent>
          </a>
        )}
      </div>
    ) : null
  }

  render() {
    const { name, version, repository } = this.props.library
    const { versionsData } = this.state

    return (
      <div className={styles.root}>
        {this.state.trayOverlay && this.state.showMenu && (
          <Mask onClick={this.handleMenuToggle} />
        )}
        <DrawerLayout onOverlayTrayChange={this.handleOverlayTrayChange}>
          <DrawerLayout.Tray
            label="Navigation"
            placement="start"
            open={this.state.showMenu}
            mountNode={this.state.trayOverlay ? document.body : null}
            onDismiss={this.handleTrayDismiss}
            onExited={this.handleTrayExited}
          >
            <View
              as="div"
              width="16rem"
              padding="medium none none none"
              position="relative"
            >
              <View
                as="div"
                position="absolute"
                insetInlineEnd="0rem"
                insetBlockStart="0rem"
              >
                <IconButton
                  renderIcon={IconXSolid}
                  screenReaderLabel="Close Navigation"
                  withBackground={false}
                  withBorder={false}
                  onClick={this.handleMenuClose}
                  margin="small small none none"
                />
              </View>
              <Header name={name} version={version} versionsData={versionsData} />
              <Nav
                selected={this.state.key}
                sections={this.props.sections}
                docs={this.props.docs}
                themes={this.props.themes}
                icons={this.props.icons}
              />
            </View>
          </DrawerLayout.Tray>
          <DrawerLayout.Content
            label={this.state.key || this.props.library.name}
            role="main"
            contentRef={this.handleContentRef}
          >
            {!this.state.showMenu && (
              <div className={styles.hamburger}>
                <IconButton
                  renderIcon={IconHamburgerSolid}
                  screenReaderLabel="Open Navigation"
                  withBackground={false}
                  withBorder={false}
                  onClick={this.handleMenuOpen}
                  elementRef={this.handleMenuTriggerRef}
                  size="large"
                />
              </div>
            )}
            <View
              as="div"
              padding="x-large xx-large"
              minWidth="18rem"
              height="100vh"
            >
              <div className={styles.main} id="main">
                {this.renderContent(this.state.key)}
                {this.renderFooter()}
              </div>
            </View>
          </DrawerLayout.Content>
        </DrawerLayout>
        {repository && <GithubCorner href={repository} />}
      </div>
    )
  }
}

export default App
export { App }
