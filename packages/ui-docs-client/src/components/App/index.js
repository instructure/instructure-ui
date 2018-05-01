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

import GithubCorner from 'react-github-corner'

import themeable from '@instructure/ui-themeable'

import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import Select from '@instructure/ui-forms/lib/components/Select'
import Tray from '@instructure/ui-overlays/lib/components/Tray'

import Heading from '@instructure/ui-elements/lib/components/Heading'
import Pill from '@instructure/ui-elements/lib/components/Pill'

import IconHeart from '@instructure/ui-icons/lib/Solid/IconHeart'
import IconGithub from '@instructure/ui-icons/lib/Solid/IconGithub'

import classnames from 'classnames'
import Document from '../Document'
import Header from '../Header'
import Nav from '../Nav'
import Theme from '../Theme'
import Section from '../Section'
import Icons from '../Icons'

import Button from '../Button'

import compileMarkdown from '../../utils/compileMarkdown'

import { LibraryPropType } from './propTypes'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class App extends Component {
  static propTypes = {
    docs: PropTypes.object.isRequired,
    parents: PropTypes.object,
    sections: PropTypes.object,
    themes: PropTypes.object,
    icons: PropTypes.object,
    descriptions: PropTypes.object,
    library: LibraryPropType.isRequired
  }

  static defaultProps = {
    icons: {},
    themes: {},
    parents: {},
    sections: {},
    descriptions: {}
  }

  static childContextTypes = {
    library: LibraryPropType,
    themes: PropTypes.object,
    themeKey: PropTypes.string
  }

  constructor () {
    super()

    this.state = {
      key: undefined, // eslint-disable-line no-undefined
      showMenu: true,
      themeKey: undefined // eslint-disable-line no-undefined
    }
  }

  getChildContext () {
    return {
      library: this.props.library,
      themeKey: this.state.themeKey,
      themes: this.props.themes
    }
  }

  updateKey = () => {
    this.setState({
      key: window.location.hash.slice(1) || 'index'
    })
  }

  handleMenuToggle = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  handleThemeChange = (event, option) => {
    this.setState({
      themeKey: option.value
    })
  }

  componentDidMount () {
    this.updateKey()

    window.addEventListener('hashchange', this.updateKey, false)
  }

  componentWillUnmount () {
    window.removeEventListener('hashchange', this.updateKey, false)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.key !== this.state.key) {
      this._content.scrollTop = 0
    }
  }

  renderThemeSelect () {
    const themeKeys = Object.keys(this.props.themes)
    return themeKeys.length > 0 ? (
      <div className={styles.docsSectionHeader}>
        <div className={styles.themeSelect}>
          <Select
            name="theme"
            label="Theme"
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
        </div>
      </div>
    ) : null
  }

  renderTheme (themeKey) {
    const theme = this.props.themes[themeKey]
    return (
      <Section id={themeKey}>
        <Heading level="h2" margin="0 0 medium 0">
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

  renderIcons (key) {
    const { icons } = this.props

    return (
      <Section id={key}>
        <Heading level="h2" margin="0 0 medium 0">
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

  renderDocument (doc) {
    const { descriptions, docs, parents } = this.props
    let children = []

    if (parents[doc.id]) {
      children = parents[doc.id].children.map(childId => docs[childId])
    }

    const description = descriptions[doc.id]
    // eslint-disable-next-line no-undefined
    const heading = doc.extension !== '.md' ? doc.title : undefined

    return (
      <div>
        { this.renderThemeSelect() }
        { doc.experimental && <div><Pill text="Experimental" variant="primary" margin="small 0" /></div>}
        <Section id={doc.id} heading={heading}>
          <Document
            doc={{
              ...doc,
              children
            }}
            description={description || doc.description}
            themeKey={this.state.themeKey}
          />
        </Section>
      </div>
    )
  }

  renderIndex () {
    const { docs, library } = this.props

    return docs[library.name] ? (
      <Section id={library.name}>
        {compileMarkdown(docs[library.name].description, { title: library.name })}
      </Section>
    ) : null
  }

  renderChangeLog () {
    const { docs } = this.props
    return docs.CHANGELOG ? (
      <Section id="CHANGELOG">
        {compileMarkdown(docs.CHANGELOG.description, { title: 'CHANGELOG' })}
      </Section>
    ) : null
  }

  renderError () {
    return (
      <Section id="error">
        <Heading level="h2">Document not found</Heading>
      </Section>
    )
  }

  renderContent (key) {
    const doc = this.props.docs[key]
    const theme = this.props.themes[key]
    const icon = this.props.icons.formats[key]

    if (!key || key === 'index') {
      return this.renderIndex()
    } if (key === 'CHANGELOG') {
      return this.renderChangeLog()
    } else if (key === 'iconography' || icon) {
      return this.renderIcons(key)
    } else if (theme) {
      return this.renderTheme(key)
    } else if (doc) {
      return this.renderDocument(doc)
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
      <div className={styles.footer}>
        { author && (
          <span>
            Made with &nbsp;
            <IconHeart className={styles.footerIcon} />
            &nbsp; by {author}. &nbsp;
          </span>
        ) }
        { repository && (
          <a href={repository} className={styles.githubLink} target="_blank">
            <IconGithub className={styles.footerIcon} />
            <ScreenReaderContent>Contribute on Github</ScreenReaderContent>
          </a>
        ) }
      </div>
    ) : null
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles['show-menu']]: this.state.showMenu
    }
    const {
      name,
      version
    } = this.props.library
    return (
      <div className={classnames(classes)}>
        <div className={styles.container}>
          <div className={styles.menuToggle}>
            <Button
              onClick={this.handleMenuToggle}
              aria-controls="nav"
              aria-expanded={this.state.showMenu ? 'true' : 'false'}
            >
              <span className={styles.hamburger}>
                <span className={styles.line}>
                  <ScreenReaderContent>Toggle Navigation</ScreenReaderContent>
                </span>
              </span>
            </Button>
          </div>
          <div
            className={styles.content}
            ref={c => {
              this._content = c
            }}
          >
            <div className={styles.main} role="main" id="main">
              {this.renderContent(this.state.key)}

              {this.renderFooter()}
            </div>
          </div>
          <Tray
            label="Navigation"
            open={this.state.showMenu}
            size="x-small"
            mountNode={() => document.getElementById('nav')}
          >
            <div className={styles.nav}>
              <Header name={name} version={version} />
              <Nav
                selected={this.state.key}
                sections={this.props.sections}
                docs={this.props.docs}
                themes={this.props.themes}
                icons={this.props.icons}
              />
            </div>
          </Tray>
        </div>
        <GithubCorner href="https://www.github.com/instructure/instructure-ui" />
      </div>
    )
  }
}
