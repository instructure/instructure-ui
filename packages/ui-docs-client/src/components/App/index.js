import React, { Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-themeable'

import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'
import Select from '@instructure/ui-core/lib/components/Select'
import Tray from '@instructure/ui-core/lib/components/Tray'
import Heading from '@instructure/ui-core/lib/components/Heading'

import { getRegisteredThemes, getDefaultThemeKey } from '@instructure/ui-themeable/lib/registry'

import IconHeartSolid from 'instructure-icons/lib/Solid/IconHeartSolid'
import IconGithubSolid from 'instructure-icons/lib/Solid/IconGithubSolid'

import classnames from 'classnames'
import Document from '../Document'
import Header from '../Header'
import Nav from '../Nav'
import Theme from '../Theme'
import Section from '../Section'

import Button from '../Button'

import compileMarkdown from '../../utils/compileMarkdown'

import { LibraryPropType } from './propTypes'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class App extends Component {
  static propTypes = {
    docs: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    parents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    sections: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    library: LibraryPropType.isRequired
  }

  static defaultProps = {
    parents: [],
    sections: []
  }

  static themes = getRegisteredThemes()

  static childContextTypes = {
    library: LibraryPropType,
    themes: PropTypes.object,
    themeKey: PropTypes.string
  }

  constructor (props) {
    super()
    this.state = {
      key: null,
      showMenu: false,
      themeKey: getDefaultThemeKey()
    }
  }

  getChildContext () {
    return {
      library: this.props.library,
      themeKey: this.state.themeKey,
      themes: App.themes
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

  handleThemeChange = e => {
    this.setState({
      themeKey: e.target.value
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
    const themeKeys = Object.keys(App.themes)
    return (
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
    )
  }

  renderTheme (themeKey) {
    return (
      <Section id={themeKey}>
        <Heading level="h2" margin="0 0 medium 0">
          {themeKey}
        </Heading>
        <Theme themeKey={themeKey} variables={App.themes[themeKey].variables} />
      </Section>
    )
  }

  renderDocument (doc) {
    let children = []

    if (this.props.parents[doc.id]) {
      children = this.props.parents[doc.id].children.map(childId => this.props.docs[childId])
    }

    return (
      <Section id={doc.id}>
        { this.renderThemeSelect() }
        { doc.documentType !== 'markdown' && <Heading level="h2">
          {doc.title}
        </Heading> }
        <Document
          doc={{
            ...doc,
            children
          }}
          themeKey={this.state.themeKey}
        />
      </Section>
    )
  }

  renderIndex () {
    const { docs, library } = this.props
    return (
      <Section id={library.name}>
        {compileMarkdown(docs.index.description, { title: library.name })}
      </Section>
    )
  }

  renderChangeLog () {
    const { docs } = this.props
    return (
      <Section id="CHANGELOG">
        {compileMarkdown(docs.CHANGELOG.description, { title: 'CHANGELOG' })}
      </Section>
    )
  }

  renderError (key) {
    return (
      <Section id="error">
        <Heading level="h2">Document not found</Heading>
      </Section>
    )
  }

  renderContent (key) {
    const doc = this.props.docs[key]
    const theme = App.themes[key]

    if (!key || key === 'index') {
      return this.renderIndex()
    } else if (doc) {
      return this.renderDocument(doc)
    } else if (theme) {
      return this.renderTheme(key)
    } else {
      return this.renderError(key)
    }
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles['show-menu']]: this.state.showMenu
    }
    const {
      author,
      repository,
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

              <div className={styles.footer}>
                Made with &nbsp;
                <IconHeartSolid className={styles.footerIcon} />
                &nbsp; by {author}. &nbsp;
                <a href={repository} className={styles.githubLink} target="_blank">
                  <IconGithubSolid className={styles.footerIcon} />
                </a>
              </div>
            </div>
          </div>
          <Tray
            label="Navigation"
            open={this.state.showMenu}
            size="x-small"
            applicationElement={() => [document.getElementById('app'), document.getElementById('flash-messages')]}
          >
            <div className={styles.nav} id="nav">
              <Header name={name} version={version} />
              <Nav
                selected={this.state.key}
                sections={this.props.sections}
                docs={this.props.docs}
                themes={App.themes}
              />
            </div>
          </Tray>
        </div>
      </div>
    )
  }
}
