import React, {Component} from 'react'
import classnames from 'classnames'
import ComponentDoc from '../ComponentDoc'
import DocsHeader from '../DocsHeader'
import DocsNav from '../DocsNav'
import HtmlDoc from '../HtmlDoc'
import ThemeDoc from '../ThemeDoc'
import DocsSection from '../DocsSection'

import { ScreenReaderContent, Transition, RadioInputGroup, RadioInput, Themes, themeable } from 'instructure-ui'

import styles from './styles.css'

import documentsMap, { documentsList } from '../../util/load-docs'
import componentsMap, { componentsList } from '../../util/load-components'

import config from 'config!'

export default class DocsApp extends Component {
  constructor (props) {
    super()
    this.state = {
      menuSearch: '',
      showMenu: true,
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
        <div className={styles.header}>
          <DocsHeader />
        </div>
        <div className={styles.container}>
          <div className={styles.content} ref="content">
            <div className={styles.main} role="main" id="main">

              {this.renderContent(this.state.key)}

              <div className={styles.footer}>
                Made with &nbsp;
                <svg className={styles.icon} width="1em" height="1em"
                  viewBox="0 0 32 32" role="img">
                  <title>heart</title>
                  <path fill="currentColor" aria-hidden="true" d="M32 11.192c0 2.7-1.163 5.126-3.015 6.808H29L19
                  28c-1 1-2 2-3 2s-2-1-3-2L3.015 18C1.163
                  16.318 0 13.89 0 11.192 0 6.115 4.116 2 9.192 2c2.7 0 5.126 1.163 6.808 3.015C17.682 3.163
                  20.11 2 22.808 2 27.885 2 32 6.116 32 11.192z" />
                </svg>
                by {config.library.author}.
                <a
                  href={config.library.projectUrl}
                  className={styles.githubLink}
                >
                  <svg
                    className={styles.icon}
                    aria-hidden="true"
                    height="1em"
                    viewBox="0 0 16 16"
                    width="1em"
                    role="img"
                  >
                    <title>github</title>
                    <path
                      fill="currentColor"
                      aria-hidden="true"
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59 0.4 0.07 0.55-0.17
                      0.55-0.38 0-0.19-0.01-0.82-0.01-1.49-2.01
                      0.37-2.53-0.49-2.69-0.94-0.09-0.23-0.48-0.94-0.82-1.13-0.28-0.15-0.68-0.52-0.01-0.53 0.63-0.01
                      1.08 0.58 1.23 0.82 0.72 1.21 1.87 0.87 2.33 0.66 0.07-0.52 0.28-0.87
                      0.51-1.07-1.78-0.2-3.64-0.89-3.64-3.95 0-0.87
                      0.31-1.59 0.82-2.15-0.08-0.2-0.36-1.02 0.08-2.12 0 0
                      0.67-0.21 2.2 0.82 0.64-0.18 1.32-0.27 2-0.27
                      0.68 0 1.36 0.09 2 0.27 1.53-1.04 2.2-0.82 2.2-0.82
                      0.44 1.1 0.16 1.92 0.08 2.12 0.51 0.56 0.82 1.27 0.82 2.15 0 3.07-1.87 3.75-3.65 3.95 0.29 0.25
                      0.54 0.73 0.54 1.48 0 1.07-0.01 1.93-0.01 2.2 0 0.21 0.15
                      0.46 0.55 0.38C13.71 14.53 16 11.53 16 8
                      16 3.58 12.42 0 8 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.sidebar}>
            <div className={styles.menuToggle}>
              <button className={styles.hamburger} onClick={this.handleMenuToggle}
                aria-controls="nav" aria-expanded={this.state.showMenu ? 'true' : 'false'}>
                <span className={styles.line}>
                  <ScreenReaderContent>Toggle Navigation</ScreenReaderContent>
                </span>
              </button>
            </div>
            <div className={styles.nav} id="nav" aria-hidden={this.state.showMenu ? null : 'false'}>
              <Transition in={this.state.showMenu} transitionOnMount>
                <div>
                  {this.state.showMenu &&
                    <DocsNav
                      selected={this.state.key}
                      components={componentsList}
                      documents={documentsList}
                      themes={Themes} />
                  }
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
