import React, {Component} from 'react'

import * as Themes from 'instructure-ui/lib/themes'
import { getTheme } from 'instructure-ui/lib/themeable/registry'

import classnames from 'classnames'
import ComponentDoc from '../ComponentDoc'
import DocsHeader from '../DocsHeader'
import DocsNav from '../DocsNav'
import HtmlDoc from '../HtmlDoc'
import ThemeDoc from '../ThemeDoc'
import DocsSection from '../DocsSection'

import ScreenReaderContent from 'instructure-ui/lib/components/ScreenReaderContent'
import RadioInputGroup from 'instructure-ui/lib/components/RadioInputGroup'
import Checkbox from 'instructure-ui/lib/components/Checkbox'
import RadioInput from 'instructure-ui/lib/components/RadioInput'
import Tray from 'instructure-ui/lib/components/Tray'

import IconHeartSolid from 'instructure-icons/lib/Solid/IconHeartSolid'
import IconGithubSolid from 'instructure-icons/lib/Solid/IconGithubSolid'

import Button from '../Button'

import styles from './styles.css'

import documentsMap, { documentsList } from '../../util/load-docs'
import componentsMap, { componentsList } from '../../util/load-components'

import { pkg } from 'config-loader!'

export default class DocsApp extends Component {
  constructor (props) {
    super()
    this.state = {
      menuSearch: '',
      showMenu: false,
      themeKey: 'canvas',
      a11y: false
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

  handleThemeChange = (value) => {
    this.setState({
      themeKey: value
    })
  }

  handleA11yToggle = () => {
    this.setState({
      a11y: !this.state.a11y
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
      this.refs.content.scrollTop = 0
    }
  }

  renderA11yToggle () {
    return (
      <div className={styles.a11yToggle}>
        <Checkbox
          size="small"
          checked={this.state.a11y}
          label="a11y"
          variant="toggle"
          onChange={this.handleA11yToggle}
        />
      </div>
    )
  }

  renderThemeSelect () {
    const themeKeys = Object.keys(Themes)
    return (
      <div className={styles.themeSelect}>
        <RadioInputGroup
          name="theme"
          description={<ScreenReaderContent>Select a theme</ScreenReaderContent>}
          variant="toggle"
          onChange={this.handleThemeChange}
          defaultValue={this.state.themeKey}
        >
          {
            themeKeys.map((themeKey) => {
              return <RadioInput key={themeKey} label={themeKey} value={themeKey} />
            })
          }
        </RadioInputGroup>
      </div>
    )
  }

  renderTheme (themeKey, theme) {
    return (
      <DocsSection id={themeKey}>
        <ThemeDoc
          a11y={this.state.a11y}
          themeKey={themeKey}
          theme={theme}
        />
      </DocsSection>
    )
  }

  renderComponent (component) {
    const themeKey = this.state.a11y ? this.state.themeKey + '-a11y' : this.state.themeKey
    return (
      <DocsSection id={component.name}>
        {this.renderThemeSelect()}
        <ComponentDoc
          name={component.name}
          doc={component.doc}
          theme={component.generateTheme(themeKey)}
          themeKey={themeKey}
          path={component.path}
        />
      </DocsSection>
    )
  }

  renderDoc (doc) {
    const heading = doc.title !== 'Index' ? doc.title : null
    return (
      <DocsSection id={doc.name} heading={heading}>
        <HtmlDoc html={doc.html} />
      </DocsSection>
    )
  }

  renderError (key) {
    return (
      <DocsSection id="error">
        <h2>Document not found</h2>
      </DocsSection>
    )
  }

  renderContent (key) {
    const component = componentsMap[key]
    const doc = documentsMap[key]
    const theme = Themes[key]

    if (component) {
      return this.renderComponent(component)
    } else if (doc) {
      return this.renderDoc(doc)
    } else if (theme) {
      const themeKey = this.state.a11y ? key + '-a11y' : key
      return this.renderTheme(key, getTheme(themeKey))
    } else {
      return this.renderError(key)
    }
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles['show-menu']]: this.state.showMenu
    }
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
          <div className={styles.content} ref="content">

            {this.renderA11yToggle()}

            <div className={styles.main} role="main" id="main">

              {this.renderContent(this.state.key)}

              <div className={styles.footer}>
                Made with &nbsp;
                <IconHeartSolid className={styles.footerIcon} />
                &nbsp;
                by {pkg.author}.
                &nbsp;
                <a
                  href={pkg.repository.url}
                  className={styles.githubLink}
                  target="_blank"
                >
                  <IconGithubSolid className={styles.footerIcon} />
                </a>
              </div>
            </div>
          </div>
          <Tray isOpen={this.state.showMenu} isDismissable={false}>
            <div className={styles.nav} id="nav">
              <DocsHeader />
              <DocsNav
                selected={this.state.key}
                components={componentsList}
                documents={documentsList}
                themes={Themes}
              />
            </div>
          </Tray>
        </div>
      </div>
    )
  }
}
