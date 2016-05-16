import React, {Component} from 'react'
import {render} from 'react-dom'
import classnames from 'classnames'
import ComponentDoc from './components/ComponentDoc'
import DocsHeader from './components/DocsHeader'
import DocsNav from './components/DocsNav'
import HtmlDoc from './components/HtmlDoc'
import DocsSection from './components/DocsSection'

import styles from './docs.css'

import documentsMap, { documentsList } from './util/load-docs'
import componentsMap, { componentsList } from './util/load-components'

import config from 'config!'

class DocsApp extends Component {
  constructor (props) {
    super()
    this.state = {
      menuSearch: '',
      showMenu: true
    }
  }

  updateKey = () => {
    this.setState({
      key: window.location.hash.slice(1) || 'index'
    })
  };

  handleMenuToggle = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  };

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

  renderComponent (component) {
    return (
      <DocsSection id={component.name}>
        <ComponentDoc name={component.name} doc={component.doc} path={component.path} />
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

    if (component) {
      return this.renderComponent(component)
    } else if (doc) {
      return this.renderDoc(doc)
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
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                  viewBox="0 0 32 32" role="img">
                  <title>heart</title>
                  <path fill="currentColor" aria-hidden="true" d="M32 11.192c0 2.7-1.163 5.126-3.015 6.808H29L19
                  28c-1 1-2 2-3 2s-2-1-3-2L3.015 18C1.163
                  16.318 0 13.89 0 11.192 0 6.115 4.116 2 9.192 2c2.7 0 5.126 1.163 6.808 3.015C17.682 3.163
                  20.11 2 22.808 2 27.885 2 32 6.116 32 11.192z" />
                </svg>
                by {config.library.author}.
              </div>
            </div>
          </div>
          <div className={styles.sidebar}>
            <div className={styles.menuToggle}>
              <button className={styles.hamburger} onClick={this.handleMenuToggle}>
                <span className={styles.line}>Open Menu</span>
              </button>
            </div>
            <div className={styles.nav} id="nav">
              <DocsNav selected={this.state.key} components={componentsList} documents={documentsList} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

render(<DocsApp />, document.getElementById('app'))
