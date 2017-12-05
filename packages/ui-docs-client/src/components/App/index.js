import React, { Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-themeable'

import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'
import Select from '@instructure/ui-core/lib/components/Select'
import Tray from '@instructure/ui-core/lib/components/Tray'
import Heading from '@instructure/ui-core/lib/components/Heading'

import IconHeartSolid from 'instructure-icons/lib/Solid/IconHeartSolid'
import IconGithubSolid from 'instructure-icons/lib/Solid/IconGithubSolid'

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
    docs: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    parents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    sections: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    themes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    icons: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    descriptions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
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

  constructor (props) {
    super()

    this.state = {
      key: undefined,
      showMenu: false,
      themeKey: undefined
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
    const keys = Object.keys(icons.formats)
    const { format } = (icons.formats[key] || icons.formats['react'] || icons.formats[keys[0]])

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

    return (
      <div>
        { this.renderThemeSelect() }
        <Section id={doc.id} heading={doc.extension !== '.md' ? doc.title : undefined}>
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

  renderError (key) {
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
            <IconHeartSolid className={styles.footerIcon} />
            &nbsp; by {author}. &nbsp;
          </span>
        ) }
        { repository && (
          <a href={repository} className={styles.githubLink} target="_blank">
            <IconGithubSolid className={styles.footerIcon} />
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
            applicationElement={() => [
              document.getElementById('app'),
              document.getElementById('flash-messages'),
              document.getElementById('nav')
            ]}
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
      </div>
    )
  }
}
