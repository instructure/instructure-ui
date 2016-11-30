import React, {Component} from 'react'
import classnames from 'classnames'
import ComponentDoc from '../ComponentDoc'
import DocsHeader from '../DocsHeader'
import DocsNav from '../DocsNav'
import HtmlDoc from '../HtmlDoc'
import ThemeDoc from '../ThemeDoc'
import DocsSection from '../DocsSection'

import ScreenReaderContent from 'instructure-ui/lib/components/ScreenReaderContent'
import RadioInputGroup from 'instructure-ui/lib/components/RadioInputGroup'
import RadioInput from 'instructure-ui/lib/components/RadioInput'
import Themes from 'instructure-ui/lib/themes'
import themeable from 'instructure-ui/lib/util/themeable'
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
      themeKey: 'canvas'
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
          themeKey={themeKey}
          theme={theme}
        />
      </DocsSection>
    )
  }

  renderComponent (component) {
    return (
      <DocsSection id={component.name}>
        {this.renderThemeSelect()}
        <ComponentDoc
          name={component.name}
          doc={component.doc}
          theme={component.theme}
          themeKey={this.state.themeKey}
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
      return this.renderTheme(key, themeable.getTheme(key))
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
            <div className={styles.main} role="main" id="main">

              {this.renderContent(this.state.key)}

              <div className={styles.footer}>
                Made with &nbsp;
                <IconHeartSolid className={styles.footerIcon} />
                &nbsp;
                by {pkg.author}.
                &nbsp;
                <a
                  href={pkg.homepage}
                  className={styles.githubLink}
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
